import { ParserOptions } from 'react-docgen-typescript';

interface IOwnOptions {  
  forceRegenerate?: boolean;
  fileNameResolver?: (object) => string;
}

export type IOptions = IOwnOptions & ParserOptions;