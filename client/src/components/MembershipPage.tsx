import React, { useState } from 'react';
import { Calculator, Wallet, Smartphone, Landmark, Umbrella, Server, HardDrive, Cpu, Network, Check, Zap, Crown, X, Share2, Database, ShieldCheck, Coins } from 'lucide-react';
import clsx from 'clsx';

export const MembershipPage: React.FC = () => {
  const [monthlyFee, setMonthlyFee] = useState<number>(19);
  const interestRate = 0.025; 
  const requiredPrincipal = Math.ceil((monthlyFee * 12) / interestRate);
  const [isDataShared, setIsDataShared] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      <div className="bg-gradient-to-r from-indigo-900 to-violet-900 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Crown size={32} className="text-amber-400" />
              </div>
              <div>
                  <h1 className="text-2xl font-bold">会员体系</h1>
                  <p className="text-indigo-300 text-sm">Upgrade to Alive+ for ultimate peace of mind</p>
              </div>
          </div>
      </div>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <Calculator size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">零感付费方案</h2>
                  <p className="text-sm text-gray-500">利息覆盖月费 · 让资产为你买单</p>
              </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-indigo-50 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Financial Anchoring
              </div>

              <div className="bg-indigo-50/50 backdrop-blur-md rounded-xl p-6 border border-indigo-100 mb-6 mt-4">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-1 w-full">
                          <label className="block text-sm text-indigo-900 mb-2 font-bold">服务订阅月费 (¥)</label>
                          <div className="flex items-center space-x-4">
                              <input 
                                  type="range" 
                                  min="9" 
                                  max="99" 
                                  step="1"
                                  value={monthlyFee}
                                  onChange={(e) => setMonthlyFee(Number(e.target.value))}
                                  className="flex-1 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                              />
                              <span className="text-3xl font-bold font-mono w-16 text-right text-indigo-700">¥{monthlyFee}</span>
                          </div>
                      </div>

                      <div className="hidden md:block w-px h-16 bg-indigo-200"></div>

                      <div className="flex-1 w-full text-center md:text-left">
                          <p className="text-sm text-indigo-900 mb-1 font-bold">只需在余额宝存入约</p>
                          <p className="text-4xl font-black text-amber-500">¥{requiredPrincipal.toLocaleString()}</p>
                          <p className="text-xs text-indigo-500 mt-2">
                              按年化收益 2.5% 计算，产生的利息即可覆盖会员费
                          </p>
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-wider">一键配置资金方案 (合作机构)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button className="flex items-center justify-center space-x-2 bg-white text-blue-600 py-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm font-bold text-xs">
                          <Wallet size={16} /> <span>支付宝余额宝</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-white text-green-600 py-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all shadow-sm font-bold text-xs">
                          <Smartphone size={16} /> <span>微信理财通</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-white text-red-600 py-3 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm font-bold text-xs">
                          <Landmark size={16} /> <span>招商/工商银行</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-white text-orange-600 py-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm font-bold text-xs">
                          <Umbrella size={16} /> <span>稳健保险理财</span>
                      </button>
                  </div>
              </div>
          </div>
      </section>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <Server size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">资源消耗明细</h2>
                  <p className="text-sm text-gray-500">透明展示您的数据占用与服务成本</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-slate-700 font-bold">
                          <HardDrive size={18} /> <span>云端存储</span>
                      </div>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                      <span>45 GB 已用</span>
                      <span>100 GB 总量</span>
                  </div>
                  <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                          <span className="flex items-center text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>照片 (12,450)</span>
                          <span className="font-mono">32 GB</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="flex items-center text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2"></div>视频 (450)</span>
                          <span className="font-mono">11 GB</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="flex items-center text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>文档 (1,200)</span>
                          <span className="font-mono">2 GB</span>
                      </div>
                  </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-slate-700 font-bold">
                          <Cpu size={18} /> <span>计算资源</span>
                      </div>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Normal</span>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">API 调用次数</span>
                              <span className="font-mono font-bold">12,450 / mo</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">AI 生成 (次)</span>
                              <span className="font-mono font-bold">15 / 50</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                      </div>
                      <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
                          <span className="text-xs text-gray-400">预估计算成本</span>
                          <span className="text-sm font-bold text-slate-700">¥ 18.5 / 月</span>
                      </div>
                  </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-slate-700 font-bold">
                          <Network size={18} /> <span>网络流量</span>
                      </div>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">高速</span>
                  </div>
                  
                  <div className="flex items-end justify-between mb-4">
                      <div>
                          <p className="text-3xl font-black text-slate-800">120<span className="text-sm font-normal text-gray-500 ml-1">GB</span></p>
                          <p className="text-xs text-gray-400">本月下行流量</p>
                      </div>
                      <div className="text-right">
                          <p className="text-sm font-bold text-slate-700">CDN 加速</p>
                          <p className="text-xs text-green-500">已启用</p>
                      </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-gray-50 pt-3">
                      <div className="flex justify-between">
                          <span className="text-gray-500">流量费用</span>
                          <span className="font-mono">¥ 9.60</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">CDN 费用</span>
                          <span className="font-mono">¥ 12.50</span>
                      </div>
                      <div className="flex justify-between font-bold pt-1">
                          <span className="text-gray-700">总计</span>
                          <span className="font-mono text-indigo-600">¥ 22.10</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                  <Share2 size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">数据价值共享</h2>
                  <p className="text-sm text-gray-500">授权脱敏数据 · 换取生态权益</p>
              </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 flex-1">
                  <div className="flex items-start space-x-4">
                      <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                          <Database size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-800 text-lg mb-1">数字资料贡献计划</h3>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                              授权将您的脱敏资产数据（不包含隐私信息）用于服务商的个性化推荐算法，您将获得 <span className="font-bold text-amber-500">Alive Points</span> 积分奖励，可直接抵扣会员费用。
                          </p>
                          <div className="flex items-center space-x-4 text-xs font-medium">
                              <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded"><ShieldCheck size={14} className="mr-1"/> 隐私已脱敏</span>
                              <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded"><Coins size={14} className="mr-1"/> 积分当钱花</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-gray-50 p-6 md:w-72 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center items-center text-center">
                  <div className="mb-4">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">当前状态</p>
                      {isDataShared ? (
                          <div className="text-green-600 font-bold flex items-center justify-center"><Check size={18} className="mr-1"/> 已授权共享</div>
                      ) : (
                          <div className="text-gray-400 font-bold flex items-center justify-center"><X size={18} className="mr-1"/> 未开启</div>
                      )}
                  </div>

                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input 
                          type="checkbox" 
                          name="toggle" 
                          id="toggle" 
                          checked={isDataShared}
                          onChange={() => setIsDataShared(!isDataShared)}
                          className={clsx(
                              "toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out",
                              isDataShared ? "translate-x-6 border-cyan-500" : "border-gray-300"
                          )}
                      />
                      <label 
                          htmlFor="toggle" 
                          className={clsx(
                              "toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out",
                              isDataShared ? "bg-cyan-500" : "bg-gray-300"
                          )}
                      ></label>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">点击切换授权状态</p>

                  {isDataShared && (
                      <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                          <p className="text-xs text-gray-500 mb-1">本月获得收益</p>
                          <p className="text-xl font-black text-amber-500 flex items-center justify-center">
                              <Coins size={16} className="mr-1"/> 125 <span className="text-[10px] text-gray-400 font-normal ml-1">pts</span>
                          </p>
                      </div>
                  )}
              </div>
          </div>
      </section>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <Zap size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">会员权益对比</h2>
                  <p className="text-sm text-gray-500">选择适合您的方案</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">基础版</h3>
                  <div className="text-3xl font-black text-gray-900 mb-6">¥0 <span className="text-sm font-normal text-gray-400">/ 永久免费</span></div>
                  
                  <ul className="space-y-4 flex-1 mb-8">
                      <li className="flex items-center text-sm text-gray-600"><Check size={16} className="text-green-500 mr-2"/> 资产录入 (限50件)</li>
                      <li className="flex items-center text-sm text-gray-600"><Check size={16} className="text-green-500 mr-2"/> 基础行情分析</li>
                      <li className="flex items-center text-sm text-gray-600"><Check size={16} className="text-green-500 mr-2"/> 本地隐私盘连接</li>
                      <li className="flex items-center text-sm text-gray-400"><X size={16} className="text-gray-300 mr-2"/> 云端数字遗产托管</li>
                      <li className="flex items-center text-sm text-gray-400"><X size={16} className="text-gray-300 mr-2"/> 死人开关 (自动触发)</li>
                  </ul>

                  <button className="w-full py-3 rounded-lg border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-400 transition-colors">
                      当前版本
                  </button>
              </div>

              <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col relative overflow-hidden text-white shadow-xl transform md:-translate-y-2">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Crown size={20} className="text-amber-400"/> Alive+ 会员</h3>
                  <div className="mb-6">
                      <span className="text-3xl font-black text-white">¥19</span> <span className="text-sm font-normal text-slate-400">/ 月</span>
                      <div className="text-xs text-amber-400 font-bold mt-1">或通过“零感付费”免费获取</div>
                  </div>
                  
                  <ul className="space-y-4 flex-1 mb-8">
                      <li className="flex items-center text-sm text-slate-200"><Check size={16} className="text-amber-400 mr-2"/> 无限资产录入</li>
                      <li className="flex items-center text-sm text-slate-200"><Check size={16} className="text-amber-400 mr-2"/> 1TB 云端加密存储</li>
                      <li className="flex items-center text-sm text-slate-200"><Check size={16} className="text-amber-400 mr-2"/> 完整数字遗产服务</li>
                      <li className="flex items-center text-sm text-slate-200"><Check size={16} className="text-amber-400 mr-2"/> 死人开关 & 律师公证对接</li>
                      <li className="flex items-center text-sm text-slate-200"><Check size={16} className="text-amber-400 mr-2"/> 专属 AI 形象定制 (50次/月)</li>
                  </ul>

                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold hover:shadow-lg hover:from-amber-500 hover:to-orange-600 transition-all">
                      立即升级
                  </button>
              </div>
          </div>
      </section>

    </div>
  );
};
