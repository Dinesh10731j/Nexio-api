"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEditorData = void 0;
const parseEditorData = (editorData) => {
    if (!Array.isArray(editorData)) {
        throw new Error("Invalid data format: editorData should be an array.");
    }
    let title = '';
    let image = { url: '', caption: '' };
    let content = '';
    editorData.forEach((block) => {
        var _a;
        switch (block.type) {
            case 'header':
                {
                    const headerData = block.data;
                    if (headerData.level === 1) {
                        title = headerData.text;
                    }
                    break;
                }
            case 'image':
                {
                    const imageData = block.data;
                    image = {
                        url: ((_a = imageData.file) === null || _a === void 0 ? void 0 : _a.url) || '',
                        caption: imageData.caption || '',
                    };
                    break;
                }
            case 'paragraph':
                {
                    const paragraphData = block.data;
                    content += `${paragraphData.text} `;
                    break;
                }
            case 'list':
                {
                    const listData = block.data;
                    const listItems = listData.items.map((item) => `- ${item}`).join('\n');
                    content += `\n${listItems}\n`;
                    break;
                }
            case 'table':
                {
                    const tableData = block.data;
                    const tableContent = tableData.content.map(row => row.join(' | ')).join('\n');
                    content += `\n${tableContent}\n`;
                    break;
                }
            default:
                break;
        }
    });
    return { title, image, content: content.trim() };
};
exports.parseEditorData = parseEditorData;
