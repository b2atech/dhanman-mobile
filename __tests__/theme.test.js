import { greenTheme, lavenderTheme } from '../src/theme';

// Test that themes are properly configured
describe('Theme System', () => {
  test('Green theme has required properties', () => {
    expect(greenTheme.name).toBe('green');
    expect(greenTheme.colors.primary).toBeDefined();
    expect(greenTheme.spacing).toBeDefined();
    expect(greenTheme.typography).toBeDefined();
    expect(greenTheme.components).toBeDefined();
  });

  test('Lavender theme has required properties', () => {
    expect(lavenderTheme.name).toBe('lavender');
    expect(lavenderTheme.colors.primary).toBeDefined();
    expect(lavenderTheme.spacing).toBeDefined();
    expect(lavenderTheme.typography).toBeDefined();
    expect(lavenderTheme.components).toBeDefined();
  });

  test('Themes have different primary colors', () => {
    expect(greenTheme.colors.primary).not.toBe(lavenderTheme.colors.primary);
  });
});

// Test that components are themed properly
describe('Component Theming', () => {
  test('Components have consistent theming structure', () => {
    const components = greenTheme.components;
    
    expect(components.card).toBeDefined();
    expect(components.primaryButton).toBeDefined();
    expect(components.fab).toBeDefined();
    expect(components.iconCircle).toBeDefined();
    
    // Check that card has required properties
    expect(components.card.backgroundColor).toBeDefined();
    expect(components.card.borderRadius).toBeDefined();
    expect(components.card.padding).toBeDefined();
  });

  test('Both themes have same component structure', () => {
    const greenComponents = Object.keys(greenTheme.components);
    const lavenderComponents = Object.keys(lavenderTheme.components);
    
    expect(greenComponents).toEqual(lavenderComponents);
  });
});