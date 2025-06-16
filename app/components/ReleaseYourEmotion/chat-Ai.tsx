import React, { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  FileText,
  LogOut,
  X,
  Send,
  Lock,
  UserCheck,
  Zap,
  Waves,
  BookOpen,
  Headphones,
  RefreshCw
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, gradient: "from-sky-500 to-blue-600", href: "/dashboard" },
  { id: "emotions", label: "Emotion Log", icon: Calendar, gradient: "from-sky-400 to-sky-600", href: "/emolog" },
  { id: "social-flow", label: "Social Flow", icon: Users, gradient: "from-sky-500 to-cyan-600", href: "/social-flow" },
  { id: "consultation", label: "Consultation", icon: MessageCircle, gradient: "from-sky-600 to-blue-600", href: "/consultation" },
  { id: "release-emotion", label: "Release Emotion", icon: Heart, gradient: "from-sky-500 to-pink-500", href: "/release-emotion" },
  { id: "hope-scan", label: "Hope Scan", icon: FileText, gradient: "from-sky-400 to-indigo-500", href: "/hope-scan" }
];

const characters = {
  'supportive-friend': {
    name: 'Sahabat Pengertian',
    description: 'Teman yang selalu ada untukmu',
    icon: UserCheck,
    iconBg: 'bg-purple-200',
    iconColor: 'text-purple-600',
    gradient: 'from-purple-400 to-purple-600',
    greeting: 'Halo! Apa yang sedang kamu rasakan hari ini? Aku di sini untuk mendengarkan dan mendukungmu. ❤️',
    responses: [
      "Aku mengerti perasaanmu. Tidak apa untuk merasa seperti itu. 🤗",
      "Kamu telah melalui banyak hal, wajar jika merasa begitu. Aku di sini untukmu. Tetap semangat ya! 💪",
      "Terima kasih sudah mau bercerita. Bagaimana aku bisa membantumu lebih lanjut? 🤝",
      "Kamu sangat hebat bisa menghadapi semua ini. Aku bangga padamu. ✨",
      "Kadang kita semua butuh seseorang untuk mendengarkan. Aku senang bisa jadi orang itu untukmu. 💝"
    ]
  },
  'motivator': {
    name: 'Motivator',
    description: 'Memberikan dorongan positif',
    icon: Zap,
    iconBg: 'bg-yellow-200',
    iconColor: 'text-yellow-600',
    gradient: 'from-yellow-400 to-orange-500',
    greeting: 'Semangat! Setiap tantangan adalah kesempatan untuk tumbuh. Apa yang ingin kamu capai hari ini? ⚡',
    responses: [
      "Kamu lebih kuat dari yang kamu kira! Teruslah maju! 🚀",
      "Setiap langkah kecil tetap membawamu lebih dekat ke tujuan. Aku percaya padamu! 🎯",
      "Kesulitan hari ini adalah kekuatan untuk hari esok. Kamu pasti bisa! 💪",
      "Jangan menyerah! Bayangkan betapa bangganya dirimu nanti ketika berhasil melewati ini. 🏆",
      "Kegagalan hanyalah kesempatan untuk memulai lagi dengan lebih bijak. Ayo coba lagi! 🌟"
    ]
  },
  'calming-presence': {
    name: 'Penenang',
    description: 'Bantu meredakan kecemasan',
    icon: Waves,
    iconBg: 'bg-blue-200',
    iconColor: 'text-blue-600',
    gradient: 'from-blue-400 to-cyan-500',
    greeting: 'Tarik napas dalam-dalam... Lepaskan perlahan. Aku di sini untuk membantu menemukan ketenangan. Apa yang sedang mengganggu pikiranmu? 🌊',
    responses: [
      "Mari fokus pada pernapasan: tarik napas selama 4 hitungan, tahan 4 hitungan, keluarkan 4 hitungan... 🫁",
      "Kamu aman sekarang. Rasakan kakimu berpijak di tanah dan sadari lingkunganmu. 🌱",
      "Kecemasan ini bersifat sementara. Seperti awan, ini akan berlalu. ☁️",
      "Coba rasakan lima hal yang bisa kamu lihat, empat yang bisa disentuh, tiga yang bisa didengar... 👁️",
      "Pelan-pelan saja. Kita hadapi ini bersama, satu momen ketenangan pada satu waktu. 🕊️"
    ]
  },
  'wise-mentor': {
    name: 'Mentor Bijak',
    description: 'Memberikan nasihat dan wawasan',
    icon: BookOpen,
    iconBg: 'bg-green-200',
    iconColor: 'text-green-600',
    gradient: 'from-green-400 to-emerald-500',
    greeting: 'Halo! Apa yang ingin kamu pahami atau refleksikan saat ini? 📚',
    responses: [
      "Pertimbangkan ini: kadang jawaban yang kita cari ada di dalam pertanyaan yang tepat. 🤔",
      "Perhatikan pola dalam hidupmu. Apa yang coba diajarkan kehidupan padamu? 🔍",
      "Kebijaksanaan datang dari pengalaman, dan pengalaman sering datang dari keputusan yang kurang bijak. 🧠",
      "Terkadang kita harus melepaskan apa yang kita genggam erat untuk menerima apa yang kita butuhkan. 🙏",
      "Jalan terbaik melalui kesulitan adalah dengan menemukan makna di dalamnya. ✨"
    ]
  },
  'empathetic-listener': {
    name: 'Pendengar Empati',
    description: 'Hanya mendengarkan tanpa menghakimi',
    icon: Headphones,
    iconBg: 'bg-pink-200',
    iconColor: 'text-pink-600',
    gradient: 'from-pink-400 to-rose-500',
    greeting: 'Ruang ini adalah milik kita untuk berbagi apa pun yang kamu rasakan. Tidak ada judge di sini, hanya pemahaman. 🎧',
    responses: [
      "Aku mendengarkanmu. Lanjutkan jika kamu merasa nyaman. 👂",
      "Itu pasti sangat sulit bagimu. Aku di sini untuk mendengarkan lebih banyak. 💙",
      "Perasaanmu valid. Terima kasih telah mempercayaiku dengan ceritamu. 🤲",
      "Aku mendengar kesedihanmu. Kamu tidak sendirian dengan perasaan itu. 🫂",
      "Teruskan... Aku di sini, mendengarkan setiap katamu. ❤️"
    ]
  }
};

const ReleaseEmotionPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("release-emotion");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [showCharacterSelection, setShowCharacterSelection] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleLogout = () => {
    if (confirm("Apakah kamu yakin mau pergi:( ?")) {
      window.location.href = "/logout";
    }
  };

  const selectCharacter = (characterId) => {
    setCurrentCharacter(characterId);
    setShowCharacterSelection(false);
    setMessages([]);
    
    // Add greeting message
    setTimeout(() => {
      const character = characters[characterId];
      setMessages([{ sender: "ai", text: character.greeting, timestamp: new Date() }]);
    }, 500);
  };

  const changeCharacter = () => {
    setShowCharacterSelection(true);
    setCurrentCharacter(null);
    setMessages([]);
    setInput("");
  };

  const sendMessage = () => {
    if (input.trim() === "" || !currentCharacter) return;
    
    const userMessage = { sender: "user", text: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const character = characters[currentCharacter];
      const responses = character.responses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = { sender: "ai", text: randomResponse, timestamp: new Date() };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const SidebarItem = ({ item }) => (
    <a
      href={item.href}
      onClick={() => {
        setActiveTab(item.id);
        setSidebarOpen(false);
      }}
      className={`group relative w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 ${
        item.id === activeTab
          ? "bg-white text-gray-800 shadow-lg transform translate-x-2 scale-105"
          : "text-white hover:bg-white/20 hover:translate-x-1"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 shadow-md transition-all duration-300 ${
          item.id === activeTab
            ? `bg-gradient-to-r ${item.gradient}`
            : "bg-white/20 group-hover:bg-white/30 group-hover:scale-110"
        }`}
      >
        <item.icon className="w-4 h-4 text-white" />
      </div>
      <span className="font-medium text-sm">{item.label}</span>
      {item.id === activeTab && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sky-400 to-blue-600 rounded-r-full"></div>
      )}
    </a>
  );

  const CharacterCard = ({ characterId, character, isActive, onClick }) => {
    const IconComponent = character.icon;
    return (
      <div
        onClick={() => onClick(characterId)}
        className={`character-card bg-white rounded-2xl p-6 cursor-pointer flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
          isActive ? 'ring-2 ring-purple-500 shadow-xl -translate-y-2 scale-105' : 'hover:scale-105'
        }`}
      >
        <div className={`w-16 h-16 rounded-full ${character.iconBg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
          <IconComponent className={`w-8 h-8 ${character.iconColor}`} />
        </div>
        <h4 className="font-semibold text-gray-800 mb-2 text-lg">{character.name}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{character.description}</p>
      </div>
    );
  };

  const ChatMessage = ({ message }) => {
    const isUser = message.sender === "user";
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-br-md'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  };

  const Logo = () => (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
      <img src="/favicon.ico" alt="Sembiru Logo" className="w-full h-full object-contain" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 shadow-2xl transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Logo />
            <h2 className="text-2xl font-black text-white">
              Sem<span className="text-sky-300">biru</span>
            </h2>
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
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3 bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-purple-600">
              Release Your Emotion
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Lepaskan emosi dengan bantuan AI companion</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <span className="mr-2">Excell</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Character Selection */}
        {showCharacterSelection ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-sky-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Heart className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Lepaskan Emosi Anda</h2>
                <p className="text-purple-100 max-w-2xl mx-auto leading-relaxed text-lg">
                  Pilih salah satu karakter AI untuk membantu Anda mengekspresikan 
                  dan memproses emosi. Setiap karakter memiliki pendekatan yang berbeda 
                  untuk mendukung kesehatan mental Anda.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Pilih Karakter untuk Berbicara</h3>
                <p className="text-gray-600">Setiap karakter memiliki pendekatan yang berbeda</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Object.entries(characters).map(([characterId, character]) => (
                  <CharacterCard
                    key={characterId}
                    characterId={characterId}
                    character={character}
                    isActive={false}
                    onClick={selectCharacter}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className={`p-6 bg-gradient-to-r ${characters[currentCharacter]?.gradient} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-14 h-14 rounded-full ${characters[currentCharacter]?.iconBg} flex items-center justify-center mr-4 shadow-lg`}>
                    {currentCharacter && React.createElement(characters[currentCharacter].icon, {
                      className: `w-7 h-7 ${characters[currentCharacter].iconColor}`
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{characters[currentCharacter]?.name}</h3>
                    <p className="text-white/80">{characters[currentCharacter]?.description}</p>
                  </div>
                </div>
                <button
                  onClick={changeCharacter}
                  className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Ganti Karakter</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="flex-grow px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                  placeholder="Tuliskan pesan Anda..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-2" />
                <span>Percakapan Anda bersifat pribadi dan aman</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              &copy; 2025 Sembiru. Hak Cipta Dilindungi.
            </div>
            <div className="flex items-center space-x-4">
              <a href="/about-us" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">About-Us</a>
              <a href="https://linktr.ee/Sembiru" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Bantuan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseEmotionPage;