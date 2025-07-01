#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { createCommand } from "../lib/commands/create.js";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// 显示欢迎信息
console.log(chalk.cyan(figlet.textSync("DAPP SPA CLI", { font: "Standard" })));
console.log(chalk.gray("🚀 快速创建SPA项目的CLI工具\n"));

// 设置CLI基本信息
program
  .name("dapp-spa-cli")
  .version(packageJson.version, "-v, --version", "显示版本号")
  .helpOption("-h, --help", "显示帮助信息");

// 注册create命令
program
  .command("create")
  .description("创建新的SPA项目")
  .argument("<project-name>", "项目名称")
  .option("--skip-install", "跳过依赖安装")
  .action(createCommand);

// 解析命令行参数
program.parse();
