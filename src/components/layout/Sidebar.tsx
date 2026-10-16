import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Brain,
  FileText,
  ShieldAlert,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Overview', path: '/', icon: Home, agent: 'Core' },
    { label: 'Student Dashboard', path: '/student-dashboard', icon: LayoutDashboard, agent: 'Agent 2' },
    { label: 'Course Builder', path: '/course-builder', icon: BookOpen, agent: 'Agent 3' },
    { label: 'Quizzes & Assessments', path: '/quizzes-assessments', icon: Brain, agent: 'Agent 4' },
    { label: 'Content Tools & Reports', path: '/content-tools-reports', icon: FileText, agent: 'Agent 5' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-normal">
                  {item.agent}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center text-slate-700 font-semibold text-xs space-x-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Agent 1 Foundation</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          Each agent develops exclusively within their assigned module folder.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
