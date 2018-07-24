module.exports = {
  testEnvironment: 'jsdom',
  resolver: 'jest-directory-named-resolver',
  moduleNameMapper: {
    '^utils(.*)$': '<rootDir>/src/utils/$1',
    '^ducks(.*)$': '<rootDir>/src/ducks/$1'
  }
}
