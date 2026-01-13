import React from 'react';
import { X, Wrench, ShieldCheck, Clock, MapPin, Truck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
  isWarrantyValid: boolean;
}

export const RepairServiceModal: React.FC<Props> = ({ isOpen, onClose, assetName, isWarrantyValid }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Wrench className="mr-2 text-blue-600" />
                维修服务推荐: {assetName}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <X size={20} />
            </button>
        </div>

        <div className={`px-6 py-3 flex items-center justify-center text-sm font-bold ${isWarrantyValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isWarrantyValid ? (
                <><ShieldCheck size={16} className="mr-2"/> 设备处于保修期内，建议优先选择官方维修</>
            ) : (
                <><AlertTriangle size={16} className="mr-2"/> 设备已过保，第三方维修更具性价比</>
            )}
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className={`border rounded-xl p-5 flex flex-col ${isWarrantyValid ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200 bg-white opacity-80'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                            <ShieldCheck size={24} className="text-blue-600" />
                        </div>
                        {isWarrantyValid && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">推荐</span>}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">官方售后服务</h3>
                    <p className="text-xs text-gray-500 mb-4">原厂配件 · 官方质保</p>
                    
                    <ul className="space-y-2 mb-6 flex-1">
                        <li className="text-xs flex items-center text-gray-600"><CheckCircle2 size={12} className="text-blue-500 mr-2"/> 100% 原厂屏幕/电池</li>
                        <li className="text-xs flex items-center text-gray-600"><CheckCircle2 size={12} className="text-blue-500 mr-2"/> 维修后延续保修</li>
                        <li className="text-xs flex items-center text-gray-600"><CheckCircle2 size={12} className="text-blue-500 mr-2"/> 需预约 Genius Bar</li>
                    </ul>

                    <div className="border-t border-gray-200/50 pt-4 mt-auto">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-xs text-gray-500">预估费用</span>
                            <span className="text-xl font-bold text-gray-900">{isWarrantyValid ? '¥0 - ¥188' : '¥1,500+'}</span>
                        </div>
                        <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm">
                            预约官方维修
                        </button>
                    </div>
                </div>

                <div className={`border rounded-xl p-5 flex flex-col ${!isWarrantyValid ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500 ring-offset-2' : 'border-gray-200 bg-white'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                            <Truck size={24} className="text-orange-600" />
                        </div>
                        {!isWarrantyValid && <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">高性价比</span>}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Hi-维修 (合作伙伴)</h3>
                    <p className="text-xs text-gray-500 mb-4">上门服务 · 极速响应</p>
                    
                    <ul className="space-y-2 mb-6 flex-1">
                        <li className="text-xs flex items-center text-gray-600"><Clock size={12} className="text-orange-500 mr-2"/> 最快 1 小时上门</li>
                        <li className="text-xs flex items-center text-gray-600"><MapPin size={12} className="text-orange-500 mr-2"/> 覆盖全国 200+ 城市</li>
                        <li className="text-xs flex items-center text-gray-600"><ShieldCheck size={12} className="text-orange-500 mr-2"/> 严选品质配件 (质保180天)</li>
                    </ul>

                    <div className="border-t border-gray-200/50 pt-4 mt-auto">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-xs text-gray-500">预估费用</span>
                            <span className="text-xl font-bold text-orange-600">¥399 起</span>
                        </div>
                        <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all text-sm">
                            立即预约上门
                        </button>
                    </div>
                </div>

            </div>
            
            <p className="text-center text-[10px] text-gray-400 bg-gray-50 p-2 rounded-lg">
                * 价格仅供参考，具体以服务商检测为准。Alive 仅作为信息聚合平台，不直接提供维修服务。
            </p>
        </div>

      </div>
    </div>
  );
};
