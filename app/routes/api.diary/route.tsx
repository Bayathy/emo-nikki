import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";

import { getGqlClient } from "~/lib/gqlClient.server";
import { getKVSession } from "~/lib/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const reqUrl = new URL(request.url);

  const date = reqUrl.searchParams.get("date");

  const env = context.cloudflare.env as Env;

  const KV = getKVSession(env.SESSION_KV);

  const session = await KV.getSession(request.headers.get("Cookie"));

  const gqlClient = getGqlClient(context);

  if (date) {
    const { users } = await gqlClient.GetDiaryByDate({
      uid: session?.get("userId"),
      date,
    });

    const diary = users[0]?.diaries[0];
    const sentiments = users[0]?.sentiments[0];
    const questions = users[0]?.questions[0];

    return json({ diary, sentiments, questions });
  }
}
