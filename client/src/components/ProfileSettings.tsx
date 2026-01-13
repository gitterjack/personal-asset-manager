import React, { useState, useEffect } from 'react';
import { X, Save, User, Info, FileText } from 'lucide-react';
import axios from 'axios';
import clsx from 'clsx';
import { ProductManual } from './ProductManual';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettings: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'about'>('profile');
  const [formData, setFormData] = useState({
    gender: '男',
    age: 25,
    job: '极客',
    location: '赛博城'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
        fetchProfile();
        setActiveTab('profile');
    }
  }, [isOpen]);

  const fetchProfile = async () => {
      try {
          const res = await axios.get('/api/user/profile');
          if (res.data) {
              setFormData(prev => ({
                  ...prev,
                  ...res.data
              }));
          }
      } catch (e) {
          console.error(e);
      }
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
          await axios.put('/api/user/profile', formData);
          onClose();
      } catch (e) {
          alert('保存失败');
      } finally {
          setLoading(false);
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex h-[600px]">
        
        <div className="w-1/3 bg-gray-50 border-r border-gray-100 p-4 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 px-2">设置</h2>
            <div className="space-y-1 flex-1">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={clsx(
                        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        activeTab === 'profile' ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    )}
                >
                    <User size={18} />
                    <span>个人信息</span>
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={clsx(
                        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        activeTab === 'about' ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    )}
                >
                    <Info size={18} />
                    <span>关于产品</span>
                </button>
            </div>
        </div>

        <div className="flex-1 flex flex-col relative">
            <div className="absolute top-4 right-4 z-10">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
                {activeTab === 'profile' ? (
                    <div className="max-w-sm mx-auto pt-4">
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <FileText size={20} className="mr-2 text-blue-500"/> 编辑资料
                        </h3>
                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">性别</label>
                                    <select 
                                        value={formData.gender} 
                                        onChange={e => setFormData({...formData, gender: e.target.value})}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="男">男</option>
                                        <option value="女">女</option>
                                        <option value="保密">保密</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">年龄</label>
                                    <input 
                                        type="number" 
                                        value={formData.age}
                                        onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">职业 / 身份</label>
                                <input 
                                    type="text" 
                                    value={formData.job}
                                    onChange={e => setFormData({...formData, job: e.target.value})}
                                    placeholder="例如：产品经理、全栈工程师"
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">所在地区</label>
                                <input 
                                    type="text" 
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    placeholder="例如：上海"
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-100"
                                >
                                    {loading ? '保存中...' : <><Save size={18} /> 保存更改</>}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <ProductManual />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
