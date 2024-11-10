"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingTime = void 0;
const readingTime = (content) => {
    const avgWordsPerMin = 200;
    const wordCount = content
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    return Math.ceil(wordCount / avgWordsPerMin);
};
exports.readingTime = readingTime;
