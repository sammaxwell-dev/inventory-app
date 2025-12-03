import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, PlusCircle, Package, Settings, Bell, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string; // Optional now as we use a custom header often
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutGrid size={24} />, label: '', path: '/' },
    { icon: <Package size={24} />, label: '', path: '/inventory' },
    { icon: <PlusCircle size={24} />, label: '', path: '/add' },
    { icon: <Settings size={24} />, label: '', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-900">
      {/* Header - Personalized style */}
      <header className="flex-none px-6 pt-6 pb-2 bg-gray-50 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
            {showBack ? (
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                </button>
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" alt="Profile" className="w-full h-full" />
                </div>
            )}
            
            {!showBack && (
                <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <span>GOOD MORNING! ^-^</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1">
                        Mark <span className="text-xl">👋</span>
                    </h1>
                </div>
            )}
            {showBack && title && (
                 <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            )}
        </div>

        <div className="flex gap-3">
            {!showBack && (
                <>
                    <button className="px-4 py-2 bg-white rounded-full text-xs font-semibold shadow-sm border border-gray-100 text-gray-700">
                        Chat
                    </button>
                    <button className="relative p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 px-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="flex-none h-20 bg-white border-t border-gray-100 flex justify-around items-center px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] fixed bottom-0 w-full z-20 rounded-t-3xl">
        {navItems.map((item) => {
            const active = isActive(item.path);
            return (
            <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                active 
                    ? 'bg-violet-100 text-violet-600 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
            >
                {item.icon}
            </button>
            )
        })}
      </nav>
    </div>
  );
};

export default Layout;