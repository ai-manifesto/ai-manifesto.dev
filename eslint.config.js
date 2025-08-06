import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.{js,mjs,ts,vue}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {

      // === Vue Formatting ===
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/valid-template-root': 'off',
      'vue/padding-line-between-blocks': 'error',
      'vue/block-tag-newline': ['error'],
      'vue/block-order': [
        'error',
        {
          order: [
            'script',
            'template',
            'style',
          ],
        },
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
        },
      ],
      'vue/singleline-html-element-content-newline': 'error',
      'vue/multiline-html-element-content-newline': 'error',
      'vue/no-multi-spaces': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/mustache-interpolation-spacing': [
        'error',
        'always',
      ],

      // === Code Style ===
      '@stylistic/semi': [
        'error',
        'never',
      ],
      '@stylistic/semi-style': [
        'error',
        'first',
      ],
      '@stylistic/indent': [
        'error',
        2,
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        { avoidEscape: true },
      ],
      '@stylistic/comma-dangle': [
        'error',
        'always-multiline',
      ],
      '@stylistic/comma-style': 'error',
      '@stylistic/quote-props': [
        'error',
        'as-needed',
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        { max: 1, maxEOF: 1 },
      ],

      // === Spacing ===
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/space-before-function-paren': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/key-spacing': 'error',
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
      ],
      '@stylistic/array-bracket-spacing': [
        'error',
        'never',
      ],
      '@stylistic/array-element-newline': [
        'error',
        'always',
      ],
      '@stylistic/array-bracket-newline': [
        'error',
        { multiline: true },
      ],

      // === Braces & Blocks ===
      curly: 'error',
      '@stylistic/brace-style': 'error',

      // === Lines & Whitespace ===
      '@stylistic/eol-last': [
        'error',
        'always',
      ],
      '@stylistic/operator-linebreak': 'error',
      '@stylistic/dot-location': [
        'error',
        'property',
      ],
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'import',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: 'import',
        },
      ],

      // === TypeScript Formatting ===
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
          },
        },
      ],
      '@stylistic/type-annotation-spacing': [
        'error',
        {},
      ],

      // === Imports ===
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: [
            'none',
            'all',
            'multiple',
            'single',
          ],
          allowSeparatedGroups: true,
        },
      ],

      // ==== DISABLE ALL LINTING RULES (handled by OXLint) ====
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-constant-condition': 'off',
      'no-redeclare': 'off',
      'vue/no-unused-vars': 'off',
      'vue/no-unused-components': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-parsing-error': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/coverage/**',
    ],
  },
]
