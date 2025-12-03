import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Category, InventoryRecord } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Area, ComposedChart, Defs, LinearGradient } from 'recharts';
import { ArrowUpRight, Package, AlertTriangle, CheckCircle2, BoxSelect, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products, currentSession } = useApp();
  const navigate = useNavigate();

  // Calculate Stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const countedProducts = Object.keys(currentSession.records).length;
    
    let lowStockCount = 0;
    let outOfStockCount = 0;
    const lowStockItems: {name: string, id: string, amount: number}[] = [];

    Object.values(currentSession.records).forEach((record: InventoryRecord) => {
        const total = record.fullBottles + record.partialBottle;
        const product = products.find(p => p.id === record.productId);
        
        if (total === 0) {
            outOfStockCount++;
            if(product) lowStockItems.push({ name: product.name, id: product.id, amount: 0 });
        }
        else if (total < 1) {
            lowStockCount++;
            if(product) lowStockItems.push({ name: product.name, id: product.id, amount: total });
        }
    });

    return { totalProducts, countedProducts, lowStockCount, outOfStockCount, lowStockItems };
  }, [products, currentSession.records]);

  // Chart Data
  const chartData = useMemo(() => {
    return Object.values(Category).map(cat => {
        const catProducts = products.filter(p => p.category === cat);
        const stockCount = catProducts.reduce((acc, p) => {
            const rec = currentSession.records[p.id];
            return acc + (rec ? rec.fullBottles + rec.partialBottle : 0);
        }, 0);
        
        return {
            name: cat.split(' ')[0], 
            stock: Math.round(stockCount * 10) / 10
        };
    });
  }, [products, currentSession.records]);

  const StatCard = ({ title, value, icon: Icon, colorClass, textColor }: any) => (
    <div className={`p-5 rounded-[2rem] flex flex-col justify-between h-36 shadow-sm border border-black/5 ${colorClass}`}>
        <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-2xl bg-white/40 backdrop-blur-md ${textColor}`}>
                <Icon size={20} />
            </div>
            {title === 'Total Items' && (
                <div className="flex items-center gap-1 text-[10px] font-bold opacity-60 bg-white/20 px-2 py-1 rounded-lg text-white">
                    <span>Active</span>
                </div>
            )}
        </div>
        <div>
            <h3 className={`text-2xl font-bold mb-0.5 ${title.includes('Total') ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
            <p className={`text-xs font-semibold ${title.includes('Total') ? 'text-violet-100' : 'text-gray-400'}`}>{title}</p>
        </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6 mt-2">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div onClick={() => navigate('/inventory')} className="active:scale-[0.98] transition-transform">
                 <StatCard 
                    title="Total Items" 
                    value={stats.totalProducts} 
                    icon={Package} 
                    colorClass="bg-violet-600 shadow-violet-200"
                    textColor="text-white"
                />
            </div>
            <StatCard 
                title="Counted" 
                value={`${Math.round((stats.countedProducts / stats.totalProducts) * 100 || 0)}%`}
                icon={BoxSelect} 
                colorClass="bg-white"
                textColor="text-emerald-500"
            />
            <StatCard 
                title="Out of Stock" 
                value={stats.outOfStockCount} 
                icon={AlertCircle} 
                colorClass="bg-white"
                textColor="text-red-500"
            />
             <StatCard 
                title="Low Stock" 
                value={stats.lowStockCount} 
                icon={CheckCircle2} 
                colorClass="bg-white"
                textColor="text-amber-500"
            />
        </div>

        {/* Low Stock Horizontal Scroll (Only if items exist) */}
        {stats.lowStockItems.length > 0 && (
            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-gray-900">Restock Needed</h3>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">{stats.lowStockItems.length} items</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                    {stats.lowStockItems.map(item => (
                        <div key={item.id} className="min-w-[140px] p-4 bg-white rounded-2xl border border-red-100 shadow-sm flex flex-col gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                <AlertTriangle size={14} />
                            </div>
                            <p className="font-bold text-sm text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-red-500 font-bold">{item.amount} units left</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Stock Flow Chart */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Inventory Levels</h3>
                    <p className="text-xs text-gray-400 font-medium">By Category</p>
                </div>
            </div>
            
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} barSize={24}>
                        <defs>
                            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}} 
                            dy={10}
                        />
                        <Tooltip 
                            cursor={{fill: '#f9fafb'}}
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px', fontWeight: 'bold'}}
                        />
                        <Bar dataKey="stock" fill="url(#colorStock)" radius={[8, 8, 8, 8]} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;