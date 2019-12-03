import { ParserOptions, ComponentDoc } from 'react-docgen-typescript';


interface IOwnOptions {  
  forceRegenerate?: boolean;
  fileNameResolver?: (object) => string;
  transformProps?: (props: ComponentDoc[]) => ComponentDoc; 
}

export type IOptions = IOwnOptions & ParserOptions;