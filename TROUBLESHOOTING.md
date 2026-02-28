# H5 Demo 故障排查指南

## 常见问题

### 1. 启动服务后无法找到页面

**问题描述**: 访问 `http://localhost:5173` 时显示 404 或空白页

**原因**:
- 路由配置不正确
- 未正确安装依赖
- Mock 服务未启动

**解决方案**:

#### 方案 1: 重新拉取最新代码
```bash
cd h5-demo
git pull origin master
npm install
npm run dev
```

#### 方案 2: 清除缓存并重新安装
```bash
cd h5-demo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 方案 3: 检查路由配置
确保 `src/router/index.tsx` 中的路由配置正确：
```tsx
export const router = createBrowserRouter([
  { path: '/', element: <Login /> },      // 默认路径指向登录页
  { path: '/login', element: <Login /> }, // 登录页
  { path: '/home', element: <Home /> },  // 首页
  { path: '/forgot-password', element: <ForgotPassword /> } // 忘记密码页
])
```

### 2. 登录后跳转失败

**问题描述**: 登录成功后无法跳转到首页

**原因**:
- 路由路径不匹配
- Login.tsx 中的跳转路径与路由配置不一致

**解决方案**:
确保 `src/pages/Login.tsx` 中的跳转路径正确：
```tsx
// 登录成功后跳转到首页
navigate('/home')  // 注意是 /home，不是 /
```

### 3. Mock 服务未启动

**问题描述**: API 请求失败，控制台显示网络错误

**原因**:
- Mock 服务未正确导入
- MSW 未安装

**解决方案**:

#### 检查 MSW 是否安装
```bash
npm list msw
```

如果没有安装，运行：
```bash
npm install msw --save-dev
```

#### 检查 main.tsx 中的 Mock 配置
确保 `src/main.tsx` 中正确配置了 Mock：
```tsx
if (import.meta.env.DEV) {
  const { setupWorker } = await import('msw/browser')
  const { handlers } = await import('./mockHandlers')
  const worker = setupWorker(...handlers)
  await worker.start({
    onUnhandledRequest: 'bypass'
  })
}
```

#### 检查 mockHandlers.ts
确保 `src/mockHandlers.ts` 文件存在并导出 handlers：
```tsx
export const handlers = [
  rest.post('/api/auth/login', ...),
  rest.post('/api/auth/forgot-password', ...)
]
```

### 4. 样式丢失

**问题描述**: 页面没有样式，显示为纯文本

**原因**:
- CSS 文件未正确导入
- 样式文件路径错误

**解决方案**:

#### 检查 CSS 导入
确保在页面组件中正确导入了 CSS：
```tsx
import './Login.css'  // 在 Login.tsx 中
```

#### 检查 CSS 文件路径
确保 CSS 文件在正确的位置：
```
src/pages/
  ├── Login.tsx

### 3. 静态资源无法加载

**问题描述**: Logo 和图标无法显示，显示为破损的图片图标

**原因**:
- 静态资源文件不存在
- 文件路径错误
- 浏览器缓存问题

**解决方案**:

#### 检查静态资源文件是否存在
```bash
ls -la public/images/
```

应该看到以下文件：
- icon-email.svg
- icon-eye-closed.svg
- icon-eye.svg
- icon-lock.svg
- logo.svg

#### 检查代码引用路径
确保使用的是本地路径，不是外部 URL：
```tsx
// ✅ 正确 - 使用本地路径
src="/images/logo.svg"

// ❌ 错误 - 不要使用外部 CDN（可能 403）
src="https://coze-coding-project.tos.coze.site/demo/login/logo.png"
```

#### 清除浏览器缓存
1. 打开浏览器开发者工具（F12）
2. 右键点击刷新按钮
3. 选择"清空缓存并硬性重新加载"

#### 检查网络请求
在开发者工具的 Network 标签页中：
1. 刷新页面
2. 查找 SVG 图片请求
3. 确保状态码是 200（成功）
4. 如果是 404，检查文件名和路径是否正确

### 4. Mock 服务未启动

  ├── Login.css
  ├── Home.tsx
  └── ForgotPassword.tsx
```

### 5. 静态资源加载失败

**问题描述**: Logo 和图标无法显示

**原因**:
- CDN 资源 URL 错误
- 网络问题

**解决方案**:

#### 检查资源 URL
确保 CDN URL 正确：
```tsx
src="https://coze-coding-project.tos.coze.site/demo/login/logo.png"
```

#### 使用本地资源
如果 CDN 访问有问题，可以下载资源到本地 `public/` 目录：
```bash
# 创建 public 目录
mkdir -p public/images

# 下载资源到本地
curl -o public/images/logo.png https://coze-coding-project.tos.coze.site/demo/login/logo.png
```

然后修改代码引用：
```tsx
src="/images/logo.png"
```

### 6. TypeScript 编译错误

**问题描述**: 启动时显示 TypeScript 类型错误

**原因**:
- TypeScript 配置问题
- 依赖版本不兼容

**解决方案**:

#### 清除 TypeScript 缓存
```bash
rm -rf node_modules/.cache
npm run dev
```

#### 检查 TypeScript 版本
```bash
npm list typescript
```

如果版本过低，更新：
```bash
npm install typescript@latest --save-dev
```

### 7. 端口被占用

**问题描述**: 启动时显示端口 5173 已被占用

**解决方案**:

#### 方案 1: 使用其他端口
```bash
npm run dev -- --port 5174
```

#### 方案 2: 杀死占用端口的进程
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 完整的启动流程

### 1. 克隆仓库（如果是第一次）
```bash
git clone https://github.com/xll-gif/h5-demo.git
cd h5-demo
```

### 2. 拉取最新代码
```bash
git pull origin master
```

### 3. 安装依赖
```bash
npm install
```

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 访问应用
打开浏览器访问 `http://localhost:5173`

### 6. 测试登录功能
- 邮箱: `test@example.com`
- 密码: `password123`

## 获取帮助

如果以上方法都无法解决问题，请：

1. **检查控制台错误**: 打开浏览器开发者工具（F12），查看 Console 标签页的错误信息
2. **查看网络请求**: 在开发者工具的 Network 标签页中，查看 API 请求是否成功
3. **查看构建日志**: 检查终端中的构建错误信息
4. **提交 Issue**: 在 GitHub 仓库提交 Issue，附上错误信息和截图

## 最新修复记录

### 2026-02-28
- ✅ 修复路由配置问题：添加 /home 路径
- ✅ 修复 ForgotPassword.tsx 的 Mock 导入问题
- ✅ 统一 API 调用方式
- ✅ 更新 README 文档

## 版本信息

- Node.js: >= 14.x
- npm: >= 6.x
- React: 18.x
- TypeScript: 5.x
- Vite: 5.x
