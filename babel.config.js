module.exports = function (api) {
    api.cache(false)
    return {
      presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
      plugins: [
        [
          '@tamagui/babel-plugin',
          {
            components: ['tamagui'],
            config: 'tamagui.config.ts',
          },
        ],
        [
          'transform-inline-environment-variables',
          {
            include: 'TAMAGUI_TARGET',
          },
        ],
        [
          "module-resolver",
          {
            root: ['./']
          }
        ],
        'react-native-reanimated/plugin',
      ],
    }
  }