import React, { useState, useEffect } from 'react';
import type { Asset } from '../types';
import { X, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface Props {
  assets: Asset[];
  isOpen: boolean;
  onClose: () => void;
}

export const AICardGenerator: React.FC<Props> = ({ assets, isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aliyun_key') || '');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [vibe, setVibe] = useState('');
  const [error, setError] = useState('');

  const totalValue = assets.reduce((sum, a) => sum + a.price, 0);
  const topAssets = [...assets].sort((a, b) => b.price - a.price).slice(0, 4);

  // Generate prompt when assets load
  useEffect(() => {
    if (assets.length > 0) {
        setPrompt(generateSmartPrompt(assets));
    }
  }, [assets]);

  const generateSmartPrompt = (assets: Asset[]) => {
        const cars = assets.filter(a => a.category === 'Car').map(a => a.name).slice(0, 1);
        const gadgets = assets.filter(a => a.category !== 'Car').slice(0, 4).map(a => a.name).join('，');
        
        let vibe = "科技数码博主";
        let characterDesc = "穿着时尚卫衣的年轻极客男性";
        
        const categoryCount: Record<string, number> = {};
        assets.forEach(a => { categoryCount[a.category] = (categoryCount[a.category] || 0) + 1; });

        if (categoryCount['Camera'] > 1) { vibe = "摄影大师"; characterDesc = "穿着摄影马甲，戴着鸭舌帽的潮流摄影师"; }
        else if (categoryCount['Console'] > 0 || categoryCount['PC'] > 0) { vibe = "电竞玩家"; characterDesc = "戴着电竞耳机的酷炫游戏玩家"; }
        else if (categoryCount['Car'] > 0) { vibe = "玩车达人"; characterDesc = "穿着赛车服或休闲西装的成功男士"; }
        
        let p = `一张高质量的人物形象，围绕一个男性形象补充细节：
【主体形象】：画面中心是一个${characterDesc}，表情自信酷帅，代表${vibe}形象。3D盲盒公仔风格，二身头比例。
【核心背景】：`;
        
        if (cars.length > 0) {
            p += `人物身后停着一辆酷炫的${cars[0]}汽车。`;
        } else {
            p += `背景是极简的科技感几何图形空间。`;
        }

        p += `
【装饰元素】：人物身边悬浮环绕着精细的科技设备，包括：${gadgets}。这些物品以3D微缩模型的形式漂浮，构图平衡。
【画面风格】：C4D渲染，OC渲染，泡泡玛特风格，粘土质感，柔和的影棚布光，高饱和度，8k分辨率，细节丰富，杰作。`;
        return p;
  };

  const handleGenerate = async () => {
    if (!apiKey) {
        setError('请输入阿里云百炼 API Key');
        return;
    }
    localStorage.setItem('aliyun_key', apiKey);
    setLoading(true);
    setError('');
    setImageUrl(null);

    try {
        const response = await axios.post('/api/ai/generate-card', {
            apiKey,
            assets,
            customPrompt: prompt // Send user edited prompt
        });
        setImageUrl(response.data.imageUrl);
        setVibe(response.data.vibe);
    } catch (err: any) {
        setError(err.response?.data?.error || "生成失败，请检查 API Key 或网络");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full flex overflow-hidden max-h-[90vh]">
        
        {/* Left: Controls */}
        <div className="w-[40%] p-6 border-r border-gray-100 flex flex-col bg-gray-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="text-purple-600" />
                    AI 身份卡
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>

            <div className="space-y-5 flex-1">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">阿里云百炼 API Key</label>
                    <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-bold text-gray-700">AI 提示词 (Prompt)</label>
                        <button 
                            onClick={() => setPrompt(generateSmartPrompt(assets))}
                            className="text-xs text-blue-600 flex items-center hover:underline"
                            title="重置为默认提示词"
                        >
                            <RefreshCw size={12} className="mr-1"/> 重置
                        </button>
                    </div>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={10}
                        className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white font-mono text-gray-600 leading-relaxed focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                        placeholder="AI 将根据这段描述绘图..."
                    />
                    <p className="text-xs text-gray-400 mt-2">您可以自由修改上方的描述词，比如更改人物发型、服装或背景风格。</p>
                </div>

                {error && <div className="bg-red-50 p-3 rounded-lg text-sm text-red-600 border border-red-100">{error}</div>}
            </div>

            <div className="mt-4">
                <button 
                    onClick={handleGenerate}
                    disabled={loading || assets.length === 0}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-purple-200"
                >
                    {loading ? <><Loader2 className="animate-spin" /> 正在绘制...</> : <><Sparkles size={18} /> 生成卡片</>}
                </button>
            </div>
        </div>

        {/* Right: The Card Preview */}
        <div className="w-[60%] bg-gray-100 p-8 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-3xl shadow-xl w-[420px] relative overflow-hidden group border border-white">
                {/* Header */}
                <div className="flex justify-between items-end mb-5 relative z-10">
                    <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">ALIVE</h3>
                        <p className="text-xs text-gray-400 tracking-[0.2em] font-medium mt-1">LIVING ASSET MANAGER</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Total Value</p>
                        <p className="text-2xl font-black text-emerald-500">¥{totalValue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Main Visual */}
                <div className="aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden relative shadow-inner border border-gray-100">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-75"></div>
                                <Sparkles size={48} className="text-purple-500 relative z-10 animate-pulse" />
                            </div>
                            <span className="text-sm font-medium mt-4 text-purple-600">AI 正在构想您的形象...</span>
                        </div>
                    ) : imageUrl ? (
                        <img src={imageUrl} alt="AI Avatar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                            <Sparkles size={48} className="mb-2 opacity-20" />
                            <span className="text-sm">等待生成...</span>
                        </div>
                    )}
                    
                    {/* Vibe Tag */}
                    {vibe && (
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                            #{vibe}
                        </div>
                    )}
                </div>

                {/* Top Gear List */}
                <div className="space-y-3 relative z-10 px-1">
                    <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2 mb-2">
                        <p className="text-xs font-black text-gray-300 uppercase tracking-wider">Top Gear</p>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                    
                    {topAssets.map((asset) => (
                        <div key={asset.id} className="flex justify-between items-center text-sm group/item">
                            <span className="truncate w-2/3 font-bold text-gray-700 group-hover/item:text-purple-600 transition-colors">{asset.name}</span>
                            <span className="font-mono text-gray-400 text-xs">¥{asset.price}</span>
                        </div>
                    ))}
                </div>

                {/* Footer Decor */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-300 font-medium">
                    <span className="flex items-center gap-1"><Sparkles size={10}/> Generated by AssetManager AI</span>
                    <span className="font-mono">{new Date().toLocaleDateString()}</span>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
            </div>
        </div>

      </div>
    </div>
  );
};
