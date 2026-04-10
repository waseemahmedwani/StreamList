import type { TextStyle } from 'react-native';

export type TypographyStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'letterSpacing'
>;

export const typography = {
  /** Hero titles — Manrope 56 / 800 / -0.02em → letterSpacing in points */
  display_lg: {
    fontFamily: 'Manrope',
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: 56 * -0.02,
  },
  /** Screen titles like My Watchlist — Manrope 40 / 800 / -0.02em */
  display_md: {
    fontFamily: 'Manrope',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 40 * -0.02,
  },
  /** Section headers like Trending Now — Manrope 28 / 700 / -0.01em */
  headline_md: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 28 * -0.01,
  },
  /** Card titles — Manrope 20 / 600 */
  title_lg: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0,
  },
  /** Buttons and labels — Inter 14 / 600 */
  title_sm: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
  },
  /** Synopsis and body copy — Inter 14 / 400 */
  body_md: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
  },
  /** Metadata like year, genre, rating — Inter 12 / 400 */
  label_sm: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyStyle>;

export type Typography = typeof typography;

export type TypographyToken = keyof Typography;
