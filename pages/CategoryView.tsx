import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import InventoryRow from '../components/InventoryRow';
import { Search, Filter, ScanLine, Plus } from 'lucide-react';

const CategoryView: React.FC = () => {
  const { products, currentSession } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'total' | 'out' | 'low'>('total');

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Filter
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      const record = currentSession.records[p.id];
      const totalStock = record ? record.fullBottles + record.partialBottle : 0;

      // 2. Tab Filter
      if (activeTab === 'out') {
        return totalStock === 0;
      }
      if (activeTab === 'low') {
        return totalStock > 0 && totalStock < 1;
      }
      return true; // 'total'
    });
  }, [products, currentSession.records, searchTerm, activeTab]);

  return (
    <Layout title="Inventory">
      <div className="pt-2">
        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-none text-gray-900 pl-11 pr-12 py-3.5 rounded-2xl shadow-sm shadow-gray-200/50 focus:outline-none focus:ring-2 focus:ring-violet-100 placeholder-gray-400 font-medium"
                />
                <button className="absolute right-3 top-2.5 p-1 text-gray-400 hover:text-violet-600 transition-colors">
                    <ScanLine size={20} />
                </button>
            </div>
            <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shadow-gray-200/50 text-gray-700 active:scale-95 transition-transform">
                <Filter size={20} />
            </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
            <button 
                onClick={() => setActiveTab('total')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === 'total' 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
            >
                All Items
            </button>
            <button 
                onClick={() => setActiveTab('out')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === 'out' 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
            >
                Out of Stock
            </button>
            <button 
                onClick={() => setActiveTab('low')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === 'low' 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
            >
                Low Stock
            </button>
        </div>

        {/* List */}
        <div className="space-y-3 pb-8">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <InventoryRow key={product.id} product={product} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg mb-1">No products found</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-[200px]">We couldn't find anything matching your search filters.</p>
                    <button 
                        onClick={() => navigate('/add')}
                        className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-200 active:scale-95 transition-transform"
                    >
                        <Plus size={18} />
                        Add New Product
                    </button>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryView;