import React from 'react';
import { Home, MessageSquare, Clock, User, ScanLine } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const getIconColor = (screen: Screen) => 
    currentScreen === screen ? "text-blue-600" : "text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50 safe-area-bottom">
      <button onClick={() => onNavigate(Screen.DASHBOARD)} className={`flex flex-col items-center gap-1 ${getIconColor(Screen.DASHBOARD)}`}>
        <Home size={24} />
      </button>
      
      <button onClick={() => onNavigate(Screen.CHAT)} className={`flex flex-col items-center gap-1 ${getIconColor(Screen.CHAT)}`}>
        <MessageSquare size={24} />
      </button>

      {/* Floating Action Button for Scanner */}
      <div className="relative -top-6">
        <button 
          onClick={() => onNavigate(Screen.SCANNER)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors border-4 border-gray-100"
        >
          <ScanLine size={28} />
        </button>
      </div>

      <button className="flex flex-col items-center gap-1 text-gray-400">
        <Clock size={24} />
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-400">
        <User size={24} />
      </button>
    </div>
  );
};

export default BottomNav;