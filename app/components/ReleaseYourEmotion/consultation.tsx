import { useState } from 'react';
import {
  Home,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  FileText,
  LogOut,
  X,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Video,
  Send,
  Smile
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
    online: true,
    description: 'Psikolog klinis berpengalaman dengan fokus pada terapi kognitif behavioral dan trauma healing. Telah menangani lebih dari 500 kasus dengan tingkat kesuksesan tinggi.',
    education: 'S2 Psikologi Klinis - Universitas Indonesia',
    languages: ['Bahasa Indonesia', 'English'],
    availability: 'Senin - Jumat: 09:00 - 17:00',
    reviews: [
      { name: 'Sarah M.', rating: 5, comment: 'Sangat membantu dan profesional. Terima kasih Dr. Anita!' },
      { name: 'Ahmad R.', rating: 5, comment: 'Pendekatan yang sangat baik, saya merasa lebih baik setelah konsultasi.' }
    ]
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
    online: false,
    description: 'Spesialis dalam terapi keluarga dan manajemen stress. Menggunakan pendekatan holistik untuk membantu klien mencapai keseimbangan hidup.',
    education: 'S2 Psikologi Keluarga - Universitas Padjadjaran',
    languages: ['Bahasa Indonesia', 'Bahasa Sunda'],
    availability: 'Selasa - Sabtu: 10:00 - 16:00',
    reviews: [
      { name: 'Lisa K.', rating: 5, comment: 'Dr. Budi sangat memahami masalah keluarga kami.' },
      { name: 'Andi P.', rating: 4, comment: 'Sesi yang produktif, akan lanjut konsultasi.' }
    ]
  }
];

const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'doctor', message: 'Halo! Selamat datang di sesi konsultasi. Ada yang bisa saya bantu hari ini?', time: '10:00' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin mau pergi:( ?')) {
      window.location.href = '/logout';
    }
  };

  const handleViewDetail = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailModal(true);
  };

  const handleStartChat = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailModal(false);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
      
      setTimeout(() => {
        const doctorResponse = {
          id: chatMessages.length + 2,
          sender: 'doctor',
          message: 'Terima kasih sudah berbagi. Saya memahami situasi Anda. Mari kita diskusikan lebih lanjut...',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 2000);
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

  const DetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-sky-800">Detail Psikolog</h2>
          <button
            onClick={() => setShowDetailModal(false)}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start mb-6">
            <img src={selectedDoctor?.photo} alt={selectedDoctor?.name} className="w-24 h-24 rounded-full object-cover" />
            <div className="ml-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-sky-800">{selectedDoctor?.name}</h3>
                  <p className="text-gray-600">{selectedDoctor?.education}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDoctor?.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedDoctor?.online ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <div className="flex items-center mt-2 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-medium">{selectedDoctor?.rating}</span>
                <span className="text-gray-500 ml-1">({selectedDoctor?.reviewCount} ulasan)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-sky-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Alamat</p>
                  <p className="text-gray-600 text-sm">{selectedDoctor?.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-sky-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Jam Praktik</p>
                  <p className="text-gray-600 text-sm">{selectedDoctor?.availability}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-sky-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Tarif</p>
                  <p className="text-sky-700 font-medium text-sm">{selectedDoctor?.price}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-800 mb-2">Spesialisasi</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor?.specialties.map((specialty) => (
                    <span key={specialty} className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Bahasa</p>
                <p className="text-gray-600 text-sm">{selectedDoctor?.languages.join(', ')}</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Pengalaman</p>
                <p className="text-gray-600 text-sm">{selectedDoctor?.experience}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Tentang</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{selectedDoctor?.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Ulasan Terbaru</h4>
            <div className="space-y-3">
              {selectedDoctor?.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{review.name}</span>
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleStartChat(selectedDoctor)}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Mulai Chat
            </button>
            <button
              onClick={() => alert('Fitur video call akan segera tersedia!')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            >
              <Video className="w-4 h-4 mr-2" />
              Video Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full h-[600px] flex flex-col">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center">
            <img src={selectedDoctor?.photo} alt={selectedDoctor?.name} className="w-10 h-10 rounded-full object-cover mr-3" />
            <div>
              <h3 className="font-semibold">{selectedDoctor?.name}</h3>
              <p className="text-sky-100 text-sm">Online</p>
            </div>
          </div>
          <button
            onClick={() => setShowChatModal(false)}
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-sky-100' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full">
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
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
              <button 
                onClick={() => handleViewDetail(p)}
                className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg transition-colors"
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </main>

      {showDetailModal && selectedDoctor && <DetailModal />}
      {showChatModal && selectedDoctor && <ChatModal />}
    </div>
  );
};

export default ConsultationPage;