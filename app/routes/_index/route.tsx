import { Outlet, redirect } from "@remix-run/react";

export async function loader() {
  return redirect("/analytics", 302);
}

export default function RootLayout() {
  return (
    <Outlet />
  );
}
