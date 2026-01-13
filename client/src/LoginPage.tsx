import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { User, Lock, LogIn, UserPlus, AlertCircle, Package, ChevronRight } from 'lucide-react';

const API_URL = '/api';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const response = await axios.post(`${API_URL}${endpoint}`, { username, password });
      const { token, user } = response.data;
      login(token, user);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card - Dark Theme */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-gray-800/50 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Package className="text-purple-400" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-100">个人资产管家</h1>
                <p className="text-xs text-gray-500">Personal Asset Manager</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6">
            {/* Tab Switch */}
            <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  !isRegister
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <LogIn size={16} />
                登录
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  isRegister
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <UserPlus size={16} />
                注册
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm animate-in fade-in duration-200">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="请输入用户名"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="请输入密码"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isRegister ? '创建账号' : '登录'}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-800">
            <p className="text-center text-xs text-gray-500">
              {isRegister ? (
                <>
                  注册即表示您同意我们的{' '}
                  <span className="text-purple-400 hover:text-purple-300 cursor-pointer">服务条款</span>
                </>
              ) : (
                <>
                  管理您的数码资产、车辆与家电
                </>
              )}
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-200 shadow-sm">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs text-gray-600 font-medium">数码设备</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-200 shadow-sm">
            <div className="text-2xl mb-1">🚗</div>
            <p className="text-xs text-gray-600 font-medium">车辆档案</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-200 shadow-sm">
            <div className="text-2xl mb-1">🏠</div>
            <p className="text-xs text-gray-600 font-medium">家电管理</p>
          </div>
        </div>
      </div>
    </div>
  );
};
