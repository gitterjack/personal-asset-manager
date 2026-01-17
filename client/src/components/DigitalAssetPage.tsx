import React, { useState, useEffect, useRef } from 'react';
import { Lock, HardDrive, Wifi, Shield, Clock, Key, Video, Feather, Scroll, Cloud, History, ChevronDown, ChevronUp, PartyPopper, Heart, Briefcase, Camera, Globe } from 'lucide-react';
import clsx from 'clsx';

const TIMELINE_DATA = [
    {
        year: 2026,
        summary: {
            life: "旅居大理，探索自然风光，修身养性",
            family: "带父母完成体检，家庭聚会增多",
            career: "晋升为技术总监，负责 AI 创新业务",
            hobby: "开始系统学习油画，完成 5 幅作品"
        },
        months: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            life: i === 0 ? "大理租房安顿，逛三月街" : i === 7 ? "洱海骑行环游" : "日常探索古城巷弄",
            family: i === 1 ? "春节接父母来大理过年" : i === 5 ? "父亲节礼物准备" : "每周视频通话",
            career: i === 2 ? "Q1 季度规划会议" : i === 8 ? "AI 项目立项成功" : "远程指导团队开发",
            hobby: i === 3 ? "完成第一幅油画临摹" : i === 10 ? "参加当地写生营" : "阅读艺术史书籍"
        }))
    },
    {
        year: 2025,
        summary: {
            life: "购入市区改善型住房，生活品质提升",
            family: "迎来家庭新成员，享受亲子时光",
            career: "主导核心电商系统重构，获得年度奖",
            hobby: "参加半程马拉松，突破个人 PB"
        },
        months: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            life: i === 5 ? "新房装修验收完成" : "周末看家具软装",
            family: i === 8 ? "宝宝出生，全家喜悦" : "陪产检",
            career: i === 10 ? "电商大促系统压测" : "架构优化方案评审",
            hobby: i === 3 ? "恢复晨跑习惯" : "报名半马抽签"
        }))
    },
    {
        year: 2024,
        summary: {
            life: "完成为期 15 天的欧洲自驾深度游",
            family: "春节全家海南过年，氛围融洽",
            career: "获得 PMP 项目管理认证",
            hobby: "考取潜水证，探索海底世界"
        },
        months: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            life: "制定欧洲旅行攻略",
            family: "预定海南机票酒店",
            career: "备考 PMP",
            hobby: "游泳池练习闭气"
        }))
    },
    // Mock for others
    { year: 2023, summary: { life: "坚持每日阅读", family: "为父母翻新老屋", career: "跳槽至大厂", hobby: "周末骑行" }, months: [] },
    { year: 2022, summary: { life: "学习理财", family: "固定视频通话", career: "负责百万级项目", hobby: "自学尤克里里" }, months: [] },
    { year: 2021, summary: { life: "修炼厨艺", family: "侄子升学礼物", career: "优秀员工", hobby: "沉迷乐高" }, months: [] },
    { year: 2020, summary: { life: "确立职业方向", family: "支持妹妹学业", career: "黑客马拉松获奖", hobby: "写技术博客" }, months: [] },
];

interface MonthData {
    month: number;
    life: string;
    family: string;
    career: string;
    hobby: string;
}

interface YearData {
    year: number;
    summary: {
        life: string;
        family: string;
        career: string;
        hobby: string;
    };
    months: MonthData[];
}

export const DigitalAssetPage: React.FC = () => {
    const [timelineData, setTimelineData] = useState<YearData[]>(TIMELINE_DATA);
    const [driveStatus, setDriveStatus] = useState<'disconnected' | 'scanning' | 'connected'>('disconnected');
    const [legacyVisibility, setLegacyVisibility] = useState<'public' | 'private'>('private');
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const [currentMonth] = useState(new Date().getMonth() + 1); // 1-based month

    const activeData = timelineData.find(d => d.year === selectedYear) || timelineData[0];
    const monthRefs = useRef<{ [key: number]: HTMLTableRowElement | null }>({});
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const handleCellUpdate = (year: number, month: number, field: keyof MonthData, value: string) => {
        setTimelineData(prevData => prevData.map(y => {
            if (y.year !== year) return y;
            return {
                ...y,
                months: y.months.map(m => {
                    if (m.month !== month) return m;
                    return { ...m, [field]: value };
                })
            };
        }));
    };

    const handleConnectDrive = () => {
        if (driveStatus === 'connected') return;
        setDriveStatus('scanning');
        setTimeout(() => {
            setDriveStatus('connected');
        }, 2000);
    };

    // Scroll to current month when selected year changes or component mounts
    useEffect(() => {
        // Find the row for the current month
        const row = monthRefs.current[currentMonth];
        if (row && tableContainerRef.current) {
            // Adjust scroll position to center the row if possible, or at least show it
            // Using scrollIntoView with block: 'center' usually works well
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedYear, currentMonth]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 p-6">

            {/* Upper Section: Tree Ring Timeline & Memory Record */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[688px]">

                {/* Module Header: Time Ring (Full Width) */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 h-[88px]">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <History size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">时光年轮</h2>
                            <p className="text-slate-500 text-sm">记录每一个值得铭记的瞬间</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    {/* Left: Timeline (Wheel Picker Style) */}
                    <div className="w-32 bg-slate-50 border-r border-gray-100 overflow-hidden relative flex flex-col items-center justify-center shrink-0 h-full">

                        {/* Overlay Gradients for 3D effect */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>

                        {/* Center Highlight Indicator */}
                        <div className="absolute top-1/2 left-3 right-3 h-10 -mt-5 rounded-lg bg-white shadow-sm border border-gray-200 z-0"></div>

                        <div className="flex flex-col items-center justify-center -space-y-1 z-10 w-full py-4">
                            {Array.from({ length: 7 }, (_, i) => {
                                const offset = 3 - i; // 3, 2, 1, 0, -1, -2, -3 (Top to Bottom)
                                const year = selectedYear + offset;
                                const hasData = timelineData.some(d => d.year === year);

                                return (
                                    <div
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={clsx(
                                            "cursor-pointer transition-all duration-300 font-mono select-none flex items-center justify-center w-full h-12 relative",
                                            offset === 0 ? "text-2xl font-black text-slate-800 scale-110" :
                                                Math.abs(offset) === 1 ? "text-sm text-gray-400 font-bold opacity-70" :
                                                    "text-xs text-gray-300 opacity-40 scale-90"
                                        )}
                                    >
                                        {year}
                                        {hasData && Math.abs(offset) !== 0 && (
                                            <div className="absolute right-4 w-1 h-1 bg-blue-400 rounded-full"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Content Display */}
                    <div className="flex-1 overflow-hidden bg-white flex flex-col relative">

                        {/* Header: Yearly Summary (Collapsible) */}
                        <div className="border-b border-gray-100 bg-white z-20 shadow-sm shrink-0 transition-all duration-300">
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                            >
                                <div className="flex items-center">
                                    <h2 className="text-lg font-bold text-slate-900 font-serif mr-2 flex items-center">
                                        {isSummaryExpanded ? <ChevronUp size={16} className="mr-1 text-slate-400" /> : <ChevronDown size={16} className="mr-1 text-slate-400" />}
                                        年度总结
                                    </h2>
                                </div>
                                {/* Summary Preview (when collapsed) */}
                                {!isSummaryExpanded && (
                                    <div className="flex-1 ml-6 text-xs text-gray-400 truncate hidden md:block">
                                        {activeData?.summary.life} · {activeData?.summary.career}
                                    </div>
                                )}
                            </div>

                            {/* Expanded Content */}
                            <div className={clsx(
                                "grid grid-cols-4 gap-4 px-4 pb-4 transition-all duration-300 ease-in-out overflow-hidden",
                                isSummaryExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pb-0"
                            )}>
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                    <div className="flex items-center text-orange-600 mb-1">
                                        <PartyPopper size={14} className="mr-1.5" />
                                        <span className="text-xs font-bold uppercase">生活</span>
                                    </div>
                                    <p className="text-xs text-slate-700 font-medium line-clamp-3">{activeData?.summary.life}</p>
                                </div>
                                <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                                    <div className="flex items-center text-rose-600 mb-1">
                                        <Heart size={14} className="mr-1.5" />
                                        <span className="text-xs font-bold uppercase">家庭</span>
                                    </div>
                                    <p className="text-xs text-slate-700 font-medium line-clamp-3">{activeData?.summary.family}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <div className="flex items-center text-blue-600 mb-1">
                                        <Briefcase size={14} className="mr-1.5" />
                                        <span className="text-xs font-bold uppercase">事业</span>
                                    </div>
                                    <p className="text-xs text-slate-700 font-medium line-clamp-3">{activeData?.summary.career}</p>
                                </div>
                                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                    <div className="flex items-center text-emerald-600 mb-1">
                                        <Camera size={14} className="mr-1.5" />
                                        <span className="text-xs font-bold uppercase">兴趣</span>
                                    </div>
                                    <p className="text-xs text-slate-700 font-medium line-clamp-3">{activeData?.summary.hobby}</p>
                                </div>
                            </div>
                        </div>

                        {/* Body: Monthly Matrix */}
                        <div ref={tableContainerRef} className="flex-1 overflow-y-auto w-full scroll-smooth">
                            <table className="w-full text-left text-sm border-collapse table-fixed">
                                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 w-16 text-center border-b border-gray-200 whitespace-nowrap bg-gray-50">月份</th>
                                        <th className="px-4 py-3 border-b border-gray-200 w-1/4 bg-gray-50 text-center">生活点滴</th>
                                        <th className="px-4 py-3 border-b border-gray-200 w-1/4 bg-gray-50 text-center">家庭时光</th>
                                        <th className="px-4 py-3 border-b border-gray-200 w-1/4 bg-gray-50 text-center">事业成就</th>
                                        <th className="px-4 py-3 border-b border-gray-200 w-1/4 bg-gray-50 text-center">兴趣爱好</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {activeData && activeData.months && activeData.months.length > 0 ? (
                                        activeData.months.map((m) => (
                                            <tr
                                                key={m.month}
                                                ref={el => { monthRefs.current[m.month] = el; }}
                                                className={clsx(
                                                    "transition-colors group min-h-[80px]",
                                                    m.month === currentMonth ? "bg-blue-50/40" : "hover:bg-gray-50"
                                                )}
                                            >
                                                <td className="px-4 py-4 text-center font-mono font-bold whitespace-nowrap align-middle">
                                                    <div className={clsx(
                                                        "inline-flex flex-row items-baseline justify-center px-2.5 py-1.5 rounded-lg min-w-[3rem]",
                                                        m.month === currentMonth ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-400 group-hover:bg-slate-100"
                                                    )}>
                                                        <span className="text-xl leading-none">{m.month}</span>
                                                        <span className="text-[10px] leading-none ml-0.5 opacity-80 scale-90">月</span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 align-middle">
                                                    <textarea
                                                        value={m.life}
                                                        onChange={(e) => handleCellUpdate(selectedYear, m.month, 'life', e.target.value)}
                                                        className="w-full bg-transparent p-2 rounded-lg border border-transparent hover:bg-orange-50/50 focus:bg-white focus:border-orange-200 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-600 text-center resize-none overflow-hidden h-full min-h-[3rem]"
                                                        rows={2}
                                                    />
                                                </td>
                                                <td className="px-2 py-2 align-middle">
                                                    <textarea
                                                        value={m.family}
                                                        onChange={(e) => handleCellUpdate(selectedYear, m.month, 'family', e.target.value)}
                                                        className="w-full bg-transparent p-2 rounded-lg border border-transparent hover:bg-rose-50/50 focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-slate-600 text-center resize-none overflow-hidden h-full min-h-[3rem]"
                                                        rows={2}
                                                    />
                                                </td>
                                                <td className="px-2 py-2 align-middle">
                                                    <textarea
                                                        value={m.career}
                                                        onChange={(e) => handleCellUpdate(selectedYear, m.month, 'career', e.target.value)}
                                                        className="w-full bg-transparent p-2 rounded-lg border border-transparent hover:bg-blue-50/50 focus:bg-white focus:border-blue-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-600 text-center resize-none overflow-hidden h-full min-h-[3rem]"
                                                        rows={2}
                                                    />
                                                </td>
                                                <td className="px-2 py-2 align-middle">
                                                    <textarea
                                                        value={m.hobby}
                                                        onChange={(e) => handleCellUpdate(selectedYear, m.month, 'hobby', e.target.value)}
                                                        className="w-full bg-transparent p-2 rounded-lg border border-transparent hover:bg-emerald-50/50 focus:bg-white focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-600 text-center resize-none overflow-hidden h-full min-h-[3rem]"
                                                        rows={2}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-20 text-center text-gray-400 italic">
                                                暂无该年份的详细月度数据记录...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Connection Hub: All Accounts */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Cloud size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">全域账号集成</h2>
                            <p className="text-slate-500 text-sm">已连接 18 个平台 · 实时同步数字足迹</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center">
                        <span className="mr-2">+</span> 添加绑定
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Knowledge */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">知识与生产力</h3>
                        {[{ name: "Notion", domain: "notion.so", status: "connected", info: "1,240 篇文档", color: "text-slate-800" },
                        { name: "语雀", domain: "yuque.com", status: "connected", info: "3 个知识库", color: "text-emerald-600" },
                        { name: "飞书文档", domain: "feishu.cn", status: "expired", info: "授权已过期", color: "text-blue-500" }
                        ].map((app, i) => (
                            <div key={i} className="flex items-center p-3 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white group cursor-pointer relative overflow-hidden">
                                <img src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`} alt={app.name} className="w-10 h-10 rounded-lg mr-3 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-800 text-sm">{app.name}</h4>
                                        {app.status === 'connected' ? <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> : <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>}
                                    </div>
                                    <p className={clsx("text-xs truncate", app.status === 'connected' ? "text-gray-500" : "text-red-400")}>{app.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Entertainment */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">影音娱乐</h3>
                        {[{ name: "网易云音乐", domain: "music.163.com", status: "connected", info: "Lv.9 · 842 首红心", color: "text-red-600" },
                        { name: "Bilibili", domain: "bilibili.com", status: "connected", info: "大会员 · 硬币 12k", color: "text-blue-400" },
                        { name: "QQ 音乐", domain: "y.qq.com", status: "connected", info: "绿钻 · 12 个歌单", color: "text-emerald-500" }
                        ].map((app, i) => (
                            <div key={i} className="flex items-center p-3 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white group cursor-pointer">
                                <img src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`} alt={app.name} className="w-10 h-10 rounded-lg mr-3 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-800 text-sm">{app.name}</h4>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{app.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gaming */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">游戏人生</h3>
                        {[{ name: "Steam", domain: "steampowered.com", status: "connected", info: "142 款游戏 · 3200h", color: "text-slate-900" },
                        { name: "Nintendo", domain: "nintendo.com", status: "connected", info: "Switch Online", color: "text-red-600" },
                        { name: "WeGame", domain: "wegame.com.cn", status: "connected", info: "英雄联盟 · 钻石 III", color: "text-yellow-600" }
                        ].map((app, i) => (
                            <div key={i} className="flex items-center p-3 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white group cursor-pointer">
                                <img src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`} alt={app.name} className="w-10 h-10 rounded-lg mr-3 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-800 text-sm">{app.name}</h4>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{app.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">社交与其他</h3>
                        {[{ name: "微信", domain: "wechat.com", status: "connected", info: "已实名认证", color: "text-green-600" },
                        { name: "微博", domain: "weibo.com", status: "connected", info: "黄V认证 · 粉丝 5k", color: "text-orange-500" },
                        { name: "支付宝", domain: "alipay.com", status: "connected", info: "芝麻信用 780", color: "text-blue-600" }
                        ].map((app, i) => (
                            <div key={i} className="flex items-center p-3 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white group cursor-pointer">
                                <img src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`} alt={app.name} className="w-10 h-10 rounded-lg mr-3 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-800 text-sm">{app.name}</h4>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{app.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Lower Section: Asset Safe & Legacy (Side by Side) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">

                {/* Asset Safe */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-900 to-gray-800 text-white shrink-0 flex justify-between items-center h-[88px]">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Lock size={24} className="text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">数字资产保险箱</h2>
                                <p className="text-gray-400 text-sm">全资产归集 · 本地加密</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Asset Cards */}
                            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                                            NF
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">网易云音乐</h4>
                                            <p className="text-xs text-gray-400">2026-12-31 到期</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                            <span className="font-bold text-lg">₿</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Bitcoin</h4>
                                            <p className="text-xs text-gray-400">0.45 BTC</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">人寿保单</h4>
                                            <p className="text-xs text-gray-400">保额: 500w</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors min-h-[80px]">
                                <span className="text-2xl mb-1">+</span>
                                <span className="text-xs font-medium">添加资产</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mt-auto">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                        driveStatus === 'connected' ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
                                    )}>
                                        <HardDrive size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 flex items-center text-sm">
                                            本地隐私盘
                                            {driveStatus === 'connected' && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">已加密</span>}
                                        </h4>
                                        <p className="text-[10px] text-gray-500 flex items-center mt-0.5">
                                            <Wifi size={10} className="mr-1" /> WiFi 连接
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleConnectDrive}
                                    disabled={driveStatus !== 'disconnected'}
                                    className={clsx(
                                        "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all",
                                        driveStatus === 'connected' ? "bg-white text-green-600 border border-green-200" : "bg-gray-900 text-white hover:bg-black"
                                    )}
                                >
                                    {driveStatus === 'scanning' ? '扫描中...' : driveStatus === 'connected' ? '已连接' : '连接硬盘'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy */}
                <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden relative group z-0 flex flex-col h-full">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Scroll size={150} className="text-stone-800 rotate-12" />
                    </div>
                    <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-gradient-to-r from-stone-900 to-stone-800 shrink-0 h-[88px]">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/10 rounded-lg text-white backdrop-blur-sm">
                                <Feather size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white font-serif tracking-wide">资产传承</h2>
                                <p className="text-xs text-stone-400 font-serif">忽如远行客</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-stone-700 text-stone-200 text-xs font-bold rounded-full flex items-center border border-stone-600">
                            <span className="w-2 h-2 bg-stone-400 rounded-full mr-2"></span>
                            契约已定
                        </div>
                    </div>

                    <div className="p-6 relative z-10 space-y-6 flex-1 flex flex-col">

                        <div className="flex bg-stone-100 p-1 rounded-lg">
                            <button
                                onClick={() => setLegacyVisibility('private')}
                                className={clsx(
                                    "flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all font-serif",
                                    legacyVisibility === 'private' ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                <Lock size={12} className="mr-2" /> 指定受益人
                            </button>
                            <button
                                onClick={() => setLegacyVisibility('public')}
                                className={clsx(
                                    "flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all font-serif",
                                    legacyVisibility === 'public' ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                <Globe size={12} className="mr-2" /> 全网公开
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-stone-50 p-3 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                                <Clock size={20} className="mx-auto text-stone-600 mb-2" />
                                <div className="text-sm font-bold text-stone-800 font-serif">光阴刻度</div>
                                <div className="text-[10px] text-stone-500">2天前驻足</div>
                            </div>

                            <div className="bg-stone-50 p-3 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                                <Scroll size={20} className="mx-auto text-stone-600 mb-2" />
                                <div className="text-sm font-bold text-stone-800 font-serif">身后托付</div>
                                <div className="text-[10px] text-stone-500">30日机制</div>
                            </div>

                            <div className="bg-stone-50 p-3 rounded-xl text-center border border-stone-100 hover:border-stone-300 transition-colors">
                                <Key size={20} className="mx-auto text-stone-600 mb-2" />
                                <div className="text-sm font-bold text-stone-800 font-serif">托孤者</div>
                                <div className="text-[10px] text-stone-500">3位见证</div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-stone-100">
                            <h4 className="text-xs font-bold text-stone-500 mb-2">名家遗嘱参考</h4>
                            <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-stone-200">
                                <span className="text-xs font-bold text-stone-700 font-serif">Benjamin Franklin</span>
                                <span className="text-[10px] text-stone-400">200年信托基金</span>
                            </div>
                            <button className="w-full mt-3 py-2 border border-stone-300 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all text-xs font-bold font-serif">
                                <Video size={14} className="mr-2" />
                                立书存证
                            </button>
                        </div>

                    </div>
                </section>

            </div>

        </div>
    );
};
