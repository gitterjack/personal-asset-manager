import React from 'react';
import { X, Award, TrendingUp, PieChart, Share2, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnualReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>
             <div className="absolute top-40 -right-20 w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
          </div>

          <div className="relative z-10 text-center space-y-8">
            
            <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/5">
                    <Sparkles size={12} />
                    <span>Annual Report</span>
                </div>
                <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    2026<br/>我的消费画像
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-purple-400 mb-2"><PieChart size={24} className="mx-auto"/></div>
                    <div className="text-2xl font-bold">¥12.8w</div>
                    <div className="text-xs text-gray-400">年度总投入</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-green-400 mb-2"><TrendingUp size={24} className="mx-auto"/></div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-xs text-gray-400">资产保值率</div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-6 rounded-2xl border border-amber-500/30">
                <div className="flex items-center justify-center space-x-2 text-amber-400 mb-2">
                    <Award size={24} />
                    <span className="font-bold text-lg">理财大师</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                    你的消费眼光毒辣！<br/>
                    击败了全国 <span className="font-bold text-amber-400 text-lg">92%</span> 的数码玩家。<br/>
                    <span className="text-xs opacity-70 mt-2 block">这哪里是败家，分明是理财！</span>
                </p>
            </div>

            <button className="w-full bg-white text-purple-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-white/10">
                <Share2 size={18} />
                <span>生成海报分享</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
