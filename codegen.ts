import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'libs/shop/data/src/lib/graphql/schema.graphql',
  documents: ['libs/shop/data/src/lib/graphql/**/*.graphql'],
  generates: {
    'libs/shop/data/src/lib/graphql/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
        },
        fragmentMasking: false,
        dedupeFragments: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
