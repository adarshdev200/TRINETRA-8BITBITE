import React, { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  MapPin,
  Camera,
  Shield,
  AlertTriangle,
  Navigation,
  Maximize2,
  Minimize2,
  Layers, // Keep Layers, it's available
  Eye,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  RefreshCw,
  Wifi,
  Radio,
  Clock,
  Target,
  Gauge,
  Zap,
  Compass,
  Home,
  DoorOpen,
  Stethoscope,
  Building2,
  ChevronRight,
  ArrowRight,
  Circle,
  Dot,
  Move,
  Crosshair,
  Star, // Keep Star from earlier
} from "lucide-react";

export const TempleMapPage = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedZone, setSelectedZone] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mapContainerRef = useRef(null);

  const zones = [
    {
      id: "gate-1",
      name: "Gate 1",
      status: "normal",
      people: 320,
      risk: 12,
      x: 10,
      y: 20,
      type: "entrance",
    },
    {
      id: "gate-2",
      name: "Gate 2",
      status: "normal",
      people: 280,
      risk: 15,
      x: 80,
      y: 20,
      type: "entrance",
    },
    {
      id: "security",
      name: "Security Check",
      status: "moderate",
      people: 450,
      risk: 45,
      x: 20,
      y: 40,
      type: "security",
    },
    {
      id: "queue-a",
      name: "Queue A",
      status: "high",
      people: 850,
      risk: 72,
      x: 30,
      y: 55,
      type: "queue",
    },
    {
      id: "queue-b",
      name: "Queue B",
      status: "normal",
      people: 420,
      risk: 35,
      x: 60,
      y: 55,
      type: "queue",
    },
    {
      id: "queue-c",
      name: "Queue C",
      status: "moderate",
      people: 620,
      risk: 58,
      x: 45,
      y: 70,
      type: "queue",
    },
    {
      id: "darshan",
      name: "Darshan Area",
      status: "critical",
      people: 1240,
      risk: 91,
      x: 45,
      y: 50,
      type: "darshan",
    },
    {
      id: "vip",
      name: "VIP Route",
      status: "normal",
      people: 80,
      risk: 8,
      x: 70,
      y: 35,
      type: "vip",
    },
    {
      id: "exit-1",
      name: "Emergency Exit 1",
      status: "normal",
      people: 0,
      risk: 0,
      x: 10,
      y: 85,
      type: "exit",
    },
    {
      id: "exit-2",
      name: "Emergency Exit 2",
      status: "normal",
      people: 0,
      risk: 0,
      x: 85,
      y: 85,
      type: "exit",
    },
    {
      id: "medical",
      name: "Medical Station",
      status: "normal",
      people: 5,
      risk: 0,
      x: 15,
      y: 75,
      type: "medical",
    },
    {
      id: "control",
      name: "Control Room",
      status: "normal",
      people: 8,
      risk: 0,
      x: 75,
      y: 75,
      type: "control",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return {
          bg: "bg-[#22C55E]",
          text: "text-[#22C55E]",
          border: "border-[#22C55E]",
          glow: "shadow-[#22C55E]/20",
        };
      case "moderate":
        return {
          bg: "bg-[#E6A23C]",
          text: "text-[#E6A23C]",
          border: "border-[#E6A23C]",
          glow: "shadow-[#E6A23C]/20",
        };
      case "high":
        return {
          bg: "bg-[#F59E0B]",
          text: "text-[#F59E0B]",
          border: "border-[#F59E0B]",
          glow: "shadow-[#F59E0B]/20",
        };
      case "critical":
        return {
          bg: "bg-[#EF4444]",
          text: "text-[#EF4444]",
          border: "border-[#EF4444]",
          glow: "shadow-[#EF4444]/20",
        };
      default:
        return {
          bg: "bg-[#9CA3AF]",
          text: "text-[#9CA3AF]",
          border: "border-[#9CA3AF]",
          glow: "shadow-[#9CA3AF]/20",
        };
    }
  };

  const getRiskColor = (risk) => {
    if (risk > 80) return "text-[#EF4444]";
    if (risk > 60) return "text-[#F59E0B]";
    if (risk > 30) return "text-[#E6A23C]";
    return "text-[#22C55E]";
  };

  const getRiskBg = (risk) => {
    if (risk > 80) return "bg-[#EF4444]/20";
    if (risk > 60) return "bg-[#F59E0B]/20";
    if (risk > 30) return "bg-[#E6A23C]/20";
    return "bg-[#22C55E]/20";
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "moderate":
        return "Moderate";
      case "high":
        return "High";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  const getZoneIcon = (type) => {
    switch (type) {
      case "entrance":
        return <Navigation className="w-4 h-4" />;
      case "security":
        return <Shield className="w-4 h-4" />;
      case "queue":
        return <Users className="w-4 h-4" />;
      case "darshan":
        return <Target className="w-4 h-4" />;
      case "vip":
        return <Star className="w-4 h-4" />;
      case "exit":
        return <DoorOpen className="w-4 h-4" />;
      case "medical":
        return <Stethoscope className="w-4 h-4" />;
      case "control":
        return <Building2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const criticalZones = zones.filter((z) => z.status === "critical");
  const highZones = zones.filter((z) => z.status === "high");

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.15, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.15, 0.5));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const selectedZoneData = zones.find((z) => z.id === selectedZone);

  return (
    <div className="min-h-screen bg-[#080A0F] p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E6A23C]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#38BDF8]/2 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #E6A23C 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#E6A23C] tracking-[0.15em] uppercase font-medium">
                LIVE OPERATIONS
              </span>
              <div className="w-px h-3 bg-[#E6A23C]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">
                  Live
                </span>
                <span className="text-[8px] text-[#9CA3AF]">
                  • Updated just now
                </span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">
              Temple Intelligence Map
            </h1>
            <p className="text-[#9CA3AF] text-sm">
              Real-time crowd density, security zones and incident monitoring.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-3 text-xs text-[#9CA3AF]">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#E6A23C]" />
                <span>{zones.length} Zones</span>
              </span>
              <span className="flex items-center space-x-1">
                <Camera className="w-3 h-3 text-[#38BDF8]" />
                <span>10 Cameras</span>
              </span>
              <span className="flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                <span>{criticalZones.length} Active Alerts</span>
              </span>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0D1118] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw
                className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map - 3/4 width */}
          <div className="lg:col-span-3 relative">
            <div
              className="bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden relative"
              style={{ height: "600px" }}
            >
              {/* Map Controls - Top Right */}
              <div className="absolute top-4 right-4 flex flex-col space-y-1 z-10">
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-lg hover:bg-[#1F2937] hover:border-[#E6A23C]/30 transition-all text-[#9CA3AF] hover:text-[#F5F5F0]"
                  title="Zoom In"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-lg hover:bg-[#1F2937] hover:border-[#E6A23C]/30 transition-all text-[#9CA3AF] hover:text-[#F5F5F0]"
                  title="Zoom Out"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-lg hover:bg-[#1F2937] hover:border-[#E6A23C]/30 transition-all text-[#9CA3AF] hover:text-[#F5F5F0]"
                  title="Recenter"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-lg hover:bg-[#1F2937] hover:border-[#E6A23C]/30 transition-all text-[#9CA3AF] hover:text-[#F5F5F0]"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-[#0D1118] border border-[rgba(255,255,255,0.08)] rounded-lg hover:bg-[#1F2937] hover:border-[#E6A23C]/30 transition-all text-[#9CA3AF] hover:text-[#F5F5F0]"
                  title="Layers"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              {/* Critical Alert Banner */}
              {criticalZones.length > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-3 max-w-xs backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-[#EF4444] animate-pulse mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#EF4444]">
                        ⚠ CRITICAL ZONE
                      </p>
                      <p className="text-xs text-[#F5F5F0] font-medium">
                        {criticalZones[0].name}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF]">
                        {criticalZones[0].risk} Risk Score •{" "}
                        {criticalZones[0].people} people
                      </p>
                      <p className="text-[10px] text-[#EF4444]">
                        Immediate monitoring recommended
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Map Container */}
              <div
                ref={mapContainerRef}
                className="w-full h-full relative overflow-hidden"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                }}
              >
                {/* Map Background */}
                <div className="absolute inset-0 bg-[#080A0F]">
                  {/* Grid */}
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                      backgroundSize: "30px 30px",
                    }}
                  ></div>

                  {/* Temple structure outlines */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 800'%3E%3Cpath d='M500 50L50 750h900L500 50z' fill='%23E6A23C' opacity='0.3'/%3E%3Cpath d='M500 150L150 750h700L500 150z' fill='%23E6A23C' opacity='0.2'/%3E%3C/svg%3E")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  {/* Pathways */}
                  <div className="absolute inset-0">
                    {/* Main path */}
                    <svg
                      className="w-full h-full"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    >
                      <path
                        d="M 120 200 L 200 350 L 300 450 L 450 400 L 700 350"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 450 400 L 600 500 L 800 600"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                      />
                      {/* VIP Route */}
                      <path
                        d="M 700 300 L 750 350 L 800 400"
                        stroke="rgba(230,162,60,0.1)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6 4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Zone Markers */}
                {zones.map((zone) => {
                  const status = getStatusColor(zone.status);
                  const isSelected = selectedZone === zone.id;
                  const isCritical = zone.status === "critical";
                  const isHigh = zone.status === "high";
                  const isModerate = zone.status === "moderate";

                  // Calculate position
                  const posX = `${zone.x}%`;
                  const posY = `${zone.y}%`;

                  // Size based on status
                  const size = isSelected
                    ? "w-20"
                    : isCritical
                      ? "w-16"
                      : "w-14";
                  const innerSize = isSelected
                    ? "w-14"
                    : isCritical
                      ? "w-11"
                      : "w-10";

                  return (
                    <div
                      key={zone.id}
                      className={`absolute cursor-pointer transition-all duration-300 group ${isSelected ? "z-20" : "z-10"}`}
                      style={{
                        left: posX,
                        top: posY,
                        transform: "translate(-50%, -50%)",
                        transformOrigin: "center",
                      }}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      {/* Density visualization */}
                      {isCritical && (
                        <div className="absolute inset-0 -m-8 rounded-full bg-[#EF4444]/10 animate-pulse"></div>
                      )}
                      {isHigh && (
                        <div className="absolute inset-0 -m-6 rounded-full bg-[#F59E0B]/10"></div>
                      )}
                      {isModerate && (
                        <div className="absolute inset-0 -m-4 rounded-full bg-[#E6A23C]/10"></div>
                      )}

                      {/* Marker */}
                      <div className={`relative ${size}`}>
                        {/* Outer ring - selected */}
                        {isSelected && (
                          <div className="absolute -inset-2 rounded-full border-2 border-[#E6A23C] animate-pulse"></div>
                        )}

                        {/* Status glow */}
                        <div
                          className={`absolute -inset-1 rounded-full ${status.glow} blur-sm opacity-50`}
                        ></div>

                        {/* Main marker */}
                        <div
                          className={`relative rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 ${status.border} bg-[#0D1118] ${innerSize} h-${innerSize.split("-")[1]}`}
                          style={{ aspectRatio: "1/1" }}
                        >
                          {/* Status dot */}
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${status.bg} ${isCritical ? "animate-pulse" : ""}`}
                          ></div>

                          {/* Icon or label */}
                          {zone.people > 0 ? (
                            <span className="text-[8px] font-bold text-[#F5F5F0]">
                              {zone.people > 999
                                ? `${(zone.people / 1000).toFixed(1)}k`
                                : zone.people}
                            </span>
                          ) : (
                            <span className="text-[6px] text-[#9CA3AF]">●</span>
                          )}
                          {isCritical && (
                            <AlertTriangle className="w-2.5 h-2.5 text-[#EF4444] absolute -bottom-0.5 -right-0.5" />
                          )}
                        </div>

                        {/* Zone name - below marker */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[6px] font-medium text-[#9CA3AF] group-hover:text-[#F5F5F0] transition-colors">
                          {zone.name}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-[#0D1118]/90 backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.08)] p-3 z-10">
                  <p className="text-[8px] text-[#9CA3AF] tracking-wider uppercase mb-2">
                    Zone Status
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                      <span className="text-[9px] text-[#9CA3AF]">Normal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#E6A23C]"></span>
                      <span className="text-[9px] text-[#9CA3AF]">
                        Moderate
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                      <span className="text-[9px] text-[#9CA3AF]">High</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
                      <span className="text-[9px] text-[#9CA3AF]">
                        Critical
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Info Bar */}
                <div className="absolute bottom-4 right-4 bg-[#0D1118]/90 backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.08)] px-3 py-2 z-10 flex items-center space-x-4 text-[9px] text-[#9CA3AF]">
                  <span className="flex items-center space-x-1.5">
                    <Radio className="w-3 h-3 text-[#22C55E]" />
                    <span>Live Map</span>
                  </span>
                  <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
                  <span>Last sync: Just now</span>
                  <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
                  <span>Zones: {zones.length}</span>
                  <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
                  <span className="text-[#EF4444]">
                    Critical: {criticalZones.length}
                  </span>
                  <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]"></span>
                  <span>Cameras: 10 Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Intelligence Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Zone Intelligence */}
            <Card className="border border-[rgba(255,255,255,0.08)] p-4 bg-[#0D1118]">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-4 h-4 text-[#E6A23C]" />
                <h2 className="text-xs font-bold text-[#F5F5F0] tracking-wider uppercase">
                  Zone Intelligence
                </h2>
              </div>

              {!selectedZoneData ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#E6A23C]/10 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-[#E6A23C]" />
                  </div>
                  <p className="text-sm font-medium text-[#F5F5F0]">
                    Select a zone
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Click any operational zone on the map to inspect live
                    intelligence.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Zone Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F5F0]">
                        {selectedZoneData.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusColor(selectedZoneData.status).bg} ${selectedZoneData.status === "critical" ? "animate-pulse" : ""}`}
                        ></span>
                        <span
                          className={`text-[10px] font-bold ${getStatusColor(selectedZoneData.status).text}`}
                        >
                          {getStatusLabel(
                            selectedZoneData.status,
                          ).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {getZoneIcon(selectedZoneData.type)}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#080A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                      <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">
                        People Inside
                      </p>
                      <p className="text-xl font-bold text-[#F5F5F0]">
                        {selectedZoneData.people.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#080A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                      <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">
                        Risk Score
                      </p>
                      <p
                        className={`text-xl font-bold ${getRiskColor(selectedZoneData.risk)}`}
                      >
                        {selectedZoneData.risk} / 100
                      </p>
                    </div>
                  </div>

                  {/* Risk Meter */}
                  <div className="bg-[#080A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#9CA3AF]">Risk Level</span>
                      <span
                        className={`font-bold ${getRiskColor(selectedZoneData.risk)}`}
                      >
                        {selectedZoneData.risk}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          selectedZoneData.risk > 80
                            ? "bg-[#EF4444]"
                            : selectedZoneData.risk > 60
                              ? "bg-[#F59E0B]"
                              : selectedZoneData.risk > 30
                                ? "bg-[#E6A23C]"
                                : "bg-[#22C55E]"
                        }`}
                        style={{ width: `${selectedZoneData.risk}%` }}
                      />
                    </div>
                  </div>

                  {/* Crowd Intelligence */}
                  <div className="bg-[#080A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
                    <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider mb-2">
                      Crowd Intelligence
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9CA3AF]">Density</span>
                        <span
                          className={`font-bold ${getRiskColor(selectedZoneData.risk)}`}
                        >
                          {selectedZoneData.risk}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9CA3AF]">Flow</span>
                        <span className="text-[#F5F5F0] font-medium">
                          {selectedZoneData.risk > 60
                            ? "High"
                            : selectedZoneData.risk > 30
                              ? "Moderate"
                              : "Low"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9CA3AF]">Trend</span>
                        <span className="text-[#22C55E] font-medium flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          Increasing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button className="w-full bg-[#E6A23C] text-[#080A0F] hover:bg-[#C47A20] transition-colors">
                      <Camera className="w-4 h-4 mr-1.5" />
                      View Cameras
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full border-[rgba(255,255,255,0.08)] hover:border-[#E6A23C]/30"
                    >
                      <Shield className="w-4 h-4 mr-1.5" />
                      Security Details
                    </Button>
                    {selectedZoneData.status === "critical" && (
                      <Button
                        variant="danger"
                        className="w-full bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/20"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1.5" />
                        View Alert
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Quick Zone List */}
            <Card className="border border-[rgba(255,255,255,0.08)] p-4 bg-[#0D1118] max-h-[300px] overflow-y-auto">
              <div className="flex items-center space-x-2 mb-3">
                {/* Use Layers or any other valid icon instead of List */}
                <Layers className="w-4 h-4 text-[#E6A23C]" />
                <h2 className="text-xs font-bold text-[#F5F5F0] tracking-wider uppercase">
                  Zone Status
                </h2>
              </div>
              <div className="space-y-1">
                {zones.map((zone) => {
                  const status = getStatusColor(zone.status);
                  const isSelected = selectedZone === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-all text-left ${
                        isSelected
                          ? "bg-[#E6A23C]/10 border-l-2 border-l-[#E6A23C]"
                          : "hover:bg-[#1F2937]"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${status.bg} ${zone.status === "critical" ? "animate-pulse" : ""}`}
                        ></span>
                        <span
                          className={`text-xs ${isSelected ? "text-[#F5F5F0]" : "text-[#9CA3AF]"}`}
                        >
                          {zone.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="text-[#9CA3AF]">{zone.people}</span>
                        <span className={`font-medium ${status.text}`}>
                          {getStatusLabel(zone.status)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};



export default TempleMapPage;
