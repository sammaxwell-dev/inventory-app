import React, { useCallback, useMemo, useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Plus, Minus, Package, ChevronDown, Wine, Beer, Martini } from 'lucide-react';
import { CATEGORY_THEMES } from '../constants';
import { Category } from '../types';

interface InventoryRowProps {
  product: Product;
}

const InventoryRow: React.FC<InventoryRowProps> = ({ product }) => {
  const { currentSession, updateInventoryRecord } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const record = useMemo(() => 
    currentSession.records[product.id] || {
      productId: product.id,
      fullBottles: 0,
      partialBottle: 0,
      updatedAt: Date.now()
    }
  , [currentSession.records, product.id]);

  const totalStock = record.fullBottles + record.partialBottle;
  
  // Status Logic
  let statusBadge = <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200">In Stock</span>;
  
  if (totalStock === 0) {
      statusBadge = <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-50 text-red-500 border border-red-100">Out of Stock</span>;
  } else if (totalStock < 1) {
      statusBadge = <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">Low Stock</span>;
  }

  const theme = CATEGORY_THEMES[product.category] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'bg-gray-400' };

  // Helper to pick an icon based on category
  const getIcon = () => {
    switch (product.category) {
        case Category.WINE: return <Wine size={20} className="text-white" />;
        case Category.SPIRITS:
        case Category.IRISH_WHISKEY: return <Martini size={20} className="text-white" />;
        default: return <Beer size={20} className="text-white" />;
    }
  };

  const handleFullChange = useCallback((delta: number) => {
    const newCount = Math.max(0, record.fullBottles + delta);
    updateInventoryRecord({
      ...record,
      fullBottles: newCount,
      updatedAt: Date.now(),
    });
  }, [record, updateInventoryRecord]);

  const handlePartialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateInventoryRecord({
      ...record,
      partialBottle: parseFloat(e.target.value),
      updatedAt: Date.now(),
    });
  }, [record, updateInventoryRecord]);

  return (
    <div 
        className={`bg-white p-4 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border transition-all duration-300 ${isExpanded ? 'border-violet-200 ring-4 ring-violet-50' : 'border-gray-100'}`}
        onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-4 cursor-pointer">
        {/* Dynamic Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${theme.icon} bg-gradient-to-br from-white/10 to-transparent`}>
            {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 truncate pr-2">{product.name}</h3>
                {statusBadge}
            </div>
            <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">{product.category}</p>
                <div className="flex items-center gap-1">
                    <span className={`text-sm font-bold ${totalStock === 0 ? 'text-gray-300' : 'text-gray-700'}`}>
                        {totalStock % 1 === 0 ? totalStock : totalStock.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">units</span>
                </div>
            </div>
        </div>
      </div>

      {/* Edit Controls - Expandable */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 border-t border-gray-50 pt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Bottles</span>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleFullChange(-1); }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="font-bold text-xl text-gray-900 w-8 text-center tabular-nums">{record.fullBottles}</span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleFullChange(1); }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700 active:scale-95 transition-all"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <span>Open Bottle Level</span>
                    <span className="text-violet-600">{(record.partialBottle * 100).toFixed(0)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={record.partialBottle}
                    onChange={handlePartialChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between px-1">
                    {[0, 25, 50, 75, 100].map(val => (
                        <div key={val} className="w-1 h-1 rounded-full bg-gray-300"></div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryRow;