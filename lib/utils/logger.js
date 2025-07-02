import chalk from "chalk";
import lolcatjs from "@darkobits/lolcatjs";

export const logger = {
  info: (message, ...args) => {
    console.log(lolcatjs.fromString(`ℹ️  ${message}`), ...args);
  },

  success: (message, ...args) => {
    console.log(lolcatjs.fromString(`✅ ${message}`), ...args);
  },

  warning: (message, ...args) => {
    console.log(lolcatjs.fromString(`⚠️  ${message}`), ...args);
  },

  error: (message, ...args) => {
    console.error(lolcatjs.fromString(`❌ ${message}`), ...args);
  },

  debug: (message, ...args) => {
    if (process.env.DEBUG) {
      console.log(lolcatjs.fromString(`🐛 ${message}`), ...args);
    }
  },

  // 彩虹效果的特殊方法
  rainbow: (message, ...args) => {
    console.log(lolcatjs.fromString(message), ...args);
  },

  // 项目创建成功的彩虹庆祝消息
  celebration: (message, ...args) => {
    console.log(lolcatjs.fromString(`🎉 ${message}`), ...args);
  },

  // 显示配置摘要的彩虹效果
  configSummary: (title) => {
    console.log(lolcatjs.fromString(`\n📋 ${title}`));
  },

  // 步骤信息的彩虹效果
  step: (message, ...args) => {
    console.log(lolcatjs.fromString(`🔄 ${message}`), ...args);
  },
};
