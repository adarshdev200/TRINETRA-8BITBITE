// src/pages/Settings.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Settings as SettingsIcon,
  Map,
  Camera,
  Bell,
  Shield,
  Users,
  Sliders,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Wifi,
  Radio,
  Activity,
  Eye,
  User,
  UserCheck,
  Building2,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Clock,
  Gauge,
  Target,
  Zap,
  Database,
  Cloud,
  Server,
  Globe,
  Languages,
  Moon,
  Sun,
  BellRing,
  Volume2,
  VolumeX,
  Lock,
  Key,
  Fingerprint,
  Smartphone,
  Monitor,
  Cpu
} from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'zones', label: 'Zone Management', icon: Map },
    { id: 'cameras', label: 'Camera Configuration', icon: Camera },
    { id: 'alerts', label: 'Alert Thresholds', icon: Bell },
    { id: 'security', label: 'Security Teams', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  // Mock data for zones
  const zones = [
    { name: 'Entrance', capacity: 2500, current: 1420, density: 57, status: 'normal' },
    { name: 'Queue A', capacity: 1200, current: 920, density: 77, status: 'high' },
    { name: 'Queue B', capacity: 1200, current: 560, density: 47, status: 'normal' },
    { name: 'Darshan', capacity: 3000, current: 2790, density: 93, status: 'critical' },
    { name: 'VIP Corridor', capacity: 500, current: 180, density: 36, status: 'normal' },
    { name: 'Exit', capacity: 2000, current: 340, density: 17, status: 'safe' },
  ];

  // Mock data for cameras
  const cameras = [
    { id: 'CAM-01', name: 'Main Entrance', zone: 'Entrance', status: 'online', resolution: '1080p', fps: 30, ai: true },
    { id: 'CAM-02', name: 'Security Check', zone: 'Queue A', status: 'online', resolution: '1080p', fps: 25, ai: true },
    { id: 'CAM-03', name: 'Queue A Feed', zone: 'Queue A', status: 'online', resolution: '720p', fps: 30, ai: false },
    { id: 'CAM-04', name: 'Darshan View', zone: 'Darshan', status: 'online', resolution: '4K', fps: 30, ai: true },
    { id: 'CAM-05', name: 'VIP Corridor', zone: 'VIP Corridor', status: 'offline', resolution: '1080p', fps: 15, ai: false },
  ];

  // Mock data for security teams
  const teams = [
    { name: 'Security Team 01', zone: 'Entrance', officers: 6, status: 'available' },
    { name: 'Security Team 02', zone: 'Queue A', officers: 5, status: 'on-duty' },
    { name: 'Security Team 03', zone: 'Darshan', officers: 8, status: 'responding' },
    { name: 'Security Team 04', zone: 'VIP Corridor', officers: 4, status: 'available' },
  ];

  // Mock data for users
  const users = [
    { name: 'Raj Kumar', role: 'Administrator', department: 'Control Room', status: 'active', lastActive: '2 min ago' },
    { name: 'Priya Sharma', role: 'Operator', department: 'Security', status: 'active', lastActive: '15 min ago' },
    { name: 'Amit Patel', role: 'Security', department: 'Emergency Response', status: 'inactive', lastActive: '2 hours ago' },
    { name: 'Sneha Reddy', role: 'Viewer', department: 'Administration', status: 'active', lastActive: '45 min ago' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleReset = () => {
    setShowResetConfirm(true);
    setTimeout(() => setShowResetConfirm(false), 3000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'general':
        return renderGeneral();
      case 'zones':
        return renderZones();
      case 'cameras':
        return renderCameras();
      case 'alerts':
        return renderAlerts();
      case 'security':
        return renderSecurity();
      case 'users':
        return renderUsers();
      default:
        return renderGeneral();
    }
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <Card className="border border-[rgba(255,255,255,0.08)] p-6">
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#F5F5F0]">General Configuration</h2>
          <p className="text-xs text-[#9CA3AF]">Core settings for the TRINETRA monitoring environment.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-medium text-[#9CA3AF] tracking-wider uppercase mb-2">Temple Name</label>
            <input
              type="text"
              defaultValue="Demo Temple"
              className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-sm"
              onChange={() => setHasChanges(true)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-[#9CA3AF] tracking-wider uppercase mb-2">Time Zone</label>
            <select className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-sm">
              <option>Asia/Kolkata (UTC +5:30)</option>
              <option>UTC</option>
              <option>America/New_York</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-[#9CA3AF] tracking-wider uppercase mb-2">Language</label>
            <select className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-[#9CA3AF] tracking-wider uppercase mb-2">Operational Mode</label>
            <select className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl px-4 py-2.5 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-sm">
              <option>Live Monitoring</option>
              <option>Simulation</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <h3 className="text-sm font-medium text-[#F5F5F0] mb-4">System Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'Real-time monitoring', desc: 'Receive continuous monitoring updates.', default: true },
              { label: 'Automatic alert refresh', desc: 'Automatically refresh incoming alerts.', default: true },
              { label: 'Sound notifications', desc: 'Play notification sound for critical alerts.', default: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.06)]">
                <div>
                  <p className="text-sm font-medium text-[#F5F5F0]">{item.label}</p>
                  <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.default} className="sr-only peer" onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-[#1F2937] peer-focus:ring-2 peer-focus:ring-[#E6A23C]/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6A23C]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderZones = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#F5F5F0]">Zone Management</h2>
          <p className="text-xs text-[#9CA3AF]">Monitor and configure temple zones.</p>
        </div>
        <Button className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Zone
        </Button>
      </div>
      <div className="space-y-3">
        {zones.map((zone, index) => {
          const statusColors = {
            normal: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
            high: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
            critical: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30',
            safe: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
          };
          return (
            <div key={index} className="bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#E6A23C]/30 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E6A23C]/10 flex items-center justify-center">
                    <Map className="w-5 h-5 text-[#E6A23C]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#F5F5F0]">{zone.name}</h3>
                    <div className="flex items-center space-x-4 text-xs text-[#9CA3AF]">
                      <span>Capacity: {zone.capacity.toLocaleString()}</span>
                      <span>Current: {zone.current.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-[#9CA3AF]">Density</span>
                      <span className="text-[#F5F5F0] font-bold">{zone.density}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          zone.density >= 80 ? 'bg-[#EF4444]' :
                          zone.density >= 60 ? 'bg-[#F59E0B]' :
                          zone.density >= 30 ? 'bg-[#E6A23C]' :
                          'bg-[#22C55E]'
                        }`}
                        style={{ width: `${zone.density}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-[8px] font-medium px-2 py-1 rounded border ${statusColors[zone.status]}`}>
                    {zone.status.toUpperCase()}
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCameras = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#F5F5F0]">Camera Configuration</h2>
          <p className="text-xs text-[#9CA3AF]">Manage surveillance cameras and AI detection settings.</p>
        </div>
        <Button className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Camera
        </Button>
      </div>
      <div className="space-y-3">
        {cameras.map((camera, index) => (
          <div key={index} className="bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#E6A23C]/30 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-[#F5F5F0]">{camera.id}</h3>
                    <span className="text-xs text-[#9CA3AF]">{camera.name}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF]">{camera.zone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`flex items-center space-x-1.5 text-[10px] font-medium ${
                  camera.status === 'online' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${camera.status === 'online' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}></span>
                  <span>{camera.status === 'online' ? 'Online' : 'Offline'}</span>
                </span>
                <span className="text-xs text-[#9CA3AF]">{camera.resolution}</span>
                <span className="text-xs text-[#9CA3AF]">{camera.fps} FPS</span>
                <span className={`text-[8px] font-medium px-2 py-1 rounded border ${
                  camera.ai ? 'border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]' : 'border-[#9CA3AF]/30 bg-[#9CA3AF]/10 text-[#9CA3AF]'
                }`}>
                  {camera.ai ? 'AI Enabled' : 'AI Disabled'}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlerts = () => {
    const thresholds = [
      { label: 'Critical', value: 80, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30', desc: 'Immediate intervention required above this threshold.' },
      { label: 'High', value: 60, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/30', desc: 'Elevated density requiring attention.' },
      { label: 'Moderate', value: 30, color: 'text-[#E6A23C]', bg: 'bg-[#E6A23C]/10', border: 'border-[#E6A23C]/30', desc: 'Normal operational range.' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold text-[#F5F5F0]">Alert Thresholds</h2>
          <p className="text-xs text-[#9CA3AF]">Configure crowd-density levels that trigger operational alerts.</p>
        </div>
        <div className="space-y-4">
          {thresholds.map((threshold, index) => (
            <Card key={index} className={`border ${threshold.border} bg-[#0D1118] p-6`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${threshold.bg} border ${threshold.border}`}></div>
                    <h3 className={`text-sm font-bold ${threshold.color}`}>{threshold.label} Density</h3>
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-1">{threshold.desc}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-2xl font-bold ${threshold.color}`}>{threshold.value}%</span>
                  <div className="w-48">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={threshold.value}
                      className="w-full accent-[#E6A23C]"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="border border-[rgba(255,255,255,0.08)] p-6">
          <h3 className="text-sm font-medium text-[#F5F5F0] mb-4">Density Response</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              <span className="text-[#9CA3AF]">0–30%</span>
              <span className="text-[#F5F5F0]">Normal</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#E6A23C]"></span>
              <span className="text-[#9CA3AF]">30–60%</span>
              <span className="text-[#F5F5F0]">Moderate</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span className="text-[#9CA3AF]">60–80%</span>
              <span className="text-[#F5F5F0]">High</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
              <span className="text-[#9CA3AF]">80–100%</span>
              <span className="text-[#F5F5F0]">Critical</span>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#F5F5F0]">Security Teams</h2>
          <p className="text-xs text-[#9CA3AF]">Manage security personnel and deployments.</p>
        </div>
        <Button className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Team
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teams.map((team, index) => {
          const statusColors = {
            available: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
            'on-duty': 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30',
            responding: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
          };
          return (
            <Card key={index} className="border border-[rgba(255,255,255,0.08)] p-4 hover:border-[#E6A23C]/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E6A23C]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#E6A23C]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#F5F5F0]">{team.name}</h3>
                    <p className="text-xs text-[#9CA3AF]">{team.zone}</p>
                    <p className="text-xs text-[#9CA3AF]">{team.officers} Officers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[8px] font-medium px-2 py-1 rounded border ${statusColors[team.status]}`}>
                    {team.status.toUpperCase()}
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#F5F5F0]">User Management</h2>
          <p className="text-xs text-[#9CA3AF]">Manage system users and permissions.</p>
        </div>
        <Button className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
          <Plus className="w-4 h-4 mr-1.5" />
          Add User
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)]">
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">User</th>
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Role</th>
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Department</th>
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Last Active</th>
              <th className="text-left py-3 px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-[rgba(255,255,255,0.06)] hover:bg-[#0D1118] transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6A23C]/20 flex items-center justify-center text-xs font-bold text-[#E6A23C]">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-[#F5F5F0]">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[#9CA3AF]">{user.role}</td>
                <td className="py-3 px-4 text-sm text-[#9CA3AF]">{user.department}</td>
                <td className="py-3 px-4">
                  <span className={`flex items-center space-x-1.5 text-[10px] font-medium ${
                    user.status === 'active' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}></span>
                    <span>{user.status === 'active' ? 'Active' : 'Inactive'}</span>
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[#9CA3AF]">{user.lastActive}</td>
                <td className="py-3 px-4">
                  <button className="p-1.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080A0F] p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E6A23C]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#38BDF8]/2 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #E6A23C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#E6A23C] tracking-[0.15em] uppercase font-medium">SYSTEM CONFIGURATION</span>
              <div className="w-px h-3 bg-[#E6A23C]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">System Healthy</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Settings & Control</h1>
            <p className="text-[#9CA3AF] text-sm">Configure TRINETRA's monitoring, security, alerting and operational parameters.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-[#0D1118] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#E6A23C]/30 transition-all text-sm"
            >
              <RefreshCw className="w-4 h-4 inline mr-1.5" />
              Reset
            </button>
            <Button 
              onClick={handleSave}
              loading={isSaving}
              className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.08)] mb-6"></div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 sticky top-20">
              <p className="text-[8px] text-[#9CA3AF] tracking-wider uppercase mb-4">Configuration</p>
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                        isActive
                          ? 'bg-[#E6A23C]/10 border-l-2 border-l-[#E6A23C] text-[#E6A23C]'
                          : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F5F5F0]'
                      }`}
                    >
                      <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#E6A23C]' : ''}`} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                  <span className="text-[#9CA3AF]">System Status</span>
                  <span className="text-[#22C55E] font-medium">Operational</span>
                </div>
                <div className="mt-2 text-[10px] text-[#9CA3AF]">
                  <p>Configuration Version <span className="text-[#F5F5F0]">v2.4.1</span></p>
                  <p>Last Updated <span className="text-[#F5F5F0]">Today, 18:42</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>

        {/* Sticky Save Bar */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0D1118] border-t border-[#E6A23C]/20 p-4 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6A23C] animate-pulse"></span>
                <span className="text-sm text-[#E6A23C]">Unsaved changes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="secondary" onClick={handleReset}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  loading={isSaving}
                  className="bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {saveSuccess && (
          <div className="fixed top-20 right-6 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4 shadow-2xl z-50 animate-slide-in">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              <div>
                <p className="text-sm font-medium text-[#22C55E]">Settings Saved</p>
                <p className="text-xs text-[#9CA3AF]">All changes have been applied successfully.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;