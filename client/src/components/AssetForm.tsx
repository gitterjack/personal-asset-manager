import React, { useState, useEffect } from 'react';
import type { NewAsset, Asset } from '../types';
import { Smartphone, Monitor, Laptop, Camera, Headphones, Keyboard, Box, Car, Gamepad2, Tablet, BookOpen, X } from 'lucide-react';
import clsx from 'clsx';

const CATEGORIES = [
  { id: 'Phone', icon: Smartphone, label: '手机' },
  { id: 'PC', icon: Monitor, label: '台式机' },
  { id: 'Laptop', icon: Laptop, label: '笔记本' },
  { id: 'Tablet', icon: Tablet, label: '平板' },
  { id: 'Camera', icon: Camera, label: '相机' },
  { id: 'Headphone', icon: Headphones, label: '耳机' },
  { id: 'Keyboard', icon: Keyboard, label: '键盘' },
  { id: 'Console', icon: Gamepad2, label: '游戏机' },
  { id: 'E-Reader', icon: BookOpen, label: '阅读器' },
  { id: 'Car', icon: Car, label: '汽车' },
  { id: 'Other', icon: Box, label: '其他' },
];

interface Props {
  onAdd: (asset: NewAsset) => void;
  onUpdate: (id: number, asset: NewAsset) => void;
  editingAsset: Asset | null;
  onCancelEdit: () => void;
}

export const AssetForm: React.FC<Props> = ({ onAdd, onUpdate, editingAsset, onCancelEdit }) => {
  const [formData, setFormData] = useState<NewAsset>({
    name: '',
    category: 'Other',
    purchase_date: new Date().toISOString().split('T')[0],
    store: '',
    price: 0,
    resale_price: 0,
    photo_url: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (editingAsset) {
      setFormData({
        name: editingAsset.name,
        category: editingAsset.category,
        purchase_date: editingAsset.purchase_date,
        store: editingAsset.store || '',
        price: editingAsset.price,
        resale_price: editingAsset.resale_price || 0,
        photo_url: editingAsset.photo_url || '',
        location: editingAsset.location || '',
        notes: editingAsset.notes || ''
      });
    } else {
        // Reset form when not editing
        setFormData({
            name: '',
            category: 'Other',
            purchase_date: new Date().toISOString().split('T')[0],
            store: '',
            price: 0,
            resale_price: 0,
            photo_url: '',
            location: '',
            notes: ''
        });
    }
  }, [editingAsset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAsset) {
        onUpdate(editingAsset.id, formData);
    } else {
        onAdd(formData);
    }
    
    // Form reset handled by useEffect or parent clearing editing state
    if (!editingAsset) {
        setFormData(prev => ({
            ...prev,
            name: '',
            price: 0,
            resale_price: 0,
            photo_url: '',
            notes: ''
        }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 relative">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editingAsset ? '编辑资产' : '添加新资产'}</h2>
          {editingAsset && (
              <button type="button" onClick={onCancelEdit} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
              </button>
          )}
      </div>
      
      {/* Category Selection */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
                <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={clsx(
                        "flex flex-col items-center justify-center p-2 rounded border transition-colors",
                        formData.category === cat.id ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                    )}
                >
                    <Icon size={20} />
                    <span className="text-xs mt-1">{cat.label}</span>
                </button>
            )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">物品名称</label>
            <input 
                type="text" 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">购买日期</label>
            <input 
                type="date" 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.purchase_date}
                onChange={e => setFormData({...formData, purchase_date: e.target.value})}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">购买商店</label>
            <input 
                type="text" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.store}
                onChange={e => setFormData({...formData, store: e.target.value})}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">存放位置</label>
            <input 
                type="text" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
            />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">购买价格</label>
            <input 
                type="number" 
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
            />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">预计二手价</label>
            <input 
                type="number" 
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.resale_price}
                onChange={e => setFormData({...formData, resale_price: Number(e.target.value)})}
            />
        </div>
      </div>
      
      <div>
            <label className="block text-sm font-medium text-gray-700">图片链接 (URL)</label>
            <input 
                type="text" 
                placeholder="http://..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.photo_url}
                onChange={e => setFormData({...formData, photo_url: e.target.value})}
            />
      </div>

      <div>
            <label className="block text-sm font-medium text-gray-700">备注</label>
            <textarea 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                rows={3}
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
            />
      </div>

      <div className="flex space-x-2">
          {editingAsset && (
              <button 
                type="button" 
                onClick={onCancelEdit}
                className="w-1/3 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
          )}
          <button 
            type="submit" 
            className={clsx(
                "text-white p-2 rounded-md transition-colors",
                editingAsset ? "w-2/3 bg-green-600 hover:bg-green-700" : "w-full bg-blue-600 hover:bg-blue-700"
            )}
          >
            {editingAsset ? '保存修改' : '确认添加'}
          </button>
      </div>

    </form>
  );
};
