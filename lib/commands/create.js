import inquirer from "inquirer";
import ora from "ora";
import { logger } from "../utils/logger.js";
import { createProjectFiles, checkProjectExists } from "../utils/file.js";
import { installDependencies, checkNpmAvailable } from "../utils/npm.js";

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

    logger.info(`🎯 准备创建项目: ${projectName}`);

    // 2. 检查项目目录是否已存在
    const projectExists = await checkProjectExists(projectName);
    if (projectExists) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `目录 ${projectName} 已存在，是否覆盖？`,
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.info("已取消创建");
        return;
      }
    }

    // 3. 确认创建项目
    const { confirmed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: `确认创建最小化SPA项目 ${projectName}？`,
        default: true,
      },
    ]);

    if (!confirmed) {
      logger.info("已取消创建");
      return;
    }

    // 4. 检查npm是否可用
    if (!options.skipInstall) {
      const npmAvailable = await checkNpmAvailable();
      if (!npmAvailable) {
        logger.warning("未检测到npm，将跳过依赖安装");
        options.skipInstall = true;
      }
    }

    // 5. 创建项目文件
    const spinner = ora("正在创建项目文件...").start();
    try {
      const projectPath = await createProjectFiles(projectName);
      spinner.succeed("项目文件创建完成");

      logger.success(`📁 项目目录: ${projectPath}`);
    } catch (error) {
      spinner.fail("项目文件创建失败");
      throw error;
    }

    // 6. 安装依赖
    if (!options.skipInstall) {
      const installSpinner = ora("正在安装依赖...").start();
      try {
        await installDependencies(projectName);
        installSpinner.succeed("依赖安装完成");
        logger.success("📦 所有依赖已安装");
      } catch (error) {
        installSpinner.fail("依赖安装失败");
        logger.warning("依赖安装失败，请手动运行: npm install");
        logger.warning(`错误信息: ${error.message}`);
      }
    } else {
      logger.info("⚠️  已跳过依赖安装");
    }

    // 7. 显示完成信息
    logger.success(`\n🎉 项目 ${projectName} 创建成功!`);
    logger.info("\n💡 下一步:");
    logger.info(`  cd ${projectName}`);

    if (options.skipInstall) {
      logger.info("  npm install         # 安装依赖");
    }

    logger.info("  npm run dev         # 启动开发服务器");
    logger.info("  npm run build       # 生产环境打包");
    logger.info("  npm run serve       # 启动开发服务器并打开浏览器");

    logger.info("\n📚 项目包含:");
    logger.info("  ✅ React 18 + TypeScript");
    logger.info("  ✅ Webpack 5 + SWC");
    logger.info("  ✅ 热更新支持");
    logger.info("  ✅ 生产环境优化");
    logger.info("  ✅ 响应式示例代码");
  } catch (error) {
    logger.error("项目创建失败:", error.message);

    // 调试信息
    if (process.env.DEBUG) {
      logger.debug("错误堆栈:", error.stack);
    }

    process.exit(1);
  }
}
