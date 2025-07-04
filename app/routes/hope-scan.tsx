import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import HopeScanPage from "~/components/HopeScan/hope-scan";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | Hope-Scan" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login?unauthorized=1");
  }
  return json({});
}

export default function Index() {
  return <HopeScanPage />;
}