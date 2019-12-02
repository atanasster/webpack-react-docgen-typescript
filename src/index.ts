import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import findCacheDir from 'find-cache-dir';
import { getOptions } from 'loader-utils';
import { withDefaultConfig } from 'react-docgen-typescript';
import { createHash } from 'crypto';
import { IOptions } from './types';

module.exports.default = async function(source) {
  const options: IOptions = getOptions(this) || {};
  const {
    forceRegenerate,
    fileNameResolver,
    propFilter,
    componentNameResolver,
    shouldExtractLiteralValuesFromEnum,
    savePropValueAsString,
  } = options;

  const parserOptions = { propFilter, componentNameResolver, shouldExtractLiteralValuesFromEnum, savePropValueAsString };
  const parser = withDefaultConfig(parserOptions);

  const cacheFolder = findCacheDir({ name: 'webpack-react-docgen-typescript' }) || os.tmpdir();

  //create cache folder if it doesnt exist
  if (!fs.existsSync(cacheFolder)) {
     fs.mkdirSync(cacheFolder, { recursive: true });
  }   
  const cachedFileName = fileNameResolver ? fileNameResolver({ ...this, cacheFolder }) :
    path.join(cacheFolder, createHash('md5').update(this.resourcePath).digest('hex'));

  if (!cachedFileName) {
    return source;
  }
  const parseTypes = async () => {
    let parsed;
    try {
      parsed = parser.parse(this.resourcePath);
    } catch (e) {
      console.warn(`\nTS: issue parsing ${this.resourcePath}`)
    }  
    const result = parsed && Array.isArray(parsed) && parsed.length > 0 ? parsed : {};
    fs.writeFileSync(cachedFileName, JSON.stringify(result));
    return result;
  }

  let docgenInfo = null;

  if (forceRegenerate) {
    //force remove the cached file
    if (fs.existsSync(cachedFileName)) {
      fs.unlink(cachedFileName);
    }  
  }
  
  //check if the options have changed
  const optionsHash = createHash('md5').update(JSON.stringify(parserOptions)).digest('hex').substr(0, 6);
  const optionsFileName = path.join(cacheFolder, '--options--.cache');
  if (fs.existsSync(optionsFileName)) {
    const lastOptions = fs.readFileSync(optionsFileName, 'utf8');
    if (lastOptions !== optionsHash) {
      //empty the cache folder files
      fs.emptyDirSync(cacheFolder);

      //last options are different from current options
      fs.writeFileSync(optionsFileName, optionsHash);
    }
  } else {
    fs.writeFileSync(optionsFileName, optionsHash);
  }
  
  if (fs.existsSync(cachedFileName)) {
    const cacheStats = fs.statSync(cachedFileName);
    const fileStats = fs.statSync(this.resourcePath);
    if (cacheStats.mtime.getTime() >= fileStats.mtime.getTime()) {
      const fileData = fs.readFileSync(cachedFileName);
      docgenInfo = JSON.parse(fileData);
    } else {
      docgenInfo = await parseTypes();
    }
  } else {
    //does not exist in cache, re-generate
    docgenInfo = await parseTypes();
  }
  if (Array.isArray(docgenInfo) && docgenInfo.length > 0) {
    const doc = docgenInfo[0];
    return  source + `
    try {
      ${doc.displayName}.__docgenInfo = ${JSON.stringify(doc)};
    } catch (e) {
      //eat exception
    }
    `;
  }
  return source;
}

