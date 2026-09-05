// src/components/layout/MobileNav.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  X,
  ChevronRight,
  Radio,
  Activity
} from 'lucide-react';
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

export const MobileNav = ({ open, onClose }) => {
  const location = useLocation();

  if (!open) return null;

  const renderNavigation = (items) =>
    items.map((item) => {
      const isActive = location.pathname === item.path;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={clsx(
            'group relative flex items-center gap-3 w-full',
            'px-3.5 py-3 rounded-xl',
            'transition-all duration-200',
            'active:scale-[0.98]',
            isActive
              ? 'bg-primary/10 text-primary'
              : item.emergency
              ? 'text-critical hover:bg-critical/10'
              : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
          )}
        >
          {/* Active indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
          )}

          {/* Icon */}
          <div
            className={clsx(
              'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
              'transition-all duration-200',
              isActive
                ? 'bg-primary/10'
                : item.emergency
                ? 'bg-critical/10'
                : 'bg-white/[0.03] group-hover:bg-white/[0.06]'
            )}
          >
            <item.icon
              className={clsx(
                'w-[18px] h-[18px]',
                isActive
                  ? 'text-primary'
                  : item.emergency
                  ? 'text-critical'
                  : 'text-gray-400 group-hover:text-gray-200'
              )}
            />
          </div>

          {/* Label */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">
                {item.name}
              </span>

              {item.live && (
                <span className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-critical">
                  <span className="w-1.5 h-1.5 rounded-full bg-critical animate-pulse" />
                  LIVE
                </span>
              )}
            </div>

            {item.emergency && (
              <p className="text-[9px] text-critical/60 mt-0.5">
                Emergency response
              </p>
            )}
          </div>

          {/* Badge */}
          {item.badge && (
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-critical/10 border border-critical/20 text-critical text-[10px] font-bold flex items-center justify-center">
              {item.badge}
            </span>
          )}

          {/* Arrow */}
          <ChevronRight
            className={clsx(
              'w-4 h-4 transition-all duration-200',
              isActive
                ? 'text-primary opacity-100'
                : 'text-gray-700 opacity-0 group-hover:opacity-100'
            )}
          />
        </NavLink>
      );
    });

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">

      {/* =========================================================
          BACKDROP
      ========================================================= */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* =========================================================
          DRAWER
      ========================================================= */}
      <aside
        className="
          absolute inset-y-0 left-0
          w-[290px] max-w-[88vw]
          bg-dark-panel
          border-r border-white/[0.08]
          shadow-[20px_0_60px_rgba(0,0,0,0.45)]
          flex flex-col
          animate-in slide-in-from-left duration-300
        "
      >

        {/* =======================================================
            HEADER
        ======================================================= */}
        <div className="px-4 py-4 border-b border-white/[0.07]">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              {/* Logo */}
              <img src="/trinetra-icon.png" alt="TRINETRA" className="w-10 h-10 object-contain shrink-0" />

              <div>
                <h1 className="text-base font-bold tracking-wide text-white">
                  TRINETRA
                </h1>
                <p className="text-[9px] text-gray-500 uppercase tracking-[0.12em]">
                  Temple Intelligence
                </p>
              </div>

            </div>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="
                w-9 h-9
                rounded-xl
                flex items-center justify-center
                text-gray-500
                hover:text-white
                hover:bg-white/[0.06]
                transition-all
              "
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* System status */}
          <div className="mt-4 px-3 py-2.5 rounded-xl bg-success/[0.06] border border-success/10">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-success" />

                <span className="text-[10px] font-semibold text-success uppercase tracking-wider">
                  System Live
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-[9px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Connected
              </span>

            </div>
          </div>

        </div>

        {/* =======================================================
            NAVIGATION
        ======================================================= */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

          {/* Operations */}
          <div>
            <div className="px-3 mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3 text-gray-600" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-600">
                Operations
              </span>
            </div>

            <div className="space-y-1">
              {renderNavigation(primaryNavigation)}
            </div>
          </div>

          {/* Security */}
          <div>
            <div className="px-3 mb-2 flex items-center gap-2">
              <Shield className="w-3 h-3 text-gray-600" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-600">
                Security
              </span>
            </div>

            <div className="space-y-1">
              {renderNavigation(securityNavigation)}
            </div>
          </div>

          {/* System */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-600">
                System
              </span>
            </div>

            <div className="space-y-1">
              {renderNavigation(systemNavigation)}
            </div>
          </div>

        </nav>

        {/* =======================================================
            BOTTOM STATUS
        ======================================================= */}
        <div className="p-3 border-t border-white/[0.07]">

          <div className="rounded-xl bg-dark-secondary border border-white/[0.06] p-3">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  Control Room
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-[9px] text-gray-500">
                    Monitoring active
                  </span>
                </div>
              </div>

            </div>

          </div>

          <p className="text-[9px] text-gray-700 text-center mt-3">
            TRINETRA Security Intelligence • v1.0.0
          </p>

        </div>

      </aside>
    </div>
  );
};

export default MobileNav;