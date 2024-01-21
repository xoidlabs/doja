const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require(`${process.cwd()}/tsconfig.json`);

module.exports = {
  "rootDir": ".",
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  "testEnvironment": "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
  "modulePathIgnorePatterns": [
    "dist",
    "tree",
    ".backup"
  ],
  "moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
  "testRegex": "test.(js|ts|tsx)$",
  "coverageDirectory": "./coverage/",
  "collectCoverage": false,
  
}
