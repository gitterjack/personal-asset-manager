import React from 'react';
import { Cpu, Layers, Activity } from 'lucide-react';

export const ProductManual: React.FC = () => {
  return (
    <div className="prose prose-sm prose-blue max-w-none text-gray-600">
      <div className="flex items-center space-x-2 mb-4 not-prose">
          <div className="bg-gray-900 p-1.5 rounded-lg text-white">
              <Activity size={24} />
          </div>
          <div>
              <h1 className="text-xl font-black text-gray-900 m-0">Alive (活着)</h1>
              <p className="text-xs text-gray-500 m-0 font-medium">个人资产管理平台</p>
          </div>
      </div>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-500 bg-gray-50 py-2 pr-2 rounded-r">
        “无感记录，财务洞察，数字遗产。”
      </blockquote>

      <p className="text-sm leading-relaxed">
        Alive 是一个全面的个人资产管理平台，旨在帮助您轻松追踪所拥有的每一件物品，了解消费的真实成本，并管理您的数字遗产。
      </p>

      <div className="my-6 space-y-6 not-prose">
          
          <section>
              <h3 className="text-sm font-bold text-gray-900 flex items-center mb-2">
                  <Activity size={16} className="mr-2 text-blue-600"/> 核心理念
              </h3>
              <ul className="text-xs space-y-1 text-gray-600 list-disc pl-5">
                  <li><strong>无感记录</strong>：快速记录实物资产和数字资产。</li>
                  <li><strong>财务洞察</strong>：超越价格标签，理解 <strong>每日成本 (CPD)</strong>。</li>
                  <li><strong>数字遗产</strong>：确保数字足迹和资产安全传承。</li>
              </ul>
          </section>

          <section>
              <h3 className="text-sm font-bold text-gray-900 flex items-center mb-2">
                  <Layers size={16} className="mr-2 text-purple-600"/> 关键模块
              </h3>
              <div className="grid grid-cols-1 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-800 mb-1">📊 资产管理</h4>
                      <p className="text-[10px] text-gray-500">动态仪表板、CPD 计算、市场估值排行。</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-800 mb-1">🤝 社区发现</h4>
                      <p className="text-[10px] text-gray-500">保值/跳水榜单、年度消费报告、败家日记。</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-800 mb-1">🔐 数字遗产</h4>
                      <p className="text-[10px] text-gray-500">隐私硬盘连接、数字遗嘱、30天沉寂触发机制。</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-800 mb-1">💎 商业模式</h4>
                      <p className="text-[10px] text-gray-500">零感订阅（利息抵扣）、透明化佣金、精准生命周期广告。</p>
                  </div>
              </div>
          </section>

          <section>
              <h3 className="text-sm font-bold text-gray-900 flex items-center mb-2">
                  <Cpu size={16} className="mr-2 text-orange-600"/> 技术栈
              </h3>
              <div className="flex flex-wrap gap-2 text-[10px]">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">React 19</span>
                  <span className="px-2 py-1 bg-sky-50 text-sky-600 rounded">Tailwind CSS 4</span>
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded">Node.js</span>
                  <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded">SQLite</span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded">Aliyun AI</span>
              </div>
          </section>

      </div>

      <div className="border-t pt-4 text-center">
          <p className="text-xs text-gray-400">© 2026 Alive Project. All rights reserved.</p>
      </div>
    </div>
  );
};
