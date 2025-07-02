import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, "../config/templates");

export async function createProjectFiles(projectName, config) {
  const targetDir = path.join(process.cwd(), projectName);

  // 检查目录是否已存在，如果存在则删除
  try {
    await fs.access(targetDir);
    await fs.rm(targetDir, { recursive: true, force: true });
    logger.info(`🗑️  已清理现有目录: ${projectName}`);
  } catch (error) {
    // 目录不存在，正常情况
  }

  // 创建项目目录
  await fs.mkdir(targetDir, { recursive: true });

  // 选择模板目录
  const templateDir = path.join(templatesDir, config.template);

  // 验证模板是否存在
  try {
    await fs.access(templateDir);
  } catch {
    throw new Error(`模板 ${config.template} 不存在`);
  }

  // 复制基础模板文件
  await copyTemplateFiles(templateDir, targetDir, projectName, config);

  // 根据配置生成额外文件
  await generateConfigurationFiles(targetDir, projectName, config);

  logger.info(`📁 项目目录已创建: ${targetDir}`);
  return targetDir;
}

async function copyTemplateFiles(sourceDir, targetDir, projectName, config) {
  try {
    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);

      if (file.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        await copyTemplateFiles(sourcePath, targetPath, projectName, config);
      } else {
        // 判断是否为二进制文件
        const isBinaryFile =
          /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i.test(file.name);

        if (isBinaryFile) {
          // 二进制文件直接复制
          await fs.copyFile(sourcePath, targetPath);
        } else {
          // 文本文件读取内容并替换模板变量
          let content = await fs.readFile(sourcePath, "utf-8");

          // 替换模板变量
          content = replaceTemplateVariables(content, projectName, config);

          await fs.writeFile(targetPath, content);
        }
      }
    }
  } catch (error) {
    throw new Error(`复制模板文件失败: ${error.message}`);
  }
}

/**
 * 替换模板变量
 */
function replaceTemplateVariables(content, projectName, config) {
  let result = content;

  // 基础变量替换
  result = result.replace(/\{\{\s*PROJECT_NAME\s*\}\}/g, projectName);

  // 根据配置替换条件内容
  if (config.template === "full-spa") {
    // 样式系统替换 - CSS导入
    if (config.useTailwind) {
      // 使用 TailwindCSS 样式文件
      result = result.replace(
        /\/\*\s*\{\{CSS_IMPORT\}\}\s*\*\//g,
        'import "./pages-tailwind.css";'
      );
    } else {
      // 使用普通 CSS 样式文件
      result = result.replace(
        /\/\*\s*\{\{CSS_IMPORT\}\}\s*\*\//g,
        'import "./pages.css";'
      );
    }

    // TailwindCSS CSS 导入（用于index.css）
    if (config.useTailwind) {
      result = result.replace(
        /\/\*\s*{{TAILWIND_IMPORT}}\s*\*\//g,
        '@import "tailwindcss";'
      );
    } else {
      result = result.replace(
        /\/\*\s*{{TAILWIND_IMPORT}}\s*\*\//g,
        "/* TailwindCSS 未启用 */"
      );
    }

    // 路由相关
    if (config.useRouter) {
      result = result.replace(
        /\/\*\s*{{ROUTER_IMPORTS}}\s*\*\//g,
        'import { BrowserRouter, useRoutes } from "react-router-dom";'
      );
      result = result.replace(/\/\*\s*{{ROUTER_NAV_START}}\s*\*\//g, "");
      result = result.replace(/\/\*\s*{{ROUTER_NAV_END}}\s*\*\//g, "");
    } else {
      result = result.replace(
        /\/\*\s*{{ROUTER_IMPORTS}}\s*\*\//g,
        "// 路由未启用"
      );
      // 移除路由导航相关代码
      result = result.replace(
        /\s*\/\*\s*{{ROUTER_NAV_START}}[\s\S]*?{{ROUTER_NAV_END}}\s*\*\//g,
        ""
      );
    }
  }

  return result;
}

/**
 * 根据配置生成额外的配置文件
 */
async function generateConfigurationFiles(targetDir, projectName, config) {
  if (config.template === "minimal-spa") {
    return; // 基础 SPA 不需要额外配置
  }

  // 生成 TailwindCSS 配置
  if (config.useTailwind) {
    await generateTailwindConfig(targetDir);
    await generatePostCSSConfig(targetDir);
  }

  // 生成 ESLint + Prettier 配置
  if (config.optionalFeatures?.includes("eslint")) {
    await generateESLintConfig(targetDir);
    await generatePrettierConfig(targetDir);
    await generateTSConfigESLint(targetDir);
  }

  // 更新 webpack 配置
  await updateWebpackConfig(targetDir, config);

  // 更新 package.json
  await updatePackageJson(targetDir, projectName, config);
}

/**
 * 生成 TailwindCSS 配置
 */
async function generateTailwindConfig(targetDir) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
`;

  await fs.writeFile(
    path.join(targetDir, "tailwind.config.js"),
    tailwindConfig
  );
  logger.info("📄 已生成 tailwind.config.js");
}

/**
 * 生成 PostCSS 配置
 */
async function generatePostCSSConfig(targetDir) {
  const postcssConfig = `module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
`;

  await fs.writeFile(path.join(targetDir, "postcss.config.js"), postcssConfig);
  logger.info("📄 已生成 postcss.config.js");
}

/**
 * 生成 ESLint 配置
 */
async function generateESLintConfig(targetDir) {
  const eslintConfig = `{
  "extends": [
    "airbnb-typescript",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "@typescript-eslint", "import"],
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.eslint.json"
  },
  "rules": {}
}
`;

  await fs.writeFile(path.join(targetDir, ".eslintrc"), eslintConfig);
  logger.info("📄 已生成 .eslintrc");

  // 生成 .eslintignore 文件
  const eslintIgnore = `node_modules/
backstop_data/
dist/
docs/
cypress/
config/
tests/
.eslintrc
jest.config.js
webpack.config.js
postcss.config.js
cypress.config.js
tailwind.config.js
`;

  await fs.writeFile(path.join(targetDir, ".eslintignore"), eslintIgnore);
  logger.info("📄 已生成 .eslintignore");
}

/**
 * 生成 Prettier 配置
 */
async function generatePrettierConfig(targetDir) {
  const prettierConfig = `{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "TrailingCooma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
`;

  await fs.writeFile(path.join(targetDir, ".prettierrc"), prettierConfig);
  logger.info("📄 已生成 .prettierrc");
}

/**
 * 生成 TSConfig ESLint
 */
async function generateTSConfigESLint(targetDir) {
  const tsConfigESLint = `{
  "extends": "./tsconfig.json",
  "include": ["**/*.ts", "**/*.tsx", "**/*.js"]
}
`;

  await fs.writeFile(
    path.join(targetDir, "tsconfig.eslint.json"),
    tsConfigESLint
  );
  logger.info("📄 已生成 tsconfig.eslint.json");
}

/**
 * 更新 webpack 配置
 */
async function updateWebpackConfig(targetDir, config) {
  if (config.template !== "full-spa") {
    return; // 只对 full-spa 模板处理
  }

  const webpackConfigPath = path.join(targetDir, "webpack.config.js");
  let webpackContent = await fs.readFile(webpackConfigPath, "utf-8");

  // 同时更新开发环境配置以添加友好错误提示
  const devConfigPath = path.join(targetDir, "config/webpack.development.js");
  let devConfigContent = await fs.readFile(devConfigPath, "utf-8");

  // 处理 TailwindCSS PostCSS 加载器
  if (config.useTailwind) {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{POSTCSS_LOADER\}\}\s*-\s*PostCSS加载器位置（TailwindCSS需要）/g,
      '"postcss-loader"'
    );
  } else {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{POSTCSS_LOADER\}\}\s*-\s*PostCSS加载器位置（TailwindCSS需要）/g,
      "// PostCSS 未启用"
    );
  }

  // 处理可选插件的导入
  let pluginImports = "";
  let devPluginImports = "";

  if (config.optionalFeatures?.includes("progressBar")) {
    pluginImports +=
      'const { ThemedProgressPlugin } = require("themed-progress-plugin");\n';
  }

  if (config.optionalFeatures?.includes("bundleAnalyzer")) {
    pluginImports +=
      'const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");\n';
  }

  if (config.optionalFeatures?.includes("friendlyErrors")) {
    devPluginImports +=
      'const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");\n';
    devPluginImports += 'const notifier = require("node-notifier");\n';
  }

  // 添加主配置文件的插件导入
  if (pluginImports) {
    webpackContent = webpackContent.replace(
      'const { CleanWebpackPlugin } = require("clean-webpack-plugin");',
      `const { CleanWebpackPlugin } = require("clean-webpack-plugin");\n${pluginImports}`
    );
  }

  // 添加开发配置文件的插件导入
  if (devPluginImports) {
    devConfigContent = devConfigContent.replace(
      'const { resolve } = require("path");',
      `const { resolve } = require("path");\n${devPluginImports}`
    );
  }

  // 替换主配置文件中的插件占位符
  if (config.optionalFeatures?.includes("progressBar")) {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{PROGRESS_BAR_PLUGIN\}\}\s*-\s*构建进度显示插件位置/g,
      "    new ThemedProgressPlugin(),"
    );
  } else {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{PROGRESS_BAR_PLUGIN\}\}\s*-\s*构建进度显示插件位置/g,
      ""
    );
  }

  if (config.optionalFeatures?.includes("bundleAnalyzer")) {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{BUNDLE_ANALYZER_PLUGIN\}\}\s*-\s*Bundle分析插件位置/g,
      "    ...(argv.analyze ? [new BundleAnalyzerPlugin()] : []),"
    );
  } else {
    webpackContent = webpackContent.replace(
      /\/\/\s*\{\{BUNDLE_ANALYZER_PLUGIN\}\}\s*-\s*Bundle分析插件位置/g,
      ""
    );
  }

  // 替换开发配置文件中的友好错误提示插件
  if (config.optionalFeatures?.includes("friendlyErrors")) {
    const friendlyErrorsPlugin = `    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["应用运行在 http://localhost:3000"],
      },
      onErrors: function (severity, errors) {
        if (severity !== "error") return;
        const error = errors[0];
        notifier.notify({
          title: "Webpack 构建错误",
          message: severity + ": " + error.name,
          subtitle: error.file || "",
        });
      },
      clearConsole: true,
    }),`;

    devConfigContent = devConfigContent.replace(
      /\/\/\s*\{\{FRIENDLY_ERRORS_PLUGIN\}\}\s*-\s*友好错误提示插件位置/g,
      friendlyErrorsPlugin
    );
  } else {
    devConfigContent = devConfigContent.replace(
      /\/\/\s*\{\{FRIENDLY_ERRORS_PLUGIN\}\}\s*-\s*友好错误提示插件位置/g,
      ""
    );
  }

  // 保存更新后的配置文件
  await fs.writeFile(webpackConfigPath, webpackContent);
  await fs.writeFile(devConfigPath, devConfigContent);
  logger.info("📄 已更新 webpack.config.js");
  logger.info("📄 已更新 webpack.development.js");
}

/**
 * 更新 package.json
 */
async function updatePackageJson(targetDir, projectName, config) {
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

  // 更新项目名称
  packageJson.name = projectName;

  // 根据配置添加依赖和脚本
  if (config.template === "full-spa") {
    // 添加完整 SPA 的依赖
    if (config.useRouter && !packageJson.dependencies["react-router-dom"]) {
      packageJson.dependencies["react-router-dom"] = "^7.6.2";
    }

    if (config.useTailwind) {
      const tailwindDeps = {
        tailwindcss: "^4.1.10",
        "@tailwindcss/postcss": "^4.1.10",
        postcss: "^8.5.6",
        "postcss-loader": "^8.1.1",
      };
      Object.assign(packageJson.devDependencies, tailwindDeps);
    }

    if (config.optionalFeatures?.includes("eslint")) {
      const eslintDeps = {
        "eslint-config-airbnb-typescript": "^18.0.0",
        "@typescript-eslint/eslint-plugin": "^7.18.0",
        "@typescript-eslint/parser": "^7.18.0",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react": "^7.37.5",
        prettier: "^3.5.3",
        "eslint-plugin-prettier": "^5.5.0",
        "eslint-config-prettier": "^10.1.5",
      };
      Object.assign(packageJson.devDependencies, eslintDeps);

      // 添加 lint 脚本
      packageJson.scripts["lint"] = "eslint . --ext .js,.jsx,.ts,.tsx";
      packageJson.scripts["lint:fix"] =
        "eslint . --ext .js,.jsx,.ts,.tsx --fix";
    }

    if (config.optionalFeatures?.includes("bundleAnalyzer")) {
      packageJson.devDependencies["webpack-bundle-analyzer"] = "^4.10.2";
      packageJson.scripts["analyze"] = "webpack --mode production --analyze";
    }

    if (config.optionalFeatures?.includes("friendlyErrors")) {
      packageJson.devDependencies["@soda/friendly-errors-webpack-plugin"] =
        "^1.8.1";
      packageJson.devDependencies["node-notifier"] = "^10.0.1";
    }

    if (config.optionalFeatures?.includes("progressBar")) {
      packageJson.devDependencies["themed-progress-plugin"] = "^1.0.1";
    }
  }

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  logger.info("📄 已更新 package.json");
}

export async function checkProjectExists(projectName) {
  const targetDir = path.join(process.cwd(), projectName);
  try {
    await fs.access(targetDir);
    return true;
  } catch {
    return false;
  }
}
