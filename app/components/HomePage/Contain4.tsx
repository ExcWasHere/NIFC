interface ProcessProps {
  title: string;
  subtitle: string;
}

const processList: ProcessProps[] = [
  {
    title: "Registrasi dan Assessment Awal",
    subtitle:
      "Mulai dengan mendaftar dan mengisi assessment awal tentang kondisi mental health Anda, seperti tingkat stres, mood, dan riwayat kesehatan mental.",
  },
  {
    title: "AI Analisis dan Rekomendasi Personal",
    subtitle:
      "Dengan teknologi AI canggih, kami akan menganalisis data Anda dan memberikan rekomendasi program terapi yang sesuai dengan kebutuhan mental health Anda.",
  },
  {
    title: "Mulai Program dan Tracking Progress",
    subtitle:
      "Setelah mendapatkan rekomendasi yang tepat, mulai program terapi dan self-care Anda. Pantau progress kesehatan mental dengan fitur tracking yang komprehensif.",
  },
];

export default function IndexIntroduction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 ">
      <div className="container mx-auto px-4 py-16 w-[90vw]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
            Perkenankan saya memaparkan{" "}
            <span className="text-sky-500">mekanisme kerjanya.</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
            Kami hadir untuk memandu Anda langkah demi langkah dalam perjalanan 
            kesehatan mental. Dengan antarmuka yang intuitif dan dukungan AI yang 
            personal, Anda dapat mengakses berbagai program self-care 
            yang dirancang khusus untuk Anda.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="flex flex-col gap-12 lg:w-1/2">
            {processList.map((list, index) => (
              <div
                key={list.title}
                className="transform transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-semibold">
                    {index + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    {list.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed pl-12">
                  {list.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-200 rounded-xl transform rotate-3"></div>
              <img
                src="/index/mental-health-intro.jpg"
                alt="Mental Health Process Illustration"
                className="relative rounded-xl shadow-xl w-full h-[500px] object-cover transform transition-all duration-300 hover:-rotate-[1deg] hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}