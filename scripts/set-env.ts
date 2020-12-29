import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = process.env.NODE_ENV;
const isProd = environment === 'production';

const targetPath = `./apps/client/src/environments/environment${
  environment ? '.' + environment : ''
}.ts`;
const envConfigFile = `export const environment = {
  production: ${isProd},
  api_url: '${process.env.BACKEND_API_URL ? process.env.BACKEND_API_URL : '/api'}'
};`;
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
