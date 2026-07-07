import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  globalIgnores([
    '**/.next/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/public/**',
    'next-env.d.ts',
    '**/prisma/generated/**',
  ]),

  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },

  eslintConfigPrettier,

  // Absolute priority for import/order
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'warn',
        {
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
            'object',
            'unknown',
          ],
          pathGroups: [
            { pattern: '@/app/**', group: 'internal', position: 'before' },
            { pattern: '@/src/app/**', group: 'internal', position: 'before' },
            {
              pattern: '@/src/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/src/widgets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/src/features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/src/entities/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/src/shared/**',
              group: 'internal',
              position: 'before',
            },

            { pattern: './*.module.scss', group: 'object', position: 'after' },
            {
              pattern: './**/*.module.scss',
              group: 'object',
              position: 'after',
            },
            { pattern: '../*.module.scss', group: 'object', position: 'after' },
            {
              pattern: '../**/*.module.scss',
              group: 'object',
              position: 'after',
            },
            { pattern: '*.module.scss', group: 'object', position: 'after' },
            { pattern: '**/*.module.scss', group: 'object', position: 'after' },
            { pattern: './*.module.css', group: 'object', position: 'after' },
            {
              pattern: './**/*.module.css',
              group: 'object',
              position: 'after',
            },
            { pattern: '*.module.css', group: 'object', position: 'after' },
            { pattern: '**/*.module.css', group: 'object', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
]);

export default eslintConfig;
