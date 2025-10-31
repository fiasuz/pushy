import chalk from "chalk";
import ora from "ora";
import { ensureFastlane } from "../core/fastlane.js";
import { detectPlatform } from "../utils/detectPlatform.js";
import inquirer from "inquirer";
import { createConfig } from "../utils/createConfig.js";
import { generateFastlaneStructure } from "../utils/generateFastlaneStructure.js";

export async function initCommand() {
  console.log(chalk.cyan("\nStarting Pushy setup...\n"));
  const spinner = ora();

  // Check Fastlane
  await ensureFastlane();

  // Detect project type
  spinner.start("Detecting project type...");
  const platform = await detectPlatform();
  spinner.succeed("Project type detected: " + chalk.cyan(platform.name));

  // Answers
  const answers = await inquirer.prompt([
    { name: "appName", message: "App name:", default: "MyApp", type: "input" },
    {
      name: "bundleId",
      message: "Bundle ID / Package name:",
      default: "uz.mycompany.myawesomeapp",
      type: "input",
    },
  ]);

  await createConfig(platform, answers.appName, answers.bundleId);

  // Generate Fastlane structure
  await generateFastlaneStructure();

  console.log(chalk.bold.cyan("🎉 Pushy initialized successfully!"));
  console.log(
    chalk.gray(
      "Next step: run 'npx pushy build android' or 'npx pushy build ios'\n"
    )
  );
}
