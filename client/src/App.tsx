import { useEffect, useState } from 'react'
import type { Asset, NewAsset } from './types'
import { fetchAssets, createAsset, updateAsset, deleteAsset } from './api'
import { Dashboard } from './components/Dashboard'
import { AssetForm } from './components/AssetForm'
import { AssetList } from './components/AssetList'
import { DailyCostRank } from './components/DailyCostRank'
import { LoginPage } from './LoginPage'
import { AuthProvider, useAuth } from './AuthContext'
import { Wallet, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

function AppContent() {
  const { user, logout } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

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
    if(!confirm("确定要删除这个资产吗？")) return;
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
        <header className="bg-white shadow-sm z-10 px-6 py-3 flex justify-between items-center sticky top-0">
             <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Wallet size={24} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 hidden md:block">个人资产管家</h1>
            </div>
            
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">你好, <span className="font-bold">{user.username}</span></span>
                <button 
                    onClick={logout}
                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm"
                >
                    <LogOut size={16} className="mr-1" /> 退出
                </button>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
            
            <div 
                className={clsx(
                    "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col overflow-y-auto sticky top-0 h-[calc(100vh-64px)]",
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
                         
                         <div className="flex justify-between items-center mb-4 mt-8">
                            <h2 className="text-xl font-bold text-gray-700">我的资产库</h2>
                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                {assets.length} 件物品
                            </span>
                         </div>
                         
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
        </div>
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
