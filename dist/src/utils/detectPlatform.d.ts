export interface PlatformInfo {
    name: "react-native" | "expo" | "flutter" | "unknown";
    buildCommand: {
        android: string;
        ios: string;
    } | undefined;
    buildResult: {
        android: string;
        ios: string;
    } | undefined;
}
export declare function detectPlatform(): Promise<PlatformInfo>;
//# sourceMappingURL=detectPlatform.d.ts.map