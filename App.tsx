import React, { useState } from 'react';
import { Screen } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import DashboardScreen from './components/DashboardScreen';
import ScannerScreen from './components/ScannerScreen';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.WELCOME:
        return <WelcomeScreen onStart={() => navigate(Screen.DASHBOARD)} />;
      case Screen.DASHBOARD:
        return <DashboardScreen onNavigate={navigate} />;
      case Screen.SCANNER:
        return <ScannerScreen onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.CHAT:
        return <ChatScreen onBack={() => navigate(Screen.DASHBOARD)} />;
      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-2xl overflow-hidden relative font-sans text-slate-800">
      {renderScreen()}
      
      {/* Show Bottom Nav only on Dashboard */}
      {currentScreen === Screen.DASHBOARD && (
        <BottomNav currentScreen={currentScreen} onNavigate={navigate} />
      )}
    </div>
  );
};

export default App;