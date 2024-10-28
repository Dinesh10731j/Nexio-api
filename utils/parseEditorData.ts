// utils/parseEditorData.ts
import {Block, ImageData, HeaderData, ImageBlock, ParagraphData, ListData, TableData } from '../types/types';

export const parseEditorData = (editorData: Block[]): { title: string; image: ImageData; content: string } => {
    if (!Array.isArray(editorData)) {
        throw new Error("Invalid data format: editorData should be an array.");
      }
    let title = '';
  let image: ImageData = { url: '', caption: '' };
  let content = '';

  editorData.forEach((block: Block) => {
    switch (block.type) {
      case 'header':
        { const headerData = block.data as unknown as HeaderData;
        if (headerData.level === 1) {
          title = headerData.text;
        }
        break; }
      case 'image':
        { const imageData = block.data as unknown as ImageBlock;
        image = {
          url: imageData.file?.url || '',
          caption: imageData.caption || '',
        };
        break; }
      case 'paragraph':
        { const paragraphData = block.data as unknown as ParagraphData;
        content += `${paragraphData.text} `;
        break; }
      case 'list':
        { const listData = block.data as unknown as ListData;
        const listItems = listData.items.map((item) => `- ${item}`).join('\n');
        content += `\n${listItems}\n`;
        break; }
      case 'table':
        { const tableData = block.data as unknown as TableData;
        const tableContent = tableData.content.map(row => row.join(' | ')).join('\n');
        content += `\n${tableContent}\n`;
        break; }
      default:
        break;
    }
  });

  return { title, image, content: content.trim() };
};
