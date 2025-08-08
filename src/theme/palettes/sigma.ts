import { baseColors } from '../colors';
import { sigmaPalette } from '../colors/sigmaPalette';
import { typography } from '../typography';
import { spacing, layout } from '../spacing';
import { createComponentStyles, createGradients } from '../components';

// Complete sigma theme - modern tech-inspired blue/cyan theme
const colors = {
  ...baseColors,
  ...sigmaPalette,
};

const sigmaTheme = {
  name: 'sigma',
  displayName: 'Sigma',
  colors,
  typography,
  spacing,
  layout,
  components: createComponentStyles(colors),
  gradients: createGradients(colors),
};

export default sigmaTheme;
