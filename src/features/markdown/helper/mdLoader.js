import { MD_DIRS } from './mdDirs';

// pre-load all md files at BUILD TIME
const allMarkdownFiles = import.meta.glob('/src/data/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getMarkdownContent(dir, filename) {
  const basePath = MD_DIRS[dir];

  if (!basePath) {
    return {
      content: null,
      error: "This content section isn't available right now.",
    };
  }

  const path = `${basePath}/${filename}`;
  const content = allMarkdownFiles[path];

  if (!content) {
    return {
      content: null,
      error: 'This content is currently unavailable.',
    };
  }

  return { content, error: null };
}
