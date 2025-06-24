import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/session.server";
import Dashboard from "~/components/Dashboard/dashboard";

type LoaderData = {
  userName: string;
  userId: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | Dashboard" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return redirect("/login?unauthorized=1");
  }

  const userName = session.get("userName") ?? "Pengguna";
  const userId = session.get("userId") ?? "";

  return json<LoaderData>({ userName, userId });
}

export default function DashboardRoute() {
  const { userName, userId } = useLoaderData<LoaderData>();
  return <Dashboard userName={userName} userId={userId} />;
}
