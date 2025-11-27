import { getAssetUrl, PATH, EXT } from '@/data/utils/getAssetUrl';

const features = [
  {
    id: 'feature-the-garcian',
    title: 'The Garcian logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-the-garcian', EXT.IMAGE),
  },
  {
    id: 'feature-sd',
    title: 'S&D wedding logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-sd', EXT.IMAGE),
  },
  {
    id: 'feature-trainy',
    title: 'Trainy fitness app',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-trainy', EXT.IMAGE),
  },
  {
    id: 'feature-kultura-shirt',
    title: 'Kultura shirt design',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-kultura-shirt', EXT.IMAGE),
  },
  {
    id: 'feature-jay-ay-logo',
    title: 'Jay-Ay Villanueva logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-jay-ay-logo', EXT.IMAGE),
  },
  {
    id: 'feature-dept-shirt',
    title: 'GCT ITE Departmental Shirt for AY 2024-2025',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-dept-shirt', EXT.IMAGE),
  },
  {
    id: 'feature-ite-day',
    title: 'ITE Day 2025 logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-ite-day', EXT.IMAGE),
  },
  {
    id: 'feature-filler',
    title: 'filler image',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-filler', EXT.IMAGE),
  },
];

export function getFeature(id) {
  return features.find((item) => item.id === id);
};
