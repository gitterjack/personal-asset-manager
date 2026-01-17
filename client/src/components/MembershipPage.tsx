import React, { useState } from 'react';
import { Calculator, Server, Check, Zap, Crown, Briefcase, RefreshCw, ArrowRight, Target } from 'lucide-react';

export const MembershipPage: React.FC = () => {
    const [monthlyFee, setMonthlyFee] = useState<number>(19);
    const interestRate = 0.025;
    const requiredPrincipal = Math.ceil((monthlyFee * 12) / interestRate);
    const [isDataShared, setIsDataShared] = useState(false);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 min-h-[calc(100vh-80px)]">

            {/* LEFT COLUMN: User Perspective (Membership) */}
            <div className="p-8 md:p-12 xl:border-r border-slate-200 space-y-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">会员权益</h2>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">USER VIEW</span>
                        <p className="text-sm text-slate-500 font-medium">您的权利与服务订阅</p>
                    </div>
                </div>

                {/* Membership Tiers Comparison - Clean Border Style */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-900">
                        <Zap size={20} className="text-slate-400" />
                        <h3 className="font-bold text-lg">版本选择</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Basic Plan */}
                        <div className="border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-slate-700">基础版</h4>
                            </div>
                            <div className="text-3xl font-black text-slate-900 mb-6">¥0 <span className="text-sm font-normal text-slate-400">/ 永久</span></div>
                            <ul className="space-y-3 text-sm text-slate-600 mb-6">
                                <li className="flex items-center"><Check size={14} className="text-slate-400 mr-2" /> 资产录入 (限50件)</li>
                                <li className="flex items-center"><Check size={14} className="text-slate-400 mr-2" /> 基础行情分析</li>
                            </ul>
                            <button className="w-full py-2 rounded-lg border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50">当前版本</button>
                        </div>

                        {/* Pro Plan */}
                        <div className="border-2 border-slate-900 rounded-xl p-6 relative shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                            <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">RECOMMENDED</div>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-slate-900 flex items-center gap-2"><Crown size={16} /> Alive+</h4>
                            </div>
                            <div className="text-3xl font-black text-slate-900 mb-1">¥19 <span className="text-sm font-normal text-slate-400">/ 月</span></div>
                            <div className="text-[10px] text-indigo-600 font-bold mb-6">支持“零感付费”抵扣</div>
                            <ul className="space-y-3 text-sm text-slate-700 mb-6">
                                <li className="flex items-center"><Check size={14} className="text-indigo-600 mr-2" /> 无限资产录入</li>
                                <li className="flex items-center"><Check size={14} className="text-indigo-600 mr-2" /> 1TB 云端加密存储</li>
                                <li className="flex items-center"><Check size={14} className="text-indigo-600 mr-2" /> 完整数字遗产服务</li>
                            </ul>
                            <button className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">立即升级</button>
                        </div>
                    </div>
                </section>

                {/* Zero Sense Calculator - Simplified */}
                <section className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900">
                        <Calculator size={20} className="text-slate-400" />
                        <h3 className="font-bold text-lg">零感付费</h3>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                        <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                            <div className="flex-1 w-full">
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-slate-500">订阅月费</label>
                                    <span className="font-mono font-bold text-slate-900">¥{monthlyFee}</span>
                                </div>
                                <input
                                    type="range" min="9" max="99" step="1" value={monthlyFee}
                                    onChange={(e) => setMonthlyFee(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                />
                            </div>
                            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <label className="text-xs font-bold text-slate-500 block mb-1">建议理财本金</label>
                                <div className="text-2xl font-black text-slate-900 tracking-tight">¥{requiredPrincipal.toLocaleString()}</div>
                                <p className="text-[10px] text-slate-400 mt-1">年化 2.5% 即可覆盖成本</p>
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {['余额宝', '理财通', '银行理财'].map((label, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500 whitespace-nowrap">
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Usage */}
                <section className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-slate-500">存储空间</span>
                            <Server size={16} className="text-slate-300" />
                        </div>
                        <div>
                            <div className="text-xl font-black text-slate-900 mb-2">45%</div>
                            <div className="w-full bg-slate-100 h-1 rounded-full"><div className="bg-slate-800 w-[45%] h-full rounded-full"></div></div>
                        </div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-32 relative cursor-pointer hover:border-indigo-300 transition-colors"
                        onClick={() => setIsDataShared(!isDataShared)}>
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-slate-500">数据分红</span>
                            <div className={`w-2 h-2 rounded-full ${isDataShared ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                        </div>
                        <div>
                            <div className="text-xl font-black text-indigo-600 flex items-center gap-1">
                                {isDataShared ? '+125' : 'OFF'} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">开启共享赚积分</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* RIGHT COLUMN: Business Perspective (Transparency) - Minimalist Technical Style */}
            <div className="p-8 md:p-12 bg-slate-50/50 xl:bg-white space-y-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">商业透明度</h2>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">BUSINESS VIEW</span>
                        <p className="text-sm text-slate-500 font-medium">我们如何盈利与生存</p>
                    </div>
                </div>

                {/* Intro - Wireframe Style */}
                <div className="p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50">
                    <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                        <Briefcase size={16} className="text-slate-500" /> Core Logic
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        我们不贩卖隐私且不作恶。A·LIVE 采用 <span className="font-bold text-slate-900 underline decoration-indigo-300 decoration-2 underline-offset-2">混合变现模型</span>：向用户提供安全感，向市场提供流通价值。
                    </p>
                </div>

                {/* Logical Flow - Vertical Layout */}
                <div className="space-y-6 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] top-8 bottom-8 w-px bg-slate-200 border-l border-dashed border-slate-300"></div>

                    {/* Module 1: Commission */}
                    <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full z-10 shadow-sm">
                            <RefreshCw size={18} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">CASH COW: 智能流转佣金</h4>
                        <p className="text-xs text-slate-500 mb-3">Revenue Source: B-Side Partners</p>

                        <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                <span>用户卖出旧机</span>
                                <ArrowRight size={12} />
                                <span className="font-bold text-indigo-600">平台比价匹配</span>
                                <ArrowRight size={12} />
                                <span>回收商成交</span>
                            </div>
                            <div className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-1.5 rounded font-mono border border-indigo-100 inline-block">
                                SYS_PROFIT += DEAL_AMOUNT * 3%
                            </div>
                        </div>
                    </div>

                    {/* Module 2: Ads */}
                    <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full z-10 shadow-sm">
                            <Target size={18} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">ADS: 换机窗口期广告</h4>
                        <p className="text-xs text-slate-500 mb-3">Revenue Source: Brand Advertisers</p>

                        <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
                            <div className="font-mono text-[10px] text-slate-500 leading-relaxed mb-2">
                                if (device.age &gt; 3_years && user.activity == 'high') {'{'}<br />
                                &nbsp;&nbsp;return <span className="text-orange-600 font-bold">ShowTargetedAd()</span>;<br />
                                {'}'}
                            </div>
                            <p className="text-[10px] text-slate-400 italic">仅在检测到真实换机需求时触发，非侵入式。</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Table - Simple Clean */}
                <div className="pt-4 border-t border-slate-100">
                    <table className="w-full text-xs text-left">
                        <thead>
                            <tr className="text-slate-400 border-b border-slate-100">
                                <th className="py-2 font-medium">板块</th>
                                <th className="py-2 font-medium">支付方</th>
                                <th className="py-2 font-medium text-right">占比</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600">
                            <tr className="border-b border-slate-50">
                                <td className="py-3 font-bold">交易佣金</td>
                                <td className="py-3">回收商</td>
                                <td className="py-3 text-right font-mono">60%</td>
                            </tr>
                            <tr className="border-b border-slate-50">
                                <td className="py-3 font-bold">会员订阅</td>
                                <td className="py-3">用户</td>
                                <td className="py-3 text-right font-mono">10%</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-bold">精准广告</td>
                                <td className="py-3">品牌方</td>
                                <td className="py-3 text-right font-mono">30%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};
