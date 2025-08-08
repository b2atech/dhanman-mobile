/**
 * Test suite for Sigma theme implementation
 */

interface SigmaTheme {
  name: string;
  displayName: string;
  colors: Record<string, string>;
  typography: Record<string, any>;
  spacing: Record<string, number>;
  layout: Record<string, any>;
  components: Record<string, any>;
  gradients: Record<string, any>;
}

interface SigmaPalette {
  [key: string]: string;
}

describe('Sigma Theme', () => {
  let sigmaTheme: SigmaTheme;
  let sigmaPalette: SigmaPalette;

  beforeAll(() => {
    // Import the sigma theme files
    sigmaTheme = require('../theme/palettes/sigma.js').default;
    sigmaPalette = require('../theme/colors/sigmaPalette.js').sigmaPalette;
  });

  describe('Theme Structure', () => {
    test('should have correct theme metadata', () => {
      expect(sigmaTheme.name).toBe('sigma');
      expect(sigmaTheme.displayName).toBe('Sigma');
    });

    test('should have all required theme properties', () => {
      expect(sigmaTheme).toHaveProperty('colors');
      expect(sigmaTheme).toHaveProperty('typography');
      expect(sigmaTheme).toHaveProperty('spacing');
      expect(sigmaTheme).toHaveProperty('layout');
      expect(sigmaTheme).toHaveProperty('components');
      expect(sigmaTheme).toHaveProperty('gradients');
    });
  });

  describe('Sigma Palette Colors', () => {
    test('should have complete primary color range (50-950)', () => {
      const primaryShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      primaryShades.forEach((shade: number) => {
        expect(sigmaPalette[`primary${shade}`]).toBeDefined();
        expect(sigmaPalette[`primary${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have complete secondary color range (50-950)', () => {
      const secondaryShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      secondaryShades.forEach((shade: number) => {
        expect(sigmaPalette[`secondary${shade}`]).toBeDefined();
        expect(sigmaPalette[`secondary${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have complete success color range (50-950)', () => {
      const successShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      successShades.forEach((shade: number) => {
        expect(sigmaPalette[`success${shade}`]).toBeDefined();
        expect(sigmaPalette[`success${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have complete warning color range (50-950)', () => {
      const warningShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      warningShades.forEach((shade: number) => {
        expect(sigmaPalette[`warning${shade}`]).toBeDefined();
        expect(sigmaPalette[`warning${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have complete danger color range (50-950)', () => {
      const dangerShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      dangerShades.forEach((shade: number) => {
        expect(sigmaPalette[`danger${shade}`]).toBeDefined();
        expect(sigmaPalette[`danger${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have complete dark color range (50-950)', () => {
      const darkShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      darkShades.forEach((shade: number) => {
        expect(sigmaPalette[`dark${shade}`]).toBeDefined();
        expect(sigmaPalette[`dark${shade}`]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    test('should have light colors (900, 950)', () => {
      expect(sigmaPalette.light900).toBeDefined();
      expect(sigmaPalette.light950).toBeDefined();
      expect(sigmaPalette.light900).toMatch(/^#[0-9A-F]{6}$/i);
      expect(sigmaPalette.light950).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('Gradient Colors', () => {
    test('should have horizontal gradient colors', () => {
      for (let i = 1; i <= 6; i++) {
        const gradientKey = `gradientH${i.toString().padStart(2, '0')}`;
        expect(sigmaPalette[gradientKey]).toBeDefined();
        expect(sigmaPalette[gradientKey]).toMatch(/^#[0-9A-F]{6}$/i);
      }
    });

    test('should have vertical gradient colors', () => {
      for (let i = 1; i <= 6; i++) {
        const gradientKey = `gradientV${i.toString().padStart(2, '0')}`;
        expect(sigmaPalette[gradientKey]).toBeDefined();
        expect(sigmaPalette[gradientKey]).toMatch(/^#[0-9A-F]{6}$/i);
      }
    });

    test('should have bi-directional gradient colors', () => {
      for (let i = 1; i <= 10; i++) {
        const gradientKey = `gradientB${i.toString().padStart(2, '0')}`;
        expect(sigmaPalette[gradientKey]).toBeDefined();
        expect(sigmaPalette[gradientKey]).toMatch(/^#[0-9A-F]{6}$/i);
      }
    });
  });

  describe('Theme Integration', () => {
    test('should merge base colors with sigma palette correctly', () => {
      // Test that both base colors and sigma palette colors are available
      expect(sigmaTheme.colors.white).toBeDefined(); // from baseColors
      expect(sigmaTheme.colors.primary).toBeDefined(); // from sigmaPalette
      expect(sigmaTheme.colors.primary500).toBeDefined(); // from sigmaPalette
    });

    test('should have valid component styles', () => {
      expect(sigmaTheme.components).toBeDefined();
      expect(sigmaTheme.components.card).toBeDefined();
      expect(sigmaTheme.components.primaryButton).toBeDefined();
    });

    test('should have valid gradient configurations', () => {
      expect(sigmaTheme.gradients).toBeDefined();
      expect(sigmaTheme.gradients.background).toBeDefined();
      expect(sigmaTheme.gradients.card).toBeDefined();
    });
  });
});
