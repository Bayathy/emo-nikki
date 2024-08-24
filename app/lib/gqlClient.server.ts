import type { AppLoadContext } from "@remix-run/cloudflare";
import { GraphQLClient } from "graphql-request";

import { getSdk } from "~/graphql/generated";

export const getGqlClient = (context: AppLoadContext) => {
  const env = context.cloudflare.env as Env;

  return getSdk(new GraphQLClient(env.HASURA_ENDPOINT, {
    headers: {
      "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET,
    },
  }));
};
