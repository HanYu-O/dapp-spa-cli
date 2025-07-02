# 🚀 SPA CLI

一个功能强大的前端脚手架工具，专为快速创建现代单页应用(SPA)而设计。支持多种项目类型和可选功能，提供极致的开发体验。

[![npm version](https://img.shields.io/npm/v/spa-cli.svg)](https://www.npmjs.com/package/spa-cli)
[![license](https://img.shields.io/npm/l/spa-cli.svg)](https://github.com/your-username/spa-cli/blob/main/LICENSE)

## ✨ 功能特性

### 🎯 **多项目类型支持**

- **基础 SPA**: 最小化配置，快速启动
- **完整 SPA**: 企业级功能，包含完整开发工具链

### 🎨 **可选技术栈**

- **TailwindCSS**: 可选的原子化 CSS 框架
- **React Router**: 现代化路由解决方案（完整 SPA 自动包含）
- **ESLint + Prettier**: 代码质量和格式化工具
- **开发增强**: 友好错误提示、Bundle 分析、构建进度显示

### 🌈 **极致用户体验**

- **炫酷界面**: 全彩虹效果的命令行界面
- **交互式配置**: 智能的项目配置向导
- **即时反馈**: 实时构建状态和错误提示

### ⚡ **现代技术栈**

- React 19 + TypeScript + Webpack 5 + SWC
- 开箱即用的开发服务器和热更新
- 生产级别的构建优化和代码分割

## 📦 安装

### 全局安装

```bash
npm install -g spa-cli
# 或者
pnpm add -g spa-cli
```

### 从私有仓库安装

```bash
npm install -g spa-cli --registry http://your-verdaccio-url
```

## 🚀 快速开始

### 创建新项目

```bash
spa-cli create my-awesome-app
```

### 交互式配置体验

当你运行创建命令时，会看到炫酷的彩虹界面引导你完成配置：

```
🌈 准备创建项目：my-awesome-app
✨ 选择项目类型：完整 SPA
🎨 是否使用 TailwindCSS？Yes
🔧 选择可选功能（多选）：
  💡 使用空格键选择，回车键确认
  ◯ ESLint + Prettier (代码质量)
  ◯ 友好错误提示 (开发体验)
  ◯ Bundle 分析器 (性能优化)
  ◯ 构建进度显示 (状态提示)

📋 项目配置摘要
ℹ️   项目名称：my-awesome-app
ℹ️   项目类型：完整 SPA
ℹ️   TailwindCSS：✅
ℹ️   路由配置：✅ (已包含)
```

### 启动开发

```bash
cd my-awesome-app

# 启动开发服务器
npm run client:server

# 生产构建
npm run client:prod

# 代码检查
npm run lint
```

## 📁 项目结构

### 基础 SPA 结构

```
my-project/
├── src/
│   ├── index.tsx          # React应用入口
│   ├── App.tsx           # 主组件
│   └── index.css         # 全局样式
├── public/
│   ├── favicon.ico       # 网站图标
│   └── index.html       # HTML模板
├── webpack.config.js     # Webpack配置
├── tsconfig.json        # TypeScript配置
└── package.json         # 项目配置
```

### 完整 SPA 结构

```
my-project/
├── src/
│   ├── components/       # 可复用组件
│   │   └── common/
│   │       └── Header.tsx
│   │   └── App.tsx
│   │   └── Home.tsx
│   │   └── About.tsx
│   ├── routes/          # 路由配置
│   │   └── index.tsx
│   ├── store/           # 状态管理
│   ├── types/           # TypeScript类型
│   ├── utils/           # 工具函数
│   ├── index.tsx        # 应用入口
│   ├── index.css        # 基础样式
│   ├── pages.css        # 页面样式
│   └── pages-tailwind.css # TailwindCSS样式
├── config/              # 配置文件
│   ├── webpack.development.js
│   └── webpack.production.js
├── public/
│   ├── favicon.ico
│   └── index.html
└── 配置文件...
```

## 🎯 技术栈详情

### 核心技术

| 技术           | 版本   | 用途                                |
| -------------- | ------ | ----------------------------------- |
| **React**      | 19.1.x | 现代化用户界面库                    |
| **TypeScript** | 5.7.x  | 类型安全的 JavaScript               |
| **Webpack**    | 5.99.x | 模块打包和构建工具                  |
| **SWC**        | 1.12.x | 高性能 TypeScript/JavaScript 编译器 |

### 可选技术

| 技术             | 用途             |
| ---------------- | ---------------- |
| **TailwindCSS**  | 原子化 CSS 框架  |
| **React Router** | 单页应用路由管理 |
| **ESLint**       | 代码质量检查     |
| **Prettier**     | 代码格式化       |
| **Immer**        | 不可变状态管理   |
| **Lucide React** | 现代化图标库     |

## 🔧 项目类型对比

### 基础 SPA

- ✅ 最小化配置，快速启动
- ✅ 适合简单项目和原型开发
- ✅ React + TypeScript + Webpack 核心栈
- ✅ 可选 TailwindCSS 支持

### 完整 SPA

- ✅ 企业级项目架构
- ✅ 完整的开发工具链
- ✅ 现代化页面和组件
- ✅ 内置路由和状态管理方案
- ✅ 可选开发增强功能

## 💡 TailwindCSS 智能适配

我们采用了独特的**双 CSS 文件方案**来解决 TailwindCSS 的可选集成问题：

### 统一组件设计

所有组件使用语义化 CSS 类名：

```tsx
<div className="home-container">
  <div className="features-grid">
    <div className="feature-card">{/* 内容 */}</div>
  </div>
</div>
```

### 智能样式切换

- **选择 TailwindCSS**: 导入 `pages-tailwind.css`（使用@apply 指令）
- **不使用 TailwindCSS**: 导入 `pages.css`（使用普通 CSS）

两套样式文件实现完全相同的视觉效果，确保无论是否选择 TailwindCSS 都能获得一致的用户体验。

## 📋 命令参考

### `create` 命令

```bash
spa-cli create <project-name> [options]
```

**参数:**

- `<project-name>`: 项目名称（必需）

**选项:**

- `--skip-install`: 跳过依赖安装

**示例:**

```bash
# 基本用法（推荐）
spa-cli create my-project

# 跳过依赖安装
spa-cli create my-project --skip-install
```

### 全局选项

```bash
spa-cli [options]
```

**选项:**

- `-v, --version`: 显示版本号
- `-h, --help`: 显示帮助信息

## 🛠️ 开发体验

### 🔥 热更新支持

- 完整的热模块替换(HMR)
- 保持组件状态的快速刷新
- CSS 样式实时更新

### ⚡ 极速构建

- SWC 编译器提供极致性能
- 构建速度比 Babel 快 5-10 倍
- 开发环境秒级启动

### 📊 构建优化

生产环境自动包含：

- 代码压缩和 Tree Shaking
- CSS 提取和压缩优化
- 资源哈希和缓存策略
- Source Map 和 Bundle 分析

### 🎨 现代化 UI

- 渐变背景和毛玻璃效果
- 响应式网格布局
- 优雅的过渡动画
- 移动端适配

## 🔧 自定义配置

### Webpack 配置

根据项目类型，配置文件位置不同：

**基础 SPA**: 编辑 `webpack.config.js`
**完整 SPA**: 编辑 `config/webpack.development.js` 和 `config/webpack.production.js`

### TypeScript 配置

编辑 `tsconfig.json` 调整编译选项，项目已预配置路径别名：

```json
{
  "paths": {
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
    "@pages/*": ["src/pages/*"],
    "@hooks/*": ["src/hooks/*"]
  }
}
```

### 添加依赖

```bash
# 生产依赖
npm install package-name

# 开发依赖
npm install -D package-name

# 使用pnpm（推荐）
pnpm add package-name
pnpm add -D package-name
```

## 🎪 最佳实践

### 组件开发

- 使用函数组件和 Hooks
- 合理使用 memo 和 useMemo 优化性能
- 采用组合模式而非继承

### 状态管理

- 小型项目使用 Context + useReducer
- 复杂状态使用 useImmer 简化更新逻辑
- 异步状态考虑使用 SWR 或 React Query

### 样式管理

- 优先使用 CSS Modules 或 styled-components
- TailwindCSS 适合快速原型和工具类
- 保持样式的可维护性和可扩展性

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/your-username/spa-cli.git
cd spa-cli

# 安装依赖
pnpm install

# 本地开发测试
pnpm link --global
spa-cli create test-project
```

### 测试流程

1. 测试基础 SPA 创建
2. 测试完整 SPA 创建
3. 验证 TailwindCSS 集成
4. 检查可选功能
5. 确认构建和开发服务器

## 📈 版本规划

- **v1.0**: 基础 SPA 模板，核心功能
- **v2.0**: 完整 SPA 模板，可选功能 ✅ **当前版本**
- **v3.0**: 测试工具集成，Husky Git 钩子
- **v4.0**: Dapp 功能，Web3 集成，智能合约支持

## 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)

## 🔗 相关链接

- [开发指南](./DAPP_SPA_CLI开发指南.md)
- [架构文档](./架构指南_SPA_250617.md)
- [私仓发布指南](./verdaccio私仓发布指南.md)

---

**🌟 如果这个项目对你有帮助，请给个 Star！**
