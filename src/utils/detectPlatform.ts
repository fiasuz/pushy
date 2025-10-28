import fs from "fs";

export interface PlatformInfo {
  name: "react-native" | "expo" | "flutter" | "unknown";
  buildCommand:
    | {
        android: string;
        ios: string;
      }
    | undefined;
  buildResult:
    | {
        android: string;
        ios: string;
      }
    | undefined;
}

export async function detectPlatform(): Promise<PlatformInfo> {
  if (fs.existsSync("android") && fs.existsSync("ios")) {
    return {
      name: "react-native",
      buildCommand: {
        android: "cd android && ./gradlew assembleRelease",
        ios: "cd ../ios && xcodebuild -scheme <YourScheme> -configuration Release",
      },
      buildResult: {
        android: "android/app/build/outputs/bundle/release/app-release.aab",
        ios: "ios/build/Release-iphoneos/MyApp.ipa",
      },
    };
  }
  if (fs.existsSync("pubspec.yaml")) {
    return {
      name: "flutter",
      buildCommand: {
        android: "flutter build apk",
        ios: "flutter build ios",
      },
      buildResult: {
        android: "build/app/outputs/bundle/release/app-release.aab",
        ios: "build/ios/ipa/Runner.ipa",
      },
    };
  }
  return {
    name: "unknown",
    buildCommand: undefined,
    buildResult: undefined,
  };
}
