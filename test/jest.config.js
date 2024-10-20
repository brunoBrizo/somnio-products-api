/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.json');

const testConfig = {
  rootDir: '../../',
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  workerIdleMemoryLimit: '512MB',
  testTimeout: 22000,
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testPathIgnorePatterns: ['.github/*'],
};

module.exports = testConfig;
