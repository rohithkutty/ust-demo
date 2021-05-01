module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '/test/jest/__mocks__/styleMock.js',
  },
  setupFiles: ['./__mocks__/client.js'],
};
