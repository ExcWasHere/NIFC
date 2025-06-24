import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import EmologPage from "~/components/Emolog/emolog";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | Emolog" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  return json({
    userId: session.get("userId"),
    userName: session.get("userName"),
    userEmail: session.get("userEmail"),
  });
}

export default function Index() {
  return <EmologPage />;
}
