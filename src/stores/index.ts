import { createPinia } from 'pinia'
//https://github.com/prazdevs/pinia-plugin-persistedstate 本地数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()

store.use(piniaPluginPersistedstate)
export default store
