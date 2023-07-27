<script setup lang="ts">
import { reactive, nextTick, ref, onMounted, computed } from 'vue'
import * as signalR from '@microsoft/signalr'
import instanceAxios from '@/utils/axios'
import { ElScrollbar as ElScrollbarType, ElMessage, ElMessageBox } from 'element-plus'

const scrollbarRef = ref<InstanceType<typeof ElScrollbarType>>()

/**
 * 后端 消息
 */
interface IMessages {
  ID: string // 消息 ID，连接ID
  SenderName: string // 发送者姓名
  ReceiverName: string // 接受者姓名
  Content: string // 消息内容
  Timestamp: Date // 发送时间
  Type: MessageType // 类型
}
/**
 * 后端 在线用户
 */
interface IChatUser {
  ConID: string
  Name: string
}
/**
 * 后端 发送消息类型
 */
enum MessageType {
  指定用户,
  某个组,
  所有人
}

/**
 * 聊天接口
 */
interface IChat {
  connection: signalR.HubConnection | null // 连接类
  state: boolean // 状态
  users: IChatUser[] // 用户集
  msgList: IMessages[] // 聊天记录
}

let room: IChat = reactive({
  connection: null, // 连接
  state: false, // 连接状态
  users: [], // 在线人
  msgList: [] // 消息集合
})

let userInfo = reactive({
  userName: null as string | null, // 当前登录人姓名
  inputMsg: '' // 输入框数据
})

/**
 * 登录
 * @param isAuto 是否自动登录
 */
let loginIn = async (isAuto?: boolean) => {
  let userName = isAuto ? localStorage.getItem('userName') : ''
  if (!userName) {
    try {
      var { value: val } = await ElMessageBox.prompt('请输入你的用户名', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputErrorMessage: '不能为空',
        inputPattern: /^\s*.*\S.*\s*$/
      })
      userName = val
    } catch (error) {
      ElMessage({
        type: 'warning',
        message: '已取消登录'
      })
    }
  }
  if (!userName) return

  // 这里登录获取token，登录获取token
  try {
    let { data: res } = await instanceAxios.post('/User/LoginIn', {
      Name: userName
    })
    localStorage.setItem('userName', userName)
    ElMessage({
      type: 'success',
      message: '登录成功'
    })
    connect(res.res) // 建立连接
  } catch (error) {
    ElMessage.error('登录失败' + error)
  }
}

/**
 * 建立signalR 连接
 * @param token token
 */
let connect = (token: string) => {
  // 建立 signalR 连接
  room.connection = new signalR.HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_API_BASEURL + '/chat?access_token=' + token)
    .build()

  // 接受消息
  room.connection.on('ReceiveMessage', (message: IMessages) => {
    room.msgList.push(message) // 添加到消息集合
    nextTick(() => {
      scrollToBottom() // 滚动到底部
    })
  })

  // 订阅用户集合
  room.connection.on('ReceiveAllUser', (users: IChatUser[]) => {
    //room.users = users
    room.users = Array.from({ length: 50 }).fill(users[0]) as IChatUser[]
  })
  // 订阅用户消息记录
  room.connection.on('ReceiveMessageLog', (msg: IMessages[]) => {
    room.msgList = msg
    nextTick(() => {
      scrollToBottom()
    })
  })
  // 断开服务器连接
  room.connection.onclose(() => {
    room.state = false
    room.users = []
    ElMessage({
      message: '断开服务器连接',
      type: 'warning'
    })
  })
  // 建立连接
  room.connection
    .start()
    .then(function () {
      ElMessage({
        message: '连接到服务器',
        type: 'success'
      })
      room.state = true
      userInfo.userName = localStorage.getItem('userName')
    })
    .catch(function (err) {
      ElMessage.error(err.toString())
    })
}

onMounted(async () => {
  await loginIn(true) // 登录
})

let scrollToBottom = () => {
  console.log('滚动')
  scrollbarRef.value?.setScrollTop(scrollbarRef.value!.wrapRef?.firstElementChild?.clientHeight!)
}

/**
 * 发送消息
 */
let send = async () => {
  if (!userInfo.inputMsg) {
    ElMessage({
      message: '消息不能为空',
      type: 'warning'
    })
    return
  }

  await room.connection?.invoke('SendMessageToAll', userInfo.inputMsg)
  userInfo.inputMsg = ''
}

let loginOut = () => {
  room.connection?.stop()
}

/**
 * 点击头像
 */
let tapAvatar = () => {
  if (room.state) loginOut()
  else loginIn()
}
</script>

<template>
  <div class="container">
    <main style="padding: 50px 90px; display: flex">
      <div style="flex: 3">
        <el-row justify="center">
          <el-col :span="2">
            <el-avatar :size="80" :class="['avatar', room.state ? 'active' : '']" @click="tapAvatar">
              {{ room.state ? userInfo.userName : '请登录' }}
            </el-avatar>
          </el-col>
        </el-row>

        <el-row style="padding: 20px 0">
          <el-col>
            <el-scrollbar ref="scrollbarRef" height="400px" max-height="400px" wrap-class="msgList">
              <p v-for="(item, index) in room.msgList" :key="index" class="scrollbar-demo-item">
                <span>{{ item.SenderName }}</span>
                <span>：{{ item.Content }}</span>
              </p>
            </el-scrollbar>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-input
              class="input"
              input-style="background-color: #4484ba;color:#fff;font-family: '楷体'"
              maxlength="50"
              v-model="userInfo.inputMsg"
              placeholder="消息"
              @keydown.enter="send"
            >
              <template #suffix>
                <el-icon size="20" color="#fff" @click="send" style="cursor: pointer">
                  <i-ep-position></i-ep-position>
                </el-icon>
              </template>
            </el-input>
          </el-col>
        </el-row>
      </div>

      <div style="flex: 1; padding-left: 10px">
        <el-card shadow="always" class="sidebar">
          <template #header>
            <div class="card-header">
              <el-alert
                :closable="false"
                class="sidebar"
                :title="'在线人数' + room.users.length"
                type="info"
                show-icon
              />
            </div>
          </template>
          <el-scrollbar height="400px" max-height="400px">
            <p :key="index" v-for="(item, index) in room.users">{{ item.Name }}</p>
          </el-scrollbar>
        </el-card>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  color: #fff;
  background-color: #e7c66d;
  font-size: 20px;
  &.active {
    background-color: #b8f39d;
    color: #1904ff;
  }
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  height: 100%;
}
:deep(.msgList) {
  filter: drop-shadow(rgb(222, 204, 170) 2px 4px 5px);
  border: 20px solid #ccc;
  width: 100%;
  border-image: url(https://www.runoob.com/images/border.png) 30 30 stretch;
  background-color: rgb(82 83 206 / 20%);
  background-clip: padding-box;
  border-radius: 50px;
}

:deep(.el-input__wrapper) {
  background-color: transparent !important;
}
.container {
  height: 100vh;
  background: #004680; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4484ba, #004680); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4484ba,
    #004680
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.scrollbar-demo-item {
  color: transparent;
  padding: 5px 20px;
  font-size: 13px;
  font-weight: 600;
  background: -webkit-linear-gradient(to right, #4484ba, #004680);
  background: linear-gradient(#c9fdb3e0, #ffffff);
  -webkit-background-clip: text;
  text-shadow: 3px 2px 13px rgb(8 142 105 / 61%);
  font-family: '楷体';
}
</style>
