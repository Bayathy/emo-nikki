import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [env.HASURA_ENDPOINT as string]: {
      headers: {
        "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET!,
      },
    },
  },
  documents: "app/**/*",
  generates: {
    // "app/gql": {
    //   preset: "client",
    //   plugins: []
    // },
    "./app/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        useTypeImports: true,
        scalars: {
          uuid: "string",
          date: "string",
        },
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
