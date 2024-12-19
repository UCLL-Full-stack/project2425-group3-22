module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': 'esbuild-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
    },
};
