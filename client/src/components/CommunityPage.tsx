import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, MessageSquare, Award, PieChart, ArrowRight, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

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


import { AnnualReportModal } from './AnnualReportModal';
import { MarketGuideModal } from './MarketGuideModal';

export const CommunityPage: React.FC = () => {
  const [rankingTab, setRankingTab] = useState<'retention' | 'diving'>('retention');
  const [showReport, setShowReport] = useState(false);
  const [showMarketGuide, setShowMarketGuide] = useState(false);

  const handleOpenReport = () => setShowReport(true);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <AnnualReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
      <MarketGuideModal isOpen={showMarketGuide} onClose={() => setShowMarketGuide(false)} />
      
      <div 
        onClick={handleOpenReport}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl p-6 text-white shadow-lg cursor-pointer transform transition-transform hover:scale-[1.01] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <PieChart size={120} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2 text-indigo-100 font-medium text-sm">
                <SparklesIcon size={16} />
                <span>年度重磅更新</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">2026 我的消费投资报告</h2>
            <p className="text-indigo-100 text-sm mb-4 max-w-md">看看这一年你“败”了多少家产？又有多少变成了“传家宝”？生成你的专属消费画像。</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-md hover:bg-gray-50 transition-colors">
                立即查看 <ArrowRight size={16} className="ml-1" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-800 flex items-center">
                          <Award size={18} className="mr-2 text-yellow-500"/> 榜单
                      </h3>
                      <div className="text-xs text-gray-400">实时更新</div>
                  </div>
                  
                  <div className="flex p-1 bg-gray-50 mx-4 mt-4 rounded-lg">
                      <button 
                        onClick={() => setRankingTab('retention')}
                        className={clsx(
                            "flex-1 py-1.5 text-xs font-bold rounded-md transition-all",
                            rankingTab === 'retention' ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
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

                  <div className="p-4 space-y-4">
                      {(rankingTab === 'retention' ? RETENTION_RANKING : DIVING_RANKING).map((item, index) => (
                          <div key={item.id} className="flex items-center justify-between group">
                              <div className="flex items-center space-x-3 overflow-hidden">
                                  <span className={clsx(
                                      "w-5 h-5 flex items-center justify-center text-xs font-bold rounded flex-shrink-0",
                                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                                      index === 1 ? "bg-gray-100 text-gray-700" :
                                      index === 2 ? "bg-orange-50 text-orange-700" : "text-gray-400"
                                  )}>
                                      {index + 1}
                                  </span>
                                  <div className="min-w-0">
                                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                                      <div className="flex items-center text-xs space-x-2">
                                          <span className="text-gray-500">{item.price}</span>
                                          <span className={clsx(
                                              "font-bold",
                                              rankingTab === 'retention' ? "text-green-600" : "text-red-500"
                                          )}>{item.change}</span>
                                      </div>
                                  </div>
                              </div>
                              <button className="text-gray-300 hover:text-blue-600 transition-colors p-1" title="购买链接">
                                  <ShoppingCart size={16} />
                              </button>
                          </div>
                      ))}
                  </div>
                  <div className="bg-gray-50 p-3 text-center text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                      查看完整榜单
                  </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                      <MessageSquare size={18} className="mr-2 text-blue-500"/> 热门圈子
                  </h3>
                  <div className="space-y-3">
                      <div 
                          onClick={() => setShowMarketGuide(true)}
                          className="flex items-center justify-between cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 group"
                      >
                          <span className="text-sm font-bold text-blue-700 group-hover:text-blue-800">🔥 iPhone 市场指南</span>
                          <span className="text-xs text-blue-400 bg-blue-100 px-1.5 py-0.5 rounded">NEW</span>
                      </div>
                      {['Apple 全家桶受害者', '索尼大法好', '垃圾佬捡漏日常', '富士胶片模拟'].map((tag, i) => (
                          <div key={i} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                              <span className="text-sm text-gray-700">#{tag}</span>
                              <span className="text-xs text-gray-400">1.2w 讨论</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="md:col-span-2 space-y-4">
              <h3 className="font-bold text-gray-800 text-lg px-2">精选动态</h3>
              
              {FEED_ITEMS.map(post => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-gray-100" />
                              <div>
                                  <div className="flex items-center space-x-2">
                                      <span className="font-bold text-gray-800 text-sm">{post.user}</span>
                                      <span className="text-xs text-gray-400">• {post.time}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                      {post.action} <span className="font-medium text-blue-600">{post.asset}</span>
                                  </div>
                              </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal size={18} />
                          </button>
                      </div>

                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {post.content}
                      </p>

                      {post.price && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-between border border-gray-100">
                              <div className="flex items-center space-x-2 text-sm">
                                  <span className="text-gray-500">成交价:</span>
                                  <span className="font-bold text-gray-800">{post.price}</span>
                                  <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">{post.platform}</span>
                              </div>
                              {post.action === '卖出了' ? (
                                  <div className="flex items-center text-xs text-green-600 font-medium">
                                      <TrendingUp size={14} className="mr-1"/> 
                                      回血成功
                                  </div>
                              ) : (
                                  <div className="flex items-center text-xs text-red-500 font-medium">
                                      <TrendingDown size={14} className="mr-1"/> 
                                      败家日记
                                  </div>
                              )}
                          </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                          <div className="flex space-x-6">
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-500 transition-colors">
                                  <ThumbsUp size={18} />
                                  <span className="text-xs">{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition-colors">
                                  <MessageCircle size={18} />
                                  <span className="text-xs">{post.comments}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-green-500 transition-colors">
                                  <Share2 size={18} />
                                  <span className="text-xs">分享</span>
                              </button>
                          </div>
                      </div>
                  </div>
              ))}

              <div className="text-center py-6">
                  <button className="text-sm text-gray-400 hover:text-gray-600 font-medium">
                      加载更多动态...
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
);
