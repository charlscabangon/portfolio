import { getAssetUrl, PATH, EXT } from '@/data/utils/getAssetUrl';

export const projects = [
  {
    id: 'reaux',
    title: 'Reaux',
    description: 'A mock premium jewelry botique',
    thumbnail: getAssetUrl(PATH.PROJECTS.THUMBNAIL, 'reaux', EXT.IMAGE),
    preview: getAssetUrl(PATH.PROJECTS.PREVIEW, 'reaux', EXT.VIDEO),
    link: 'https://reaux.vercel.app/',
    github: 'https://github.com/CharlsCabangon/reaux',
  },
  {
    id: 'catch-em-once',
    title: "Catch 'em once",
    description: 'Memory game built with React and TanStack Query',
    thumbnail: getAssetUrl(PATH.PROJECTS.THUMBNAIL, 'catch-em-once', EXT.IMAGE),
    preview: getAssetUrl(PATH.PROJECTS.PREVIEW, 'catch-em-once', EXT.VIDEO),
    link: 'https://charlscabangon.github.io/catch-em-once/',
    github: 'https://github.com/CharlsCabangon/catch-em-once',
  },
];
