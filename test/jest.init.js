import 'babel-polyfill';
const fs = require('fs-extra');

fs.removeSync('../node_modules/.cache/webpack-react-docgen-typescript'); 
jest.setTimeout(100000);
