/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules'],
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/src'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
