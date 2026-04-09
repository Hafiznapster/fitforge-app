export const theme = {
  colors: {
    background: '#0B0D17',
    surface: '#1A1D2D',
    surfaceGlass: 'rgba(26, 29, 45, 0.65)',
    primary: '#6C5CE7',
    primaryHover: '#8174EB',
    secondary: '#00D2D3',
    accent: '#FF41C3',
    text: '#FFFFFF',
    textMuted: '#A0A5B9',
    border: 'rgba(255, 255, 255, 0.08)',
    error: '#FF4757',
    success: '#2ED573',
    warning: '#FFA502',
    // Macros
    protein: '#FF41C3',
    carbs: '#00D2D3',
    fat: '#FFEAA7',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '800' },
    h2: { fontSize: 24, fontWeight: '700' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: '400' },
    caption: { fontSize: 14, fontWeight: '500' },
    small: { fontSize: 12, fontWeight: '500' },
  },
} as const;

export type Theme = typeof theme;
