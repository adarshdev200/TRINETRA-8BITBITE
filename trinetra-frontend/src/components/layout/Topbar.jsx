// src/components/layout/Topbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User, 
  ChevronDown, 
  Settings, 
  LogOut, 
  HelpCircle,
  Eye,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export const Topbar = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { stats } = useRealtimeData();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const criticalAlerts = stats?.activeAlerts || 0;
  const hasCritical = criticalAlerts > 0;

  // Page name mapping
  const pageNames = {
    '/dashboard': 'Dashboard',
    '/monitoring': 'Live Monitoring',
    '/crowd': 'Crowd Management',
    '/temple-map': 'Temple Map',
    '/alerts': 'Alert Center',
    '/emergency': 'Emergency Center',
    '/security': 'Security Operations',
    '/incidents': 'Incident Intelligence',
    '/analytics': 'Analytics',
    '/settings': 'System Configuration',
  };

  const currentPage = pageNames[location.pathname] || 'Control Center';

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setShowUserMenu(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate('/settings');
  };

  const handleAlerts = () => {
    navigate('/alerts');
  };

  // Get avatar initials
  const getInitials = () => {
    if (!user?.username) return 'A';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 h-16 min-h-[64px] bg-[#0B0F14] border-b border-[rgba(255,255,255,0.07)] flex items-center px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center flex-1 min-w-0">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors text-[#8B949E] hover:text-[#F5F5F0] mr-2"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* TRINETRA Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <img src="/trinetra-icon.png" alt="TRINETRA" className="w-7 h-7 object-contain" />
          <span className="text-sm font-bold text-[#F5F5F0] tracking-wide">TRINETRA</span>
        </Link>

        {/* Desktop Breadcrumb */}
        <div className="hidden lg:flex items-center ml-3 pl-3 border-l border-[rgba(255,255,255,0.07)]">
          <span className="text-sm text-[#8B949E]">/</span>
          <span className="text-sm font-medium text-[#F5F5F0] ml-2">{currentPage}</span>
          
          {/* System Status - Desktop */}
          <div className="flex items-center space-x-1.5 ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[10px] text-[#22C55E] tracking-wider uppercase font-medium">System Live</span>
          </div>
        </div>

        {/* Mobile Live Indicator */}
        <div className="lg:hidden flex items-center space-x-1.5 ml-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
          <span className="text-[8px] text-[#22C55E] tracking-wider uppercase font-medium">Live</span>
        </div>
      </div>

      {/* Center - Clock */}
      <div className="hidden lg:flex items-center space-x-3 ml-auto">
        <div className="flex items-center space-x-2 text-xs">
          <Clock className="w-3.5 h-3.5 text-[#8B949E]" />
          <span className="text-[#F5F5F0] font-mono font-medium">
            {format(currentTime, 'HH:mm:ss')}
          </span>
          <span className="text-[#8B949E] text-[10px] font-mono">
            {format(currentTime, 'dd MMM yyyy')}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0 ml-2 lg:ml-4">
        {/* Alerts */}
        <button
          onClick={handleAlerts}
          className="relative p-1.5 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors text-[#8B949E] hover:text-[#F5F5F0]"
          aria-label={`${criticalAlerts} active alerts`}
        >
          <AlertTriangle className={`w-4 h-4 ${hasCritical ? 'text-[#EF4444]' : ''}`} />
          {hasCritical && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#EF4444] text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {criticalAlerts}
            </span>
          )}
        </button>

        {/* Notifications */}
        <button 
          className="relative p-1.5 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors text-[#8B949E] hover:text-[#F5F5F0]"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {hasCritical && (
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-1.5 lg:space-x-2 p-1.5 rounded hover:bg-[rgba(255,255,255,0.06)] transition-colors group"
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-[#E6A23C]/10 border border-[#E6A23C]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#E6A23C]">{getInitials()}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E] border-2 border-[#0B0F14]"></div>
            </div>
            
            {/* Desktop User Info */}
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-[#F5F5F0] leading-none">{user?.username || 'Admin'}</p>
              <p className="text-[9px] text-[#8B949E] leading-none mt-0.5">{user?.role || 'Administrator'}</p>
            </div>
            
            <ChevronDown className={`w-3.5 h-3.5 text-[#8B949E] transition-transform duration-150 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-[#0B0F14] border border-[rgba(255,255,255,0.07)] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                role="menu"
              >
                {/* Header */}
                <div className="p-4 border-b border-[rgba(255,255,255,0.07)]">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#E6A23C]/10 border border-[#E6A23C]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#E6A23C]">{getInitials()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F0]">{user?.username || 'Admin'}</p>
                      <p className="text-xs text-[#8B949E]">{user?.email || 'admin@trinetra.com'}</p>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <span className="w-1 h-1 rounded-full bg-[#22C55E]"></span>
                        <span className="text-[8px] text-[#22C55E] tracking-wider uppercase font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-1.5">
                  <button
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-[#8B949E] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F5F0] transition-colors"
                    role="menuitem"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-[#8B949E] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F5F0] transition-colors"
                    onClick={handleSettings}
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-[#8B949E] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F5F0] transition-colors"
                    role="menuitem"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="p-1.5 border-t border-[rgba(255,255,255,0.07)]">
                  <button
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors font-medium"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;