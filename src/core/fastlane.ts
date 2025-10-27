import { execa } from "execa";
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
