/* eslint-disable @typescript-eslint/no-var-requires */
const testConfig = require('../jest.config.js');

module.exports = {
  ...testConfig,
  testRegex: '/test/unit/.*.spec.ts',
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './test/coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.node/',
    '/jest/',
    'src/main.ts',
    'src/common/',
    'src/app.module.ts',
  ],
  collectCoverageFrom: ['src/**'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        isolatedModules: true,
        ignoreCoverageForDecorators: true,
        ignoreCoverageForAllDecorators: true,
      },
    ],
  },
};
