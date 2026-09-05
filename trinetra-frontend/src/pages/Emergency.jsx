// src/pages/Emergency.jsx
import React, { useState } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  CheckCircle,
  Send,
  Navigation
} from 'lucide-react';

export const Emergency = () => {
  const { alerts, stats } = useRealtimeData();
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high');
  const hasEmergency = criticalAlerts.length > 0;

  const securityTeams = [
    { id: 'team-01', name: 'Security Team 01', zone: 'Entrance', officers: 6, status: 'available', distance: '45m' },
    { id: 'team-02', name: 'Security Team 02', zone: 'Queue A', officers: 5, status: 'on-duty', distance: '120m' },
    { id: 'team-03', name: 'Security Team 03', zone: 'Darshan', officers: 8, status: 'responding', distance: '30m' },
    { id: 'team-04', name: 'Security Team 04', zone: 'Emergency Response', officers: 6, status: 'available', distance: '15m' },
  ];

  const nearestTeam = securityTeams.find(t => t.status === 'available' && t.distance === '15m');

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Emergency Center</h1>
          <p className="text-gray-400">Real-time emergency response coordination</p>
        </div>
        {hasEmergency && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-critical/20 rounded-lg border border-critical/30 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-critical" />
            <span className="text-critical font-medium">{criticalAlerts.length} Active Emergencies</span>
          </div>
        )}
      </div>

      {!hasEmergency ? (
        <Card className="text-center py-16">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">NO ACTIVE EMERGENCIES</h2>
          <p className="text-gray-400">All zones operating normally.</p>
        </Card>
      ) : (
        <>
          {/* Emergency Banner */}
          <Card className="border-critical/30 bg-critical/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-critical/20">
                  <AlertTriangle className="w-8 h-8 text-critical" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-critical">🚨 EMERGENCY MODE</h2>
                  <p className="text-lg text-white">CROWD SURGE DETECTED</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-300">Location: Main Darshan Area</span>
                    <span className="text-critical font-medium">Risk: CRITICAL</span>
                    <span className="text-gray-300">Time: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="danger">
                  <Send className="w-4 h-4 mr-2" />
                  Dispatch All
                </Button>
              </div>
            </div>
          </Card>

          {/* Response Teams */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Nearest Response Teams</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {securityTeams.filter(t => t.status === 'available').map((team) => (
                <Card key={team.id} elevated hover className="border-primary/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{team.name}</h3>
                        <p className="text-xs text-gray-400">{team.zone}</p>
                      </div>
                    </div>
                    <StatusBadge status={team.status} />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">
                        <Users className="w-4 h-4 inline mr-1" />
                        {team.officers} officers
                      </span>
                      <span className="text-gray-400">
                        <Navigation className="w-4 h-4 inline mr-1" />
                        {team.distance}
                      </span>
                    </div>
                    <Button size="sm" variant="primary">
                      Dispatch
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Evacuation Route */}
          <Card>
            <h2 className="text-sm font-semibold text-white mb-4">Evacuation Route</h2>
            <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-lg overflow-x-auto">
              <div className="flex items-center space-x-4 md:space-x-8 min-w-max">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-1">
                    <MapPin className="w-6 h-6 text-warning" />
                  </div>
                  <span className="text-xs text-gray-400">Current Location</span>
                  <p className="text-sm text-white">Main Darshan</p>
                </div>
                <div className="flex-1 w-16 md:w-32 h-0.5 border-t-2 border-dashed border-warning/50 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-warning">↓</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center mx-auto mb-1">
                    <Navigation className="w-6 h-6 text-info" />
                  </div>
                  <span className="text-xs text-gray-400">Emergency Corridor</span>
                  <p className="text-sm text-white">45m</p>
                </div>
                <div className="flex-1 w-16 md:w-32 h-0.5 border-t-2 border-dashed border-info/50 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-info">↓</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-1">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <span className="text-xs text-gray-400">Exit</span>
                  <p className="text-sm text-white">Exit 2</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Emergency;