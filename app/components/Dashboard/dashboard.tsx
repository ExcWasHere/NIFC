import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Users, 
  MessageCircle, 
  Heart, 
  FileText,
  Bell,
  ChevronDown,
  BarChart3,
  Smile,
  ArrowRight,
  Menu,
  X,
  LogOut,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 300);
    const mockUserName = 'Icha';
    if (mockUserName) {
      setUserName(mockUserName);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const getInitials = (fullName) => {
    return fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-sky-500 to-blue-600', href: '/dashboard' },
    { id: 'emotions', label: 'Emotion Log', icon: Calendar, gradient: 'from-sky-400 to-sky-600', href: '/emolog' },
    { id: 'social-flow', label: 'Social Flow', icon: Users, gradient: 'from-sky-500 to-cyan-600', href: '/social-flow' },
    { id: 'consultation', label: 'Consultation', icon: MessageCircle, gradient: 'from-sky-600 to-blue-600', href: '/consultation' },
    { id: 'release-emotion', label: 'Release Emotion', icon: Heart, gradient: 'from-sky-500 to-pink-500', href: '/release-emotion' },
    { id: 'hope-scan', label: 'Hope Scan', icon: FileText, gradient: 'from-sky-400 to-indigo-500', href: '/hope-scan' },
  ];

  const statsCards = [
    {
      title: 'Status Emosi',
      value: '7.5',
      description: 'Skor Rata-rata',
      change: '+2.5 dari minggu lalu',
      changeType: 'positive',
      icon: Smile,
      gradient: 'from-sky-400 via-sky-500 to-sky-600',
      bgPattern: 'bg-gradient-to-br from-sky-50 to-sky-100',
      shadowColor: 'shadow-sky-200'
    },
    {
      title: 'Interaksi Sosial',
      value: '12',
      description: 'Mingguan',
      change: '+3 dari minggu lalu',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
      bgPattern: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      shadowColor: 'shadow-cyan-200'
    },
    {
      title: 'Sesi Konsultasi',
      value: '2',
      description: 'Bulan ini',
      change: 'Jadwal berikutnya: 15 Mei',
      changeType: 'neutral',
      icon: MessageCircle,
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-blue-100',
      shadowColor: 'shadow-blue-200'
    },
    {
      title: 'Sesi Curhat AI',
      value: '8',
      description: 'Minggu ini',
      change: '+5 dari minggu lalu',
      changeType: 'positive',
      icon: Heart,
      gradient: 'from-sky-400 via-sky-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-pink-100',
      shadowColor: 'shadow-pink-200'
    }
  ];

  const recentInteractions = [
    {
      id: 1,
      type: 'Keluarga',
      activity: 'Makan malam bersama',
      time: 'Kemarin',
      sentiment: 'Positif',
      avatar: 'KL',
      color: 'from-sky-400 to-sky-600'
    },
    {
      id: 2,
      type: 'Teman',
      activity: 'Olahraga bersama',
      time: '2 hari lalu',
      sentiment: 'Positif',
      avatar: 'TM',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 3,
      type: 'Rekan Kerja',
      activity: 'Meeting tim',
      time: '3 hari lalu',
      sentiment: 'Netral',
      avatar: 'RK',
      color: 'from-gray-400 to-gray-600'
    }
  ];

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin mau pergi:( ?')) {
      window.location.href = '/logout';
    }
  };

  const Logo = () => (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
      <img 
        src="/favicon.ico" 
        alt="Sembiru Logo" 
        className="w-full h-full object-contain"
      />
      <div className="w-full h-full bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 rounded-xl hidden items-center justify-center">
        <span className="text-white font-bold text-lg">S</span>
      </div>
    </div>
  );

  interface SidebarItemProps {
    item: {
      id: string;
      label: string;
      icon: React.ComponentType;
      gradient: string;
      href: string;
    };
  }

  const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => (
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
        <item.icon className={`w-4 h-4 ${item.id === activeTab ? 'text-white' : 'text-white'}`} />
      </div>
      <span className="font-medium text-sm">{item.label}</span>
      {item.id === activeTab && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sky-400 to-blue-600 rounded-r-full"></div>
      )}
    </a>
  );

  const StatsCard = ({ card, index }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform border border-gray-100 ${
      animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800">{card.title}</h3>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-md`}>
          <card.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-black text-gray-800 mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
            {card.value}
          </div>
          <div className="text-sm font-medium text-gray-600">{card.description}</div>
        </div>
        <div className="text-right">
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            card.changeType === 'positive' ? 'text-green-700 bg-green-100' : 
            card.changeType === 'negative' ? 'text-red-700 bg-red-100' : 'text-gray-700 bg-gray-100'
          }`}>
            {card.change}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 shadow-2xl transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Logo />
            <h2 className="text-2xl font-black text-white">
              Sem<span className="text-sky-300">biru</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* Logout Button - Now positioned next to logo */}
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

        {/* Navigation */}
        <nav className="mt-6 px-3 pb-20">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </div>
        </nav>
        
        {/* Mobile Logout Button */}
        <div className="absolute bottom-4 left-3 right-3 lg:hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3 bg-white/20 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden bg-sky-100 text-sky-600 p-2 rounded-xl hover:bg-sky-200 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1 font-medium text-sm">Selamat datang kembali, {getFirstName(userName)}! ✨</p>
                </div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                    <span className="hidden sm:inline font-medium">Notifikasi</span>
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center px-2 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full mr-0 sm:mr-3 flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">{getInitials(userName)}</span>
                    </div>
                    <span className="hidden sm:inline mr-2 font-semibold">{getFirstName(userName)}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {statsCards.map((card, index) => (
              <StatsCard key={index} card={card} index={index} />
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Mood Graph */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Grafik Emosi 7 Hari</h3>
                <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 rounded-xl hover:from-sky-200 hover:to-sky-300 transition-all duration-300 shadow-md text-sm">
                  7 Hari
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
              <div className="h-48 sm:h-72 bg-gradient-to-br from-sky-50 via-sky-100 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-sky-200">
                <div className="text-center text-sky-600 px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <p className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Grafik Emosi</p>
                  <p className="text-xs sm:text-sm text-sky-500 max-w-xs">Data tersedia setelah minimal 3 hari input emosi reguler</p>
                </div>
              </div>
            </div>

            {/* Social Interaction Tracker */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Interaksi Sosial Terbaru</h3>
                <a
                  href="/emolog"
                  className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-sky-500 to-cyan-600 text-white rounded-xl hover:from-sky-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Tambah Baru</span>
                  <span className="sm:hidden">Tambah</span>
                </a>
              </div>
              <div className="space-y-4">
                {recentInteractions.map((interaction, index) => (
                  <div key={interaction.id} 
                    className={`p-4 sm:p-5 border border-gray-100 rounded-2xl bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-102 ${
                      animateStats ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${(index + 4) * 100}ms` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${interaction.color} rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-md`}>
                          <span className="text-white font-bold text-xs sm:text-sm">{interaction.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm sm:text-base">{interaction.type}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 font-medium">{interaction.activity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs sm:text-sm text-gray-500 block mb-1 sm:mb-2 font-medium">{interaction.time}</span>
                        <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-sm ${
                          interaction.sentiment === 'Positif' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' 
                            : interaction.sentiment === 'Netral'
                            ? 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800'
                            : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                        }`}>
                          {interaction.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <a 
                  href="/social-flow"
                  className="flex items-center justify-center mx-auto text-sky-600 hover:text-sky-800 font-bold transition-colors group text-sm"
                >
                  Lihat semua interaksi
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/20 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Aksi Cepat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <a
                href="/emolog"
                className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:via-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
              >
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-base sm:text-lg">Catat Emosi Hari Ini</span>
                <span className="text-xs sm:text-sm text-sky-100 mt-2">Track your daily mood</span>
              </a>
              <a
                href="/release-emotion"
                className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white rounded-2xl hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
              >
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-base sm:text-lg">Mulai Chat AI</span>
                <span className="text-xs sm:text-sm text-cyan-100 mt-2">Get instant support</span>
              </a>
              <a
                href="/hope-scan"
                className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:via-sky-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group sm:col-span-2 lg:col-span-1"
              >
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-base sm:text-lg">Hope Scan</span>
                <span className="text-xs sm:text-sm text-blue-100 mt-2">Analyze your thoughts</span>
              </a>
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
    </div>
  );
};

export default Dashboard;