import type { MetaFunction } from "@remix-run/node";
import Footer from "~/common/footer";
import Header from "~/common/header";
import IndexHero from "~/components/HomePage/Contain1";
import TrustedPartnersSection from "~/components/HomePage/Contain2";
import IndexFeatures from "~/components/HomePage/Contain3";
import IndexIntroduction from "~/components/HomePage/Contain4";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | HomePage" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export default function Index() {
  return <>
  <Header />
  <IndexHero />
  <TrustedPartnersSection />
  <IndexFeatures />
  <IndexIntroduction />
  <Footer />
  </>;
}
