module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-anonymous-default-export': 'off',
    'no-unused-vars': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
