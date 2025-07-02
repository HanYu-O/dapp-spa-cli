# {{PROJECT_NAME}}

一个使用 spa-cli 创建的完整 SPA 项目。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动开发服务器并打开浏览器
npm run serve
```

## 📦 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Webpack 5** - 模块打包器
- **SWC** - 快速的 TypeScript/JavaScript 编译器
- **TailwindCSS** - 实用优先的 CSS 框架 (可选)
- **React Router** - 客户端路由 (可选)

## 🏗️ 项目结构

```
src/
├── components/        # 可复用组件
│   └── common/       # 通用组件
├── hooks/            # 自定义钩子
├── layouts/          # 布局组件
├── pages/            # 页面组件
├── routes/           # 路由配置
├── store/            # 状态管理
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── App.tsx           # 主应用组件
├── index.tsx         # 应用入口
└── index.css         # 全局样式
```

## 🛠️ 开发工具

### 代码质量 (可选)

- **ESLint** - 代码规范检查
- **Prettier** - 代码格式化

```bash
npm run lint          # 检查代码质量
npm run lint:fix      # 自动修复代码问题
```

### 性能分析 (可选)

```bash
npm run analyze       # 分析打包体积
```

### 开发优化

- **热更新** - 代码修改后自动刷新
- **友好错误提示** - 清晰的错误信息 (可选)
- **构建进度** - 可视化构建进度 (可选)

## 🎨 样式方案

### 使用 TailwindCSS (如果启用)

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">Hello TailwindCSS!</div>
```

### 使用 CSS 类

```tsx
<div className="card">
  <h2>标题</h2>
  <button className="btn btn-primary">按钮</button>
</div>
```

## 🧭 路由配置 (如果启用)

项目使用 React Router 进行客户端路由：

```tsx
// 路由配置示例
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

## 📁 别名配置

项目配置了路径别名，方便导入：

```tsx
import Component from "@components/Component";
import { useCustomHook } from "@hooks/useCustomHook";
import { ApiType } from "@types/api";
import { formatDate } from "@utils/date";
```

## 🔧 自定义配置

### Webpack 配置

- `webpack.config.cjs` - Webpack 主配置文件

### TypeScript 配置

- `tsconfig.json` - TypeScript 编译配置
- `tsconfig.eslint.json` - ESLint TypeScript 配置 (可选)

### 样式配置

- `tailwind.config.js` - TailwindCSS 配置 (可选)
- `postcss.config.js` - PostCSS 配置 (可选)

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含所有生产文件，可以部署到任何静态文件服务器。

### 推荐部署平台

- **Vercel** - 零配置部署
- **Netlify** - 静态站点托管
- **GitHub Pages** - 免费静态托管
- **AWS S3** + CloudFront - 企业级部署

## 📖 更多资源

- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Webpack 文档](https://webpack.js.org)
- [TailwindCSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎提交 issue 和 pull request！

## �� 许可证

MIT License
