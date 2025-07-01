import chalk from "chalk";

export const logger = {
  info: (message, ...args) => {
    console.log(chalk.blue("ℹ️"), message, ...args);
  },

  success: (message, ...args) => {
    console.log(chalk.green("✅"), message, ...args);
  },

  warning: (message, ...args) => {
    console.log(chalk.yellow("⚠️"), message, ...args);
  },

  error: (message, ...args) => {
    console.error(chalk.red("❌"), message, ...args);
  },

  debug: (message, ...args) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray("🐛"), message, ...args);
    }
  },
};
