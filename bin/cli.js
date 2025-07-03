#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import lolcatjs from "@darkobits/lolcatjs";
import { createCommand } from "../lib/commands/create.js";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("../package.json", "utf8"));

// 创建炫酷的彩虹标题
const title = figlet.textSync("SPA CLI", { font: "Standard" });
console.log(lolcatjs.fromString(title));

// 显示彩虹色的欢迎信息
const welcomeText = "🚀 快速创建SPA项目的CLI工具";
console.log(lolcatjs.fromString(welcomeText) + "\n");

// 设置CLI基本信息
program
  .name("spa-cli")
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
