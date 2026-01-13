import React from 'react';
import { X, TrendingDown, AlertTriangle, Calendar, DollarSign, Smartphone } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Smartphone className="mr-2 text-blue-600" />
                iPhone 市场行情指南 (2026版)
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <X size={20} />
            </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
            
            <section>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <DollarSign size={18} className="mr-1 text-green-600"/> 参考行情 (2026年1月)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">机型系列</th>
                                <th className="px-4 py-3">全新参考价</th>
                                <th className="px-4 py-3">二手 (成色好)</th>
                                <th className="px-4 py-3 rounded-r-lg">备注</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-4 py-3 font-bold text-gray-800">iPhone 17 系列</td>
                                <td className="px-4 py-3 text-gray-600">¥5,999 - ¥8,999</td>
                                <td className="px-4 py-3 text-blue-600 font-medium">-</td>
                                <td className="px-4 py-3 text-xs text-gray-400">最新旗舰，价格坚挺</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-bold text-gray-800">iPhone 16 系列</td>
                                <td className="px-4 py-3 text-gray-600">¥4,500 - ¥6,200</td>
                                <td className="px-4 py-3 text-blue-600 font-medium">¥3,500 - ¥5,200</td>
                                <td className="px-4 py-3 text-xs text-gray-400">次旗舰，性价比高</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-bold text-gray-800">iPhone 15 系列</td>
                                <td className="px-4 py-3 text-gray-600">¥3,200 - ¥4,500</td>
                                <td className="px-4 py-3 text-blue-600 font-medium">¥2,200 - ¥3,500</td>
                                <td className="px-4 py-3 text-xs text-gray-400">入门机，价格触底</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                    <Calendar size={18} className="mr-1 text-orange-500"/> 最佳出手时机分析
                </h3>
                
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start space-x-4">
                    <div className="bg-white p-2 rounded-full shadow-sm text-red-500 shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-red-800">黄金抛售窗口：8月15日 - 9月5日</h4>
                        <p className="text-sm text-red-600 mt-1 leading-relaxed">
                            新机发布后的 30 天内（9月中旬起），二手价格会遭遇“悬崖式下跌”，跌幅可达 <span className="font-bold">10% - 15%</span>。
                            <br/>
                            <span className="font-bold text-xs bg-red-100 px-1 py-0.5 rounded mt-1 inline-block">策略：</span> 在邀请函发出后立即出售，可多赚 ¥500 - ¥1000。
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-4">
                    <div className="bg-white p-2 rounded-full shadow-sm text-blue-500 shrink-0">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-800">2年定律 (The 2-Year Rule)</h4>
                        <p className="text-sm text-blue-600 mt-1 leading-relaxed">
                            第 1 年贬值最快 (~20%)。第 1-2 年进入“保值平台期”，日均持有成本最低。
                            建议每 <span className="font-bold">24个月</span> 更新一次设备。
                        </p>
                    </div>
                </div>
            </section>

        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium text-sm"
            >
                知道了
            </button>
        </div>

      </div>
    </div>
  );
};
