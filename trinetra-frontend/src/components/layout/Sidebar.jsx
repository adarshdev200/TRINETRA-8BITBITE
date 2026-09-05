// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  Users,
  Map,
  Bell,
  AlertTriangle,
  Shield,
  FileText,
  BarChart3,
  Settings,
  Eye,
  LogOut,
  Activity,
  Radio,
  ChevronRight
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const primaryNavigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Live Monitoring',
    path: '/monitoring',
    icon: Video,
    live: true,
  },
  {
    name: 'Crowd Management',
    path: '/crowd',
    icon: Users,
  },
  {
    name: 'Temple Map',
    path: '/temple-map',
    icon: Map,
  },
];

const securityNavigation = [
  {
    name: 'Alerts',
    path: '/alerts',
    icon: Bell,
    badge: 3,
  },
  {
    name: 'Emergency',
    path: '/emergency',
    icon: AlertTriangle,
    emergency: true,
  },
  {
    name: 'Security Teams',
    path: '/security',
    icon: Shield,
  },
  {
    name: 'Incidents',
    path: '/incidents',
    icon: FileText,
  },
];

const systemNavigation = [
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

const NavigationSection = ({ title, icon: SectionIcon, items }) => {
  return (
    <div className="space-y-1.5">

      {/* Section title */}
      <div className="flex items-center gap-2 px-3 mb-2">
        {SectionIcon && (
          <SectionIcon className="w-3 h-3 text-gray-600" />
        )}

        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-600">
          {title}
        </span>
      </div>

      {/* Navigation items */}
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'group relative flex items-center gap-3',
              'w-full px-3 py-2.5 rounded-xl',
              'transition-all duration-200',
              isActive
                ? 'bg-primary/10 text-primary'
                : item.emergency
                ? 'text-critical hover:bg-critical/10'
                : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-primary" />
              )}

              {/* Icon container */}
              <div
                className={clsx(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-primary/10'
                    : item.emergency
                    ? 'bg-critical/10'
                    : 'bg-white/[0.025] group-hover:bg-white/[0.05]'
                )}
              >
                <item.icon
                  className={clsx(
                    'w-[17px] h-[17px]',
                    isActive
                      ? 'text-primary'
                      : item.emergency
                      ? 'text-critical'
                      : 'text-gray-500 group-hover:text-gray-200'
                  )}
                />
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">

                  <span className="text-[13px] font-medium truncate">
                    {item.name}
                  </span>

                  {item.live && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-critical animate-pulse" />
                      <span className="text-[8px] font-bold tracking-wider text-critical">
                        LIVE
                      </span>
                    </span>
                  )}

                </div>

                {item.emergency && (
                  <p className="text-[8px] text-critical/50 mt-0.5">
                    Emergency response
                  </p>
                )}
              </div>

              {/* Alert badge */}
              {item.badge && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-critical/10 border border-critical/20 text-critical text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}

              {/* Arrow */}
              <ChevronRight
                className={clsx(
                  'w-3.5 h-3.5 transition-all duration-200',
                  isActive
                    ? 'text-primary opacity-100'
                    : 'text-gray-700 opacity-0 group-hover:opacity-100'
                )}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const username = user?.username || 'Admin';
  const role = user?.role || 'Administrator';

  const initials = username
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className="
        w-64
        h-screen
        bg-dark-panel
        border-r border-white/[0.07]
        flex flex-col
        fixed inset-y-0 left-0
        z-40
      "
    >

      {/* =========================================================
          BRAND HEADER
      ========================================================= */}
      <div className="px-4 py-4 border-b border-white/[0.07]">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <img src="/trinetra-icon.png" alt="TRINETRA" className="w-10 h-10 object-contain shrink-0" />

          {/* Brand */}
          <div className="min-w-0">
            <h1 className="text-[16px] font-bold tracking-[0.08em] text-white">
              TRINETRA
            </h1>

            <p className="text-[8px] text-gray-500 uppercase tracking-[0.13em] mt-0.5">
              Temple Intelligence
            </p>
          </div>

        </div>

        {/* System status */}
        <div className="mt-4 px-3 py-2.5 rounded-xl bg-success/[0.05] border border-success/10">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-success" />

              <span className="text-[9px] font-bold uppercase tracking-wider text-success">
                System Live
              </span>
            </div>

            <span className="text-[8px] text-gray-600">
              ONLINE
            </span>

          </div>

        </div>

      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">

        <NavigationSection
          title="Operations"
          icon={Activity}
          items={primaryNavigation}
        />

        <NavigationSection
          title="Security"
          icon={Shield}
          items={securityNavigation}
        />

        <NavigationSection
          title="System"
          items={systemNavigation}
        />

      </nav>

      {/* =========================================================
          SYSTEM STATUS
      ========================================================= */}
      <div className="px-4 pb-3">

        <div className="px-3 py-2 rounded-lg bg-dark-secondary border border-white/[0.05]">

          <div className="flex items-center gap-2">

            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />

            <span className="text-[9px] text-gray-500">
              All systems operational
            </span>

          </div>

        </div>

      </div>

      {/* =========================================================
          USER PROFILE
      ========================================================= */}
      <div className="p-3 border-t border-white/[0.07]">

        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">

          {/* Avatar */}
          <div className="relative shrink-0">

            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {initials || 'A'}
              </span>
            </div>

            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-dark-panel" />

          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">

            <p className="text-xs font-semibold text-white truncate">
              {username}
            </p>

            <p className="text-[9px] text-gray-500 truncate mt-0.5">
              {role}
            </p>

          </div>

          {/* Logout */}
          <button
            onClick={logout}
            title="Logout"
            className="
              w-8 h-8
              rounded-lg
              flex items-center justify-center
              text-gray-600
              hover:text-critical
              hover:bg-critical/10
              transition-all
            "
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

        <p className="text-[8px] text-gray-700 text-center mt-2">
          TRINETRA Security Intelligence • v1.0.0
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;