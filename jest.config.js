module.exports = {
    roots: [
      "<rootDir>/packages"
    ],
    collectCoverageFrom: [
      "packages/**/*.{js,jsx,ts,tsx}",
      "!packages/**/*.d.ts"
    ],
    setupFilesAfterEnv: [
      "@testing-library/jest-dom",
      "<rootDir>/setupTests.ts"
    ],
    testMatch: [
      "<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/packages/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    globals: {
      "__DEV__": true // this is for expo-fonts
    },
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "src"],
    preset: "ts-jest",
    testTimeout: 30000,
    coveragePathIgnorePatterns: [
      "/node_modules/",
    ],
    transform: {
      "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
      "node_modules/react-native-web/.+\\.(j|t)sx?$": "ts-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!react-native-web/.*|expo-fonts|)"
    ],
    modulePaths: [
      "./packages"
    ],
    moduleNameMapper: {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ],
    resetMocks: true
  }
  