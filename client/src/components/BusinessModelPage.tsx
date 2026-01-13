import React from 'react';
import { Briefcase, RefreshCw, ShieldCheck, ArrowRight, Users, Target, Lock, TrendingUp, Handshake } from 'lucide-react';

export const BusinessModelPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Briefcase size={32} className="text-emerald-400" />
              </div>
              <div>
                  <h1 className="text-2xl font-bold">商业模式设计说明</h1>
                  <p className="text-slate-400 text-sm">Transparency builds Trust</p>
              </div>
          </div>
          <p className="text-slate-300 leading-relaxed max-w-2xl">
              我们相信，只有让用户清晰地知道“我们如何赚钱”，您才能放心地将资产数据交给我们。
              本产品采用 <span className="font-bold text-white">“全生命周期混合变现模型”</span>，不靠贩卖隐私获利，而是通过为用户创造价值来获取合理回报。
          </p>
      </div>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <RefreshCw size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">一、核心现金牛：交易导流与佣金</h2>
                  <p className="text-sm text-gray-500">在您最需要买卖的时候，提供价值并获取分润</p>
              </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Cash Cow
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl w-full">
                      <Users size={24} className="text-gray-600 mb-2"/>
                      <span className="font-bold text-sm">用户 (您)</span>
                      <span className="text-xs text-gray-400 mt-1">想要“一键回血”</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                      <ArrowRight size={24} className="text-blue-400 rotate-90 md:rotate-0"/>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-2 whitespace-nowrap">智能比价</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-100 w-full">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">App</div>
                      <span className="font-bold text-sm">资产管家</span>
                      <span className="text-xs text-blue-500 mt-1">分发回收订单</span>
                  </div>

                  <div className="flex flex-col items-center">
                      <ArrowRight size={24} className="text-green-500 rotate-90 md:rotate-0"/>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 whitespace-nowrap">佣金 (3-5%)</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl w-full">
                      <Handshake size={24} className="text-gray-600 mb-2"/>
                      <span className="font-bold text-sm">回收平台</span>
                      <span className="text-xs text-gray-400 mt-1">爱回收/闲鱼</span>
                  </div>
              </div>
              
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <span className="font-bold">商业逻辑：</span> 我们整合全网回收报价，帮您卖出最高价。作为回报，合作平台（如爱回收）会支付给我们一笔“导流佣金”。您不仅没多花钱，反而因为比价卖得更贵了。
              </p>
          </div>
      </section>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <ShieldCheck size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">二、创新增长点：“零感”订阅服务</h2>
                  <p className="text-sm text-gray-500">用理财收益覆盖会员费，消除付费痛点</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Lock size={16} className="mr-2 text-purple-500"/> 会员权益
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>无限量资产录入</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>云端数字遗产托管</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>死人开关 (倒计时遗嘱)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>专属行情分析报告</li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                      <span className="text-sm text-gray-400">标准定价</span>
                      <span className="text-2xl font-black text-gray-800">¥118<span className="text-xs font-normal text-gray-400">/年</span></span>
                  </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-purple-100 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      推荐
                  </div>
                  <h3 className="font-bold mb-2 text-purple-900">零感付费方案</h3>
                  <p className="text-purple-600 text-xs mb-6 font-medium">Financial Anchoring Model</p>
                  
                  <div className="flex items-center justify-between mb-6">
                      <div className="text-center">
                          <div className="text-3xl font-black text-gray-900 mb-1">¥5000</div>
                          <div className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">存入余额宝</div>
                      </div>
                      <div className="text-2xl font-black text-purple-300">≈</div>
                      <div className="text-center">
                          <div className="text-3xl font-black text-purple-600 mb-1">Free</div>
                          <div className="text-[10px] text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded-full">终身会员</div>
                      </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 bg-purple-50/50 p-3 rounded-lg leading-relaxed border border-purple-50">
                      我们提供资金配置建议，利用低风险理财产生的利息（约 ¥125/年）来自动抵扣会员费。您感觉“没花钱”，我们获得了稳定的订阅收入。
                  </p>
              </div>
          </div>
      </section>

      <section>
          <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Target size={20} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-800">三、爆发潜力股：精准生命周期广告</h2>
                  <p className="text-sm text-gray-500">不发垃圾广告，只在“换机窗口期”提供有用信息</p>
              </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                      <h4 className="font-bold text-gray-800 text-sm">广告运作逻辑</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                              因为我们知道您拥有 <span className="font-bold bg-orange-100 text-orange-800 px-1 rounded">小米13</span>，且使用了 <span className="font-bold bg-orange-100 text-orange-800 px-1 rounded">2.5年</span>，
                              系统判断您进入了“换机窗口期”。此时，厂商愿意支付高溢价来向您展示以旧换新优惠。
                          </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
                          <TrendingUp size={14} />
                          <span>转化率是普通广告的 5-10 倍</span>
                      </div>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-64 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                      <p className="text-xs text-gray-400 mb-2 text-center">- 模拟广告展示 -</p>
                      <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-1.5 rounded">小米官方</span>
                              <span className="text-[10px] text-gray-300">广告</span>
                          </div>
                          <p className="text-sm font-bold text-gray-800 mb-1">小米17 Pro 尊享置换</p>
                          <p className="text-xs text-gray-500 mb-2">您的小米13当前估值 ¥1,200，以旧换新仅需补 ¥3,xxx</p>
                          <button className="w-full bg-orange-500 text-white text-xs py-1.5 rounded font-bold">查看详情</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                  <tr>
                      <th className="px-6 py-4">收入板块</th>
                      <th className="px-6 py-4">支付方 (谁买单?)</th>
                      <th className="px-6 py-4">核心驱动力</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600">流量变现 (佣金)</td>
                      <td className="px-6 py-4">回收平台/电商 (B端)</td>
                      <td className="px-6 py-4 text-gray-600">用户的“回血”和“种草”需求</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-600">服务订阅 (SaaS)</td>
                      <td className="px-6 py-4">用户 (C端)</td>
                      <td className="px-6 py-4 text-gray-600">安全感 + “利息覆盖”心理暗示</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-indigo-600">理财导流 (CPA)</td>
                      <td className="px-6 py-4">银行/保险/Fintech (B端)</td>
                      <td className="px-6 py-4 text-gray-600">“零感付费”带来的开户/配置需求</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-orange-600">精准广告</td>
                      <td className="px-6 py-4">品牌厂商 (B端)</td>
                      <td className="px-6 py-4 text-gray-600">资产全生命周期数据挖掘</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-600">增值服务</td>
                      <td className="px-6 py-4">律所/公证机构 (B端)</td>
                      <td className="px-6 py-4 text-gray-600">资产公证与合规需求</td>
                  </tr>
              </tbody>
          </table>
      </section>

    </div>
  );
};
