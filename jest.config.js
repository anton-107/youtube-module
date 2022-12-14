/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ["src/**/*"],
  coveragePathIgnorePatterns: [
    "src/oauth-client.ts",
    "src/youtube-client.ts",
    "src/youtube-parser.ts",
  ],
};
