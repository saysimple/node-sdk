module.exports = {

  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    "./src/base/error/*": {
      "branches": 50,
      "functions": 85,
      "lines": 85,
      "statements": 85
    },
    "./src/base/*": {
      "branches": 85,
      "functions": 85,
      "lines": 85,
      "statements": 85
    },
    "./src/domains/**": {
      "branches": 85,
      "functions": 85,
      "lines": 85,
      "statements": 85
    }
  },

  // The root directory that Jest should scan for tests and modules within
  // rootDir: "./test",
  setupFilesAfterEnv: [
    'jest-extended'
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "./src",
    "./tests",
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
