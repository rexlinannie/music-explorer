module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: { "^.+\\.(ts|tsx|js|jsx)$": "babel-jest" },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  clearMocks: true
};
