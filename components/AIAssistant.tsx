import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Chat } from '@google/genai';
import { useNavigate } from 'react-router-dom';
import { startChat } from '../services/geminiService';
import type { ChatMessage, Suggestion } from '../types';
import { SparklesIcon, UserIcon, SendIcon, Icon } from './Icons';

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
    </div>
);

interface MAXAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAXAssistant: React.FC<MAXAssistantProps> = ({ isOpen, onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const initChat = async () => {
        setIsLoading(true);
        setMessages([]); // Clear previous chat
        const chatInstance = startChat();
        setChat(chatInstance);
        await sendMessage("Hello", chatInstance, true);
        setIsLoading(false);
      };
      initChat();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const parseAndSetMessage = (fullResponse: string, messageIndex: number) => {
      const suggestionRegex = /\[SUGGESTIONS\](.*)\[\/SUGGESTIONS\]/s;
      const match = fullResponse.match(suggestionRegex);
      let suggestions: Suggestion[] = [];
      let cleanText = fullResponse;

      if (match && match[1]) {
          try {
              suggestions = JSON.parse(match[1]);
              cleanText = fullResponse.replace(suggestionRegex, '').trim();
          } catch (e) {
              console.error("Failed to parse suggestions JSON:", e);
              cleanText = fullResponse.replace(suggestionRegex, '').trim();
          }
      }

      setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[messageIndex]) {
              newMessages[messageIndex] = { role: 'model', parts: [{ text: cleanText }], suggestions };
          }
          return newMessages;
      });
  };

  const sendMessage = async (messageText: string, currentChat = chat, isInitial = false) => {
    if (!messageText.trim() || !currentChat) return;

    if (!isInitial) {
      const userMessage: ChatMessage = { role: 'user', parts: [{ text: messageText }] };
      setMessages(prev => [...prev, userMessage]);
    }
    
    setIsLoading(true);

    try {
      const stream = await currentChat.sendMessageStream({ message: messageText });
      
      let fullResponse = '';
      let modelMessageIndex = -1;

      setMessages(prev => {
          modelMessageIndex = prev.length;
          return [...prev, { role: 'model', parts: [{ text: '' }] }];
      });

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            if(newMessages[modelMessageIndex]) {
                newMessages[modelMessageIndex] = { role: 'model', parts: [{ text: fullResponse }] };
            }
            return newMessages;
        });
      }
      
      parseAndSetMessage(fullResponse, modelMessageIndex);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
          role: 'model',
          parts: [{ text: "I'm sorry, but I'm having trouble connecting right now. Please try again later." }]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
    setInput('');
  };

  const handleSuggestionClick = async (prompt: string) => {
    await sendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-white flex flex-col h-[90vh] max-h-[700px] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-200" onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><SparklesIcon className="text-amber-500"/> MAX Assistant</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
              <Icon classes="fas fa-times text-xl"/>
            </button>
          </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
            <div key={index}>
                <div className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'model' && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
                      <SparklesIcon className="w-6 h-6" />
                      </div>
                  )}
                  <div className={`max-w-md p-3 rounded-xl shadow-sm ${msg.role === 'user' ? 'bg-amber-500 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                      <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                  </div>
                  {msg.role === 'user' && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                      <UserIcon className="w-6 h-6" />
                      </div>
                  )}
                </div>
                {msg.suggestions && msg.suggestions.length > 0 && !isLoading && (
                <div className="flex flex-wrap gap-2 mt-3 pl-14">
                    {msg.suggestions.map((suggestion, i) => (
                        <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion.prompt)}
                        className="bg-white hover:bg-slate-200 text-slate-700 text-sm font-medium py-2 px-3 rounded-full transition-colors duration-200 border border-slate-300 hover:border-slate-400"
                        >
                        {suggestion.title}
                        </button>
                    ))}
                </div>
                )}
            </div>
            ))}
            {isLoading && messages.length > 0 && messages[messages.length-1]?.role !== 'model' &&(
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
                    <SparklesIcon className="w-6 h-6" />
                </div>
                <div className="max-w-md p-4 rounded-xl shadow-sm bg-slate-100 text-slate-800 rounded-bl-none">
                <TypingIndicator />
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask MAX a question..."
                className="flex-1 bg-slate-100 border border-slate-300 rounded-full py-3 px-5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-slate-700 text-white rounded-full p-3 disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-700"
                aria-label="Send message"
            >
                <SendIcon className="w-6 h-6" />
            </button>
            </form>
        </div>
        </div>
    </div>
  );
};

export default MAXAssistant;
