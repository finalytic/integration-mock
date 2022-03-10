module.exports = {
  preset: 'ts-jest',
  rootDir: 'src',
  setupFiles: ['dotenv/config'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '../coverage/',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
};
