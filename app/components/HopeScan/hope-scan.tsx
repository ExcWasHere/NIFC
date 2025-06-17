import { useEffect, useRef, useState } from 'react';
import { Home, Calendar, Users, MessageCircle, Heart, FileText, LogOut, X, Bell, Download, Phone, User, UserCheck, AlertTriangle, TrendingUp, BookOpen, Plus } from 'lucide-react';
import Chart from 'chart.js/auto';

const Logo = () => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
    <img src="/favicon.ico" alt="Sembiru Logo" className="w-full h-full object-contain" />
  </div>
);

const HopeScanPage = () => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hope-scan');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-sky-500 to-blue-600', href: '/dashboard' },
    { id: 'emotions', label: 'Emotion Log', icon: Calendar, gradient: 'from-sky-400 to-sky-600', href: '/emolog' },
    { id: 'social-flow', label: 'Social Flow', icon: Users, gradient: 'from-sky-500 to-cyan-600', href: '/social-flow' },
    { id: 'consultation', label: 'Consultation', icon: MessageCircle, gradient: 'from-sky-600 to-blue-600', href: '/consultation' },
    { id: 'release-emotion', label: 'Release Emotion', icon: Heart, gradient: 'from-sky-500 to-pink-500', href: '/release-emotion' },
    { id: 'hope-scan', label: 'Hope Scan', icon: FileText, gradient: 'from-sky-400 to-indigo-500', href: '/hope-scan' },
  ];

  const riskFactors = [
    { name: 'Emosi Negatif', value: 75, color: 'red', period: '7 hari terakhir' },
    { name: 'Mood Rendah', value: 60, color: 'orange', period: '7 hari terakhir' },
    { name: 'Interaksi Sosial', value: 40, color: 'yellow', period: '7 hari terakhir' },
    { name: 'Pola Tidur', value: 80, color: 'red', period: '7 hari terakhir' },
  ];

  const analysisFactors = [
    { name: 'Perubahan emosi drastis', level: 'Tinggi', value: 85, color: 'red' },
    { name: 'Kurangnya dukungan sosial', level: 'Sedang', value: 50, color: 'yellow' },
    { name: 'Perasaan putus asa', level: 'Tinggi', value: 75, color: 'red' },
    { name: 'Penurunan minat aktivitas', level: 'Sedang', value: 60, color: 'yellow' },
    { name: 'Gangguan pola tidur', level: 'Tinggi', value: 80, color: 'red' },
  ];

  const weeklyMoods = [
    { day: 'Sen', mood: '😢', color: 'bg-red-100' },
    { day: 'Sel', mood: '😔', color: 'bg-orange-100' },
    { day: 'Rab', mood: '😐', color: 'bg-yellow-100' },
    { day: 'Kam', mood: '🙂', color: 'bg-green-100' },
    { day: 'Jum', mood: '😔', color: 'bg-orange-100' },
    { day: 'Sab', mood: '😢', color: 'bg-red-100' },
    { day: 'Min', mood: '❓', color: 'bg-gray-100' },
  ];

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin mau pergi :( ?')) {
      window.location.href = '/logout';
    }
  };

  const getRiskLevel = (score) => {
    if (score >= 81) return { level: 'Kritis', color: 'bg-red-100 text-red-800' };
    if (score >= 61) return { level: 'Perhatian', color: 'bg-yellow-100 text-yellow-800' };
    if (score >= 41) return { level: 'Waspada', color: 'bg-yellow-100 text-yellow-600' };
    if (score >= 21) return { level: 'Baik', color: 'bg-green-100 text-green-800' };
    return { level: 'Stabil', color: 'bg-green-100 text-green-800' };
  };

  const currentRiskScore = 65;
  const currentRisk = getRiskLevel(currentRiskScore);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr', '27 Apr', '28 Apr', '29 Apr', '30 Apr', '1 Mei', '2 Mei', '3 Mei', '4 Mei', '5 Mei', '6 Mei', '7 Mei', '8 Mei', '9 Mei', '10 Mei', '11 Mei', '12 Mei', '13 Mei', '14 Mei'],
          datasets: [
            {
              label: 'Emosi Positif',
              data: [45, 40, 30, 35, 25, 20, 15, 25, 30, 35, 40, 45, 40, 30, 25, 20, 15, 10, 15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 35, 40],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Emosi Negatif',
              data: [55, 60, 70, 65, 75, 80, 85, 75, 70, 65, 60, 55, 60, 70, 75, 80, 85, 90, 85, 80, 75, 70, 75, 80, 85, 80, 75, 70, 65, 60],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Persentase (%)'
              }
            },
            x: {
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 shadow-2xl transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Logo />
            <h2 className="text-2xl font-black text-white">Sem<span className="text-sky-300">biru</span></h2>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleLogout} className="lg:flex hidden items-center justify-center w-8 h-8 text-white hover:bg-white/20 rounded-lg transition-all duration-300 group" title="Logout">
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="mt-6 px-3 pb-20">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <a key={item.id} href={item.href}
                 className={`group relative w-full flex items-center px-4 py-3.5 text-left rounded-xl transition-all duration-300 ${
                   item.id === activeTab
                     ? 'bg-white text-gray-800 shadow-lg transform translate-x-2 scale-105'
                     : 'text-white hover:bg-white/20 hover:transform hover:translate-x-1'
                 }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 shadow-md transition-all duration-300 ${
                  item.id === activeTab
                    ? `bg-gradient-to-r ${item.gradient}`
                    : 'bg-white/20 group-hover:bg-white/30 group-hover:scale-110'
                }`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-sky-800 mb-2">Hope Scan</h1>
            <p className="text-sky-600">Deteksi dini risiko bunuh diri</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl flex items-center shadow-lg transition-all duration-300 hover:shadow-xl">
              <Bell className="w-4 h-4 mr-2" />
              <span>Notifikasi</span>
            </button>
            
            <button className="bg-white hover:bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl flex items-center shadow-lg transition-all duration-300 hover:shadow-xl">
              <Download className="w-4 h-4 mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Risk Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-sky-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-sky-800">Skor Risiko Saat Ini</h2>
            <div className={`px-4 py-2 rounded-full font-semibold ${currentRisk.color}`}>
              {currentRisk.level}
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex-1 mr-6">
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1500 ease-out" 
                  style={{ width: `${currentRiskScore}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center min-w-[80px]">
              <span className="text-4xl font-bold text-sky-800">{currentRiskScore}</span>
              <span className="text-gray-500 text-lg">/100</span>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3 text-center text-sm">
            <div className="bg-green-100 p-3 rounded-xl border-2 border-transparent hover:border-green-300 transition-all">
              <div className="font-semibold text-green-800">0-20</div>
              <div className="text-green-600">Stabil</div>
            </div>
            <div className="bg-green-200 p-3 rounded-xl border-2 border-transparent hover:border-green-400 transition-all">
              <div className="font-semibold text-green-800">21-40</div>
              <div className="text-green-700">Baik</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl border-2 border-transparent hover:border-yellow-400 transition-all">
              <div className="font-semibold text-yellow-800">41-60</div>
              <div className="text-yellow-700">Waspada</div>
            </div>
            <div className="bg-yellow-200 p-3 rounded-xl border-4 border-yellow-500 shadow-lg transform scale-105">
              <div className="font-bold text-yellow-900">61-80</div>
              <div className="text-yellow-800 font-semibold">Perhatian</div>
            </div>
            <div className="bg-red-100 p-3 rounded-xl border-2 border-transparent hover:border-red-400 transition-all">
              <div className="font-semibold text-red-800">81-100</div>
              <div className="text-red-700">Kritis</div>
            </div>
          </div>
        </div>

        {/* Risk Factor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {riskFactors.map((factor, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-sky-100 group">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sky-800 group-hover:text-sky-900 transition-colors">{factor.name}</h3>
                <span className={`text-3xl font-bold ${
                  factor.color === 'red' ? 'text-red-500' : 
                  factor.color === 'orange' ? 'text-orange-500' : 
                  factor.color === 'yellow' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {factor.value}%
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{factor.period}</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    factor.color === 'red' ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                    factor.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                    factor.color === 'yellow' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-green-400 to-green-600'
                  }`}
                  style={{ width: `${factor.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Emotion Trend Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Tren Emosi (30 Hari Terakhir)
            </h3>
            <div className="h-80">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
          
          {/* Risk Factors Analysis */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-800 mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Analisis Faktor Risiko
            </h3>
            <div className="space-y-6">
              {analysisFactors.map((factor, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                    <span className={`text-sm font-bold ${
                      factor.color === 'red' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {factor.level}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        factor.color === 'red' ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      }`}
                      style={{ width: `${factor.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations and Emergency Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-800 mb-6">Rekomendasi</h3>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-500 p-6 rounded-xl">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Jadwalkan Konsultasi</h3>
                    <p className="text-blue-700 mb-4">
                      Berdasarkan hasil analisis, kami merekomendasikan untuk segera melakukan konsultasi dengan konselor. Skor risiko Anda memerlukan perhatian profesional.
                    </p>
                    <a href="/consultation" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                      Jadwalkan Sekarang
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Latihan Pernapasan', desc: 'Lakukan latihan pernapasan dalam 5-10 menit, 3x sehari untuk mengurangi kecemasan.' },
                  { title: 'Hubungi Teman Dekat', desc: 'Tingkatkan interaksi sosial melalui percakapan ringan dengan orang terdekat.' },
                  { title: 'Rutinkan Waktu Tidur', desc: 'Tetapkan jadwal tidur yang konsisten untuk memperbaiki pola tidur.' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start bg-sky-50 p-4 rounded-xl">
                    <span className="bg-sky-200 text-sky-800 flex items-center justify-center h-8 w-8 rounded-full mr-4 font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sky-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-sky-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-800 mb-6">Kontak Darurat</h3>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Hotline Nasional</p>
                  <p className="text-2xl font-bold text-red-800">119</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-sky-50 rounded-xl border border-sky-200">
                <div className="bg-sky-100 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-sky-700">Konselor Utama</p>
                  <p className="text-lg font-bold text-sky-800">Dr. Amelia Sari</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <UserCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Grup Dukungan</p>
                  <p className="text-lg font-bold text-green-800">Komunitas Peduli</p>
                </div>
              </div>
              
              <a href="/emergency-call" className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center mt-6 transition-all duration-300 hover:shadow-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>Bantuan Darurat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Daily Mood and Journal */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-sky-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-sky-800 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Catatan Harian
            </h2>
            <a href="/emolog" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-all duration-300 hover:shadow-lg cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Catatan
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-sky-800 mb-4">Mood Harian</h3>
              <div className="grid grid-cols-7 gap-3 text-center">
                {weeklyMoods.map((mood, index) => (
                  <div key={index} className="group">
                    <div className={`${mood.color} rounded-xl p-4 mb-2 text-2xl group-hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                      {mood.mood}
                    </div>
                    <div className="text-xs font-medium text-gray-600">{mood.day}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-sky-800 mb-4">Entri Jurnal Terbaru</h3>
              <div className="border-2 border-sky-100 rounded-xl p-6 hover:border-sky-200 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-gray-800">Kemarin, 21:45</div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Emosi Negatif
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Hari ini sangat berat. Saya merasa lelah dan sendirian. Sepertinya tidak ada yang memahami apa yang saya rasakan. Saya mencoba untuk tetap positif tapi sulit rasanya...
                </p>
                <button className="text-sky-600 hover:text-sky-800 text-sm font-semibold hover:underline transition-colors">
                  Lihat Selengkapnya →
                </button>
              </div>
            </div>
          </div>
        </div>

       {/* Footer */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-600 mb-4 md:mb-0 font-medium text-center md:text-left">
              © 2025 <span className="font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Sembiru</span>. Hak Cipta Dilindungi.
            </div>
            <div className="flex items-center space-x-6 sm:space-x-8">
              <a href="/about-us" className="text-xs sm:text-sm text-sky-600 hover:text-sky-800 transition-colors font-semibold">
                About-Us
              </a>
              <a href="https://linktr.ee/Sembiru" className="text-xs sm:text-sm text-sky-600 hover:text-sky-800 transition-colors font-semibold">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HopeScanPage;