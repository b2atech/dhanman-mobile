import { baseColors, greenPalette } from '../colors';
import { typography } from '../typography';
import { spacing, layout } from '../spacing';
import { createComponentStyles, createGradients } from '../components';

// Complete green theme
const colors = {
  ...baseColors,
  ...greenPalette,
};

const greenTheme = {
  name: 'green',
  displayName: 'Green',
  colors,
  typography,
  spacing,
  layout,
  components: createComponentStyles(colors),
  gradients: createGradients(colors),
};

export default greenTheme;
