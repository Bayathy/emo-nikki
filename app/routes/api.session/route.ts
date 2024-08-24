import { ActionFunctionArgs, json, redirect } from "@remix-run/cloudflare";

import { getKVSession } from "~/lib/session.server";

type SessionRequest = {
  userId: string
};

export const action = async({ request, context }: ActionFunctionArgs) => {
  const env = context.cloudflare.env as Env;

  const body: SessionRequest = await request.json();

  const KV = getKVSession(env.SESSION_KV);

  const session = await KV.getSession(
    request.headers.get("Cookie"),
  );

  if (!session) {
    return json({ error: "No session found" }, { status: 401 });
  }

  if (!session.get("userId") || session.get("userId") !== body.userId) {
    if (body.userId) {
      session.set("userId", body.userId as string);
    }

    return redirect("/analytics", {
      headers: {
        "Set-Cookie": await KV.commitSession(session),
      },
    });
  }

  return null;
};
