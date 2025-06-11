export default function TentangKamiPendahuluan(): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* CEO Quote Section */}
      <div className="bg-white py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-sky-300 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
            
            {/* CEO Profile Card */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="flex flex-col items-center text-center space-y-6">
                  
                  {/* Profile Image with Enhanced Effects */}
                  <div className="relative group/image">
                    <div className="absolute -inset-2 bg-gradient-to-r from-sky-600 to-sky-400 rounded-full blur-lg opacity-50 group-hover/image:opacity-75 transition duration-500"></div>
                    <div className="absolute -inset-1 bg-sky-200 rounded-full blur-sm group-hover/image:blur-md transition duration-500"></div>
                    <img
                      src="/about-us/profile/exc.jpg"
                      alt="CEO Sembiru"
                      className="relative w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-2xl border-4 border-white transform group-hover/image:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-600/20 to-transparent opacity-0 group-hover/image:opacity-100 transition duration-500"></div>
                  </div>
                  
                  {/* CEO Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-2xl md:text-3xl text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                      Excell Christian
                    </h3>
                    <p className="font-semibold text-sky-600 text-lg bg-sky-50 px-4 py-2 rounded-full">
                      Pendiri & CEO
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="h-1 w-16 bg-gradient-to-r from-sky-600 to-sky-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="flex-1 max-w-4xl">
              <div className="relative group">
                {/* Quote marks decoration */}
                <div className="absolute -top-4 -left-4 text-6xl md:text-8xl text-sky-200 font-serif transform group-hover:scale-110 transition duration-500">&quot;</div>
                
                <blockquote className="relative text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 p-6 md:p-8">
                  <span className="block mb-4">
                    Tujuan kami adalah membantu setiap individu menuju kesehatan mental yang optimal,
                  </span>
                  <span className="block mb-4">
                    menyediakan ruang aman di mana{" "}
                    <span className="text-sky-600 relative">
                      penyembuhan
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-sky-600 to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition duration-700"></div>
                    </span>{" "}
                    dan pertumbuhan personal berkembang,
                  </span>
                  <span className="block">
                    menciptakan keseimbangan dan kedamaian dalam segala aspek
                    kehidupan mental dan emosional.
                  </span>
                </blockquote>
              </div>
              
              {/* Mission Statement */}
              <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-sky-100 shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                  Visi Kami
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi platform terdepan yang menghubungkan setiap individu dengan kesehatan mental yang berkelanjutan, 
                  menciptakan komunitas yang mendukung pertumbuhan dan penyembuhan holistik.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}