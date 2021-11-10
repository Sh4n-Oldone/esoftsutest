module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
