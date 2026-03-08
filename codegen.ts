import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'libs/shop/data/src/lib/graphql/schema.graphql',
  documents: ['libs/shop/data/src/lib/graphql/**/*.graphql'],
  generates: {
    'libs/shop/data/src/lib/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
