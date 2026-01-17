import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, PieChart, ArrowRight, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Smartphone, ArrowUpRight, Hash, Flame, Zap } from 'lucide-react';
import clsx from 'clsx';
import { AnnualReportModal } from './AnnualReportModal';
import { MarketGuideModal } from './MarketGuideModal';

const RETENTION_RANKING = [
    { id: 1, name: 'Fujifilm X100VI', price: '¥11,500', change: '+18%', label: '理财神器' },
    { id: 2, name: 'iPhone 17 Pro Max', price: '¥9,999', change: '-5%', label: '相对保值' },
    { id: 3, name: 'Sony A7M5', price: '¥16,800', change: '-8%', label: '坚挺' },
    { id: 4, name: 'Switch 2', price: '¥2,899', change: '-10%', label: '大众喜爱' },
    { id: 5, name: 'Rolex Submariner', price: '¥92,000', change: '+5%', label: '硬通货' },
];

const DIVING_RANKING = [
    { id: 1, name: 'Samsung S26 Ultra', price: '¥6,800', change: '-40%', label: '跳水王' },
    { id: 2, name: 'Sony WH-1000XM6', price: '¥1,599', change: '-45%', label: '腰斩' },
    { id: 3, name: 'Pixel 10 Pro', price: '¥4,200', change: '-50%', label: '小众泪目' },
    { id: 4, name: 'GoPro 14', price: '¥1,900', change: '-35%', label: '更新太快' },
    { id: 5, name: 'MacBook Air M4', price: '¥6,800', change: '-28%', label: '教育优惠' },
];

const FEED_ITEMS = [
    {
        id: 1,
        user: '数码发烧友_Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        action: '卖出了',
        asset: 'iPhone 16 Pro',
        price: '¥5,200',
        platform: '闲鱼',
        content: '用了两年，成色还不错，最后5200出给同城了。算下来每天成本不到3块钱，这波不亏！建议大家出二手前一定要把盒子找出来，能多卖200块。',
        likes: 24,
        comments: 8,
        time: '2小时前'
    },
    {
        id: 2,
        user: '摄影师Cici',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cici',
        action: '入手了',
        asset: 'Ricoh GR4',
        price: '¥8,500',
        platform: '京东',
        content: '终于抢到了！虽然溢价了一点，但这个扫街神器真的太方便了。每天揣兜里，出片率极高。理财产品石锤了，感觉玩一年还能原价出。',
        likes: 156,
        comments: 42,
        time: '5小时前'
    },
    {
        id: 3,
        user: '极客小王',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=King',
        action: '发布了',
        asset: 'MacBook Pro M5 Max 深度评测',
        price: '',
        platform: '',
        content: '深度使用了两周，M5 Max 的性能确实恐怖，剪辑 12K 视频毫无压力。但是对于普通用户来说，M5 Pro 性价比更高。附上我的详细续航测试图...',
        likes: 89,
        comments: 15,
        time: '1天前'
    }
];

export const CommunityPage: React.FC = () => {
    const [rankingTab, setRankingTab] = useState<'retention' | 'diving'>('retention');
    const [showReport, setShowReport] = useState(false);
    const [showMarketGuide, setShowMarketGuide] = useState(false);

    const handleOpenReport = () => setShowReport(true);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <AnnualReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
            <MarketGuideModal isOpen={showMarketGuide} onClose={() => setShowMarketGuide(false)} />

            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Annual Report Card - Spans 2 cols */}
                <div
                    onClick={handleOpenReport}
                    className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-8 text-white shadow-lg cursor-pointer transform transition-all hover:scale-[1.01] hover:shadow-xl relative overflow-hidden group min-h-[220px] flex flex-col justify-center"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
                        <PieChart size={180} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-3 text-indigo-100 font-bold text-sm uppercase tracking-wider">
                            <SparklesIcon size={16} />
                            <span>年度重磅更新</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black mb-3 tracking-tight">2026 我的消费投资报告</h2>
                        <p className="text-indigo-100 text-base mb-6 max-w-lg leading-relaxed">看看这一年你“败”了多少家产？又有多少变成了“传家宝”？<br />AI 为你生成专属消费画像与理财建议。</p>
                        <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-full text-sm font-bold flex items-center shadow-md hover:bg-indigo-50 transition-colors w-fit">
                            立即查看 <ArrowRight size={16} className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* iPhone Market Guide - Expanded Hero Card */}
                <div
                    onClick={() => setShowMarketGuide(true)}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg hover:border-blue-100 transition-all group relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="absolute -bottom-4 -right-4 text-gray-50 opacity-50 group-hover:opacity-100 group-hover:text-blue-50 transition-all duration-500 transform group-hover:scale-110">
                        <Smartphone size={160} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="flex items-center px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg shadow-sm">
                                <Flame size={12} className="mr-1 text-orange-400" />
                                2026 最新版
                            </span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2 font-serif">
                            iPhone 市场<br />行情指南
                        </h3>
                        <p className="text-gray-500 text-sm font-medium z-10 relative">
                            华强北一手报价，拒绝信息差。<br />含 iPhone 17 全系预测。
                        </p>
                    </div>

                    <div className="mt-6 z-10 relative">
                        <div className="flex items-center p-3 bg-red-50 rounded-xl border border-red-100">
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0 mr-3">
                                <TrendingDown size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-red-500 font-bold mb-0.5">本周行情</div>
                                <div className="text-xs text-gray-700 font-bold">16 Pro Max 跌破首发价</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar: Rankings (1 col) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <Award size={18} className="mr-2 text-amber-500" />
                                社区榜单
                            </h3>
                            <div className="flex items-center text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">
                                <Zap size={10} className="mr-1" /> 实时
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="flex p-1 bg-gray-100/80 rounded-lg mb-2">
                                <button
                                    onClick={() => setRankingTab('retention')}
                                    className={clsx(
                                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                                        rankingTab === 'retention' ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    保值榜
                                </button>
                                <button
                                    onClick={() => setRankingTab('diving')}
                                    className={clsx(
                                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                                        rankingTab === 'diving' ? "bg-white text-red-500 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    跳水榜
                                </button>
                            </div>

                            <div className="space-y-1">
                                {(rankingTab === 'retention' ? RETENTION_RANKING : DIVING_RANKING).map((item, index) => (
                                    <div key={item.id} className="flex items-center justify-between group p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                        <div className="flex items-center space-x-3 overflow-hidden">
                                            <span className={clsx(
                                                "w-5 h-5 flex items-center justify-center text-xs font-black rounded flex-shrink-0",
                                                index === 0 ? "text-amber-500 bg-amber-50" :
                                                    index === 1 ? "text-slate-600 bg-slate-100" :
                                                        index === 2 ? "text-orange-600 bg-orange-50" : "text-gray-400"
                                            )}>
                                                {index + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <div className="text-xs font-bold text-gray-800 truncate">{item.name}</div>
                                                <div className="flex items-center text-[10px] space-x-2 mt-0.5">
                                                    <span className={clsx(
                                                        "font-bold",
                                                        rankingTab === 'retention' ? "text-green-600" : "text-red-500"
                                                    )}>{item.change}</span>
                                                    <span className="text-gray-400">{item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-3 border-t border-gray-50 text-center">
                            <button className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center justify-center w-full">
                                查看完整榜单 <ArrowRight size={12} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center: Feed (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-xl text-gray-900">精选动态</h3>
                        <div className="flex space-x-2">
                            <button className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">推荐</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">关注</button>
                        </div>
                    </div>

                    {FEED_ITEMS.map(post => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-100" />
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-gray-900 text-sm">{post.user}</span>
                                            <span className="text-xs text-gray-400">• {post.time}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {post.action} <span className="font-bold text-blue-600 mx-1 px-1.5 py-0.5 bg-blue-50 rounded text-[10px]">{post.asset}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                {post.content}
                            </p>

                            {post.price && (
                                <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-between border border-gray-100">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            post.action === '卖出了' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                        )}>
                                            {post.action === '卖出了' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">成交价格</div>
                                            <div className="font-bold text-gray-900">{post.price}</div>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-white border border-gray-200 text-gray-500 font-bold rounded-lg shadow-sm">{post.platform}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                <div className="flex space-x-8">
                                    <button className="flex items-center space-x-1.5 text-gray-400 hover:text-pink-500 transition-colors group">
                                        <div className="p-1.5 rounded-full group-hover:bg-pink-50 transition-colors">
                                            <ThumbsUp size={18} />
                                        </div>
                                        <span className="text-xs font-bold">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1.5 text-gray-400 hover:text-blue-500 transition-colors group">
                                        <div className="p-1.5 rounded-full group-hover:bg-blue-50 transition-colors">
                                            <MessageCircle size={18} />
                                        </div>
                                        <span className="text-xs font-bold">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center space-x-1.5 text-gray-400 hover:text-green-500 transition-colors group">
                                        <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors">
                                            <Share2 size={18} />
                                        </div>
                                        <span className="text-xs font-bold">分享</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center py-6">
                        <button className="text-sm text-gray-400 hover:text-gray-900 font-bold border border-gray-200 px-6 py-2 rounded-full hover:bg-gray-50 transition-all">
                            加载更多动态
                        </button>
                    </div>
                </div>

                {/* Right Sidebar: Topics and Groups (1 col) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Hash size={18} className="mr-2 text-blue-500" />
                            热门圈子
                        </h3>
                        <div className="space-y-3">
                            {['Apple 全家桶受害者', '索尼大法好', '垃圾佬捡漏日常', '富士胶片模拟', 'NAS 玩家', '桌面搭配'].map((tag, i) => (
                                <div key={i} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2.5 -mx-2.5 rounded-xl transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                                            i % 2 === 0 ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                        )}>
                                            #
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{tag}</div>
                                            <div className="text-[10px] text-gray-400">1.2w 讨论 · 99+ 新帖</div>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            发现更多圈子
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SparklesIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);
