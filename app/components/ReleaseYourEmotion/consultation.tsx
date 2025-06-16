import { useState } from 'react';
import {
  Home,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  FileText,
  LogOut,
  X
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-sky-500 to-blue-600', href: '/dashboard' },
  { id: 'emolog', label: 'Emotion Log', icon: Calendar, gradient: 'from-sky-400 to-sky-600', href: '/emolog' },
  { id: 'social-flow', label: 'Social Flow', icon: Users, gradient: 'from-sky-500 to-cyan-600', href: '/social-flow' },
  { id: 'consultation', label: 'Consultation', icon: MessageCircle, gradient: 'from-sky-600 to-blue-600', href: '/consultation' },
  { id: 'release-emotion', label: 'Release Emotion', icon: Heart, gradient: 'from-sky-500 to-pink-500', href: '/release-emotion' },
  { id: 'hope-scan', label: 'Hope Scan', icon: FileText, gradient: 'from-sky-400 to-indigo-500', href: '/hope-scan' }
];

const psychologists = [
  {
    id: 1,
    name: 'Dr. Anita Wijaya, M.Psi',
    photo: '/api/placeholder/100/100',
    specialties: ['Depresi', 'Kecemasan', 'Trauma'],
    rating: 4.9,
    reviewCount: 128,
    address: 'Jl. Gatot Subroto No. 123, Jakarta Selatan',
    experience: '10 tahun',
    price: 'Free/limited session',
    online: true
  },
  {
    id: 2,
    name: 'Dr. Budi Santoso, M.Psi',
    photo: '/api/placeholder/100/100',
    specialties: ['Masalah Keluarga', 'Stress', 'ADHD'],
    rating: 4.7,
    reviewCount: 95,
    address: 'Jl. Diponegoro No. 45, Bandung',
    experience: '8 tahun',
    price: 'Rp300.000/sesi',
    online: false
  },
  // Tambahkan sesuai kebutuhan
];

const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin mau pergi:( ?')) {
      window.location.href = '/logout';
    }
  };

  const Logo = () => (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
      <img src="/favicon.ico" alt="Sembiru Logo" className="w-full h-full object-contain" />
    </div>
  );

  const SidebarItem = ({ item }) => (
    <a
      href={item.href}
      onClick={() => {
        setActiveTab(item.id);
        setSidebarOpen(false);
      }}
      className={`group relative w-full flex items-center px-4 py-3.5 text-left rounded-xl transition-all duration-300 ${
        item.id === activeTab
          ? 'bg-white text-gray-800 shadow-lg transform translate-x-2 scale-105'
          : 'text-white hover:bg-white/20 hover:transform hover:translate-x-1'
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 shadow-md ${
        item.id === activeTab
          ? `bg-gradient-to-r ${item.gradient}`
          : 'bg-white/20 group-hover:bg-white/30 group-hover:scale-110'
      }`}>
        <item.icon className="w-4 h-4 text-white" />
      </div>
      <span className="font-medium text-sm">{item.label}</span>
      {item.id === activeTab && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sky-400 to-blue-600 rounded-r-full"></div>
      )}
    </a>
  );

  const filteredPsychologists = psychologists.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.specialties.some((s) => s.toLowerCase().includes(q)) ||
      p.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 shadow-2xl transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Logo />
            <h2 className="text-2xl font-black text-white">Sem<span className="text-sky-300">biru</span></h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="lg:flex hidden items-center justify-center w-8 h-8 text-white hover:bg-white/20 rounded-lg transition-all duration-300 group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <nav className="mt-6 px-3 pb-20">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </div>
        </nav>
        <div className="absolute bottom-4 left-3 right-3 lg:hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3 bg-white/20 group-hover:bg-white/30 group-hover:scale-110">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      <main className="lg:ml-64 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Consultation</h1>
          <p className="text-gray-600 mt-1">Cari dan hubungi psikolog profesional</p>
        </header>

        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari psikolog..."
            className="w-full lg:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPsychologists.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-start">
                <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-sky-800">{p.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${p.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {p.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{p.address}</div>
                  <div className="flex items-center mt-1 text-yellow-500 text-sm">
                    ★ {p.rating} <span className="text-gray-500 ml-1">({p.reviewCount} ulasan)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.specialties.map((s) => (
                      <span key={s} className="px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs">{s}</span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">Pengalaman: {p.experience}</div>
                  <div className="text-sm font-medium text-sky-700">{p.price}</div>
                </div>
              </div>
              <button className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg">Lihat Detail</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ConsultationPage;
