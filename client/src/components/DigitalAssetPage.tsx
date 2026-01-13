import React, { useState } from 'react';
import { Lock, HardDrive, Wifi, Shield, Clock, ChevronRight, CheckCircle2, Key, Video, Database, Feather, Scroll, ShoppingCart, ExternalLink, Scale, Cloud, ShieldCheck, ArrowRight, Globe, Eye, UserCheck } from 'lucide-react';
import clsx from 'clsx';

export const DigitalAssetPage: React.FC = () => {
  const [driveStatus, setDriveStatus] = useState<'disconnected' | 'scanning' | 'connected'>('disconnected');
  const [legacyVisibility, setLegacyVisibility] = useState<'public' | 'private'>('private');

  const handleConnectDrive = () => {
    if (driveStatus === 'connected') return;
    setDriveStatus('scanning');
    setTimeout(() => {
        setDriveStatus('connected');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Lock size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold">数字资产保险箱</h2>
              </div>
              <p className="text-gray-400 text-sm">全资产归集 · 本地加密 · 隐私保护</p>
          </div>

          <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                                  NF
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-800">网易云音乐会员</h4>
                                  <p className="text-xs text-gray-400">到期: 2026-12-31</p>
                              </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
                      </div>
                      <div className="text-xs bg-gray-50 p-2 rounded text-gray-500 font-mono">
                          user***@gmail.com
                      </div>
                  </div>

                  <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                  <span className="font-bold text-lg">₿</span>
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-800">Bitcoin 冷钱包</h4>
                                  <p className="text-xs text-gray-400">余额: 0.45 BTC</p>
                              </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
                      </div>
                      <div className="text-xs bg-gray-50 p-2 rounded text-gray-500 font-mono flex items-center">
                          <span className="truncate">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
                      </div>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                  <Shield size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-800">平安人寿保单</h4>
                                  <p className="text-xs text-gray-400">保额: 500w</p>
                              </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
                      </div>
                      <div className="text-xs bg-gray-50 p-2 rounded text-gray-500">
                          已备份至本地加密盘
                      </div>
                  </div>

                  <div className="p-4 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors min-h-[100px]">
                      <div className="mb-2 text-2xl">+</div>
                      <span className="text-xs font-medium">添加新资产</span>
                  </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                          <div className={clsx(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                              driveStatus === 'connected' ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
                          )}>
                              <HardDrive size={20} />
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800 flex items-center">
                                  本地隐私盘
                                  {driveStatus === 'connected' && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">已加密连接</span>}
                              </h4>
                              <p className="text-xs text-gray-500 flex items-center mt-1">
                                  <Wifi size={12} className="mr-1"/> 支持 WiFi 无线连接 · <Shield size={12} className="mx-1"/> 数据不上传云端
                              </p>
                          </div>
                      </div>
                      <button 
                        onClick={handleConnectDrive}
                        disabled={driveStatus !== 'disconnected'}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all",
                            driveStatus === 'connected' ? "bg-white text-green-600 border border-green-200" : "bg-gray-900 text-white hover:bg-black"
                        )}
                      >
                          {driveStatus === 'scanning' ? (
                              <><Wifi size={16} className="animate-pulse mr-2"/> 扫描中...</>
                          ) : driveStatus === 'connected' ? (
                              <><CheckCircle2 size={16} className="mr-2"/> 已连接</>
                          ) : (
                              '连接硬盘'
                          )}
                      </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                              <ShoppingCart size={12} className="mr-1" /> 官方推荐适配硬件
                          </h5>
                          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">专为 Alive 优化 · 支持一键绑定</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          
                          <a href="#" className="flex items-center p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all group no-underline">
                              <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600 mr-2 shrink-0">
                                  <HardDrive size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-gray-800 truncate group-hover:text-blue-600">Seagate Expansion</div>
                                  <div className="text-[10px] text-gray-400">2TB · 即插即用</div>
                              </div>
                              <ExternalLink size={12} className="text-gray-300 ml-1 group-hover:text-blue-400" />
                          </a>

                          <a href="#" className="flex items-center p-2 bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-sm transition-all group no-underline">
                              <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center text-purple-600 mr-2 shrink-0">
                                  <Database size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-gray-800 truncate group-hover:text-purple-600">Synology BeeDrive</div>
                                  <div className="text-[10px] text-gray-400">1TB · 自动备份</div>
                              </div>
                              <ExternalLink size={12} className="text-gray-300 ml-1 group-hover:text-purple-400" />
                          </a>

                          <a href="#" className="flex items-center p-2 bg-white rounded-lg border border-gray-200 hover:border-orange-400 hover:shadow-sm transition-all group no-underline">
                              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center text-orange-600 mr-2 shrink-0">
                                  <Shield size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-gray-800 truncate group-hover:text-orange-600">WD My Passport</div>
                                  <div className="text-[10px] text-gray-400">4TB · 军工加密</div>
                              </div>
                              <ExternalLink size={12} className="text-gray-300 ml-1 group-hover:text-orange-400" />
                          </a>

                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden relative group z-0">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Scroll size={150} className="text-stone-800 rotate-12"/>
          </div>
          <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-gradient-to-r from-stone-900 to-stone-800">
              <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg text-white backdrop-blur-sm">
                      <Feather size={24} />
                  </div>
                  <div>
                      <h2 className="text-xl font-bold text-white font-serif tracking-wide">资产传承</h2>
                      <p className="text-xs text-stone-400 font-serif">人生天地间，忽如远行客</p>
                  </div>
              </div>
              <div className="px-3 py-1 bg-stone-700 text-stone-200 text-xs font-bold rounded-full flex items-center border border-stone-600">
                  <span className="w-2 h-2 bg-stone-400 rounded-full mr-2"></span>
                  契约已定
              </div>
          </div>
          
          <div className="p-6 relative z-10 space-y-6">
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-full md:w-1/2">
                      <div className="flex bg-stone-100 p-1 rounded-lg mb-3">
                          <button 
                              onClick={() => setLegacyVisibility('private')}
                              className={clsx(
                                  "flex-1 flex items-center justify-center py-2 rounded-md text-sm font-bold transition-all font-serif",
                                  legacyVisibility === 'private' ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"
                              )}
                          >
                              <Lock size={14} className="mr-2"/> 指定受益人
                          </button>
                          <button 
                              onClick={() => setLegacyVisibility('public')}
                              className={clsx(
                                  "flex-1 flex items-center justify-center py-2 rounded-md text-sm font-bold transition-all font-serif",
                                  legacyVisibility === 'public' ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"
                              )}
                          >
                              <Globe size={14} className="mr-2"/> 全网公开
                          </button>
                      </div>
                      <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 min-h-[100px] flex items-center justify-center text-stone-500 text-sm font-serif">
                          {legacyVisibility === 'private' ? (
                              <div className="text-center">
                                  <UserCheck size={24} className="mx-auto mb-2 opacity-50"/>
                                  <p>仅限 3 位指定见证人/受益人查阅</p>
                              </div>
                          ) : (
                              <div className="text-center w-full">
                                  <Eye size={24} className="mx-auto mb-2 opacity-50"/>
                                  <p className="mb-2">您的“数字墓志铭”已生成</p>
                                  <button className="text-xs bg-stone-800 text-white px-3 py-1 rounded flex items-center mx-auto hover:bg-black transition-colors">
                                      访问公开主页 <ExternalLink size={10} className="ml-1"/>
                                  </button>
                              </div>
                          )}
                      </div>
                  </div>

                  <div className="w-full md:w-1/2 border-l border-stone-100 pl-0 md:pl-6">
                      <h4 className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-wider">名家遗嘱参考</h4>
                      <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group">
                              <div>
                                  <div className="text-sm font-bold text-stone-700 font-serif group-hover:text-stone-900">Benjamin Franklin</div>
                                  <div className="text-[10px] text-stone-500">200年信托基金 · 长期主义</div>
                              </div>
                              <ChevronRight size={14} className="text-stone-300" />
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group">
                              <div>
                                  <div className="text-sm font-bold text-stone-700 font-serif group-hover:text-stone-900">Alfred Nobel</div>
                                  <div className="text-[10px] text-stone-500">设立奖项 · 造福人类</div>
                              </div>
                              <ChevronRight size={14} className="text-stone-300" />
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group">
                              <div>
                                  <div className="text-sm font-bold text-stone-700 font-serif group-hover:text-stone-900">Albert Einstein</div>
                                  <div className="text-[10px] text-stone-500">科学与极简 · 骨灰撒入河中</div>
                              </div>
                              <ChevronRight size={14} className="text-stone-300" />
                          </div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-stone-50 p-5 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                      <Clock size={28} className="mx-auto text-stone-600 mb-3" />
                      <div className="text-xl font-bold text-stone-800 mb-1 font-serif">光阴刻度</div>
                      <div className="text-xs text-stone-500 mb-3">上次驻足: 2天前</div>
                      <button className="text-xs bg-stone-700 text-white px-4 py-1.5 rounded-full hover:bg-stone-900 transition-colors font-serif">
                          报平安
                      </button>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                      <Scroll size={28} className="mx-auto text-stone-600 mb-3" />
                      <div className="text-xl font-bold text-stone-800 mb-1 font-serif">身后托付</div>
                      <div className="text-xs text-stone-500 mb-3">触发机制: 30日无音讯</div>
                      <div className="text-xs text-stone-600 font-medium cursor-pointer hover:underline underline-offset-4 decoration-stone-400">
                          查看契约
                      </div>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                      <Key size={28} className="mx-auto text-stone-600 mb-3" />
                      <div className="text-xl font-bold text-stone-800 mb-1 font-serif">托孤者</div>
                      <div className="text-xs text-stone-500 mb-3">见证人: 3位</div>
                      <div className="flex justify-center -space-x-2 opacity-80">
                          <div className="w-6 h-6 rounded-full bg-stone-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-stone-400 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-stone-500 border-2 border-white"></div>
                      </div>
                  </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                  <h3 className="text-sm font-bold text-stone-600 font-serif mb-4 flex items-center">
                      <Feather size={14} className="mr-2"/> 签约公证服务商
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="flex flex-col p-4 bg-stone-50 border border-stone-100 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                              <div className="p-2 bg-stone-200 rounded-lg text-stone-700">
                                  <Scale size={18} />
                              </div>
                              <ArrowRight size={16} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                          </div>
                          <h4 className="font-bold text-stone-800 font-serif">金杜律师事务所</h4>
                          <p className="text-[10px] text-stone-500 mt-1">全球顶尖律所 · 遗嘱代书</p>
                      </div>

                      <div className="flex flex-col p-4 bg-stone-50 border border-stone-100 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                              <div className="p-2 bg-stone-200 rounded-lg text-stone-700">
                                  <Cloud size={18} />
                              </div>
                              <ArrowRight size={16} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                          </div>
                          <h4 className="font-bold text-stone-800 font-serif">公证云</h4>
                          <p className="text-[10px] text-stone-500 mt-1">司法部备案 · 在线存证</p>
                      </div>

                      <div className="flex flex-col p-4 bg-stone-50 border border-stone-100 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                              <div className="p-2 bg-stone-200 rounded-lg text-stone-700">
                                  <ShieldCheck size={18} />
                              </div>
                              <ArrowRight size={16} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                          </div>
                          <h4 className="font-bold text-stone-800 font-serif">LegalShield</h4>
                          <p className="text-[10px] text-stone-500 mt-1">全天候法律咨询 · 权益保障</p>
                      </div>

                  </div>
              </div>

              <button className="w-full py-4 border border-stone-300 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all group bg-white shadow-sm">
                  <Video size={20} className="mr-2 text-stone-400 group-hover:text-stone-800 transition-colors" />
                  <span className="font-bold font-serif tracking-widest">立书存证 · 留影人间</span>
              </button>
          </div>
      </section>

    </div>
  );
};
