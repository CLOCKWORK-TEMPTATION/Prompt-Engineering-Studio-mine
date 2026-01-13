
import React from 'react';
import { SparklesIcon } from './Icons'; // Main app icon

export interface NavItem {
  name: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  activeItem: string;
  onNavItemClick: (itemName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ navItems, activeItem, onNavItemClick }) => {
  return (
    <div className="w-72 bg-gray-800 border-r border-gray-700/50 p-5 space-y-8 flex flex-col h-full shadow-2xl z-20">
      <div className="flex items-center space-x-3 px-2">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <SparklesIcon className="h-6 w-6 text-blue-400" />
        </div>
        <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
            Prompt Studio
            </h1>
            <p className="text-[10px] text-blue-300 font-medium tracking-wider uppercase">Dark Elite v2.0</p>
        </div>
      </div>
      
      <nav className="flex-grow space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
                key={item.name}
                onClick={() => onNavItemClick(item.name)}
                className={`w-full flex items-center py-3 px-4 rounded-xl transition-all duration-200 ease-out group relative overflow-hidden
                            ${isActive
                            ? 'bg-blue-500/10 text-blue-300 shadow-glow-primary border border-blue-500/20'
                            : 'text-gray-400 hover:bg-gray-750 hover:text-gray-200 border border-transparent'
                            }`}
            >
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item.icon}
                </span>
                <span className="relative z-10 text-sm font-medium ml-3">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700/50">
         <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
            <p className="text-xs text-gray-500 text-center leading-relaxed font-mono">
                System: Ready<br/>
                <span className="text-blue-400/60">v2.4.0-stable</span>
            </p>
         </div>
      </div>
    </div>
  );
};
