import React, { useState } from 'react';
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

const SocialFlowPage = () => {
  const [activeTab, setActiveTab] = useState('social-flow');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [count, setCount] = useState<number | ''>('');
  const [result, setResult] = useState<JSX.Element | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin mau pergi:( ?')) {
      window.location.href = '/logout';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count === '' || count < 0) {
      setResult(<p className="text-red-500 text-lg">Masukkan jumlah interaksi yang valid.</p>);
      return;
    }

    let type = '';
    let typeClass = '';
    let message = '';

    if (count >= 8) {
      type = 'Extrovert';
      typeClass = 'bg-green-100 text-green-800';
      message = 'Hai!, Tingkat interaksimu sangat tinggi, Kamu tampaknya sedang bahagia dan dalam mood yang bagus';
    } else if (count >= 4) {
      type = 'Ambivert';
      typeClass = 'bg-yellow-100 text-yellow-800';
      message = 'Hai!, Mood mu lagi biasa aja ya?, bisa nyaman sendiri bisa sama orang lain.';
    } else {
      type = 'Introvert';
      typeClass = 'bg-purple-100 text-purple-800';
      message = 'Hai!, Kamu lagi ga mood bersosialisasi ya?, Itu tidak masalah, tetap jaga koneksi sosial sesuai kenyamananmu ya.';
    }

    setResult(
      <div>
        <p className={`font-bold text-2xl mb-2 ${typeClass.replace('bg-', 'text-')}`}>{type}</p>
        <p className="text-sky-800">{message}</p>
      </div>
    );

    const today = new Date();
    const dateStr = today.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    setHistory([
      {
        id: today.getTime(),
        date: dateStr,
        count,
        type,
        typeClass
      },
      ...history
    ]);

    setCount('');
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
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 shadow-md transition-all duration-300 ${
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
        <header className="mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Social Flow</h1>
          <p className="text-gray-600 mt-1">Pantau dan catat interaksi sosialmu</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-sky-900 mb-4">Catat Interaksi Sosial Hari Ini</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                min="0"
                value={count}
                onChange={(e) => setCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full mb-4 p-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Masukkan jumlah interaksi"
              />
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
              >
                Simpan Data
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-sky-900 mb-4">Analisis Interaksi Sosial</h3>
            <div className="min-h-[150px] flex items-center justify-center text-center text-sky-800">
              {result || <p className="italic text-gray-500">Belum ada data yang dimasukkan.</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-sky-900 mb-4">Riwayat Interaksi Sosial</h3>
          {history.length === 0 ? (
            <p className="italic text-gray-500">Belum ada riwayat.</p>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div key={h.id} className="bg-sky-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sky-800">{h.date}</h4>
                    <p className="text-sm text-sky-700">{h.count} interaksi</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${h.typeClass}`}>
                    {h.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SocialFlowPage;
