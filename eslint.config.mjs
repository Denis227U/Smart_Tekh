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

  // Prettier and import sorting for ALL files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
        },
      ],
    },
  },

  // Specific rules for TypeScript (replacing overrides)
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Disabling ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]);

export default eslintConfig;
