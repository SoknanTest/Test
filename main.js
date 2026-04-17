import chalk from "chalk";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Create interface
const rl = readline.createInterface({ input, output });

// Utils
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function startGame() {
  console.log(chalk.cyan.bold("\n🎮 Welcome to Guess The Number!"));
  console.log(chalk.gray("I picked a number between 1 and 100."));
  console.log(chalk.gray("Try to guess it!\n"));

  const secret = randomNumber(1, 100);
  let attempts = 0;

  while (true) {
    const answer = await rl.question(
      chalk.yellow("👉 Enter your guess: ")
    );

    const guess = Number(answer);

    if (Number.isNaN(guess)) {
      console.log(chalk.red("❌ Please enter a valid number!\n"));
      continue;
    }

    attempts++;

    if (guess === secret) {
      console.log(
        chalk.green.bold(
          `🎉 Correct! You guessed it in ${attempts} attempts!\n`
        )
      );
      break;
    }

    if (guess > secret) {
      console.log(chalk.blue("📉 Too high!\n"));
    } else {
      console.log(chalk.magenta("📈 Too low!\n"));
    }
  }

  rl.close();
}

// Start
startGame();