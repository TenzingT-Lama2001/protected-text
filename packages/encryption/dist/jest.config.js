"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules'],
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 90,
            statements: 90,
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
};
exports.default = config;
