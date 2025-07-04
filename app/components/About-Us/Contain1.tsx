import { BiChevronRight } from "react-icons/bi";

const profileList = [
  {
    id: 1,
    name: "Excell Christian",
    job: "Fullstack Developer",
    image: "/about-us/profile/exc.jpg",
  },
  {
    id: 2,
    name: "Dewi Chalissa Rania",
    job: "UI/UX Designer",
    image: "/about-us/profile/icha.jpg",
  },
  {
    id: 3,
    name: "Gaduh Prakoso",
    job: "Frontend Developer",
    image: "/about-us/profile/gaduh.jpg",
  },
];

export default function AboutUsTeam(): JSX.Element {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Temui Tim <br />
              <span className="text-sky-600 bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
                Hebat Kami
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Melepaskan Potensi, Menggerakkan Transformasi, Memberdayakan
              Pikiran untuk Inovasi dan Menginspirasi.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-sky-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <img
                src="/about-us/profile/team7v2.jpg"
                alt="Team"
                className="w-[300px] h-[150px] md:w-[400px] md:h-[200px] object-cover rounded-lg shadow-xl transform rotate-3 transition duration-500 group-hover:rotate-0"
                style={{ objectPosition: "top bottom" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profileList.map((profile) => (
            <div
              key={profile.id}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  {profile.name}
                </h1>
                <h2 className="mt-2 text-gray-600 italic">{profile.job}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl order-2 md:order-1">
          <p className="text-gray-600 leading-relaxed text-center md:text-left">
            Kami percaya bahwa dibutuhkan orang-orang hebat untuk membuat
            produk hebat. Itulah mengapa kami tidak hanya merekrut profesional
            yang sempurna, tetapi orang-orang yang berniat dam berminat dengan
            perusahaan kami.
          </p>
          <div className="mt-8 flex items-center justify-center md:justify-start group">
            <a href="https://linktr.ee/Sembiru" className="text-sky-600 font-semibold group-hover:text-sky-700 transition-colors duration-300 flex items-center gap-1">
              Yuk Daftarin!
              <BiChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center md:text-right order-1 md:order-2">
        Bergabunglah dengan <br />
        <span className="text-sky-600">tim kami</span>
          </h1>
        </div>
      </div>
    </div>
  );
}