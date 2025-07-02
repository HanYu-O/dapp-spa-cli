import inquirer from "inquirer";
import ora from "ora";
import lolcatjs from "@darkobits/lolcatjs";
import { logger } from "../utils/logger.js";
import { createProjectFiles, checkProjectExists } from "../utils/file.js";
import {
  installDependencies,
  getAvailablePackageManager,
} from "../utils/npm.js";

export async function createCommand(projectName, options) {
  try {
    // 1. 验证项目名称
    if (!projectName || projectName.trim() === "") {
      logger.error("项目名称不能为空");
      process.exit(1);
    }

    // 验证项目名称格式
    const projectNameRegex = /^[a-zA-Z0-9-_]+$/;
    if (!projectNameRegex.test(projectName)) {
      logger.error("项目名称只能包含字母、数字、连字符和下划线");
      process.exit(1);
    }

    // 2. 显示准备信息
    logger.step(`🎯 准备创建项目: ${projectName}`);

    // 3. 检查项目目录是否已存在
    const projectExists = await checkProjectExists(projectName);
    if (projectExists) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: lolcatjs.fromString(
            `目录 ${projectName} 已存在，是否覆盖？`
          ),
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.info("已取消创建");
        return;
      }
    }

    // 4. 获取项目配置
    const config = await getProjectConfiguration();
    config.projectName = projectName;

    // 5. 显示配置摘要
    displayConfigSummary(projectName, config);

    // 6. 确认创建
    const { confirmed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: lolcatjs.fromString(`确认创建项目 ${projectName}？`),
        default: true,
      },
    ]);

    if (!confirmed) {
      logger.info("已取消创建");
      return;
    }

    // 7. 检查包管理器是否可用
    if (!options.skipInstall) {
      try {
        const { manager } = await getAvailablePackageManager();
        logger.info(`📦 检测到 ${manager}，将用于安装依赖`);
      } catch (error) {
        logger.warning("未检测到可用的包管理器 (pnpm 或 npm)，将跳过依赖安装");
        options.skipInstall = true;
      }
    }

    // 8. 创建项目文件
    logger.step("正在创建项目文件...");
    const spinner = ora(lolcatjs.fromString("正在创建项目文件...")).start();
    try {
      const projectPath = await createProjectFiles(projectName, config);
      spinner.stop();
      logger.success("项目文件创建完成");
      logger.success(`📁 项目目录: ${projectPath}`);
    } catch (error) {
      spinner.stop();
      logger.error("项目文件创建失败");
      throw error;
    }

    // 9. 安装依赖
    if (!options.skipInstall) {
      logger.step("正在安装依赖...");
      const installSpinner = ora(
        lolcatjs.fromString("正在安装依赖...")
      ).start();
      try {
        await installDependencies(projectName);
        installSpinner.stop();
        logger.success("依赖安装完成");
        logger.success("📦 所有依赖已安装");
      } catch (error) {
        installSpinner.stop();
        logger.error("依赖安装失败");

        // 获取可用的包管理器信息，给出正确的提示
        try {
          const { manager } = await getAvailablePackageManager();
          logger.warning(`依赖安装失败，请手动运行: ${manager} install`);
        } catch {
          logger.warning(
            "依赖安装失败，请手动运行: npm install 或 pnpm install"
          );
        }

        logger.warning(`错误信息: ${error.message}`);
      }
    } else {
      logger.info("⚠️  已跳过依赖安装");
    }

    // 10. 显示完成信息
    await displayCompletionInfo(projectName, config, options);
  } catch (error) {
    logger.error("项目创建失败:", error.message);

    // 调试信息
    if (process.env.DEBUG) {
      logger.debug("错误堆栈:", error.stack);
    }

    process.exit(1);
  }
}

/**
 * 获取项目配置
 */
async function getProjectConfiguration() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: lolcatjs.fromString("选择项目类型:"),
      choices: [
        { name: lolcatjs.fromString("基础 SPA"), value: "minimal-spa" },
        { name: lolcatjs.fromString("完整 SPA"), value: "full-spa" },
      ],
      default: "full-spa",
    },
    {
      type: "confirm",
      name: "useTailwind",
      message: lolcatjs.fromString("是否使用 TailwindCSS?"),
      default: true,
      when: (answers) => answers.template === "full-spa",
    },
    {
      type: "checkbox",
      name: "optionalFeatures",
      message: lolcatjs.fromString("选择可选功能 (多选):\n "),
      choices: [
        { name: lolcatjs.fromString("ESLint + Prettier"), value: "eslint" },
        { name: lolcatjs.fromString("友好错误提示"), value: "friendlyErrors" },
        {
          name: lolcatjs.fromString("Bundle 分析工具"),
          value: "bundleAnalyzer",
        },
        { name: lolcatjs.fromString("构建进度显示"), value: "progressBar" },
      ],
      when: (answers) => answers.template === "full-spa",
    },
  ]);

  // 为不同模板设置默认值
  if (answers.template === "minimal-spa") {
    answers.useTailwind = false;
    answers.useRouter = false;
    answers.optionalFeatures = [];
  } else if (answers.template === "full-spa") {
    // 完整 SPA 默认包含路由
    answers.useRouter = true;
  }

  return answers;
}

/**
 * 显示配置摘要
 */
function displayConfigSummary(projectName, config) {
  logger.configSummary("项目配置摘要");

  logger.info(`  项目名称: ${projectName}`);
  logger.info(
    `  项目类型: ${config.template === "minimal-spa" ? "基础 SPA" : "完整 SPA"}`
  );

  if (config.template === "full-spa") {
    logger.info(`  TailwindCSS: ${config.useTailwind ? "✅" : "❌"}`);
    logger.info(`  路由配置: ✅ (已包含)`);

    if (config.optionalFeatures && config.optionalFeatures.length > 0) {
      logger.info("  可选功能:\n");
      config.optionalFeatures.forEach((feature) => {
        const featureNames = {
          eslint: "ESLint + Prettier",
          friendlyErrors: "友好错误提示",
          bundleAnalyzer: "Bundle 分析工具",
          progressBar: "构建进度显示",
        };
        logger.info(`    ✅ ${featureNames[feature]}`);
      });
    }
  }

  console.log();
}

/**
 * 显示完成信息
 */
async function displayCompletionInfo(projectName, config, options) {
  logger.celebration(`项目 ${projectName} 创建成功!`);

  logger.rainbow("\n💡 下一步:");
  logger.info(`  cd ${projectName}`);

  let manager = "npm";
  try {
    const availablePackageManager = await getAvailablePackageManager();
    manager = availablePackageManager.manager;
  } catch {
    manager = "npm";
  }

  if (options.skipInstall) {
    // 显示正确的包管理器命令
    logger.info(`  ${manager} install         # 安装依赖`);
  }

  if (config.template === "full-spa") {
    logger.info(`  ${manager} run dev         # 启动开发服务器`);
    logger.info(`  ${manager} run build       # 生产环境打包`);
    logger.info(`  ${manager} run serve       # 启动开发服务器并打开浏览器`);

    if (config.optionalFeatures?.includes("bundleAnalyzer")) {
      logger.info(`  ${manager} run analyze     # 分析打包体积`);
    }

    if (config.optionalFeatures?.includes("eslint")) {
      logger.info(`  ${manager} run lint        # 代码质量检查`);
      logger.info(`  ${manager} run lint:fix    # 自动修复代码问题`);
    }

    logger.rainbow("\n🎨 已配置功能:");
    logger.info("  ✅ React + TypeScript");
    logger.info(`  ${config.useTailwind ? "✅" : "❌"} TailwindCSS`);
    logger.info("  ✅ React Router 配置");

    if (config.optionalFeatures?.includes("eslint")) {
      logger.info("  ✅ ESLint + Prettier");
    }
    if (config.optionalFeatures?.includes("friendlyErrors")) {
      logger.info("  ✅ 友好错误提示");
    }
    if (config.optionalFeatures?.includes("bundleAnalyzer")) {
      logger.info("  ✅ Bundle 分析工具");
    }
    if (config.optionalFeatures?.includes("progressBar")) {
      logger.info("  ✅ 构建进度显示");
    }
  } else {
    logger.info(`  ${manager} run dev         # 启动开发服务器`);
    logger.info(`  ${manager} run build       # 生产环境打包`);
    logger.info(`  ${manager} run serve       # 启动开发服务器并打开浏览器`);
  }

  logger.info("\n📚 项目包含:");
  logger.info("  ✅ React 19 + TypeScript");
  logger.info("  ✅ Webpack 5 + SWC");
  logger.info("  ✅ 热更新支持");
  logger.info("  ✅ 生产环境优化");

  if (config.template === "full-spa") {
    logger.info("  ✅ 完整项目架构");
    if (config.useTailwind) {
      logger.info("  ✅ TailwindCSS 集成");
    }
    if (config.useRouter) {
      logger.info("  ✅ React Router 配置");
    }

    // 显示用户选择的可选功能
    if (config.optionalFeatures && config.optionalFeatures.length > 0) {
      config.optionalFeatures.forEach((feature) => {
        const featureDescriptions = {
          eslint: "ESLint + Prettier 代码质量",
          friendlyErrors: "友好错误提示",
          bundleAnalyzer: "Bundle 分析工具",
          progressBar: "构建进度显示",
        };
        logger.info(`  ✅ ${featureDescriptions[feature]}`);
      });
    }
  } else {
    logger.info("  ✅ 最小化配置");
  }

  console.log();
}
