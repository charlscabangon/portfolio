import { getAssetUrl, PATH, EXT } from '@/data/utils/getAssetUrl';

const features = [
  {
    id: 'feature-the-garcian',
    title: 'The Garcian logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-the-garcian', EXT.IMAGE),
    gridClass: 'col-start-1 row-span-3 row-start-1 md:col-start-1 md:row-span-3 md:row-start-1',
  },
  {
    id: 'feature-kultura-shirt',
    title: 'Kultura shirt design',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-kultura-shirt', EXT.IMAGE),
    gridClass: 'col-start-2 row-span-2 row-start-3 md:col-start-2 md:row-span-2 md:row-start-1',
  },
  {
    id: 'feature-sd',
    title: 'S&D wedding logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-sd', EXT.IMAGE),
    gridClass: 'col-start-2 row-span-2 row-start-1 md:col-start-3 md:row-span-2 md:row-start-1',
  },
  {
    id: 'feature-trainy',
    title: 'Trainy fitness app',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-trainy', EXT.IMAGE),
    gridClass: 'col-start-3 row-span-3 row-start-1 md:col-start-4 md:row-span-3 md:row-start-1',
  },
  {
    id: 'feature-jay-ay-logo',
    title: 'Jay-Ay Villanueva logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-jay-ay-logo', EXT.IMAGE),
    gridClass: 'col-start-1 row-start-4 md:col-start-1 md:row-start-4',
  },
  {
    id: 'feature-ite-day',
    title: 'ITE Day 2025 logo',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-ite-day', EXT.IMAGE),
    gridClass:
      'col-span-2 col-start-1 row-span-2 row-start-5 md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-5',
  },
  {
    id: 'feature-filler',
    title: 'Filler image',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-filler', EXT.IMAGE),
    gridClass: 'hidden md:col-start-3 md:row-span-2 md:row-start-5 md:block',
  },
  {
    id: 'feature-dept-shirt',
    title: 'GCT ITE Departmental Shirt for AY 2024-2025',
    image: getAssetUrl(PATH.DESIGNS.FEATURE, 'feature-dept-shirt', EXT.IMAGE),
    gridClass: 'col-start-3 row-span-3 row-start-4 md:col-start-4 md:row-span-3 md:row-start-4',
  },
];

export function getFeature(id) {
  return features.find((item) => item.id === id);
}

export function getAllFeatures() {
  return features;
}

export function getFeaturesForLightbox() {
  return features.map((feature) => ({
    src: feature.image,
    alt: feature.title,
    title: feature.title,
  }));
}
