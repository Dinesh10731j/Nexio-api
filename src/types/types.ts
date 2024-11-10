export interface signupType{
    _id:string;
    name:string;
    email:string;
    password:string;
}


export interface contactType{
    _id:string,
    name:string,
    email:string,
    message:string,
}


// utils/EditorTypes.ts

export interface ImageData {
    url: string;
    caption: string;
  }
  
  export interface Block {
    id: string;
    type: string;
    data: Record<string,''>;
  }
  
  export interface HeaderData {
    text: string;
    level: number;
  }
  
  export interface ImageBlock {
    file: { url: string };
    caption: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
  }
  
  export interface ParagraphData {
    text: string;
  }
  
  export interface ListData {
    items: string[];
    style: 'ordered' | 'unordered';
  }
  
  export interface TableData {
    content: string[][];
  }
  