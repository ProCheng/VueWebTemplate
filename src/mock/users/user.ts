import { type MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, type requestParams } from '@/mock/util'

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      console.log('----请求了getUserInfo---')
      return resultSuccess({
        name: '章三',
        age: 40,
        sex: '男'
      })
    }
  }
] as MockMethod[]
