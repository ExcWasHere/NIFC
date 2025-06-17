import type { MetaFunction } from "@remix-run/node";
import SembiruEmergencyCall from "~/components/HopeScan/emergency";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | 119" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export default function Index() {
  return <>
 <SembiruEmergencyCall />
  </>;
}