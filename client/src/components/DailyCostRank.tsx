import React, { useState } from 'react';
import type { Asset } from '../types';
import { differenceInDays, parseISO } from 'date-fns';
import { TrendingUp, ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowUpDown } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  assets: Asset[];
}

type SortField = 'daily' | 'real';
type SortOrder = 'desc' | 'asc';

export const DailyCostRank: React.FC<Props> = ({ assets }) => {
  const [sortField, setSortField] = useState<SortField>('daily');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const getMetrics = (asset: Asset) => {
    const days = differenceInDays(new Date(), parseISO(asset.purchase_date));
    const daysUsed = days > 0 ? days : 1;
    
    const dailyCost = asset.price / daysUsed;
    
    const resale = asset.resale_price || 0;
    const realCost = (asset.price - resale) / daysUsed;

    return { dailyCost, realCost };
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const metricsA = getMetrics(a);
    const metricsB = getMetrics(b);

    const valA = sortField === 'daily' ? metricsA.dailyCost : metricsA.realCost;
    const valB = sortField === 'daily' ? metricsB.dailyCost : metricsB.realCost;

    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full flex flex-col">
         <div className="flex flex-col space-y-3 mb-4 shrink-0 border-b pb-3">
             <div className="flex items-center space-x-2">
                <TrendingUp size={20} className="text-red-500" />
                <h3 className="font-bold text-gray-700">成本排行</h3>
             </div>
             
             <div className="flex items-center justify-between text-xs">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setSortField('daily')}
                        className={clsx(
                            "px-3 py-1 rounded-md transition-all",
                            sortField === 'daily' ? "bg-white shadow text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        基础日均
                    </button>
                    <button
                        onClick={() => setSortField('real')}
                        className={clsx(
                            "px-3 py-1 rounded-md transition-all",
                            sortField === 'real' ? "bg-white shadow text-purple-600 font-medium" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        实际日均
                    </button>
                </div>
                
                <button 
                    onClick={toggleSortOrder}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    title={sortOrder === 'desc' ? "当前：降序 (高→低)" : "当前：升序 (低→高)"}
                >
                    {sortOrder === 'desc' ? <ArrowDownWideNarrow size={18} /> : <ArrowUpNarrowWide size={18} />}
                </button>
             </div>
         </div>

         <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {sortedAssets.map((asset, index) => {
                const { dailyCost, realCost } = getMetrics(asset);
                const isReal = sortField === 'real';

                return (
                    <div key={asset.id} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 pb-2 last:border-0 hover:bg-gray-50 p-1 rounded transition-colors group">
                        <div className="flex items-center w-[55%] overflow-hidden">
                            <span className={clsx(
                                "text-xs font-mono mr-2 w-5 text-center shrink-0",
                                index < 3 ? "font-bold text-gray-700" : "text-gray-400"
                            )}>
                                {index + 1}
                            </span>
                            <span className="truncate font-medium text-gray-700">{asset.name}</span>
                        </div>
                        
                        <div className="w-[45%] text-right flex flex-col justify-center">
                            <span className={clsx(
                                "font-bold text-sm",
                                isReal ? "text-purple-600" : "text-red-600"
                            )}>
                                ¥{isReal ? realCost.toFixed(2) : dailyCost.toFixed(2)}/天
                            </span>
                            
                            <span className="text-[10px] text-gray-400">
                                {isReal ? '基础: ' : '实际: '}
                                ¥{isReal ? dailyCost.toFixed(2) : realCost.toFixed(2)}
                            </span>
                        </div>
                    </div>
                );
            })}
            {sortedAssets.length === 0 && <div className="h-20 flex items-center justify-center text-gray-400 text-sm">暂无数据</div>}
         </div>
      </div>
  );
};
