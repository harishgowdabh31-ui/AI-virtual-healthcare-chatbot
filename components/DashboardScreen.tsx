import React from 'react';
import { ChevronRight, Stethoscope, Video, ShieldCheck, Activity, Pill, FileText, Bell, Search } from 'lucide-react';
import { Screen, Feature } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const features: Feature[] = [
    { id: '1', title: 'Symptom Checker', icon: <Stethoscope size={20} />, action: () => onNavigate(Screen.CHAT), color: 'bg-blue-50 text-blue-600' },
    { id: '2', title: 'Teleconsultation', icon: <Video size={20} />, action: () => {}, color: 'bg-purple-50 text-purple-600' },
    { id: '3', title: 'Insurance Assist', icon: <ShieldCheck size={20} />, action: () => {}, color: 'bg-green-50 text-green-600' },
    { id: '4', title: 'Health Monitor', icon: <Activity size={20} />, action: () => {}, color: 'bg-red-50 text-red-600' },
    { id: '5', title: 'Meds Reminder', icon: <Pill size={20} />, action: () => {}, color: 'bg-yellow-50 text-yellow-600' },
    { id: '6', title: 'Scan Report', icon: <FileText size={20} />, action: () => onNavigate(Screen.SCANNER), color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 pb-4 rounded-b-3xl shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Welcome Back,</p>
            <h2 className="text-2xl font-bold text-gray-800">Robertson!</h2>
          </div>
          <button className="p-2 bg-gray-100 rounded-full text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search for symptoms, doctors..." 
                className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
        </div>
      </div>

      <div className="p-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white mb-8 shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                <BotIcon />
            </div>
            <h3 className="text-lg font-bold mb-1 leading-snug">Discover Our Healthcare <br/> Chatbot Assistant</h3>
            <button 
                onClick={() => onNavigate(Screen.CHAT)}
                className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 hover:bg-blue-50 transition-colors"
            >
              Start Chat <ChevronRight size={14} />
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute right-12 top-4 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Our Features</h3>
          <button className="text-gray-400 text-sm">See All</button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {features.map((feature) => (
            <button 
              key={feature.id} 
              onClick={feature.action}
              className="flex flex-col items-center gap-3 p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${feature.color}`}>
                {feature.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Doctor Section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Appointment Scheduling</h3>
          <button className="text-gray-400 text-sm">See All</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" 
                alt="Doctor" 
                className="w-14 h-14 rounded-xl object-cover bg-gray-200"
            />
            <div className="flex-1">
                <h4 className="font-bold text-gray-800">Dr. Leslie Alexander</h4>
                <p className="text-xs text-blue-500 font-medium mb-1">Headaches and Migraines</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Available</span>
                </div>
            </div>
            <button className="bg-blue-600 text-white p-2 rounded-lg">
                <ChevronRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);

export default DashboardScreen;