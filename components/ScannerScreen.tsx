import React, { useState, useRef } from 'react';
import { ArrowLeft, Image as ImageIcon, Loader2, Upload, X, ScanLine, Sparkles, AlertCircle } from 'lucide-react';
import { Screen, LoadingState } from '../types';
import { analyzeImageWithGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ScannerScreenProps {
  onBack: () => void;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setAnalysis(null);
        // Automatically start analysis
        handleAnalyze(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (image: string) => {
    setLoadingState(LoadingState.LOADING);
    const result = await analyzeImageWithGemini(image);
    setAnalysis(result);
    setLoadingState(LoadingState.SUCCESS);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setLoadingState(LoadingState.IDLE);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/70 to-transparent">
        <button onClick={onBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">AI Scanner</h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Main Scan Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gray-800">
        
        {selectedImage ? (
            <div className="relative w-full h-full">
                <img src={selectedImage} alt="Scan" className="w-full h-full object-contain bg-black" />
                
                {/* Overlay Scanning Effect */}
                {loadingState === LoadingState.LOADING && (
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <div className="w-full h-1 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                )}

                <button 
                    onClick={clearImage}
                    className="absolute top-24 right-6 p-2 bg-black/50 rounded-full text-white/80 hover:text-white"
                >
                    <X size={20} />
                </button>
            </div>
        ) : (
            <div className="flex flex-col items-center p-8 text-center max-w-sm">
                <div className="w-64 h-64 border-2 border-dashed border-gray-600 rounded-3xl flex flex-col items-center justify-center mb-6 bg-gray-800/50">
                     <ScanLine size={48} className="text-gray-500 mb-4 opacity-50" />
                     <p className="text-gray-400 text-sm">No image selected</p>
                </div>
                <h2 className="text-2xl font-bold mb-2">Scan Medical Report</h2>
                <p className="text-gray-400 mb-8 text-sm">
                    Upload an X-ray, MRI, or a medical prescription to get an AI summary.
                </p>
                
                <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                />
                
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-12 rounded-full font-semibold shadow-lg shadow-blue-900/50 flex items-center gap-2 transition-all active:scale-95"
                >
                    <Upload size={20} />
                    Upload Image
                </button>
            </div>
        )}
      </div>

      {/* Analysis Result Sheet */}
      {analysis && (
          <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-900 rounded-t-3xl shadow-2xl p-6 max-h-[60vh] overflow-y-auto z-30 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold">AI Analysis</h3>
            </div>
            
            <div className="prose prose-sm prose-blue max-w-none text-gray-600">
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>
                    <strong>Disclaimer:</strong> This is an AI-generated summary and may contain errors. It is not a substitute for professional medical advice. Please consult your doctor.
                </p>
            </div>
          </div>
      )}

      {/* Recent Gallery (Mock) only visible when no image selected */}
      {!selectedImage && (
        <div className="bg-white text-gray-900 rounded-t-3xl p-6 z-20">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Recent Scans</h3>
                <span className="text-xs text-blue-600 font-medium">View All</span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-24 h-24 shrink-0 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden relative">
                         <img 
                            src={`https://picsum.photos/100/100?random=${i}`} 
                            alt="Scan" 
                            className="w-full h-full object-cover opacity-80"
                         />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <ImageIcon size={16} className="text-white drop-shadow-md" />
                         </div>
                    </div>
                ))}
            </div>
        </div>
      )}
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ScannerScreen;