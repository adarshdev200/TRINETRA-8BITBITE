// src/components/layout/AppShell.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Wifi,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { useMediaQuery } from '../../hooks/useRealtimeData';
import { useAuth } from '../../context/AuthContext';

export const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Close mobile navigation whenever route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary/30">
      
      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64">
        <Sidebar />
      </aside>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="relative w-[280px] h-full bg-dark-panel border-r border-white/[0.08] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile sidebar header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    TempleGuard
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Control Center
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <MobileNav
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN APPLICATION
      ========================================================= */}
      <div className="lg:ml-64 min-h-screen flex flex-col">

        {/* =======================================================
            CUSTOM MOBILE HEADER
        ======================================================= */}
        <header className="lg:hidden sticky top-0 z-30 h-16 bg-dark-panel/95 backdrop-blur-xl border-b border-white/[0.08]">
          <div className="h-full px-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg bg-dark-elevated border border-white/[0.06] text-gray-300 hover:text-white hover:border-primary/30 transition-all"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <p className="text-sm font-semibold text-white">
                  TempleGuard
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] text-gray-500">
                    SYSTEM LIVE
                  </span>
                </div>
              </div>
            </div>

            <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-critical" />
            </button>

          </div>
        </header>

        {/* =======================================================
            DESKTOP TOPBAR
        ======================================================= */}
        <div className="hidden lg:block sticky top-0 z-30">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* =======================================================
            SYSTEM STATUS STRIP
        ======================================================= */}
        <div className="hidden md:flex h-9 px-6 items-center justify-between bg-dark-secondary/60 border-b border-white/[0.04]">

          <div className="flex items-center gap-5 text-[11px] text-gray-500">

            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-success" />
              <span>Network Operational</span>
            </div>

            <div className="w-px h-3 bg-white/[0.08]" />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Security Monitoring Active</span>
            </div>

          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <span>Control Room</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">
              Live Operations
            </span>
          </div>

        </div>

        {/* =======================================================
            PAGE CONTENT
        ======================================================= */}
        <main className="relative flex-1 overflow-y-auto">

          {/* subtle background glow */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.025] blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-info/[0.02] blur-[120px] rounded-full" />
          </div>

          <div className="relative p-4 sm:p-5 lg:p-6 xl:p-8 max-w-[1800px] mx-auto">
            
            {/* page content */}
            <Outlet />

          </div>
        </main>

        {/* =======================================================
            FOOTER
        ======================================================= */}
        <footer className="hidden lg:flex h-9 px-6 items-center justify-between border-t border-white/[0.05] bg-dark-panel/50">

          <div className="flex items-center gap-2 text-[10px] text-gray-600">
            <span>TempleGuard Security System</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>All systems operational</span>
          </div>

        </footer>

      </div>
    </div>
  );
};

export default AppShell;