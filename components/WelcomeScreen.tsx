import React from 'react';
import { ArrowRight, Bot } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full flex justify-center mt-12 mb-8 relative">
        <div className="relative">
             <div className="absolute inset-0 bg-blue-100 rounded-full scale-95 translate-y-4 -z-10"></div>
             {/* Using a placeholder that looks professional */}
             <img 
               src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" 
               alt="Doctor" 
               className="w-full max-w-[340px] h-[450px] object-cover rounded-[40px] shadow-xl z-10 mask-image-gradient" 
               style={{ 
                 maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                 WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
               }}
             />
             
             {/* Floating Badge */}
             <div className="absolute bottom-10 -right-4 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Bot size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-bold text-gray-800">Online 24/7</p>
                </div>
             </div>
        </div>
      </div>

      <div className="w-full bg-white/80 backdrop-blur-sm rounded-t-3xl p-2 flex flex-col items-center text-center z-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Your Virtual <br/>
          <span className="text-blue-600">Healthcare Chatbot</span>
        </h1>
        
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
          Your Virtual Healthcare Assistant: Partner in wellness, just a message away.
        </p>

        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Bot className="w-6 h-6" />
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;