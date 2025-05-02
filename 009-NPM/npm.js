// npm
import chalk from "chalk";


chalk.level = 3; // 0 = no colors, 1 = basic colors, 2 = medium colors, 3 = true color (16 million colors)
console.log(chalk.red("Hello") + chalk.bgGreen(" World") + chalk.blue("!")); // Hello World!
console.log(chalk.red("Hello") + chalk.bgCyan(" World") + chalk.blue("!")); // Hello World!
console.log(chalk.red("Hello") + " World" + chalk.magenta("!")); // Hello World!