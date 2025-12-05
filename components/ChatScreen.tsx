import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, User, Bot, RefreshCw } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatScreenProps {
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init',
          role: 'model',
          text: "Hello! I'm your virtual healthcare assistant. How can I help you today? You can describe your symptoms or ask health-related questions.",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || loading === LoadingState.LOADING) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(LoadingState.LOADING);

    // Prepare history for API
    // (In a real app, you might want to limit context window size)
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));
    // Add current user message to context logic in geminiService handles it via stateless call or we pass it
    // Wait, geminiService.sendMessageToGemini takes history. 
    // We should pass previous messages as history.
    
    const responseText = await sendMessageToGemini(userMsg.text, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(LoadingState.IDLE);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Bot size={20} />
            </div>
            <div>
                <h1 className="font-bold text-gray-800">Symptom Checker</h1>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                
                <div className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-gray-800 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                    {msg.role === 'model' ? (
                        <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    ) : (
                        msg.text
                    )}
                    <span className={`text-[10px] block mt-1.5 opacity-70 ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
          </div>
        ))}
        
        {loading === LoadingState.LOADING && (
          <div className="flex justify-start">
             <div className="flex items-center gap-2 bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm ml-10">
                <RefreshCw size={14} className="animate-spin text-blue-500" />
                <span className="text-xs text-gray-500">Analysing symptoms...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="flex items-end gap-2 bg-gray-100 p-2 rounded-3xl border border-transparent focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-transparent border-none focus:ring-0 p-3 max-h-32 min-h-[44px] text-sm resize-none"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading === LoadingState.LOADING}
            className={`p-3 rounded-full mb-1 transition-all ${
                input.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
            AI can make mistakes. Please consult a doctor for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatScreen;