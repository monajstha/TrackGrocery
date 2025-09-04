type RGB = { r: number; g: number; b: number };

export const randomAccessibleColor = ({
  minContrast = 4.5,
  maxTries = 100,
}: { minContrast?: number; maxTries?: number } = {}): string => {
  const srgbToLin = (v: number): number => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const luminance = ({ r, g, b }: RGB): number =>
    0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);

  const hslToRgb = (h: number, s: number, l: number): RGB => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  const rgbToHex = ({ r, g, b }: RGB): string =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

  for (let i = 0; i < maxTries; i++) {
    const h = Math.floor(Math.random() * 360); // 0–359
    const s = Math.floor(35 + Math.random() * 40); // 35–75%
    const l = Math.floor(45 + Math.random() * 25); // 45–70%

    const rgb = hslToRgb(h, s, l);
    const L = luminance(rgb);

    // Contrast vs black (#000)
    const contrast = (L + 0.05) / 0.05;

    if (contrast >= minContrast && L >= 0.18 && L <= 0.9) {
      return rgbToHex(rgb);
    }
  }

  // Fallback safe color
  return '#7fb3d5';
};
