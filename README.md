# H5 登录功能 Demo

这是前端自动化工作流生成的 H5 登录功能演示项目。

## 功能特性

### 登录页面
- ✅ 用户名/邮箱输入
- ✅ 密码输入（支持显示/隐藏）
- ✅ "记住我" 复选框
- ✅ "忘记密码" 链接
- ✅ 表单验证（非空验证、邮箱格式验证）
- ✅ 加载状态（登录时禁用按钮和输入框）
- ✅ 错误提示（震动动画）
- ✅ 登录成功后自动跳转到首页

### 首页
- ✅ 欢迎信息
- ✅ 用户信息卡片
- ✅ 功能列表（数据统计、任务管理、系统设置）
- ✅ 退出登录功能

### 忘记密码页面
- ✅ 邮箱输入
- ✅ 表单验证
- ✅ 发送重置链接按钮
- ✅ 发送成功提示
- ✅ 返回登录链接

## 技术栈

- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- MSW (Mock Service Worker)

## 安装和运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 进行测试。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 路由说明

- `/` - 首页（需要登录）
- `/login` - 登录页面
- `/forgot-password` - 忘记密码页面

## API 说明

本项目使用 MSW (Mock Service Worker) 模拟后端 API：

### 登录 API
- **URL**: `POST /api/auth/login`
- **参数**:
  - `username`: 用户名或邮箱
  - `password`: 密码
- **响应**:
  ```json
  {
    "success": true,
    "data": {
      "token": "mock_jwt_token_xxx",
      "refreshToken": "mock_refresh_token_xxx",
      "user": {
        "id": 1,
        "name": "测试用户",
        "email": "test@example.com",
        "avatar": "https://example.com/avatar.png"
      }
    }
  }
  ```

### 重置密码 API
- **URL**: `POST /api/auth/reset-password`
- **参数**:
  - `email`: 邮箱地址
- **响应**:
  ```json
  {
    "success": true,
    "message": "重置密码邮件已发送"
  }
  ```

### 获取用户信息 API
- **URL**: `GET /api/user/info`
- **响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "测试用户",
      "email": "test@example.com",
      "avatar": "https://example.com/avatar.png"
    }
  }
  ```

## 静态资源

所有静态资源（Logo、图标）已上传到对象存储（CDN）：

- Logo: `https://coze-coding-project.tos.coze.site/demo/login/logo.png`
- 用户图标: `https://coze-coding-project.tos.coze.site/demo/login/user-icon.png`
- 邮箱图标: `https://coze-coding-project.tos.coze.site/demo/login/email-icon.png`
- 锁图标: `https://coze-coding-project.tos.coze.site/demo/login/lock-icon.png`
- 眼睛图标: `https://coze-coding-project.tos.coze.site/demo/login/eye-icon.png`
- 眼睛闭眼图标: `https://coze-coding-project.tos.coze.site/demo/login/eye-closed-icon.png`

## 项目结构

```
h5-demo/
├── src/
│   ├── pages/
│   │   ├── Login.tsx          # 登录页面
│   │   ├── Login.css          # 登录页面样式
│   │   ├── Home.tsx           # 首页
│   │   └── ForgotPassword.tsx # 忘记密码页面
│   ├── router/
│   │   └── index.tsx          # 路由配置
│   ├── mocks/
│   │   ├── handlers.ts        # Mock 处理器
│   │   └── browser.ts         # 浏览器入口
│   ├── App.tsx                # 应用入口
│   └── main.tsx               # 主入口
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 测试账号

- 用户名: `test@example.com`
- 密码: `password123`

## 注意事项

1. 本项目使用 Mock 服务模拟后端 API，无需真实后端
2. 登录状态保存在 localStorage 中
3. 所有 API 请求都有 300-1000ms 的随机延迟，模拟真实网络环境

## License

MIT
