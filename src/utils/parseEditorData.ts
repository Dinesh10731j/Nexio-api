import { Block, ImageData, HeaderData, ParagraphData, ListData, TableData } from '../types/types'

export const parseEditorData = (editorData: Block[]): { title: string; image: ImageData; content: string } => {
  if (!Array.isArray(editorData)) {
    throw new Error("Invalid data format: editorData should be an array.");
  }

  let title = '';
  let image: ImageData = { file: '', url: '', caption: '' };  
  let content = '';

  editorData.forEach((block: Block) => {
    switch (block.type) {
      case 'header':
        { const headerData = block.data as HeaderData;
        if (headerData.level === 1) {
          title = headerData.text;
        }
        break; }
      case 'image':
        { const imageData = block.data as ImageData;
  
        image = {
          file: imageData.file,   
          url: imageData.url,   
          caption: imageData.caption || '',  
        };
        break; }
      case 'paragraph':
        { const paragraphData = block.data as ParagraphData;
        content += `${paragraphData.text} `;
        break; }
      case 'list':
        { const listData = block.data as ListData;
        const listItems = listData.items.map((item: unknown) => `- ${item}`).join('\n');
        content += `\n${listItems}\n`;
        break; }
      case 'table':
        { const tableData = block.data as TableData;
        const tableContent = tableData.content.map((row: unknown[]) => row.join(' | ')).join('\n');
        content += `\n${tableContent}\n`;
        break; }
      default:
        break;
    }
  });

  return { title, image, content: content.trim() };
};
