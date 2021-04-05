import { DefaultTheme } from 'react-native-paper';
import * as themes from '../components/widget/constant';

const theme = {
  ...DefaultTheme,
  colors: themes.colors,
  fonts: themes.fonts,
  sizes: themes.sizes
};
export {
  theme,
};
