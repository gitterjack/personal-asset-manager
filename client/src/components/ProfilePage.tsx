import React, { useState } from 'react';
import { User, Users, FileText, CreditCard, Activity, MapPin, Phone, Mail, Edit2, ScanFace, Mic, Video, Fingerprint, Sparkles, FileSignature, CheckCircle2, Bot, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

export const ProfilePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'basic' | 'family' | 'assets' | 'avatar'>('avatar');
  const [avatarAuth, setAvatarAuth] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
              <User size={120} />
          </div>
          
          <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img src="https://api.dicebear.com/9.x/bottts/svg?seed=Felix" alt="Avatar" className="w-full h-full" />
          </div>
          
          <div className="flex-1 text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">Admin User</h1>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Lv.3 资深管家</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">加入 Alive 第 128 天</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-600">
                  <span className="flex items-center"><MapPin size={14} className="mr-1"/> 北京, 朝阳</span>
                  <span className="flex items-center"><Phone size={14} className="mr-1"/> 138****8888</span>
                  <span className="flex items-center"><Mail size={14} className="mr-1"/> admin@alive.com</span>
              </div>
          </div>

          <button className="flex items-center gap-1 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              <Edit2 size={16} /> 编辑档案
          </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto">
          <button 
              onClick={() => setActiveSubTab('avatar')}
              className={clsx(
                  "flex-1 py-2 px-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap",
                  activeSubTab === 'avatar' ? "bg-white shadow text-purple-600" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <ScanFace size={16} /> 数字分身
          </button>
          <button 
              onClick={() => setActiveSubTab('basic')}
              className={clsx(
                  "flex-1 py-2 px-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap",
                  activeSubTab === 'basic' ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <FileText size={16} /> 基础资料
          </button>
          <button 
              onClick={() => setActiveSubTab('family')}
              className={clsx(
                  "flex-1 py-2 px-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap",
                  activeSubTab === 'family' ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <Users size={16} /> 家族谱系
          </button>
          <button 
              onClick={() => setActiveSubTab('assets')}
              className={clsx(
                  "flex-1 py-2 px-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap",
                  activeSubTab === 'assets' ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              )}
          >
              <CreditCard size={16} /> 资产汇总
          </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
          
          {/* Tab 0: Digital Avatar */}
          {activeSubTab === 'avatar' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between h-32">
                          <div className="flex justify-between items-start">
                              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                  <Mic size={20} />
                              </div>
                              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                  <input type="checkbox" checked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-blue-500 right-0"/>
                                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-blue-500 cursor-pointer"></label>
                              </div>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800">声纹资料</h4>
                              <p className="text-xs text-gray-500">已录制 32 分钟</p>
                          </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between h-32">
                          <div className="flex justify-between items-start">
                              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                  <Video size={20} />
                              </div>
                              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                  <input type="checkbox" checked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-purple-500 right-0"/>
                                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-purple-500 cursor-pointer"></label>
                              </div>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800">影像资料</h4>
                              <p className="text-xs text-gray-500">已上传 15 段视频</p>
                          </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between h-32 opacity-70">
                          <div className="flex justify-between items-start">
                              <div className="p-2 bg-gray-200 rounded-lg text-gray-600">
                                  <Fingerprint size={20} />
                              </div>
                              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                  <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"/>
                                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                              </div>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800">生物特征</h4>
                              <p className="text-xs text-gray-500">未授权 Face ID</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Sparkles size={100} className="text-purple-600"/>
                      </div>
                      <div className="relative z-10">
                          <div className="flex items-center space-x-2 mb-2">
                              <FileSignature size={20} className="text-purple-600"/>
                              <h3 className="text-lg font-bold text-gray-900">AI 数字分身授权协议</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-6 max-w-lg leading-relaxed">
                              我授权 <span className="font-bold">Alive (活着)</span> 平台在我的生理机能停止后，使用我留存的声纹、影像及行为数据，训练并生成我的 <span className="font-bold text-purple-600">AI 数字分身</span>，以供我的指定受益人（见证人）进行交互与缅怀。
                          </p>
                          
                          {avatarAuth ? (
                              <div className="flex items-center text-green-600 font-bold bg-white px-4 py-2 rounded-lg shadow-sm w-fit border border-green-200">
                                  <CheckCircle2 size={18} className="mr-2"/> 已签署授权协议
                              </div>
                          ) : (
                              <button 
                                  onClick={() => setAvatarAuth(true)}
                                  className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-all shadow-lg flex items-center"
                              >
                                  <FileSignature size={16} className="mr-2"/> 签署授权协议
                              </button>
                          )}
                      </div>
                  </div>

                  {/* AI Service Recommendations */}
                  <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-800 flex items-center">
                              <Sparkles size={18} className="mr-2 text-amber-500"/> AI 永生服务推荐
                          </h3>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Sponsored</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Voice Agent */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-blue-500 w-12 h-12 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                              <div className="flex items-center mb-2">
                                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-3">
                                      <Mic size={20} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-gray-800 text-sm">声纹智能体</h4>
                                      <span className="text-[10px] text-gray-400">Provider: SiliconFlow</span>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                  基于 30 分钟录音，克隆您的音色与语调，支持实时语音对话。
                              </p>
                              <button className="w-full py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  试听样例
                              </button>
                          </div>

                          {/* Digital Human */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-purple-500 w-12 h-12 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                              <div className="flex items-center mb-2">
                                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600 mr-3">
                                      <MessageSquare size={20} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-gray-800 text-sm">数字人视频通话</h4>
                                      <span className="text-[10px] text-gray-400">Provider: HeyGen</span>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                  1:1 复刻您的形象与表情，支持与亲友进行视频通话交互。
                              </p>
                              <button className="w-full py-1.5 text-xs font-bold text-purple-600 bg-purple-50 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                  查看效果
                              </button>
                          </div>

                          {/* Embodied Robot */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-orange-500 w-12 h-12 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                              <div className="flex items-center mb-2">
                                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mr-3">
                                      <Bot size={20} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-gray-800 text-sm">实体机器人定制</h4>
                                      <span className="text-[10px] text-gray-400">Provider: Tesla Bot</span>
                                  </div>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                  将您的思维模型注入实体机器人，实现物理世界的陪伴与交互。
                              </p>
                              <button className="w-full py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                  预约定制
                              </button>
                          </div>
                      </div>
                  </div>

              </div>
          )}

          {/* Tab 1: Basic Info */}
          {activeSubTab === 'basic' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase">真实姓名</label>
                          <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900">张三</div>
                      </div>
                      <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase">身份证号</label>
                          <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900 font-mono">110101********1234</div>
                      </div>
                      <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase">血型</label>
                          <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900">AB 型 (RH+)</div>
                      </div>
                      <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase">紧急联系人</label>
                          <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900 flex justify-between items-center">
                              <span>李四 (配偶)</span>
                              <span className="text-blue-600 text-sm">139****9999</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                          <Activity size={18} className="mr-2 text-red-500"/> 健康备注
                      </h3>
                      <textarea 
                          className="w-full p-4 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-blue-500 outline-none text-sm text-gray-700 leading-relaxed resize-none"
                          rows={4}
                          readOnly
                          value="对青霉素过敏。2023年曾进行过阑尾切除手术。日常服用维生素C。"
                      />
                  </div>
              </div>
          )}

          {/* Tab 2: Family Tree (Ming Dynasty) */}
          {activeSubTab === 'family' && (
              <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  {/* Generation 1: Zhu Yuanzhang & Empress Ma */}
                  <div className="flex gap-8 mb-10 relative">
                      <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-yellow-500 shadow-lg flex items-center justify-center text-yellow-700 font-bold mb-2 text-2xl z-10">
                              太祖
                          </div>
                          <span className="text-lg font-bold text-gray-900 bg-white px-3 py-1 rounded shadow-sm border border-yellow-200">朱元璋</span>
                          <span className="text-xs text-gray-500 mt-1">洪武大帝</span>
                      </div>
                      
                      {/* Marriage Connector */}
                      <div className="self-center w-8 h-px bg-yellow-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>

                      <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full bg-pink-50 border-4 border-pink-200 shadow-lg flex items-center justify-center text-pink-700 font-bold mb-2 text-2xl z-10">
                              马后
                          </div>
                          <span className="text-lg font-bold text-gray-900 bg-white px-3 py-1 rounded shadow-sm border border-pink-100">马皇后</span>
                          <span className="text-xs text-gray-500 mt-1">孝慈高皇后</span>
                      </div>
                  </div>

                  {/* Vertical Connector from Parents */}
                  <div className="w-px h-8 bg-yellow-300 -mt-6 mb-6"></div>
                  
                  {/* Branch Line for Siblings */}
                  <div className="w-full max-w-2xl h-px bg-yellow-300 mb-6 relative">
                      <div className="absolute -top-3 left-[10%] w-px h-4 bg-yellow-300"></div>
                      <div className="absolute -top-3 left-[35%] w-px h-4 bg-yellow-300"></div>
                      <div className="absolute -top-3 left-[60%] w-px h-4 bg-yellow-300"></div>
                      <div className="absolute -top-3 right-[10%] w-px h-4 bg-yellow-300"></div>
                  </div>

                  {/* Generation 2: Siblings */}
                  <div className="flex justify-between w-full max-w-3xl px-4 gap-4">
                      
                      {/* Zhu Biao (Eldest) */}
                      <div className="flex flex-col items-center relative group">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-yellow-300"></div>
                          <div className="w-16 h-16 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md flex items-center justify-center text-gray-600 font-bold mb-2 z-10">
                              太子
                          </div>
                          <span className="text-sm font-bold text-gray-800">朱标</span>
                          <span className="text-[10px] text-gray-500 mt-1">长子 (懿文)</span>
                          
                          {/* Connector to Gen 3 */}
                          <div className="w-px h-6 bg-gray-300 mt-2"></div>
                          <div className="flex flex-col items-center mt-1">
                              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                                  惠帝
                              </div>
                              <span className="text-xs text-gray-600 mt-1">朱允炆</span>
                          </div>
                      </div>

                      {/* Zhu Shuang */}
                      <div className="flex flex-col items-center relative opacity-70">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-yellow-300"></div>
                          <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-gray-400 font-bold mb-2">
                              秦王
                          </div>
                          <span className="text-sm font-bold text-gray-600">朱樉</span>
                          <span className="text-[10px] text-gray-400">次子</span>
                      </div>

                      {/* Zhu Gang */}
                      <div className="flex flex-col items-center relative opacity-70">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-yellow-300"></div>
                          <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-gray-400 font-bold mb-2">
                              晋王
                          </div>
                          <span className="text-sm font-bold text-gray-600">朱棡</span>
                          <span className="text-[10px] text-gray-400">三子</span>
                      </div>

                      {/* Zhu Di (The Emperor) */}
                      <div className="flex flex-col items-center relative">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-yellow-300"></div>
                          <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-500 shadow-md flex items-center justify-center text-yellow-700 font-bold mb-2 text-xl z-10">
                              成祖
                          </div>
                          <span className="text-sm font-bold text-gray-900 bg-yellow-50 px-2 rounded">朱棣</span>
                          <span className="text-[10px] text-gray-500 mt-1">四子 (永乐)</span>
                          
                          {/* Connector to Gen 3 */}
                          <div className="w-px h-6 bg-yellow-300 mt-2"></div>
                          <div className="flex flex-col items-center mt-1">
                              <div className="w-12 h-12 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 font-bold text-xs">
                                  仁宗
                              </div>
                              <span className="text-xs text-gray-600 mt-1">朱高炽</span>
                          </div>
                      </div>

                  </div>

              </div>
          )}

          {/* Tab 3: Asset Summary */}
          {activeSubTab === 'assets' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Net Worth</p>
                      <h2 className="text-4xl font-black">¥ 2,845,200.00</h2>
                      <div className="flex gap-4 mt-4 text-xs">
                          <span className="bg-white/10 px-2 py-1 rounded">实物资产: ¥14.5w</span>
                          <span className="bg-white/10 px-2 py-1 rounded">数字资产: ¥210w</span>
                          <span className="bg-white/10 px-2 py-1 rounded">金融保险: ¥60w</span>
                      </div>
                  </div>

                  <div className="border rounded-xl overflow-hidden">
                      <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-gray-600">
                              <tr>
                                  <th className="px-4 py-3">类别</th>
                                  <th className="px-4 py-3">项目</th>
                                  <th className="px-4 py-3 text-right">估值 (¥)</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                              <tr>
                                  <td className="px-4 py-3 text-gray-500">实物</td>
                                  <td className="px-4 py-3 font-medium">iPhone 17 Pro Max</td>
                                  <td className="px-4 py-3 text-right font-mono">9,999</td>
                              </tr>
                              <tr>
                                  <td className="px-4 py-3 text-gray-500">实物</td>
                                  <td className="px-4 py-3 font-medium">MacBook Pro M5</td>
                                  <td className="px-4 py-3 text-right font-mono">18,500</td>
                              </tr>
                              <tr>
                                  <td className="px-4 py-3 text-gray-500">数字</td>
                                  <td className="px-4 py-3 font-medium">Bitcoin (0.45 BTC)</td>
                                  <td className="px-4 py-3 text-right font-mono">2,100,000</td>
                              </tr>
                              <tr>
                                  <td className="px-4 py-3 text-gray-500">保险</td>
                                  <td className="px-4 py-3 font-medium">平安人寿重疾险</td>
                                  <td className="px-4 py-3 text-right font-mono">500,000</td>
                              </tr>
                              <tr className="bg-gray-50 font-bold">
                                  <td className="px-4 py-3" colSpan={2}>合计</td>
                                  <td className="px-4 py-3 text-right text-blue-600">2,628,499</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

      </div>
    </div>
  );
};
