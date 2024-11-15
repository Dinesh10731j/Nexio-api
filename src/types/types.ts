export interface signupType {
name:string,
email:string,
password:string,
}


export interface contactType{
  name:string,
  email:string,
  message:string,

}


export interface ImageData {
  file: string;  
  url: string;   
  caption: string; 
}

export interface HeaderData {
  level: number;
  text: string;
}

export interface ParagraphData {
  text: string;
}

export interface ListData {
  items: string[];
}

export interface TableData {
  content: string[][];
}

export interface Block {
  id: string;
  type: 'header' | 'image' | 'paragraph' | 'list' | 'table';
  data: HeaderData | ImageData | ParagraphData | ListData | TableData;
}
