import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Plus, Search, Shield } from 'lucide-react';
import clsx from 'clsx';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: '你好，我是智子 (Sophon)。您的全能资产助理。' },
    { role: 'ai', content: '我可以帮您估值、录入资产，或解答关于数字遗产的问题。' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    setTimeout(() => {
        let aiMsg = "我正在思考...";
        if (userMsg.includes('值多少钱') || userMsg.includes('估值')) {
            aiMsg = "根据当前二手市场行情，该设备目前估值约为 ¥3,500。建议在 9月 新品发布前出售。";
        } else if (userMsg.includes('录入') || userMsg.includes('添加')) {
            aiMsg = "没问题，请告诉我设备名称，或者直接上传照片，我来帮您自动识别录入。";
        } else if (userMsg.includes('遗嘱') || userMsg.includes('身后')) {
            aiMsg = "您可以在“数字资产”页面的“资产传承”板块设置死人开关和数字遗嘱。需要我为您导航吗？";
        } else {
            aiMsg = "收到了。作为一个 Mock 助理，我暂时只能回答预设的问题。但在未来，我可以为您处理一切资产事务。";
        }
        setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {isOpen && (
          <div className="mb-4 w-80 h-96 bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
              
              <div className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-purple-500/20 rounded-lg">
                          <Bot size={18} className="text-purple-400" />
                      </div>
                      <span className="font-bold text-white text-sm tracking-wide">SOPHON <span className="text-xs text-purple-400 font-normal">v1.0</span></span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                      <X size={18} />
                  </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg, idx) => (
                      <div key={idx} className={clsx("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                          <div className={clsx(
                              "max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed",
                              msg.role === 'user' 
                                  ? "bg-purple-600 text-white rounded-br-none" 
                                  : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                          )}>
                              {msg.content}
                          </div>
                      </div>
                  ))}
                  <div ref={messagesEndRef} />
              </div>

              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                  <button onClick={() => setInput('添加新资产')} className="whitespace-nowrap px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-[10px] text-gray-300 border border-gray-700 transition-colors flex items-center">
                      <Plus size={10} className="mr-1"/> 录入
                  </button>
                  <button onClick={() => setInput('我的手机值多少钱？')} className="whitespace-nowrap px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-[10px] text-gray-300 border border-gray-700 transition-colors flex items-center">
                      <Search size={10} className="mr-1"/> 估值
                  </button>
                  <button onClick={() => setInput('如何设置数字遗嘱？')} className="whitespace-nowrap px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-[10px] text-gray-300 border border-gray-700 transition-colors flex items-center">
                      <Shield size={10} className="mr-1"/> 传承
                  </button>
              </div>

              <div className="p-3 border-t border-white/10 bg-gray-900/50">
                  <div className="flex items-center bg-gray-800 rounded-full border border-gray-700 px-3 py-1.5 focus-within:border-purple-500 transition-colors">
                      <input 
                          type="text" 
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Ask anything..."
                          className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                      />
                      <button onClick={handleSend} className="p-1.5 bg-purple-600 rounded-full text-white hover:bg-purple-500 transition-colors ml-2">
                          <Send size={14} />
                      </button>
                  </div>
              </div>

          </div>
      )}

      <button 
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
              "group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
              isOpen ? "bg-gray-800 text-gray-400 rotate-90" : "bg-gray-900 text-white"
          )}
      >
          {!isOpen && (
              <span className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-ping opacity-20"></span>
          )}
          
          <div className={clsx(
              "absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg",
              isOpen && "hidden"
          )}></div>

          <div className="relative z-10 bg-gray-900 w-full h-full rounded-full flex items-center justify-center border border-gray-700 group-hover:border-purple-500/50 transition-colors overflow-hidden">
             {isOpen ? (
                 <X size={24} />
             ) : (
                 <>
                    <Bot size={24} className="text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                 </>
             )}
          </div>

          {!isOpen && (
              <div className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700 shadow-xl">
                  智子助理 (Online)
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 border-t border-r border-gray-700 transform rotate-45"></div>
              </div>
          )}
      </button>
    </div>
  );
};
