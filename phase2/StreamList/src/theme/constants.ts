export interface LinearGradientPoint {
  readonly x: number;
  readonly y: number;
}

export interface PrimaryGradientConfig {
  readonly colors: readonly [string, string];
  readonly start: LinearGradientPoint;
  readonly end: LinearGradientPoint;
}

export const primaryGradient = {
  /** Coral-red gradient — use with react-native-linear-gradient on all CTA buttons */
  colors: ['#FFB3AE', '#FF5351'] as const,
  start: { x: 0, y: 0 } as const satisfies LinearGradientPoint,
  end: { x: 1, y: 1 } as const satisfies LinearGradientPoint,
} as const satisfies PrimaryGradientConfig;

export type PrimaryGradient = typeof primaryGradient;

export interface TabBarGlassmorphismConfig {
  readonly backgroundColor: string;
  readonly blurAmount: number;
}

export const tabBarGlassmorphism = {
  /** Frosted background for the bottom tab bar */
  backgroundColor: 'rgba(35, 35, 35, 0.70)',
  /** Blur strength for glass effect (e.g. BlurView amount) */
  blurAmount: 20,
} as const satisfies TabBarGlassmorphismConfig;

export type TabBarGlassmorphism = typeof tabBarGlassmorphism;
