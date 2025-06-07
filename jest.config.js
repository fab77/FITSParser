export default {
  preset: 'ts-jest/presets/default-esm', // Use if you are using native ES modules
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,  // Ensure ts-jest compiles using ESModules
    }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // fix for ESM import paths
  },
  extensionsToTreatAsEsm: ['.ts'],
};