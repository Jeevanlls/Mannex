import React, { useState, useEffect } from 'react';
import { SparklesIcon, Icon } from './Icons';

interface MAXFabProps {
  onOpen: () => void;
  proactiveMessage: string | null;
  onClearMessage: () => void;
}

const MAXFab: React.FC<MAXFabProps> = ({ onOpen, proactiveMessage, onClearMessage }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (proactiveMessage) {
      setShowMessage(true);
    }
  }, [proactiveMessage]);

  const handleCloseMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessage(false);
    onClearMessage();
  };
  
  const handleOpenChat = () => {
    setShowMessage(false);
    onClearMessage();
    onOpen();
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
        {showMessage && proactiveMessage && (
            <div className="bg-slate-800 text-white p-3 rounded-lg rounded-br-none shadow-lg mb-2 relative animate-fade-in-up w-64">
                <button onClick={handleCloseMessage} className="absolute -top-2 -right-2 bg-slate-600 rounded-full h-5 w-5 text-xs text-white flex items-center justify-center">&times;</button>
                <p className="text-sm">{proactiveMessage}</p>
            </div>
        )}
        <button
          onClick={handleOpenChat}
          className="bg-slate-800 hover:bg-amber-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300"
          aria-label="Open AI Assistant"
        >
          <SparklesIcon className="w-8 h-8" />
        </button>
         <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default MAXFab;