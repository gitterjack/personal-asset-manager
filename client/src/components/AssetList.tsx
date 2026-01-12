import React from 'react';
import type { Asset } from '../types';
import { Smartphone, Monitor, Laptop, Camera, Headphones, Keyboard, Box, Trash2, MapPin, Car, Gamepad2, Tablet, BookOpen, Pencil } from 'lucide-react';
import { differenceInDays, parseISO, format } from 'date-fns';

const ICONS: Record<string, React.FC<any>> = {
  'Phone': Smartphone,
  'PC': Monitor,
  'Laptop': Laptop,
  'Tablet': Tablet,
  'Camera': Camera,
  'Headphone': Headphones,
  'Keyboard': Keyboard,
  'Console': Gamepad2,
  'E-Reader': BookOpen,
  'Car': Car,
  'Other': Box,
};

interface Props {
  assets: Asset[];
  onDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
}

export const AssetList: React.FC<Props> = ({ assets, onDelete, onEdit }) => {
  
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

  if (assets.length === 0) {
      return <div className="text-center text-gray-500 py-10">暂无资产，请添加。</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map(asset => {
        const Icon = ICONS[asset.category] || Box;
        const { daysUsed, dailyCost, realCost } = getCostMetrics(asset);

        return (
            <div key={asset.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                {asset.photo_url && (
                    <div className="h-48 overflow-hidden bg-gray-100 relative group">
                        <img src={asset.photo_url} alt={asset.name} className="w-full h-full object-cover" />
                         <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-700">
                            <Icon size={16} />
                         </div>
                    </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                             {!asset.photo_url && <Icon className="text-gray-400 mb-2" size={24} />}
                             <h3 className="text-lg font-bold text-gray-800">{asset.name}</h3>
                             <p className="text-xs text-gray-500">{format(parseISO(asset.purchase_date), 'yyyy-MM-dd')} • 使用 {daysUsed} 天</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                            ¥{asset.price}
                        </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
                        <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                            <span>日均成本:</span>
                            <span className="font-medium">¥{dailyCost.toFixed(2)}</span>
                        </div>
                        {realCost !== null && (
                            <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                                <span>出售后日均成本:</span>
                                <span className="font-medium text-purple-600">¥{realCost.toFixed(2)}</span>
                            </div>
                        )}
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
        );
      })}
    </div>
  );
};
