# 一个基于 vite3+，vue3/TypeScript@latest 的项目模板

## 安装依赖

```sh
pnpm install
```



## 开发运行


```sh
pnpm dev
```



## 打包构建

```sh
pnpm build
```



## 单元测试

```sh
pnpm test:unit
```



## e2e测试

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```



## eslint代码检查

```sh
pnpm lint
```
