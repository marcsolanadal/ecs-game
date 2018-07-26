module.exports = {
  testEnvironment: 'jsdom',
  resolver: 'jest-directory-named-resolver',
  moduleNameMapper: {
    '^utils(.*)$': '<rootDir>/src/utils/$1',
    '^engine(.*)$': '<rootDir>/src/engine/$1'
  }
}
