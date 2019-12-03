# webpack-react-docgen-typescript

A webpack loader with cache for react/typescript components for [storybook](https://github.com/storybookjs/storybook)

On the first build (ie `npm run storybook`) the typescript prop tables will be parsed with [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) and saved to a local cache. 
All subsequent builds will be significantly faster since the PropTables will be read from chache.
The cache will be invalidated when
 * the typescript file is changed
 * the loader options are changed
 * if the forceRegenerate is set to true

## Installation
```sh
npm i -D webpack-react-docgen-typescript
```

## Usage

### 1. Add Storybook preset to `.storybook/main.js`
```js
module.exports = {
  presets: ['webpack-react-docgen-typescript/preset', ...]
...
}  
```

or with options:

```
  presets: [
  {
    name: require.resolve('webpack-react-docgen-typescript/preset'),
    options: {
      fileNameResolver: ({ resourcePath, cacheFolder }) => path.join(cacheFolder, resourcePath.replace(/[^a-z0-9]/gi, '_')),
    },
  },  

```

### 2. Manually configure `webpack.config.js`:
```
  module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /\.(story|stories).(ts|tsx)$/,
          loader: require.resolve("webpack-react-docgen-typescript"),
          options: {
            propFilter: { 
              skipPropsWithoutDoc: true,
              skipPropsWithName: ['prop4']
            }
          }
        }
      ],
    }
  });
  ``` 

## Options

* `forceRegenerate?: boolean;`
If true, the cahce files will be regenerated forcefully.

* `fileNameResolver?: (object) => string;`
custom function to generate file names for the parsed typescript files. By default those files are created in your `node_modules/.cache/webpack-react-docgen-typescript` folder. If this custom function returns false, the file will not be parsed for typescript prop tables

* `transformProps?: (props: ComponentDoc[]) => ComponentDoc;`
custom function to transform the prop tables as needed. Will receive the prop tables as an array of length at least 0 and can return the element in the array to use, or the full array.

For example add custom fields:
```
presets: [
  {
    name: require.resolve('webpack-react-docgen-typescript/preset'),
    options: {
      transformProps: tables => tables.map(table => ({ ...table, type: 'tsType' }))[0],
    },
  }, 
  ```


### The remaining options are parserOptions from [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)

```
ParserOptions {
  propFilter?: StaticPropFilter | PropFilter;
  componentNameResolver?: ComponentNameResolver;
  shouldExtractLiteralValuesFromEnum?: boolean;
  savePropValueAsString?: boolean;
}

StaticPropFilter {
  skipPropsWithName?: string[] | string;
  skipPropsWithoutDoc?: boolean;
}

PropFilter = (props: PropItem, component: Component) => boolean;

ComponentNameResolver = (
  exp: ts.Symbol,
  source: ts.SourceFile
) => string | undefined | null | false;
```