module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^style/(.*)': '<rootDir>/src/style/$1',
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'src/custom-build'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby)/)',
    'node_modules/(?!(immortal-db)/)',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/loadershim.js'],
}
