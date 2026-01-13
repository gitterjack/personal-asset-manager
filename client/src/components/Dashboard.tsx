import React from 'react';
import type { Asset } from '../types';
import { DollarSign, Package, TrendingDown, Activity } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

interface Props {
  assets: Asset[];
}

export const Dashboard: React.FC<Props> = ({ assets }) => {
  const totalAssets = assets.length;
  const totalValue = assets.reduce((sum, a) => sum + a.price, 0);

  let totalDailyCost = 0;
  let totalRealDailyCost = 0;

  assets.forEach(asset => {
      const days = differenceInDays(new Date(), parseISO(asset.purchase_date));
      const daysUsed = days > 0 ? days : 1;
      
      const daily = asset.price / daysUsed;
      totalDailyCost += daily;

      const resale = asset.resale_price || 0;
      const real = (asset.price - resale) / daysUsed;
      totalRealDailyCost += real;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 h-24 overflow-hidden">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
            <Package size={18} />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-500 truncate">资产总数</p>
            <p className="text-lg font-bold truncate">{totalAssets}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 h-24 overflow-hidden">
        <div className="p-2 bg-green-100 rounded-full text-green-600 shrink-0">
            <DollarSign size={18} />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-500 truncate">总价值</p>
            <p className="text-lg font-bold truncate">¥{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 h-24 overflow-hidden border-l-4 border-orange-400">
        <div className="p-2 bg-orange-100 rounded-full text-orange-600 shrink-0">
            <Activity size={18} />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-500 truncate">基础日均总成本</p>
            <p className="text-lg font-bold truncate text-orange-600">¥{totalDailyCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 h-24 overflow-hidden border-l-4 border-purple-500">
        <div className="p-2 bg-purple-100 rounded-full text-purple-600 shrink-0">
            <TrendingDown size={18} />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-500 truncate">实际日均总消耗</p>
            <p className="text-lg font-bold truncate text-purple-600">¥{totalRealDailyCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
