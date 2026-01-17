import React, { useState } from 'react';
import {
    FileText, Image as ImageIcon, Video, Presentation,
    Mic, Paperclip, Sparkles, Box, CreditCard, Plus,
    CheckCircle2, Circle, RefreshCw, ArrowRight
} from 'lucide-react';
import clsx from 'clsx';

// Mock Data for Sources
const MOCK_SOURCES = [
    { id: '1', type: 'physical', name: '特斯拉 Model Y 保养记录.pdf', date: '2025-12-10', icon: FileText },
    { id: '2', type: 'physical', name: '大理房产证副本.jpg', date: '2025-06-15', icon: ImageIcon },
    { id: '3', type: 'digital', name: '2026 年度家庭支出报表.xlsx', date: '2026-01-01', icon: FileText },
    { id: '4', type: 'digital', name: '比特币冷钱包私钥备份 (加密)', date: '2024-03-20', icon: CreditCard },
    { id: '5', type: 'physical', name: '索尼 A7M5 购买发票', date: '2025-11-11', icon: FileText },
    { id: '6', type: 'digital', name: 'Notion 个人知识库导出', date: '2026-01-14', icon: Box },
];

const SUGGESTED_QUESTIONS = [
    "分析一下我的 2026 年资产配置风险",
    "生成一份车辆出售的二手挂牌文案",
    "帮我梳理大理房产的持有成本",
];

interface Message {
    id: number;
    role: 'user' | 'ai';
    content: string;
    type?: 'text' | 'chart' | 'card';
}

export const SophonPage: React.FC = () => {
    const [selectedSources, setSelectedSources] = useState<string[]>(['1', '3']);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'ai', content: '我是 Sophon，您的资产智能助理。我已经读取了您选中的 2 个资源文件。您可以随时向我提问，或者让我们开始创作。', type: 'text' }
    ]);
    const [generatedArtifact, setGeneratedArtifact] = useState<{ title: string, type: string } | null>(null);

    const toggleSource = (id: string) => {
        setSelectedSources(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const newMsg: Message = { id: Date.now(), role: 'user', content: inputText };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        // Mock AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: '好的，基于您提供的资料，我为您分析如下...',
                type: 'text'
            }]);
        }, 1000);
    };

    const handleGenerate = (type: string, title: string) => {
        setGeneratedArtifact({ type, title });
    };

    return (
        <div className="flex h-[calc(100vh-100px)] -m-6 bg-slate-50 overflow-hidden font-sans">

            {/* Left Column: Resources (Sources) */}
            <div className="w-80 border-r border-gray-200 bg-white flex flex-col shrink-0">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800 flex items-center">
                        <Box size={20} className="mr-2 text-indigo-600" /> 资源库
                    </h2>
                    <button className="text-gray-400 hover:text-indigo-600">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Source Group */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">实物资产凭证</h3>
                        <div className="space-y-1">
                            {MOCK_SOURCES.filter(s => s.type === 'physical').map(s => (
                                <div
                                    key={s.id}
                                    onClick={() => toggleSource(s.id)}
                                    className={clsx(
                                        "flex items-center p-2 rounded-lg cursor-pointer transition-all active:scale-[0.98]",
                                        selectedSources.includes(s.id) ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50 border border-transparent"
                                    )}
                                >
                                    <div className={clsx("mr-3 transition-colors", selectedSources.includes(s.id) ? "text-indigo-600" : "text-gray-300")}>
                                        {selectedSources.includes(s.id) ? <CheckCircle2 size={18} fill="currentColor" className="text-white bg-indigo-600 rounded-full" /> : <Circle size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={clsx("text-sm font-medium truncate", selectedSources.includes(s.id) ? "text-indigo-900" : "text-gray-700")}>{s.name}</div>
                                        <div className="text-[10px] text-gray-400">{s.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">数字与金融</h3>
                        <div className="space-y-1">
                            {MOCK_SOURCES.filter(s => s.type === 'digital').map(s => (
                                <div
                                    key={s.id}
                                    onClick={() => toggleSource(s.id)}
                                    className={clsx(
                                        "flex items-center p-2 rounded-lg cursor-pointer transition-all active:scale-[0.98]",
                                        selectedSources.includes(s.id) ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50 border border-transparent"
                                    )}
                                >
                                    <div className={clsx("mr-3 transition-colors", selectedSources.includes(s.id) ? "text-indigo-600" : "text-gray-300")}>
                                        {selectedSources.includes(s.id) ? <CheckCircle2 size={18} fill="currentColor" className="text-white bg-indigo-600 rounded-full" /> : <Circle size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={clsx("text-sm font-medium truncate", selectedSources.includes(s.id) ? "text-indigo-900" : "text-gray-700")}>{s.name}</div>
                                        <div className="text-[10px] text-gray-400">{s.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="text-xs text-center text-gray-400">已选择 {selectedSources.length} 个资源用于上下文</div>
                </div>
            </div>

            {/* Middle Column: Interaction (Chat) */}
            <div className="flex-1 flex flex-col bg-slate-50 relative">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className={clsx("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3 shrink-0 shadow-sm">
                                    <Sparkles size={16} />
                                </div>
                            )}
                            <div className={clsx(
                                "max-w-2xl px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.role === 'user' ? "bg-white text-slate-800 rounded-tr-sm" : "bg-white text-slate-800 rounded-tl-sm border border-gray-100"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {messages.length === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 px-11">
                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInputText(q)}
                                    className="text-left p-3 bg-white border border-gray-200 rounded-xl hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all text-sm text-gray-600"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 mx-auto w-full max-w-3xl">
                    <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300">
                        <button className="p-3 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="基于选中的资源提问，或者下达指令..."
                            className="flex-1 bg-transparent border-none focus:ring-0 placeholder-gray-400 text-slate-800 px-2"
                        />
                        <button className="p-3 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSendMessage}
                            className={clsx(
                                "p-3 rounded-full transition-all duration-300",
                                inputText.trim() ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700" : "bg-gray-100 text-gray-300 cursor-not-allowed"
                            )}
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Studio (Creation) */}
            <div className="w-80 border-l border-gray-200 bg-white flex flex-col shrink-0">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800 flex items-center">
                        <Presentation size={20} className="mr-2 text-pink-500" /> 创作工坊
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Quick Tools */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">快捷生成</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleGenerate('article', '资产分析报告')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <FileText size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">深度文章</span>
                            </button>
                            <button
                                onClick={() => handleGenerate('infographic', '资产分布图谱')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <ImageIcon size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">信息图</span>
                            </button>
                            <button
                                onClick={() => handleGenerate('video', '家庭资产解说')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Video size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">解说视频</span>
                            </button>
                            <button
                                onClick={() => handleGenerate('ppt', '年度汇报 PPT')}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <Presentation size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-700">演示 PPT</span>
                            </button>
                        </div>
                    </div>

                    {/* Output Preview Area */}
                    {generatedArtifact && (
                        <div className="border-t border-gray-100 pt-4 animate-in slide-in-from-bottom-5 duration-500">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">最新产出</h3>
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-lg relative overflow-hidden group cursor-pointer">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Sparkles size={60} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold mb-2 uppercase">
                                        <RefreshCw size={12} className="animate-spin" />
                                        <span>{generatedArtifact.type === 'article' ? 'Generating...' : 'Completed'}</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">{generatedArtifact.title}</h4>
                                    <p className="text-xs text-slate-400 line-clamp-2">
                                        基于选中的 2 个资源文件生成的{generatedArtifact.type === 'article' ? '文章' :
                                            generatedArtifact.type === 'ppt' ? '幻灯片' : '内容'}，包含详细的数据洞察与建议。
                                    </p>
                                    <div className="mt-3 flex items-center justify-end">
                                        <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold">
                                            预览
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};
