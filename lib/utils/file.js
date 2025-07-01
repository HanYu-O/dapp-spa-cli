import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, "../config/templates/minimal-spa");

export async function createProjectFiles(projectName) {
  const targetDir = path.join(process.cwd(), projectName);

  // 检查目录是否已存在
  try {
    await fs.access(targetDir);
    throw new Error(`目录 ${projectName} 已存在`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  // 创建项目目录
  await fs.mkdir(targetDir, { recursive: true });

  // 复制模板文件
  await copyTemplateFiles(templatesDir, targetDir, projectName);

  logger.info(`📁 项目目录已创建: ${targetDir}`);
  return targetDir;
}

async function copyTemplateFiles(sourceDir, targetDir, projectName) {
  try {
    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);

      if (file.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        await copyTemplateFiles(sourcePath, targetPath, projectName);
      } else {
        let content = await fs.readFile(sourcePath, "utf-8");

        // 替换模板变量
        content = content.replace(/\{\{\s*PROJECT_NAME\s*\}\}/g, projectName);

        await fs.writeFile(targetPath, content);
      }
    }
  } catch (error) {
    throw new Error(`复制模板文件失败: ${error.message}`);
  }
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
