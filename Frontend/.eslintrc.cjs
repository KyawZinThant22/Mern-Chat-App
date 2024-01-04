module.exports = {
  env: {
     browser: true,
     es2021: true,
  },
  extends: [
     'plugin:react/recommended',
     'plugin:@typescript-eslint/eslint-recommended',
     'plugin:@typescript-eslint/recommended',
     'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
     ecmaVersion: 'latest',
     sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
     'jsx-a11y/anchor-is-valid': 'off',
     'react/jsx-uses-react': 'off',
     'react/react-in-jsx-scope': 'off',
     'react/jsx-uses-react': 'off',
     'react/jsx-uses-vars': 'off',
     'no-unused-vars': 'off',
     'react/no-unused-vars': 'off',
     '@typescript-eslint/no-unused-vars': 'off',
     '@typescript-eslint/no-unused-vars-experimental': 'off',
     'at-rule-no-unknown': [
        true,
        {
           ignoreAtRules: ['tailwind'],
        },
     ],
  },
};
