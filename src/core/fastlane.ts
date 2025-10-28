import { execa } from "execa";
import inquirer from "inquirer";
import which from "which";

export async function ensureFastlane() {
  const fastlaneExists = await which("fastlane").catch(() => false);
  if (fastlaneExists) return true;

  const { install } = await inquirer.prompt([
    {
      type: "confirm",
      name: "install",
      message:
        "Fastlane not found. Would you like to install Fastlane globally now?",
      default: true,
    },
  ]);

  if (!install) {
    console.log("Fastlane is required to upload builds. Exiting...");
    process.exit(1);
  }

  console.log("Installing Fastlane...");

  if (process.platform === "darwin") {
    await execa("brew", ["install", "fastlane"], { stdio: "inherit" });
  } else if (process.platform === "win32") {
    await execa("gem", ["install", "fastlane"], { stdio: "inherit" });
  } else {
    console.log("Your system is not supporting on current version. Exiting...");
    process.exit(1);
  }

  console.log("Fastlane installed successfully!");
}

export async function uploadToGooglePlay(
  aabPath: string,
  serviceKey: string,
  packageName: string,
) {
  await execa(
    "fastlane",
    [
      "supply",
      "--aab",
      aabPath,
      "--json_key",
      serviceKey,
      "--package_name",
      packageName,
      "--track",
      "internal",
    ],
    { stdio: "inherit" },
  );
}

export async function uploadToAppStore(
  ipaPath: string,
  apiKeyPath: string,
  bundleId: string,
) {
  await execa(
    "fastlane",
    [
      "deliver",
      "--ipa",
      ipaPath,
      "--app_identifier",
      bundleId,
      "--api_key_path",
      apiKeyPath,
      "--skip_screenshots",
      "true",
      "--skip_metadata",
      "true",
    ],
    { stdio: "inherit" },
  );
}
