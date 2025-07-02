import { spawn } from "child_process";
import path from "path";
import { logger } from "./logger.js";

/**
 * 检查 pnpm 是否可用
 */
export async function checkPnpmAvailable() {
  return new Promise((resolve) => {
    const pnpm = spawn("pnpm", ["--version"], {
      stdio: "pipe",
      shell: true,
    });

    pnpm.on("close", (code) => {
      resolve(code === 0);
    });

    pnpm.on("error", () => {
      resolve(false);
    });
  });
}

/**
 * 检查 npm 是否可用
 */
export async function checkNpmAvailable() {
  return new Promise((resolve) => {
    const npm = spawn("npm", ["--version"], {
      stdio: "pipe",
      shell: true,
    });

    npm.on("close", (code) => {
      resolve(code === 0);
    });

    npm.on("error", () => {
      resolve(false);
    });
  });
}

/**
 * 获取可用的包管理器 (优先 pnpm)
 */
export async function getAvailablePackageManager() {
  const isPnpmAvailable = await checkPnpmAvailable();
  if (isPnpmAvailable) {
    return { manager: "pnpm", command: "pnpm" };
  }

  const isNpmAvailable = await checkNpmAvailable();
  if (isNpmAvailable) {
    return { manager: "npm", command: "npm" };
  }

  throw new Error("未找到可用的包管理器 (pnpm 或 npm)");
}

/**
 * 安装依赖 (优先使用 pnpm)
 */
export async function installDependencies(projectName) {
  const projectDir = path.join(process.cwd(), projectName);

  try {
    const { manager, command } = await getAvailablePackageManager();

    logger.info(`📦 使用 ${manager} 安装依赖...`);

    return new Promise((resolve, reject) => {
      const packageManager = spawn(command, ["install"], {
        cwd: projectDir,
        stdio: "pipe",
        shell: true,
      });

      let stdout = "";
      let stderr = "";

      packageManager.stdout?.on("data", (data) => {
        stdout += data.toString();
      });

      packageManager.stderr?.on("data", (data) => {
        stderr += data.toString();
      });

      packageManager.on("close", (code) => {
        if (code === 0) {
          logger.success(`✅ ${manager} 依赖安装完成`);
          resolve();
        } else {
          logger.error(`${manager} install 失败，退出码: ${code}`);
          if (stderr) {
            logger.error("错误信息:", stderr);
          }
          reject(new Error(`${manager} install 失败，退出码: ${code}`));
        }
      });

      packageManager.on("error", (error) => {
        logger.error(`启动 ${manager} install 失败:`, error.message);
        reject(error);
      });
    });
  } catch (error) {
    logger.error("包管理器检查失败:", error.message);
    throw error;
  }
}
