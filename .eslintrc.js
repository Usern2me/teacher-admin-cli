const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'always'],
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/no-find-dom-node': 0,
    'jsx-a11y/label-has-for': 0,
    'import/no-unresolved': 0,
    'no-nested-ternary': 0,
    'emptyRules': 0,
    'no-console': 0,
    'no-unused-state': 0,
    'no-unused-expressions': 0,
    'react/sort-comp': 0,
    'no-param-reassign': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events':0
  },
  globals: {
    page: true,
    document: true,
    window: true
  }
};
