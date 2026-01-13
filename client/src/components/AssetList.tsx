import React, { useState } from 'react';
import type { Asset } from '../types';
import { Smartphone, Monitor, Laptop, Camera, Headphones, Keyboard, Box, Trash2, MapPin, Car, Gamepad2, Tablet, BookOpen, Pencil, Fish, ArrowDownWideNarrow, ArrowUpNarrowWide, Calendar, DollarSign, TrendingUp, Loader2, Wrench, ShieldCheck, Gauge, Tv, ChevronRight, ChevronDown, Disc, Droplet, Wind, AlertCircle, CheckCircle2, Table, FileSpreadsheet } from 'lucide-react';
import { differenceInDays, parseISO, format } from 'date-fns';
import clsx from 'clsx';
import axios from 'axios';
import { RepairServiceModal } from './RepairServiceModal';

const ICONS: Record<string, React.FC<any>> = {
  'Phone': Smartphone,
  'PC': Monitor,
  'Monitor': Monitor,
  'Laptop': Laptop,
  'Tablet': Tablet,
  'Camera': Camera,
  'Headphone': Headphones,
  'Keyboard': Keyboard,
  'Console': Gamepad2,
  'E-Reader': BookOpen,
  'Car': Car,
  'TV': Tv,
  'Washer': Box,
  'Fridge': Box,
  'AC': Box,
  'Other': Box,
};

const CATEGORY_GROUPS = {
    'digital': ['Phone', 'PC', 'Monitor', 'Laptop', 'Tablet', 'Camera', 'Headphone', 'Keyboard', 'Console', 'E-Reader'],
    'appliance': ['TV', 'Washer', 'Fridge', 'AC'],
    'vehicle': ['Car']
};

interface Props {
  assets: Asset[];
  onDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
}

type SortField = 'date' | 'price' | 'category';
type SortOrder = 'desc' | 'asc';
type CategoryTab = 'all' | 'digital' | 'appliance' | 'vehicle';

interface MarketStats {
    percentile: number;
    market_average: string;
    best_resale_days: number;
    message: string;
}

export const AssetList: React.FC<Props> = ({ assets, onDelete, onEdit }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [activeCategoryTab, setActiveCategoryTab] = useState<CategoryTab>('all');
  const [statsMap, setStatsMap] = useState<Record<number, MarketStats>>({});
  const [loadingStats, setLoadingStats] = useState<Record<number, boolean>>({});
  const [repairModalOpen, setRepairModalOpen] = useState(false);
  const [selectedRepairAsset, setSelectedRepairAsset] = useState<Asset | null>(null);
  const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

  const handleOpenRepair = (asset: Asset) => {
      setSelectedRepairAsset(asset);
      setRepairModalOpen(true);
  };

  const toggleVehicleExpand = (id: number) => {
      setExpandedVehicleId(prev => prev === id ? null : id);
  };

  const fetchMarketStats = async (asset: Asset) => {
      if (statsMap[asset.id]) {
          const newStats = { ...statsMap };
          delete newStats[asset.id];
          setStatsMap(newStats);
          return;
      }

      setLoadingStats(prev => ({ ...prev, [asset.id]: true }));
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/market-stats', {
              params: {
                  name: asset.name,
                  price: asset.price,
                  purchase_date: asset.purchase_date
              },
              headers: { Authorization: `Bearer ${token}` }
          });
          setStatsMap(prev => ({ ...prev, [asset.id]: response.data }));
      } catch (error) {
          console.error("Failed to fetch market stats", error);
          alert("无法获取市场数据");
      } finally {
          setLoadingStats(prev => ({ ...prev, [asset.id]: false }));
      }
  };

  const getCostMetrics = (asset: Asset) => {
    const days = differenceInDays(new Date(), parseISO(asset.purchase_date));
    const daysUsed = days > 0 ? days : 1;
    
    const dailyCost = asset.price / daysUsed;
    let realCost = null;

    if (asset.resale_price !== undefined && asset.resale_price !== null) {
        realCost = (asset.price - asset.resale_price) / daysUsed;
    }

    return { daysUsed, dailyCost, realCost };
  };

  const filteredAssets = assets.filter(asset => {
      if (activeCategoryTab === 'all') return true;
      if (activeCategoryTab === 'digital') return CATEGORY_GROUPS.digital.includes(asset.category);
      if (activeCategoryTab === 'appliance') return CATEGORY_GROUPS.appliance.includes(asset.category);
      if (activeCategoryTab === 'vehicle') return CATEGORY_GROUPS.vehicle.includes(asset.category);
      return true;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
          case 'date':
              comparison = new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime();
              break;
          case 'price':
              comparison = a.price - b.price;
              break;
          case 'category':
              comparison = a.category.localeCompare(b.category);
              break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (assets.length === 0) {
      return <div className="text-center text-gray-500 py-10">暂无资产，请添加。</div>;
  }

  return (
    <div>
        <div className="flex flex-col space-y-4 mb-4">
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center space-x-3 shrink-0">
                    <h2 className="text-lg font-bold text-gray-700 hidden sm:block whitespace-nowrap">我的资产库</h2>
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200">
                        {sortedAssets.length}
                    </span>

                    <div className="flex space-x-1 overflow-x-auto no-scrollbar ml-2">
                        <button
                            onClick={() => setActiveCategoryTab('all')}
                            className={clsx(
                                "px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all",
                                activeCategoryTab === 'all' ? "bg-gray-800 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            全部
                        </button>
                        <button
                            onClick={() => setActiveCategoryTab('digital')}
                            className={clsx(
                                "px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all flex items-center",
                                activeCategoryTab === 'digital' ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <Smartphone size={12} className="mr-1"/> 数码
                        </button>
                        <button
                            onClick={() => setActiveCategoryTab('appliance')}
                            className={clsx(
                                "px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all flex items-center",
                                activeCategoryTab === 'appliance' ? "bg-orange-500 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <Tv size={12} className="mr-1"/> 家电
                        </button>
                        <button
                            onClick={() => setActiveCategoryTab('vehicle')}
                            className={clsx(
                                "px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all flex items-center",
                                activeCategoryTab === 'vehicle' ? "bg-purple-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <Car size={12} className="mr-1"/> 车辆
                        </button>
                    </div>
                </div>

                <div className="flex space-x-2 self-end sm:self-auto shrink-0">
                    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                        <button
                            onClick={() => setSortField('date')}
                            className={clsx(
                                "px-3 py-1.5 rounded-md text-xs flex items-center transition-colors",
                                sortField === 'date' ? "bg-gray-100 text-gray-800 font-bold" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Calendar size={14} className="mr-1"/> 时间
                        </button>
                        <button
                            onClick={() => setSortField('price')}
                            className={clsx(
                                "px-3 py-1.5 rounded-md text-xs flex items-center transition-colors",
                                sortField === 'price' ? "bg-gray-100 text-gray-800 font-bold" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <DollarSign size={14} className="mr-1"/> 价格
                        </button>
                    </div>

                    <button 
                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                        className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-blue-600 transition-colors"
                        title={sortOrder === 'desc' ? "当前：降序" : "当前：升序"}
                    >
                        {sortOrder === 'desc' ? <ArrowDownWideNarrow size={18} /> : <ArrowUpNarrowWide size={18} />}
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAssets.map(asset => {
            const Icon = ICONS[asset.category] || Box;
            const { daysUsed, dailyCost, realCost } = getCostMetrics(asset);
            const isVehicle = asset.category === 'Car';
            const isExpanded = expandedVehicleId === asset.id;

            return (
                <div key={asset.id} className={clsx("bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow", isExpanded && "md:col-span-2 lg:col-span-3")}>
                    <div className="flex flex-col md:flex-row">
                        {asset.photo_url && (
                            <div className={clsx("overflow-hidden bg-gray-100 relative group shrink-0", isExpanded ? "w-full md:w-64 h-48 md:h-auto" : "h-48 w-full")}>
                                <img src={asset.photo_url} alt={asset.name} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-700">
                                    <Icon size={16} />
                                </div>
                            </div>
                        )}
                        
                        <div className="p-4 flex-1 flex flex-col w-full">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 mr-2">
                                     <div className="flex items-center gap-2 mb-1">
                                        {!asset.photo_url && <Icon className="text-gray-400 shrink-0" size={20} />}
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight break-words">{asset.name}</h3>
                                     </div>
                                     <p className="text-xs text-gray-500 ml-0.5">{format(parseISO(asset.purchase_date), 'yyyy-MM-dd')} • 已用 {daysUsed} 天</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {asset.warranty_expiry && (
                                        <span className={clsx(
                                            "text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0",
                                            new Date(asset.warranty_expiry) > new Date() 
                                                ? "bg-green-50 text-green-600 border-green-200" 
                                                : "bg-red-50 text-red-500 border-red-200"
                                        )}>
                                            {new Date(asset.warranty_expiry) > new Date() ? '保修中' : '已过保'}
                                        </span>
                                    )}
                                    {isVehicle && (
                                        <button 
                                            onClick={() => toggleVehicleExpand(asset.id)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!isExpanded && isVehicle && (
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mb-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleVehicleExpand(asset.id)}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Gauge size={14} className="text-slate-500" />
                                            <span className="text-xs font-bold text-slate-700">查看保养档案</span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-400" />
                                    </div>
                                </div>
                            )}

                            {isExpanded && isVehicle && (
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex items-center space-x-2 mb-4 border-b border-slate-200 pb-2">
                                        <Gauge size={18} className="text-purple-600" />
                                        <span className="text-sm font-bold text-slate-800">车辆全维保养档案</span>
                                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">当前里程: 42,300 km</span>
                                    </div>
                                    
                                    {/* Detailed Tires Table (Dark Theme) */}
                                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 mb-6">
                                        <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-800 flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-gray-300 flex items-center">
                                                🚗 最新车辆轮胎配置表 (2026年1月更新)
                                            </h4>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs text-gray-400">
                                                <thead className="bg-gray-800/30 text-gray-500 font-medium">
                                                    <tr>
                                                        <th className="px-4 py-2 font-medium">轮胎位置</th>
                                                        <th className="px-4 py-2 font-medium">品牌花纹</th>
                                                        <th className="px-4 py-2 font-medium">规格参数</th>
                                                        <th className="px-4 py-2 font-medium">DOT 生产周期</th>
                                                        <th className="px-4 py-2 font-medium text-right">状态备注</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-800">
                                                    <tr className="hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-gray-200">左前轮 (Front-L)</td>
                                                        <td className="px-4 py-3 text-gray-300">马牌 MC6</td>
                                                        <td className="px-4 py-3 font-mono">98V</td>
                                                        <td className="px-4 py-3 font-mono">1925 <span className="text-gray-500">(2025年第19周)</span></td>
                                                        <td className="px-4 py-3 text-right text-green-400">准新胎，负责转向手感</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-gray-200">右前轮 (Front-R)</td>
                                                        <td className="px-4 py-3 text-gray-300">马牌 MC6</td>
                                                        <td className="px-4 py-3 font-mono">98V</td>
                                                        <td className="px-4 py-3 font-mono">1625 <span className="text-gray-500">(2025年第16周)</span></td>
                                                        <td className="px-4 py-3 text-right text-green-400">准新胎，由原后轮调入</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-gray-200">左后轮 (Rear-L)</td>
                                                        <td className="px-4 py-3 text-gray-300">马牌 MC7</td>
                                                        <td className="px-4 py-3 font-mono">102Y XL</td>
                                                        <td className="px-4 py-3 font-mono">3125 <span className="text-gray-500">(2025年第31周)</span></td>
                                                        <td className="px-4 py-3 text-right text-blue-400">加强型，负责抓地防甩尾</td>
                                                    </tr>
                                                    <tr className="hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-gray-200">右后轮 (Rear-R)</td>
                                                        <td className="px-4 py-3 text-gray-300">马牌 MC7</td>
                                                        <td className="px-4 py-3 font-mono">102Y XL</td>
                                                        <td className="px-4 py-3 font-mono">3325 <span className="text-gray-500">(2025年第33周)</span></td>
                                                        <td className="px-4 py-3 text-right text-blue-400">全新胎，刚刚更换</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-800 flex justify-end">
                                            <button className="text-xs flex items-center text-gray-500 hover:text-white transition-colors">
                                                <FileSpreadsheet size={12} className="mr-1"/> 导出到 Google 表格
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center">
                                                <Droplet size={12} className="mr-1"/> 油液系统 (Fluids)
                                            </h4>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-2">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-600">刹车油</span>
                                                    <span className="text-red-500 font-bold flex items-center"><AlertCircle size={10} className="mr-1"/> 立即更换</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-600">冷却液</span>
                                                    <span className="text-green-600 font-bold flex items-center"><CheckCircle2 size={10} className="mr-1"/> 状态良好</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-600">玻璃水</span>
                                                    <span className="text-slate-400">剩余 30%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center">
                                                <Wind size={12} className="mr-1"/> 滤芯系统 (Filters)
                                            </h4>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-2">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-600">空调滤芯</span>
                                                    <span className="text-slate-800 font-mono">25/06 更换</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-green-500 h-full w-[80%]"></div>
                                                </div>
                                                <div className="flex justify-between items-center text-xs pt-1">
                                                    <span className="text-slate-600">空气滤芯</span>
                                                    <span className="text-orange-500 font-bold">建议近期检查</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-orange-500 h-full w-[40%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3 space-y-2">
                                {realCost !== null ? (
                                    <>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>买入 ¥{asset.price}</span>
                                            <span>-</span>
                                            <span>残值 ¥{asset.resale_price}</span>
                                        </div>
                                        <div className="border-b border-gray-200 my-1"></div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-gray-400">实际消耗</span>
                                            <span className="font-bold text-gray-700">¥{asset.price - (asset.resale_price || 0)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-xs text-gray-400">买入价格</span>
                                        <span className="font-bold text-gray-700">¥{asset.price}</span>
                                    </div>
                                )}
                            </div>

                            {statsMap[asset.id] && (
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-3">
                                    <h4 className="text-xs font-bold text-purple-800 mb-2 flex items-center">
                                        <TrendingUp size={12} className="mr-1"/> 市场洞察
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-purple-600">买入价优势</span>
                                            <span className="font-bold text-purple-900">击败 {statsMap[asset.id].percentile}% 用户</span>
                                        </div>
                                        <div className="w-full bg-purple-200 rounded-full h-1.5">
                                            <div 
                                                className="bg-purple-600 h-1.5 rounded-full" 
                                                style={{ width: `${statsMap[asset.id].percentile}%` }}
                                            ></div>
                                        </div>
                                        <div className="pt-1 text-purple-700 leading-relaxed">
                                            建议持有时长: <span className="font-bold">{statsMap[asset.id].best_resale_days}天</span>
                                            <br/>
                                            <span className="opacity-80">
                                                {statsMap[asset.id].best_resale_days > daysUsed 
                                                    ? `(还需使用 ${statsMap[asset.id].best_resale_days - daysUsed} 天以达最佳性价比)` 
                                                    : "(已达到最佳出售时机)"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 text-xs">日均成本 (出售后)</span>
                                    <span className="font-bold text-purple-600 text-lg">
                                        ¥{realCost !== null ? realCost.toFixed(2) : dailyCost.toFixed(2)}
                                    </span>
                                </div>
                                {realCost !== null && (
                                    <div className="flex justify-between items-center text-xs text-gray-400">
                                        <span>基础日均</span>
                                        <span>¥{dailyCost.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 text-sm text-gray-600 flex-1">
                                {asset.location && (
                                    <div className="flex items-center text-xs text-gray-500 pt-1">
                                        <MapPin size={12} className="mr-1"/> {asset.location}
                                    </div>
                                )}
                                {asset.notes && (
                                    <p className="text-xs italic text-gray-400 mt-2 bg-gray-50 p-2 rounded">"{asset.notes}"</p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                                <button 
                                    onClick={() => fetchMarketStats(asset)}
                                    className={clsx(
                                        "p-1 transition-colors",
                                        statsMap[asset.id] ? "text-purple-600" : "text-gray-400 hover:text-purple-600"
                                    )}
                                    title="市场行情分析"
                                    disabled={loadingStats[asset.id]}
                                >
                                    {loadingStats[asset.id] ? <Loader2 size={18} className="animate-spin" /> : <TrendingUp size={18} />}
                                </button>
                                <a 
                                    href={`https://www.goofish.com/search?q=${encodeURIComponent(asset.name)}&spm=a21ybx.search.searchInput.0`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-yellow-500 p-1 transition-colors"
                                    title="在闲鱼搜索估价"
                                >
                                    <Fish size={18} />
                                </a>
                                
                                {asset.warranty_expiry ? (
                                    <button 
                                        onClick={() => handleOpenRepair(asset)}
                                        className={clsx(
                                            "p-1 transition-colors",
                                            new Date(asset.warranty_expiry) > new Date() 
                                                ? "text-green-600 hover:bg-green-50 rounded" 
                                                : "text-orange-600 hover:bg-orange-50 rounded"
                                        )}
                                        title={new Date(asset.warranty_expiry) > new Date() ? "官方维修 (保修期内)" : "第三方维修 (已过保)"}
                                    >
                                        {new Date(asset.warranty_expiry) > new Date() ? <ShieldCheck size={18} /> : <Wrench size={18} />}
                                    </button>
                                ) : null}

                                <button 
                                    onClick={() => onEdit(asset)}
                                    className="text-gray-400 hover:text-blue-600 p-1 transition-colors"
                                    title="编辑"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                    onClick={() => onDelete(asset.id)}
                                    className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                                    title="删除"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
        </div>
        
        {selectedRepairAsset && (
            <RepairServiceModal 
                isOpen={repairModalOpen} 
                onClose={() => setRepairModalOpen(false)} 
                assetName={selectedRepairAsset.name}
                isWarrantyValid={selectedRepairAsset.warranty_expiry ? new Date(selectedRepairAsset.warranty_expiry) > new Date() : false}
            />
        )}
    </div>
  );
};
