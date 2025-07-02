# {{PROJECT_NAME}}

一个使用 [SPA CLI](https://github.com/your-username/spa-cli) 创建的最小化单页应用项目。

## 🚀 技术栈

- **React** 18 - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Webpack** 5 - 模块打包工具
- **SWC** - 快速的 TypeScript/JavaScript 编译器

## 🛠️ 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 [http://localhost:3000](http://localhost:3000) 启动开发服务器。

### 生产构建

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

### 启动开发服务器并自动打开浏览器

```bash
npm run serve
```

## 📁 项目结构

```
{{PROJECT_NAME}}/
├── public/           # 静态资源
│   └── index.html   # HTML模板
├── src/             # 源代码
│   ├── App.tsx      # 主组件
│   ├── index.tsx    # 应用入口
│   └── index.css    # 全局样式
├── dist/            # 构建输出 (生成后)
├── webpack.config.js # Webpack配置
├── tsconfig.json    # TypeScript配置
└── package.json     # 项目配置
```

## 🎯 开发指南

### 添加新组件

在 `src/` 目录下创建新的组件文件：

```tsx
// src/components/MyComponent.tsx
import React from "react";

interface Props {
  title: string;
}

const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default MyComponent;
```

### 添加样式

可以直接在组件中导入 CSS 文件：

```tsx
import "./MyComponent.css";
```

### 环境配置

开发环境和生产环境的配置在 `webpack.config.js` 中自动处理。

## 📦 构建优化

生产环境构建自动包含：

- ✅ 代码分割和懒加载
- ✅ CSS 提取和压缩
- ✅ 资源哈希命名
- ✅ Source Map
- ✅ 热更新支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
