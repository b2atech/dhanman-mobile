import { baseColors, lavenderPalette } from '../colors';
import { typography } from '../typography';
import { spacing, layout } from '../spacing';
import { createComponentStyles, createGradients } from '../components';

// Complete lavender theme
const colors = {
  ...baseColors,
  ...lavenderPalette,
};

const lavenderTheme = {
  name: 'lavender',
  displayName: 'Lavender',
  colors,
  typography,
  spacing,
  layout,
  components: createComponentStyles(colors),
  gradients: createGradients(colors),
};

export default lavenderTheme;