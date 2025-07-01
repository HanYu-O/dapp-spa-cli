# 🚀 DAPP SPA CLI

一个快速创建单页应用(SPA)项目的命令行工具，专为现代前端开发而设计。

[![npm version](https://img.shields.io/npm/v/dapp-spa-cli.svg)](https://www.npmjs.com/package/dapp-spa-cli)
[![license](https://img.shields.io/npm/l/dapp-spa-cli.svg)](https://github.com/your-username/dapp-spa-cli/blob/main/LICENSE)

## ✨ 功能特性

- 🎯 **一键创建**: 快速生成完整的 SPA 项目结构
- ⚡ **现代技术栈**: React 19 + TypeScript + Webpack 5 + SWC
- 🔥 **开箱即用**: 预配置开发服务器、热更新、生产构建
- 📱 **响应式设计**: 包含现代化 UI 和 CSS 样式
- 🛠️ **最佳实践**: 遵循前端开发最佳实践和项目结构
- 📚 **完整文档**: 自动生成项目说明和使用指南

## 📦 安装

### 全局安装

```bash
npm install -g dapp-spa-cli
```

### 从私有仓库安装

```bash
npm install -g dapp-spa-cli --registry http://your-verdaccio-url
```

## 🚀 快速开始

### 创建新项目

```bash
# 创建项目（自动安装依赖）
dapp-spa-cli create my-awesome-app

# 跳过依赖安装
dapp-spa-cli create my-awesome-app --skip-install
```

### 启动开发

```bash
cd my-awesome-app

# 如果之前跳过了依赖安装
npm install

# 启动开发服务器
npm run dev

# 或者启动并自动打开浏览器
npm run serve
```

### 生产构建

```bash
npm run build
```

## 📁 生成的项目结构

```
my-awesome-app/
├── src/                    # 源代码目录
│   ├── index.tsx          # React应用入口
│   ├── App.tsx           # 主组件
│   └── index.css         # 全局样式
├── public/               # 静态资源
│   └── index.html       # HTML模板
├── dist/                # 构建输出目录
├── webpack.config.cjs   # Webpack配置
├── tsconfig.json       # TypeScript配置
├── package.json        # 项目配置
└── README.md          # 项目说明文档
```

## 🎯 技术栈

| 技术           | 版本   | 用途                                |
| -------------- | ------ | ----------------------------------- |
| **React**      | 19.x   | 用户界面库                          |
| **TypeScript** | 5.7.x  | 类型安全的 JavaScript               |
| **Webpack**    | 5.99.x | 模块打包工具                        |
| **SWC**        | 1.12.x | 快速的 TypeScript/JavaScript 编译器 |
| **CSS**        | Native | 样式支持                            |

## 📋 命令选项

### `create` 命令

```bash
dapp-spa-cli create <project-name> [options]
```

**参数:**

- `<project-name>`: 项目名称（必需）

**选项:**

- `--skip-install`: 跳过依赖安装

**示例:**

```bash
# 基本用法
dapp-spa-cli create my-project

# 跳过依赖安装
dapp-spa-cli create my-project --skip-install
```

### 全局选项

```bash
dapp-spa-cli [options]
```

**选项:**

- `-v, --version`: 显示版本号
- `-h, --help`: 显示帮助信息

## 💻 开发体验

生成的项目包含以下开发体验优化：

### 🔥 热更新支持

开发服务器支持热模块替换(HMR)，代码修改后自动刷新浏览器。

### ⚡ 快速构建

使用 SWC 编译器，构建速度比传统的 Babel 快数倍。

### 📦 生产优化

自动包含以下生产环境优化：

- 代码压缩和混淆
- CSS 提取和压缩
- 资源哈希命名
- Source Map 生成

### 📱 响应式设计

内置响应式 CSS 样式，支持移动端和桌面端。

## 🔧 自定义配置

生成的项目支持完全自定义：

### 修改 Webpack 配置

编辑 `webpack.config.cjs` 文件来自定义构建配置。

### 修改 TypeScript 配置

编辑 `tsconfig.json` 文件来调整 TypeScript 编译选项。

### 添加新依赖

```bash
# 添加生产依赖
npm install package-name

# 添加开发依赖
npm install -D package-name
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/your-username/dapp-spa-cli.git
cd dapp-spa-cli

# 安装依赖
npm install

# 本地开发
npm link
dapp-spa-cli create test-project
```

## 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)

## 🔗 相关链接

- [GitHub 仓库](https://github.com/your-username/dapp-spa-cli)
- [问题反馈](https://github.com/your-username/dapp-spa-cli/issues)
- [更新日志](https://github.com/your-username/dapp-spa-cli/releases)

---

如果这个工具对你有帮助，请给个 ⭐ Star 支持一下！
