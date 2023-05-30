import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('./**/*.ts', { eager: true, import: 'default' })
const mockModules: any[] = []

Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...(modules[key] as any))
})
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
