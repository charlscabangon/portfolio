import { BLOB_URL } from '@/config/config';

const ROOT = 'assets';

export const PATH = {
  ABOUT: 'about',
  DESIGNS: 'designs',
  PROJECTS: {
    BASE: 'projects',
    PREVIEW: 'projects/preview',
    THUMBNAIL: 'projects/thumbnail',
  },
  TOOLS: {
    BASE: 'tools',
    DESIGN: 'tools/design',
    TECH: 'tools/tech',
  },
};

export const EXT = {
  IMAGE: 'avif',
  VIDEO: 'webm',
  ICON: 'svg',
};

export const getAssetUrl = (path, filename, ext) =>
  `${BLOB_URL}/${ROOT}/${path}/${filename}.${ext}`;
