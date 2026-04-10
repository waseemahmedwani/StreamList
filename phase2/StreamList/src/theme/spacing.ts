export const spacing = {
  /** Tight internal padding */
  xs: 4,
  /** Component internal gaps */
  sm: 8,
  /** Standard section padding */
  md: 16,
  /** Section spacing */
  lg: 24,
  /** Large section gaps */
  xl: 32,
  /** Screen level spacing */
  xxl: 48,
} as const satisfies Record<string, number>;

export type Spacing = typeof spacing;

export type SpacingKey = keyof Spacing;
