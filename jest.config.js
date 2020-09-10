module.exports = {
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
