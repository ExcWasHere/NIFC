import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import ReleaseEmotion from "~/components/ReleaseYourEmotion/chat-Ai";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | ChatBot" },
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
  return <ReleaseEmotion />;
}