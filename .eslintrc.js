'use strict';

const ImportSortGroups = [
  // Side effect imports.
  // eslint-disable-next-line no-useless-escape
  [`^\u0000`],
  // Packages.
  // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  // But not our packages, ember/glimmer/ember-data packages, or potential addons (things starting with ember- or @ember-)
  [
    // eslint-disable-next-line no-useless-escape
    `^(?!@ember\-data)(?!ember)(?!@ember\-)(?!@glimmer)(?!@craftable/)(?!frontend/)(?!craftable\-web)(@?\\w)`,
  ],
  // Glimmer & Ember & EmberData Dependencies
  // eslint-disable-next-line no-useless-escape
  [`^(@ember/|@glimmer|ember|@ember\-data/$)`],
  // Potential Addons (Packages starting with ember-)
  // eslint-disable-next-line no-useless-escape
  [`^(ember\-|@ember\-)`],
  // Our sub packages (engines / addons)
  [`@html-next/`],
  // Our Main Package.
  // eslint-disable-next-line no-useless-escape
  [`^flexi/`],
  // Absolute imports and other imports such as Vue-style `@/foo`.
  // Anything that does not start with a dot.
  ['^[^.]'],
  // Relative imports.
  // Anything that starts with a dot.
  // eslint-disable-next-line no-useless-escape
  [`^\.`],
];

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    babelOptions: {
      plugins: [
        [
          require.resolve('@babel/plugin-proposal-decorators'),
          { legacy: true },
        ],
      ],
    },
    requireConfigFile: false,
  },
  plugins: [
    'ember',
    'qunit',
    'simple-import-sort',
    'import',
    'unused-imports',
    'unicorn',
    'no-useless-assign',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    'plugin:qunit/recommended',
    'plugin:unicorn/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    eqeqeq: 'error',
    'no-eq-null': 'error',
    'prefer-rest-params': 'error',
    'no-shadow': 'error',
    'no-loop-func': 'error',
    'no-lonely-if': 'error',
    'no-labels': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-else-if': 'error',
    'no-var': 'error',
    'no-prototype-builtins': 'error',

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // these are a nice proxy measurement of where there is complexity to pay down
    'max-params': ['error', 3],
    'max-depth': ['error', { max: 4 }],
    'max-statements': ['error', { max: 15 }],
    'max-lines-per-function': [
      'error',
      { max: 80, skipBlankLines: true, skipComments: true },
    ],
    complexity: ['error', { max: 20 }],
    'no-magic-numbers': [
      'error',
      { ignore: [0, 1, -1], ignoreArrayIndexes: true },
    ],

    'object-shorthand': ['error', 'always'],
    'no-restricted-imports': [
      'error',
      {
        paths: ['@ember/runloop'],
      },
    ],
    'no-restricted-properties': ['error'],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'require-await': 'error',
    'prefer-spread': 'error',
    'no-unreachable-loop': 'error',
    'no-lone-blocks': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'no-useless-computed-key': 'error',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      { enforceForRenamedProperties: false },
    ],
    'no-implicit-globals': 'error',
    'dot-notation': 'error',
    'no-redeclare': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-unmodified-loop-condition': 'error',
    'no-use-before-define': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-else-return': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'new-cap': ['error', { capIsNewExceptions: ['A'], newIsCapExceptions: [] }],
    'no-caller': 'error',

    'no-useless-assign/no-useless-assign': 'error',
    'ember/no-incorrect-calls-with-inline-anonymous-functions': 'error',
    'ember/no-deeply-nested-dependent-keys-with-each': 'error',
    'ember/jquery-ember-run': 'error',
    'qunit/no-assert-equal-boolean': 'error',
    'qunit/require-expect': 'error',
    'qunit/no-compare-relation-boolean': 'error',
    'no-restricted-globals': [
      'error',
      {
        name: 'window',
        message: 'Use a Fastboot safe service instead',
      },
      {
        name: 'document',
        message: 'Use a Fastboot safe service instead',
      },
      {
        name: 'global',
        message: 'Use a Fastboot safe service instead',
      },
    ],

    // Too many false positives
    // See https://github.com/eslint/eslint/issues/11899 and similar
    'require-atomic-updates': 'off',

    'simple-import-sort/imports': ['error', { groups: ImportSortGroups }],
    'sort-imports': 'off',
    'import/order': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    // this rule doesn't work properly with --fix
    // https://github.com/benmosher/eslint-plugin-import/issues/1504
    'import/no-duplicates': 'warn',

    'ember/routes-segments-snake-case': 'off', // We should leave this off permanently
    'ember/use-brace-expansion': 'off', // has bugs and is annoying + only applies to computeds we are getting rid of

    'ember/no-classic-classes': 'error',
    'ember/no-get': 'error',
    'ember/no-jquery': 'error',
    'ember/require-return-from-computed': 'error',
    'ember/no-actions-hash': 'error',
    'ember/avoid-leaking-state-in-ember-objects': 'error',
    'ember/no-mixins': 'error',
    'ember/no-new-mixins': 'error',
    'ember/no-controller-access-in-routes': 'error',
    'ember/closure-actions': 'error',
    'ember/no-component-lifecycle-hooks': 'error',
    'ember/no-observers': 'error',
    'ember/require-tagless-components': 'error',
    'ember/no-classic-components': 'error',
    'ember/no-side-effects': 'error',

    // unicorn
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-for-each': 'off', // this might be nice someday? better if it would do regular for loops for arrays
    'unicorn/number-literal-case': 'off', // conflicts with prettier
    'unicorn/no-nested-ternary': 'off', // conflicts with prettier
    'unicorn/no-null': 'off',
    'unicorn/consistent-destructuring': 'off', // nice in some ways but heavy handed
    'unicorn/prefer-spread': 'off', // possibly nice if we had native arrays
    'unicorn/no-for-loop': 'off', // if for...of was good maybe we'd use this
    'unicorn/better-regex': 'off', // would be awesome but has bugs https://github.com/sindresorhus/eslint-plugin-unicorn/issues?q=is%3Aissue+is%3Aopen+better-regex

    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-number-properties': 'error', // Number.isNaN and Number.isFinite usage differs from global
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/no-lonely-if': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/no-unsafe-regex': 'error',

    // to consider activating
    'unicorn/prefer-array-some': 'off', // note: this is great, but if we use ember arrays we must polyfill this
    'unicorn/prefer-negative-index': 'off',
    'unicorn/prefer-dom-node-append': 'off',
    'unicorn/prefer-dom-node-remove': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-switch': 'off',
    'unicorn/prefer-string-slice': 'off',
    'unicorn/no-array-push-push': 'off',
    'unicorn/no-zero-fractions': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/escape-case': 'off',
    'unicorn/no-this-assignment': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-code-point': 'off',
    'unicorn/require-array-join-separator': 'off',
    'unicorn/error-message': 'off',
    'unicorn/no-array-callback-reference': 'off', // we may never want this
    'unicorn/prevent-abbreviations': [
      'off',
      {
        checkFilenames: false,
        checkDefaultAndNamespaceImports: false,
        extendDefaultReplacements: false,
        replacements: {
          e: {
            error: true,
            event: true,
          },
        },
      },
    ],
  },
  overrides: [
    // node files
    {
      files: [
        'bin/**/*.js',
        '.eslintrc.js',
        '.lint-todorc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'packages/*/ember-cli-build.js',
        'packages/*/testem.js',
        'packages/*/blueprints/*/index.js',
        'packages/*/config/**/*.js',
        'packages/*/tests/dummy/config/**/*.js',
        'packages/*/index.js',
        'packages/*/lib/*/index.js',
        'packages/*/server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
