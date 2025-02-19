module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    collectCoverageFrom: ['**/*.service.ts'],
  };
  