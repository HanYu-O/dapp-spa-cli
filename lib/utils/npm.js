import { spawn } from "child_process";
import path from "path";
import { logger } from "./logger.js";

export async function installDependencies(projectName) {
  const projectDir = path.join(process.cwd(), projectName);

  return new Promise((resolve, reject) => {
    const npm = spawn("npm", ["install"], {
      cwd: projectDir,
      stdio: "pipe",
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    npm.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    npm.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    npm.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        logger.error(`npm install 失败，退出码: ${code}`);
        if (stderr) {
          logger.error("错误信息:", stderr);
        }
        reject(new Error(`npm install 失败，退出码: ${code}`));
      }
    });

    npm.on("error", (error) => {
      logger.error("启动 npm install 失败:", error.message);
      reject(error);
    });
  });
}

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
