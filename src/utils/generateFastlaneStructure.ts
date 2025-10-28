import chalk from "chalk";
import fs from "fs";
import path from "path";

export async function generateFastlaneStructure() {
  const fastlaneDir = path.resolve("fastlane");

  if (!fs.existsSync(fastlaneDir)) fs.mkdirSync(fastlaneDir);

  const fastfilePath = path.join(fastlaneDir, "Fastfile");

  fs.writeFileSync(
    fastfilePath,
    `default_platform(:ios)\n\nplatform :ios do\n  desc "Build iOS app"\n  lane :build do\n    puts "Building iOS..."\n  end\nend`,
  );
  console.log(chalk.green("Fastlane structure generated"));
}
