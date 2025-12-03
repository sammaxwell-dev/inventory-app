import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { LogOut, RefreshCw, User, Shield, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const { resetSession } = useApp();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear the current inventory session?')) {
        resetSession();
    }
  };

  const SettingItem = ({ icon: Icon, label, danger = false, onClick }: any) => (
    <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm active:bg-gray-50 transition-colors"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}>
                <Icon size={20} />
            </div>
            <span className={`font-semibold ${danger ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
        </div>
        <div className="text-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
    </button>
  );

  return (
    <Layout title="Settings" showBack>
        <div className="pt-2 space-y-6">
            
            <div className="bg-violet-600 rounded-[2rem] p-6 text-white shadow-lg shadow-violet-200">
                <div className="flex items-center gap-4 mb-4">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" alt="Mark" className="w-16 h-16 rounded-full border-4 border-white/20" />
                    <div>
                        <h2 className="text-xl font-bold">Mark</h2>
                        <p className="text-violet-200 text-sm">Bar Manager</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                        <p className="text-2xl font-bold">142</p>
                        <p className="text-[10px] uppercase opacity-70">Sessions</p>
                    </div>
                     <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                        <p className="text-2xl font-bold">98%</p>
                        <p className="text-[10px] uppercase opacity-70">Accuracy</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">Account</h3>
                <SettingItem icon={User} label="Profile" />
                <SettingItem icon={Shield} label="Security" />
            </div>

             <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">System</h3>
                <SettingItem icon={RefreshCw} label="Reset Session" onClick={handleReset} />
                <SettingItem icon={HelpCircle} label="Help & Support" />
                <SettingItem icon={LogOut} label="Log Out" danger />
            </div>
            
            <p className="text-center text-xs text-gray-300 pt-8">Version 1.0.2 • The Auld Dub</p>
        </div>
    </Layout>
  );
};

export default Settings;