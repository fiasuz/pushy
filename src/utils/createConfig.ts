import fs from "fs";
import path from "path";
import type { PlatformInfo } from "./detectPlatform.js";
import chalk from "chalk";

export async function createConfig(
  platformCredentials: PlatformInfo,
  appName: string,
  bundleId: string,
) {
  if (platformCredentials.name === "unknown") {
    return null;
  }

  const config = {
    projectName: appName || "MyApp",
    version: "1.0.0",

    platforms: ["android", "ios"],

    build: {
      android: {
        command: platformCredentials.buildCommand?.android || "",
        output: platformCredentials.buildResult?.android || "",
      },
      ios: {
        command: platformCredentials.buildCommand?.ios || "",
        output: platformCredentials.buildResult?.ios || "",
      },
    },

    googlePlay: {
      serviceAccountKeyPath: "./keys/google-play-key.json",
      packageName: bundleId || "uz.mycompany.myawesomeapp",
    },

    appStore: {
      apiKeyPath: "./keys/AuthKey_ABC123XYZ.p8",
      keyId: "ABC123XYZ",
      issuerId: "12345678-90ab-cdef-1234-567890abcdef",
      bundleId: bundleId || "uz.mycompany.myawesomeapp",
      teamId: "ABCD1234",
    },

    notifications: {
      telegram: {
        enabled: false,
        messageTemplate:
          "🚀 New version *{{version}}* of *{{projectName}}* has been uploaded successfully to *{{platform}}!*",
      },
    },
  };

  const filePath = path.join(process.cwd(), "pushy.config.json");
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  console.log(chalk.green("pushy.config.json created successfully."));
}
