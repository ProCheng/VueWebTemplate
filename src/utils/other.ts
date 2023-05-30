import { setupProdMockServer } from '@/mock/_createProductionServer'

// 是否启动Mock
if (import.meta.env.VITE_Mock === 'true') {
  setupProdMockServer()
}
