import { useState, useEffect } from "react";

const partners = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Indosat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Indosat_Ooredoo_Hutchison_logo.svg/512px-Indosat_Ooredoo_Hutchison_logo.svg.png" },
  { name: "Lintasarta", logo: "https://lintasarta.net/wp-content/uploads/2023/01/Logo-Lintasarta-Horizontal-Blue.png" },
  { name: "LINE", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" },
  { name: "Alcatel", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Alcatel-Lucent_logo.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Ericsson", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Ericsson_logo.svg" },
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" },
  { name: "XL Axiata", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/XL_Axiata_logo_2019.svg/512px-XL_Axiata_logo_2019.svg.png" },
  { name: "Keminfo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kementerian_Komunikasi_dan_Informatika.svg/512px-Kementerian_Komunikasi_dan_Informatika.svg.png" },
  { name: "Kampus Merdeka", logo: "https://kampusmerdeka.kemdikbud.go.id/static/media/logo-km.4db05ac4.png" },
  { name: "DBS Foundation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/DBS_Bank_Logo.svg/512px-DBS_Bank_Logo.svg.png" }
];

export default function TrustedPartnersSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setAnimationKey(prev => prev + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Telah dipercaya oleh
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            Bergabung dengan perusahaan-perusahaan terkemuka yang telah mempercayai solusi kami
          </p>
        </div>

        {/* Partners Logo Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex overflow-hidden">
            <div 
              className={`flex gap-8 md:gap-12 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                width: `${duplicatedPartners.length * 200}px`,
                animation: isPaused ? 'none' : 'scroll 40s linear infinite'
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-40 h-24 md:w-48 md:h-28 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-100 group-hover:border-sky-200 group-hover:scale-105 transform">
                    <div className="w-32 h-16 md:w-36 md:h-20 flex items-center justify-center p-4">
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-sky-50 transition-colors duration-300">
                        <span className="text-gray-600 text-sm font-medium group-hover:text-sky-600 transition-colors duration-300">
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="text-3xl font-bold text-sky-500 mb-2">100+</div>
              <div className="text-gray-600 text-sm">Perusahaan Partner</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="text-3xl font-bold text-sky-500 mb-2">50M+</div>
              <div className="text-gray-600 text-sm">Pengguna Aktif</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="text-3xl font-bold text-sky-500 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="text-3xl font-bold text-sky-500 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}