import {
  createCookie,
  createWorkersKVSessionStorage,
} from "@remix-run/cloudflare";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  httpOnly: true,
  path: "/",
  sameSite: true,
  maxAge: 60 * 60 * 24 * 7,
  secrets: ["r3m1xr0ck5"],
  secure: true,
});

export const getKVSession = (kv: KVNamespace) => createWorkersKVSessionStorage({
  kv,
  cookie: sessionCookie,
});
