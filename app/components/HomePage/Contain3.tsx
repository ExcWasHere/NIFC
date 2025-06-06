import React from "react";
import {
  IoAnalytics,
  IoShield,
  IoBarChart,
  IoFlower,
} from "react-icons/io5";
import { MdPsychology } from "react-icons/md";

interface FeatureProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const featureList: FeatureProps[] = [
  {
    id: 1,
    icon: <IoAnalytics className="h-6 w-6 text-sky-600" />,
    title: "Emolog (Emotion Log)",
    subtitle:
      "Emotion Log menyediakan sistem pencatatan emosi harian yang interaktif, membantu pengguna memahami pola perasaan mereka seiring waktu dan mengidentifikasi pemicu yang mempengaruhi kesejahteraan mental.",
  },
  {
    id: 2,
    icon: <MdPsychology className="h-6 w-6 text-sky-600" />,
    title: "Release Your Emotions",
    subtitle:
      "Fitur ini dibagi menjadi dua pilihan: Chat AI untuk percakapan bebas dengan AI yang memahami emosi Anda, dan Chat with Psychologist untuk sesi konseling langsung dengan profesional kesehatan mental.",
  },
  {
    id: 3,
    icon: <IoFlower className="h-6 w-6 text-sky-600" />,
    title: "Social Flow",
    subtitle:
      "Fitur Social Flow memungkinkan pengguna melacak dan mengevaluasi interaksi sosial mereka sehari-hari.",
  },
  {
    id: 4,
    icon: <IoBarChart className="h-6 w-6 text-sky-600" />,
    title: "Dashboard Stats",
    subtitle:
      "Dashboard, menampilkan ringkasan aktivitas pengguna, termasuk log emosi terbaru, status interaksi sosial, serta akses cepat ke fitur utama lainnya.",
  },
  {
    id: 5,
    icon: <IoShield className="h-6 w-6 text-sky-600" />,
    title: "Hope Scan",
    subtitle:
      "Fitur Hope Scan berfungsi sebagai alat pendeteksi dini untuk mengukur tingkat risiko bunuh diri pada pengguna berdasarkan analisis emosional dan perilaku dalam periode waktu tertentu.",
  },
];

const FeatureCard = ({ feature }: { feature: FeatureProps }) => {
  return (
    <div className="bg-white rounded-xl p-8 relative hover:scale-105 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-5 bg-sky-100 rounded-xl transform rotate-[1deg]"></div>
      <div className="relative bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-100">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {feature.title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4 pl-16">
          {feature.subtitle}
        </p>
      </div>
    </div>
  );
};

export default function IndexFeatures(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 w-[90vw]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
            Sembiru adalah inovasi digital yang membantu pengguna memantau dan memahami kesehatan mental secara mandiri.
            Sembiru hadir sebagai jawaban dari banyaknya masalah kesehatan mental di masa kini,
            Sembiru akan selalu siap menemani anda dalam kondisi apapun.
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
            Mental Health dengan
            <span className="text-sky-500"> Kecerdasan Buatan</span>
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-200 rounded-xl transform -rotate-3"></div>
              <img
                src="/index/mental-health-features.jpg"
                alt="Mental Health AI Support"
                className="relative rounded-xl shadow-xl w-full h-[400px] hover:rotate-1 hover:scale-[1.02] object-cover transform transition-transform duration-300"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-6">
              Mengapa harus pilih Sem
              <span className="text-sky-400">biru</span>?
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-semibold">
                  1
                </span>
                <p className="text-lg text-gray-600">
                  AI canggih yang memberikan dukungan mental health 24/7
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-semibold">
                  2
                </span>
                <p className="text-lg text-gray-600">
                  Chat AI dan Konseling yang dipersonalisasi sesuai kebutuhan individual
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-semibold">
                  3
                </span>
                <p className="text-lg text-gray-600">
                  Monitoring komprehensif dan pencegahan berbasis data psikologis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}