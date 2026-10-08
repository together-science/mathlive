const fs = require('fs');
const path = require('path');

// Fork: the root package.json paths are prefixed with `./dist/` so the repo
// can be installed as a git dependency (the package root is the repo root).
// The generated dist/package.json lives inside `dist/`, so strip the prefix.
const rootPackage = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'),
  (_key, value) =>
    typeof value === 'string' ? value.replace(/^\.\/dist\//, './') : value
);

// Pick only the fields you want to include in the published package
const publishPackage = {
  name: rootPackage.name,
  version: rootPackage.version,
  description: rootPackage.description,
  license: rootPackage.license,
  author: rootPackage.author,
  funding: rootPackage.funding,
  repository: rootPackage.repository,
  bugs: rootPackage.bugs,
  keywords: rootPackage.keywords,
  main: rootPackage.main,
  module: rootPackage.module,
  types: rootPackage.types,
  exports: rootPackage.exports,
  dependencies: rootPackage.dependencies,
  files: [
    // Optional: if you want to be explicit
    './*.js',
    './*.mjs',
    './*.css',
    './fonts/',
    './sounds/',
    './types/',
  ],
};

fs.writeFileSync(
  path.resolve(__dirname, '../dist/package.json'),
  JSON.stringify(publishPackage, null, 2),
  'utf8'
);
