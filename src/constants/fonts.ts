import { loadFont } from '@remotion/google-fonts/Inter';

export const { fontFamily } = loadFont('normal', {
  weights: ['300', '400', '600', '700', '900'],
  subsets: ['latin'],
});
