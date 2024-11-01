module.exports = {
  trailingComma: 'es5',
  printWidth: 120,
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,ts,cjs,cts,mjs,mts}',
      options: {
        singleQuote: true,
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        trailingComma: 'none',
        singleQuote: false,
      },
    },
    {
      files: ['*.hbs'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.gjs', '*.gts'],
      options: {
        parser: 'ember-template-tag',
        singleQuote: true,
        templateSingleQuote: false,
        trailingComma: 'es5',
      },
    },
  ],
};
