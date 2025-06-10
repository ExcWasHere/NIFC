import { BiChevronRight } from "react-icons/bi";

export default function AboutUsContact(): JSX.Element {
  return (
    <div className="relative h-screen bg-gradient-to-br from-green-300 to-green-600 text-white">
      <div className="absolute inset-0">
        <img
          src="/about-us/hero1.png"
          alt="Hero"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-sky-50 to-transparent"></div>
      <main className="relative z-10 flex flex-col md:flex-row w-[90vw] mx-auto py-8 items-center justify-between h-full text-center md:text-left">
        <div className="flex flex-col max-w-xl space-y-10 text-black">
          <h1 className="text-4xl md:text-6xl font-semibold leading-snug ">
            Have a <span className="text-sky-600">question?</span> Our team is
            happy to assist you
          </h1>
          <p className="text-base md:text-lg max-w-[28rem]">
            Ask about Serene, our services, or anything else. Our highly trained
            reps are standing by, ready to help.
          </p>
          <hr className="border-t-2 border-gray-600" />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
            <button className="flex items-center justify-between px-8 py-4 bg-sky-200 text-black rounded-xl shadow-xl font-bold hover:scale-110 transition-all duration-500">
              Contact Us <BiChevronRight size={25} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}