module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/indent': ['error', 2],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      }
    }
  }
};
