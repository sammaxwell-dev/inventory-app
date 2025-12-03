import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Category, Product } from '../types';
import { Save, ChevronDown } from 'lucide-react';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useApp();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(Category.IRISH_BEER);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
        id: Date.now().toString(),
        name,
        category,
        description,
        isActive: true
    };
    addProduct(newProduct);
    navigate('/inventory');
  };

  return (
    <Layout title="Add Product" showBack>
      <div className="pt-2">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</label>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jameson Black Barrel"
                        className="w-full bg-gray-50 border-none text-gray-900 px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400 font-medium"
                    />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="w-full bg-gray-50 border-none text-gray-900 px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all appearance-none font-medium"
                        >
                            {Object.values(Category).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-gray-50 border-none text-gray-900 px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400 font-medium resize-none"
                        placeholder="Short description..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-8 shadow-lg shadow-violet-200 active:scale-[0.98] transition-all"
                >
                    <Save size={20} />
                    Save Product
                </button>
            </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;