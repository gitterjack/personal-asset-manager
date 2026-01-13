import { useEffect, useState } from 'react'
import type { Asset, NewAsset } from './types'
import { fetchAssets, createAsset, updateAsset, deleteAsset } from './api'
import { Dashboard } from './components/Dashboard'
import { AssetForm } from './components/AssetForm'
import { AssetList } from './components/AssetList'
import { DailyCostRank } from './components/DailyCostRank'
import { AICardGenerator } from './components/AICardGenerator'
import { ProfileSettings } from './components/ProfileSettings'
import { CommunityPage } from './components/CommunityPage'
import { DigitalAssetPage } from './components/DigitalAssetPage'
import { BusinessModelPage } from './components/BusinessModelPage'
import { MembershipPage } from './components/MembershipPage'
import { ProfilePage } from './components/ProfilePage'
import { AIAssistant } from './components/AIAssistant'
import { LoginPage } from './LoginPage'
import { AuthProvider, useAuth } from './AuthContext'
import { LogOut, ChevronLeft, ChevronRight, Sparkles, Settings, Compass, LayoutDashboard, Lock, Briefcase, Activity, User, Crown } from 'lucide-react'
import clsx from 'clsx'

function AppContent() {
    const { user, logout } = useAuth();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
    const [showAICard, setShowAICard] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [activeTab, setActiveTab] = useState<'assets' | 'community' | 'digital' | 'business' | 'profile' | 'membership'>('assets');

    const loadData = async () => {
        try {
            const data = await fetchAssets();
            setAssets(data);
        } catch (error) {
            console.error("Failed to fetch assets", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user]);

    const handleAdd = async (newAsset: NewAsset) => {
        try {
            await createAsset(newAsset);
            await loadData();
        } catch (error) {
            console.error("Failed to add asset", error);
        }
    };

    const handleUpdate = async (id: number, updatedAsset: NewAsset) => {
        try {
            await updateAsset(id, updatedAsset);
            setEditingAsset(null);
            await loadData();
        } catch (error) {
            console.error("Failed to update asset", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("确定要删除这个资产吗？")) return;
        try {
            await deleteAsset(id);
            await loadData();
        } catch (error) {
            console.error("Failed to delete asset", error);
        }
    };

    const handleEdit = (asset: Asset) => {
        setEditingAsset(asset);
        setSidebarOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingAsset(null);
    };

    if (!user) {
        return <LoginPage />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm z-30 px-6 py-2 flex justify-between items-center sticky top-0">
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-900 p-1.5 rounded-lg text-white flex items-center justify-center">
                        <Activity size={20} />
                        <span className="font-black tracking-widest ml-1 text-sm">ALIVE</span>
                    </div>
                    <h1 className="text-lg font-black text-gray-900 hidden md:block tracking-widest">活着</h1>
                </div>

                <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('assets')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'assets' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <LayoutDashboard size={16} className="mr-2" /> 实物资产
                    </button>
                    <button
                        onClick={() => setActiveTab('digital')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'digital' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Lock size={16} className="mr-2" /> 数字资产
                    </button>
                    <button
                        onClick={() => setActiveTab('community')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'community' ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Compass size={16} className="mr-2" /> 发现社区
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'profile' ? "bg-white text-slate-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <User size={16} className="mr-2" /> 个人档案
                    </button>
                    <button
                        onClick={() => setActiveTab('membership')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'membership' ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Crown size={16} className="mr-2" /> 会员体系
                    </button>
                    <button
                        onClick={() => setActiveTab('business')}
                        className={clsx(
                            "px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-all",
                            activeTab === 'business' ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Briefcase size={16} className="mr-2" /> 商业模式
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowAICard(true)}
                        className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow hover:shadow-lg transition-all"
                    >
                        <Sparkles size={16} /> <span className="hidden sm:inline">AI 身份卡</span>
                    </button>

                    <div className="h-6 w-px bg-gray-200 mx-2"></div>

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600 text-sm hidden sm:inline">你好, <span className="font-bold">{user.username}</span></span>
                        <button
                            onClick={() => setShowProfile(true)}
                            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            title="个人档案设置"
                        >
                            <Settings size={20} />
                        </button>
                        <button
                            onClick={logout}
                            className="p-1.5 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                            title="退出登录"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative pb-16 md:pb-0">

                {activeTab === 'assets' ? (
                    <>
                        <div
                            className={clsx(
                                "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col overflow-y-auto sticky top-[64px] h-[calc(100vh-64px)]",
                                sidebarOpen ? "w-80 p-4" : "w-0 p-0 overflow-hidden"
                            )}
                        >
                            <div className="min-w-[18rem]">
                                <AssetForm
                                    onAdd={handleAdd}
                                    onUpdate={handleUpdate}
                                    editingAsset={editingAsset}
                                    onCancelEdit={handleCancelEdit}
                                />
                            </div>
                        </div>

                        <div className="relative z-0">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="absolute top-4 -left-3 bg-white border border-gray-200 shadow-md rounded-full p-1 text-gray-500 hover:text-blue-600 z-20"
                                title={sidebarOpen ? "收起侧边栏" : "展开侧边栏"}
                            >
                                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                            </button>
                        </div>

                        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                            <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6">

                                <div className="flex-1 min-w-0">
                                    <Dashboard assets={assets} />

                                    {loading ? (
                                        <div className="text-center py-20 text-gray-500">加载中...</div>
                                    ) : (
                                        <AssetList assets={assets} onDelete={handleDelete} onEdit={handleEdit} />
                                    )}
                                </div>

                                <div className="lg:w-80 shrink-0">
                                    <div className="sticky top-0">
                                        <DailyCostRank assets={assets} />
                                    </div>
                                </div>

                            </div>
                        </main>
                    </>
                ) : activeTab === 'community' ? (
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <CommunityPage />
                    </main>
                ) : activeTab === 'digital' ? (
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <DigitalAssetPage />
                    </main>
                ) : activeTab === 'profile' ? (
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <ProfilePage />
                    </main>
                ) : activeTab === 'membership' ? (
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <MembershipPage />
                    </main>
                ) : (
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <BusinessModelPage />
                    </main>
                )}
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-20 pb-safe">
                <button
                    onClick={() => setActiveTab('assets')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'assets' ? "text-blue-600" : "text-gray-400"
                    )}
                >
                    <LayoutDashboard size={24} />
                    <span className="text-[10px] mt-1 font-bold">资产</span>
                </button>
                <button
                    onClick={() => setActiveTab('community')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'community' ? "text-purple-600" : "text-gray-400"
                    )}
                >
                    <Compass size={24} />
                    <span className="text-[10px] mt-1 font-bold">发现</span>
                </button>
                <button
                    onClick={() => setActiveTab('digital')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'digital' ? "text-indigo-600" : "text-gray-400"
                    )}
                >
                    <Lock size={24} />
                    <span className="text-[10px] mt-1 font-bold">数字</span>
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'profile' ? "text-slate-800" : "text-gray-400"
                    )}
                >
                    <User size={24} />
                    <span className="text-[10px] mt-1 font-bold">档案</span>
                </button>
                <button
                    onClick={() => setActiveTab('membership')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'membership' ? "text-amber-600" : "text-gray-400"
                    )}
                >
                    <Crown size={24} />
                    <span className="text-[10px] mt-1 font-bold">会员</span>
                </button>
                <button
                    onClick={() => setActiveTab('business')}
                    className={clsx(
                        "flex flex-col items-center p-2 rounded-lg w-full",
                        activeTab === 'business' ? "text-emerald-600" : "text-gray-400"
                    )}
                >
                    <Briefcase size={24} />
                    <span className="text-[10px] mt-1 font-bold">模式</span>
                </button>
            </div>

            <AICardGenerator
                assets={assets}
                isOpen={showAICard}
                onClose={() => setShowAICard(false)}
            />

            <ProfileSettings
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
            />

            <AIAssistant />
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App
