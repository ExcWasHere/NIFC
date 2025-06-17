import { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff, Volume2, VolumeX, MessageCircle, MapPin } from 'lucide-react';

export default function SembiruEmergencyCall() {
  const [callStatus, setCallStatus] = useState('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (callStatus === 'connected') {
        setCallDuration(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [callStatus]);

  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setCallStatus('connected');
      showNotification('Panggilan terhubung dengan konselor darurat', 'success');
    }, 3000);

    showNotification('Menghubungi Hotline Sembiru...', 'info');

    return () => clearTimeout(connectionTimer);
  }, []);

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    showNotification('Panggilan berakhir. Semoga Kamu Lega ya..', 'info');
    setTimeout(() => {
      window.location.href = '/hope-scan';
    }, 1500);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showNotification(isMuted ? 'Mikrofon dinyalakan' : 'Mikrofon dimatikan', 'info');
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    showNotification(isSpeakerOn ? 'Speaker dimatikan' : 'Speaker dinyalakan', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 flex items-center justify-center p-4 relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Main Call Interface */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* Emergency Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-4">
            <div className="w-5 h-5 mr-2 text-yellow-300">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="font-medium">PANGGILAN DARURAT</span>
          </div>
        </div>

        {/* Call Interface Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          
          {/* Contact Info */}
          <div className="text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">Hotline Darurat</h2>
            <div className="text-4xl font-bold mb-2 tracking-wider">119</div>
            <p className="text-white/80">Pusat Bantuan SEMBIRU</p>
          </div>

          {/* Avatar and Status */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {/* Pulse Animation */}
              {callStatus === 'connecting' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-white/40 animate-pulse"></div>
                </>
              )}
              
              {/* Avatar */}
              <div className={`relative w-32 h-32 bg-white/20 rounded-full flex items-center justify-center ${
                callStatus === 'connecting' ? 'animate-bounce' : ''
              }`}>
                <PhoneCall className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Call Status */}
            <div className="mt-4">
              <div className="text-white text-lg font-medium mb-2">
                {callStatus === 'connecting' ? 'Menghubungi...' : 
                 callStatus === 'connected' ? 'Terhubung' : 'Panggilan Berakhir'}
              </div>
              <div className="text-white/80 text-2xl font-mono">
                {callStatus === 'connected' ? formatCallDuration(callDuration) : '00:00'}
              </div>
            </div>
            
            {/* Audio Wave Animation */}
            {callStatus === 'connected' && (
              <div className="flex justify-center items-center space-x-1 mt-4">
                {[10, 20, 15, 25, 12].map((height, index) => (
                  <div 
                    key={index}
                    className="w-1 bg-white/60 rounded-full animate-pulse"
                    style={{ 
                      height: `${height}px`,
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Call Controls */}
          {callStatus === 'connected' && (
            <div className="flex justify-center space-x-6 mb-6">
              {/* Mute Button */}
              <button 
                onClick={toggleMute}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all duration-300 hover:scale-110 ${
                  isMuted ? 'bg-red-500/50' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              
              {/* Speaker Button */}
              <button 
                onClick={toggleSpeaker}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all duration-300 hover:scale-110 ${
                  isSpeakerOn ? 'bg-blue-500/50' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* End Call Button */}
          {(callStatus === 'connecting' || callStatus === 'connected') && (
            <div className="text-center mb-6">
              <button 
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto animate-pulse"
              >
                <PhoneOff className="w-6 h-6 mr-2" />
                Akhiri Panggilan
              </button>
            </div>
          )}

          {/* Emergency Message */}
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl">
            <div className="flex items-start">
              <div className="w-5 h-5 text-yellow-300 mr-2 flex-shrink-0 mt-0.5">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-white text-sm">
                <p className="font-medium mb-1">Halo! Kamu gak sendiri kok, jangan panik yaa</p>
                <p className="text-white/80">Tim profesional Sembiru siap membantu Kamu 24/7. Bicaralah dengan tenang dan jujur about your feeling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="bg-white/10 backdrop-blur-md text-white p-4 rounded-xl text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Chat Darurat</span>
          </button>
          
          <button className="bg-white/10 backdrop-blur-md text-white p-4 rounded-xl text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <MapPin className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Lokasi Terdekat</span>
          </button>
        </div>

        {/* SEMBIRU Branding */}
        <div className="text-center mt-6">
            <div className="inline-flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-sky-400 to-sky-600 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/favicon.ico" alt="Sembiru Logo" className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white">Sembiru Emergency Service</span>
            </div>
        </div>
      </div>
    </div>
  );
}