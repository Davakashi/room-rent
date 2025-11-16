module.exports = {
  preset: "ts-jest", // TypeScript файлыг трансформ хийх
  testEnvironment: "jest-environment-jsdom", // React компонент тестлэх
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // TSX файлыг трансформ хий
  },
  transformIgnorePatterns: ["/node_modules/"], // node_modules ignore
};
