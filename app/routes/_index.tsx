import type { MetaFunction } from "@remix-run/node";
import Header from "~/common/header";
import IndexHero from "~/components/HomePage/Contain1";
import TrustedPartnersSection from "~/components/HomePage/Contain2";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <>
  <Header />
  <IndexHero />
  <TrustedPartnersSection />
  </>;
}
