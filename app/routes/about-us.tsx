import { MetaFunction } from "@remix-run/react";
import Footer from "~/common/footer";
import Header from "~/common/header";
import AboutUsTeam from "~/components/About-Us/Contain1";
import AboutUsContact from "~/components/About-Us/Contain2";
import AboutUsHero from "~/components/About-Us/Hero";



export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | About-Us" },
    { name: "description", content: "" },
  ];
};

export default function AboutUs() {
    return (
        <>
        <Header />
        <AboutUsHero />
        <AboutUsTeam />
        <AboutUsContact />
        <Footer />
        </>
    )
}