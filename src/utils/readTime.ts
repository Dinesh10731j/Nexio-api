export const readingTime = (content: string) => {
  const avgWordsPerMin = 200;
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.ceil(wordCount / avgWordsPerMin);
};
