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
  moduleNameMapper: {
    '@controller/(.*)': '<rootDir>/src/controller/$1',
    '@service/(.*)': '<rootDir>/src/service/$1',
    '@middleware/(.*)': '<rootDir>/src/middleware/$1',
    '@model/(.*)': '<rootDir>/src/model/$1',
    '@route/(.*)': '<rootDir>/src/route/$1',
    '@interface/(.*)': '<rootDir>/src/interface/$1',
    '@schema/(.*)': '<rootDir>/src/schema/$1',
  },
};
