# webpack-react-docgen-typescript

A webpack loader with cache for react/typescript components for [storybook](https://github.com/storybookjs/storybook)

Uses [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) for typescript prop parsing



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

### 1. Manually configure `webpack.config.js`:
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
            //all parserOptions from [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
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
custom function to generate file names for the parsed typescript files. By default those files are created in your `node_modules/.cache/webpack-react-docgen-typescript` folder

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