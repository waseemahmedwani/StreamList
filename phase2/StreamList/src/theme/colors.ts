export const colors = {
  /** Main app background */
  surface: '#131313',
  /** Deepest recessed elements */
  surface_container_lowest: '#0E0E0E',
  /** Section groupings */
  surface_container_low: '#1C1B1B',
  /** Mid-level containers */
  surface_container: '#232323',
  /** Elevated sections, skeleton loading */
  surface_container_high: '#2A2A2A',
  /** Cards, interactive elements */
  surface_container_highest: '#353534',
  /** Hover and pressed states */
  surface_bright: '#3A3939',
  /** Gradient start, light tint */
  primary: '#FFB3AE',
  /** Gradient end, strong accent, active icons */
  primary_container: '#FF5351',
  /** Active chip state, deep red */
  secondary_container: '#822625',
  /** Primary text, never use pure white */
  on_surface: '#E5E2E1',
  /** Secondary metadata text */
  on_surface_variant: '#E4BDBA',
  /** Ghost borders, accessibility only */
  outline_variant: 'rgba(255,255,255,0.15)',
} as const satisfies Record<string, string>;

export type Colors = typeof colors;

export type ColorKey = keyof Colors;
