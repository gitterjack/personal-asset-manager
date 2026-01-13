import React, { useState, useEffect } from 'react';
import type { NewAsset, Asset } from '../types';
import { Smartphone, Monitor, Laptop, Camera, Headphones, Keyboard, Box, Car, Gamepad2, Tablet, BookOpen, X, Image as ImageIcon, Mic, Type, Upload, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const CATEGORIES = [
  { id: 'Phone', icon: Smartphone, label: '手机' },
  { id: 'PC', icon: Monitor, label: '台式机' },
  { id: 'Monitor', icon: Monitor, label: '显示器' },
  { id: 'Laptop', icon: Laptop, label: '笔记本' },
  { id: 'Tablet', icon: Tablet, label: '平板' },
  { id: 'Camera', icon: Camera, label: '相机' },
  { id: 'Headphone', icon: Headphones, label: '耳机' },
  { id: 'Keyboard', icon: Keyboard, label: '键盘' },
  { id: 'Console', icon: Gamepad2, label: '游戏机' },
  { id: 'E-Reader', icon: BookOpen, label: '阅读器' },
  { id: 'Car', icon: Car, label: '汽车' },
  { id: 'TV', icon: Monitor, label: '电视' },
  { id: 'Washer', icon: Box, label: '洗衣机' },
  { id: 'Fridge', icon: Box, label: '冰箱' },
  { id: 'AC', icon: Box, label: '空调' },
  { id: 'Other', icon: Box, label: '其他' },
];

interface Props {
  onAdd: (asset: NewAsset) => void;
  onUpdate: (id: number, asset: NewAsset) => void;
  editingAsset: Asset | null;
  onCancelEdit: () => void;
}


type InputMode = 'manual' | 'image' | 'voice';

export const AssetForm: React.FC<Props> = ({ onAdd, onUpdate, editingAsset, onCancelEdit }) => {
  const [mode, setMode] = useState<InputMode>('manual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [formData, setFormData] = useState<NewAsset>({
    name: '',
    category: 'Other',
    purchase_date: new Date().toISOString().split('T')[0],
    store: '',
    price: 0,
    resale_price: 0,
    photo_url: '',
    location: '',
    notes: '',
    warranty_expiry: ''
  });

  useEffect(() => {
    if (editingAsset) {
      setMode('manual');
      setFormData({
        name: editingAsset.name,
        category: editingAsset.category,
        purchase_date: editingAsset.purchase_date,
        store: editingAsset.store || '',
        price: editingAsset.price,
        resale_price: editingAsset.resale_price || 0,
        photo_url: editingAsset.photo_url || '',
        location: editingAsset.location || '',
        notes: editingAsset.notes || '',
        warranty_expiry: editingAsset.warranty_expiry || ''
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
            notes: '',
            warranty_expiry: ''
        });
    }
  }, [editingAsset]);

  const handleSimulatedProcess = (type: 'image' | 'voice') => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          
          const mockData = {
              name: type === 'image' ? 'Sony A7M4 相机' : 'MacBook Pro 14寸',
              price: type === 'image' ? 16999 : 14999,
              category: type === 'image' ? 'Camera' : 'Laptop',
              store: type === 'image' ? '京东旗舰店' : 'Apple Store',
              notes: type === 'image' ? '识别自订单截图：包含24-70mm镜头套餐' : '语音识别：M3 Pro芯片，18G内存'
          };
          
          setFormData(prev => ({
              ...prev,
              ...mockData,
              category: CATEGORIES.find(c => c.id === mockData.category)?.id || 'Other'
          }));
          
          setMode('manual');
          alert(type === 'image' ? "已成功识别订单截图！" : "已成功解析语音描述！");
      }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          handleSimulatedProcess('image');
      }
  };

  const handleVoiceInput = () => {
      if (!voiceText) return;
      handleSimulatedProcess('voice');
  };

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
            notes: '',
            warranty_expiry: ''
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

      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 gap-1">
          <button
              type="button"
              onClick={() => setMode('manual')}
              className={clsx(
                  "flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap",
                  mode === 'manual' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <Type size={14} className="mr-1"/> 表单录入
          </button>
          <button
              type="button"
              onClick={() => setMode('image')}
              className={clsx(
                  "flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap",
                  mode === 'image' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <ImageIcon size={14} className="mr-1"/> 上传截图
          </button>
          <button
              type="button"
              onClick={() => setMode('voice')}
              className={clsx(
                  "flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap",
                  mode === 'voice' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <Mic size={14} className="mr-1"/> 文字识别
          </button>
      </div>
      
      {mode === 'image' && (
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center bg-blue-50 mb-4 hover:bg-blue-100 transition-colors cursor-pointer relative">
               <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <div className="flex flex-col items-center justify-center text-blue-500">
                  {isProcessing ? (
                      <>
                          <Loader2 size={48} className="animate-spin mb-2" />
                          <p className="text-sm font-medium">正在识别订单信息...</p>
                      </>
                  ) : (
                      <>
                          <Upload size={48} className="mb-2" />
                          <p className="font-bold">点击上传订单截图</p>
                          <p className="text-xs mt-1 text-blue-400">支持淘宝、京东、拼多多订单详情页</p>
                      </>
                  )}
               </div>
          </div>
      )}

      {mode === 'voice' && (
          <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-100">
              <label className="block text-sm font-medium text-purple-800 mb-2">
                  <Mic size={14} className="inline mr-1"/> 
                  请描述您的资产信息
              </label>
              <textarea
                  className="w-full p-3 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  rows={3}
                  placeholder="例如：我在京东买了一台 MacBook Pro 14寸，花了14999元，配置是M3 Pro芯片..."
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
              />
              <button
                  type="button"
                  onClick={handleVoiceInput}
                  disabled={!voiceText || isProcessing}
                  className={clsx(
                      "mt-2 w-full py-2 rounded-md font-bold transition-all flex items-center justify-center",
                      !voiceText ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                  )}
              >
                  {isProcessing ? (
                      <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          正在解析...
                      </>
                  ) : "开始智能识别"}
              </button>
          </div>
      )}

      <div className={clsx("space-y-4", mode !== 'manual' && "opacity-50 pointer-events-none filter blur-[1px]")}>
      
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
            <label className="block text-sm font-medium text-gray-700">保修到期日</label>
            <input 
                type="date" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={formData.warranty_expiry || ''}
                onChange={e => setFormData({...formData, warranty_expiry: e.target.value})}
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
      </div>

    </form>
  );
};
