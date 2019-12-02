import { Configuration } from 'webpack';
import { IOptions } from './types';

module.exports.webpack = (
  config: Configuration,
  options?: IOptions & { skipBabelLoader?: boolean },
): Configuration => {
  const { skipBabelLoader = false, ...rest } = options;
  const rules = [...config.module.rules.slice(1)];
  if (!skipBabelLoader) {
    rules.push(
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        }
      }
    )
  }

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...rules,
          {
            test: /\.(ts|tsx)$/,
            exclude: /\.(story|stories).(ts|tsx)$/,
            loader: require.resolve("./index.js"),
            options: rest,
          }
      ],
    },
  }  
};
