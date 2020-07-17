module.exports = {
  rootDir: '../',
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'enzyme',
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['lcov', 'html', 'text'],
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/src/Assets/**',
    '!<rootDir>/src/index.js',
    '!<rootDir>/src/registerServiceWorker.js',
    '!<rootDir>/src/setupTests.js',
    '!<rootDir>/src/StyleUtils/**',
    '!<rootDir>/src/Proxy/**',
    '!<rootDir>/src/tests/**',
    '!<rootDir>/src/ApolloClient/**',
    '!<rootDir>/src/utils/Loader/PlaceholderSVGs.js',
    '!<rootDir>/src/utils/Logger/index**',
    '!<rootDir>/src/App/**',
  ],
  coverageThreshold: {
    global: {
      //branches: 80,
      //functions: 80,
      //lines: 80,
      //statements: 80,
    }
  },
  moduleNameMapper: {
    '\\.(css|jpg|png|svg)$': '<rootDir>/config/__mocks__/fileMock.js',
  },
};
