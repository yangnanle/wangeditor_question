export interface Paragraph {
  type: string
  children: Array<Run>
  styleId: number | null
  styleName: string | null
  numbering: string | null
  alignment: string | null
  indent: Indent
}

// Paragraph中的children
export interface Run {
  type: string
  children: Array<any> // 不同标签有不同的属性或方法，无法预判
  styleId: number | null
  styleName: string | null
  isBold: boolean
  isUnderline: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isAllCaps: boolean
  isSmallCaps: boolean
  verticalAlignment: string
  font: string | null
  fontSize: number | null
  highlight: string | null
}

interface Indent {
  start: string | null
  end: string | null
  firstLine: string | null
  hanging: string | null
}




export interface Mammoth {
  convertToHtml: (input: Input, options?: Options) => Promise<Result>;
  extractRawText: (input: Input) => Promise<Result>;
  embedStyleMap: (input: Input, styleMap: string) => Promise<{
    toArrayBuffer: () => ArrayBuffer,
    toBuffer: () => Buffer,
  }>;
  images: Images;
}

export type Input = NodeJsInput | BrowserInput;

export type NodeJsInput = PathInput | BufferInput;

export interface PathInput {
  path: string;
}

export interface BufferInput {
  buffer: Buffer;
}

export type BrowserInput = ArrayBufferInput;

export interface ArrayBufferInput {
  arrayBuffer: ArrayBuffer;
}

export interface Options {
  styleMap?: string | Array<string>;
  includeEmbeddedStyleMap?: boolean;
  includeDefaultStyleMap?: boolean;
  convertImage?: ImageConverter;
  ignoreEmptyParagraphs?: boolean;
  idPrefix?: string;
  transformDocument?: (element: any) => any;
}

export interface ImageConverter {
  __mammothBrand: "ImageConverter";
}

export interface Image {
  contentType: string;
  readAsArrayBuffer: () => Promise<ArrayBuffer>;
  readAsBase64String: () => Promise<string>;
  readAsBuffer: () => Promise<Buffer>;
  read: ImageRead;
}

export interface ImageRead {
  (): Promise<Buffer>;
  (encoding: string): Promise<string>;
}

export interface ImageAttributes {
  src: string;
}

export interface Images {
  dataUri: ImageConverter;
  imgElement: (f: (image: Image) => Promise<ImageAttributes>) => ImageConverter;
}

export interface Result {
  value: string;
  messages: Array<Message>;
}

export type Message = Warning | Error;

export interface Warning {
  type: "warning";
  message: string;
}

export interface Error {
  type: "error";
  message: string;
  error: unknown;
}