import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { User, Lock, AlertCircle, ArrowRight, Activity, Fingerprint, History, Sparkles } from 'lucide-react';
import clsx from 'clsx';

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
      if (err.response) {
        // The server responded with a status code that falls out of the range of 2xx
        setError(err.response.data?.error || "注册失败，请重试");
      } else if (err.request) {
        // The request was made but no response was received
        setError("无法连接到服务器，请确保后台服务已启动");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("发生未知错误");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 font-sans selection:bg-purple-500/30 selection:text-purple-200">

      {/* Left Panel - The Vision (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black flex-col justify-between p-12 lg:p-20">

        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse delay-700"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
          {/* Abstract Grid/Timeline */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-3 text-white/90">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Activity size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase font-sans">A·LIVE</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl lg:text-7xl font-sans font-black text-white leading-tight mb-6 tracking-tight">
            即刻<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">永恒</span>
          </h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed mb-10 max-w-sm">
            不仅仅是记录，而是确证。<br />
            为您保存每一个闪耀的生命时刻，构建属于您的全域数字人生档案。
          </p>

          <div className="flex items-center space-x-8 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/80">
              <Fingerprint size={16} className="text-indigo-400" />
              <span className="text-xs tracking-wider uppercase">Identity</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <History size={16} className="text-purple-400" />
              <span className="text-xs tracking-wider uppercase">Legacy</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Sparkles size={16} className="text-pink-400" />
              <span className="text-xs tracking-wider uppercase">Creation</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          Alive Intelligence Inc.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-gray-50 lg:bg-white text-slate-800">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-sans tracking-tight">
              {isRegister ? '加入 ALIVE' : '欢迎回来'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isRegister ? '开启您的数字生命档案。' : '继续您的探索之旅。'}
            </p>
          </div>

          <div className="bg-white lg:bg-transparent rounded-2xl shadow-xl lg:shadow-none p-8 lg:p-0 border border-gray-100 lg:border-none">
            {/* Tab Switch */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setIsRegister(false)}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2",
                  !isRegister ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}
              >
                登录
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={clsx(
                  "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2",
                  isRegister ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}
              >
                注册
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">账号标识</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="请输入您的用户名"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">通行密钥</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="请输入您的密码"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed group transform active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isRegister ? '立即创建' : '进入系统'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xs text-gray-400">
              安全加密 · 本地存储 · 数据自主
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
