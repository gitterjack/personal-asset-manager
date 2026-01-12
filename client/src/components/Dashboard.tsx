import React from 'react';
import type { Asset } from '../types';
import { DollarSign, Package } from 'lucide-react';

interface Props {
  assets: Asset[];
}

export const Dashboard: React.FC<Props> = ({ assets }) => {
  const totalAssets = assets.length;
  const totalValue = assets.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 h-32">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Package size={24} />
        </div>
        <div>
            <p className="text-sm text-gray-500">资产总数</p>
            <p className="text-2xl font-bold">{totalAssets}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 h-32">
        <div className="p-3 bg-green-100 rounded-full text-green-600">
            <DollarSign size={24} />
        </div>
        <div>
            <p className="text-sm text-gray-500">总价值</p>
            <p className="text-2xl font-bold">¥{totalValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
