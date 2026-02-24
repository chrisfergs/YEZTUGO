import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronDown, 
  SkipForward,
  X
} from "lucide-react";

export type DemoSection = 
  | "demo-tracking" 
  | "data-evolution" 
  | "agentic-orchestration" 
  | "agent-deployment";

export interface SectionToggles {
  // Demo Tracking toggles
  showUserPerspective?: boolean;
  showIdentityReveal?: boolean;
  // Data Evolution toggle
  showDataEvolution?: boolean;
  // Agentic Orchestration toggles
  showOrfoIntro?: boolean;
  slowStreaming?: boolean;
  // Agent Deployment toggles
  showAgentCollaboration?: boolean;
  showUIWireframe?: boolean;
}

// Utility functions for persisting settings
const STORAGE_KEY_PREFIX = 'orfo-demo-settings';

// Generate or retrieve a session ID
export function getSessionId(): string {
  let sessionId = localStorage.getItem('orfo-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('orfo-session-id', sessionId);
  }
  return sessionId;
}

// Save settings to localStorage
export function saveSettings(sessionId: string, settings: SectionToggles): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}-${sessionId}`;
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
}

// Load settings from localStorage
export function loadSettings(sessionId: string): SectionToggles | null {
  try {
    const key = `${STORAGE_KEY_PREFIX}-${sessionId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
    return null;
  }
}

interface DemoNavProps {
  currentSection: DemoSection;
  onSectionChange: (section: DemoSection, startPhase?: number) => void;
  // Phase control
  currentPhase?: number;
  onPhaseChange?: (phase: number) => void;
  maxPhase?: number;
  // Section toggles
  sectionToggles?: SectionToggles;
  onToggleChange?: (key: string, value: boolean) => void;
  // Homepage mode
  isOnHomepage?: boolean; // If true, position in bottom-left and show "Start Demo" actions
  onBackToHomepage?: () => void; // Callback to return to homepage
}

export function DemoNav({
  currentSection,
  onSectionChange,
  currentPhase = 0,
  onPhaseChange,
  maxPhase = 0,
  sectionToggles = {},
  onToggleChange,
  isOnHomepage = false,
  onBackToHomepage
}: DemoNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [currentSection]: true
  });

  // Auto-expand current section when it changes
  useEffect(() => {
    setExpandedSections(prev => ({
      ...prev,
      [currentSection]: true
    }));
  }, [currentSection]);

  // Toggle with keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper function to calculate starting phase based on toggles
  const getStartPhase = (sectionId: DemoSection): number => {
    switch (sectionId) {
      case "demo-tracking":
        // Stage 1: User Perspective, Stage 2: SystemTrackingView, Stage 3: Transition
        const skipUser = !sectionToggles.showUserPerspective;
        const skipIdentity = !sectionToggles.showIdentityReveal;

        if (skipUser && skipIdentity) {
          return 3; // Skip both → go to transition
        } else if (skipUser) {
          return 2; // Skip user perspective → go to SystemTrackingView
        } else if (skipIdentity) {
          return 1; // Show user perspective, will auto-skip to transition
        } else {
          return 1; // Show everything
        }
      case "data-evolution":
        // Data Evolution is always shown from the beginning when active
        // The toggle controls whether to show the entire section or not
        return 0;
      case "agentic-orchestration":
        // Phase 0: ORFO intro, Phase 1: Planner, Phase 2: Streaming, Phase 3: Transition
        const skipOrfo = !sectionToggles.showOrfoIntro;
        const fastStream = !sectionToggles.slowStreaming;

        if (skipOrfo && fastStream) {
          return 3; // Skip both → go to transition
        } else if (skipOrfo) {
          return 1; // Skip ORFO intro → go to Planner
        } else {
          return 0; // Show everything
        }
      case "agent-deployment":
        // Phase 0-3: Agent collaboration, Phase 4-8: Signal assembly/UI, Phase 9: Transition
        const skipAgents = !sectionToggles.showAgentCollaboration;
        const skipWireframe = !sectionToggles.showUIWireframe;

        if (skipAgents && skipWireframe) {
          return 9; // Skip both → go to transition
        } else if (skipAgents) {
          return 4; // Skip agent collaboration → go to Signal assembly
        } else {
          return 0; // Show everything
        }
      default:
        return 0;
    }
  };

  const sections = [
    {
      id: "demo-tracking" as DemoSection,
      name: "HCP Tracking Journey",
      description: "Anonymous → KOL → Engaged → Lost",
      stages: 3,
      phaseLabels: ["ORFO Wondering", "System Tracking", "Transition"],
      toggles: [
        {
          key: "showUserPerspective",
          label: "Show User Perspective",
          description: "Show the initial confused user animation"
        },
        {
          key: "showIdentityReveal",
          label: "Show Identity Reveal Phase",
          description: "Show the identity reveal animation"
        }
      ]
    },
    {
      id: "data-evolution" as DemoSection,
      name: "Data Intelligence",
      description: "Static → Digital → Multi-Channel → Unified",
      stages: 8,
      phaseLabels: [
        "Static HCP",
        "Digital Signals",
        "Data Layer Hub",
        "Connecting Streams",
        "Data Unification",
        "Data Activation",
        "Multi-Channel",
        "Orchestration",
        "ORFO AI Chat"
      ],
      toggles: [
        {
          key: "showDataEvolution",
          label: "Show Data Evolution",
          description: "Show the entire Data Intelligence section"
        }
      ]
    },
    {
      id: "agentic-orchestration" as DemoSection,
      name: "Agentic Orchestration",
      description: "ORFO AI → Planner → Analysis Engine",
      stages: 2,
      phaseLabels: ["ORFO Alert", "Planner Called", "Streaming Prompt"],
      toggles: [
        {
          key: "showOrfoIntro",
          label: "Show ORFO AI Introduction",
          description: "Show the ORFO AI introduction phase"
        },
        {
          key: "slowStreaming",
          label: "Slow Streaming Mode",
          description: "Show text streaming at readable speed"
        }
      ]
    },
    {
      id: "agent-deployment" as DemoSection,
      name: "Agent Deployment",
      description: "Orchestration → MSL Signal Generation",
      stages: 7,
      phaseLabels: [
        "Orion Deploys",
        "Engagement Agent",
        "Content Agent", 
        "Compliance Agent",
        "Signal Assembly",
        "UI Wireframe",
        "Final Signal"
      ],
      toggles: [
        {
          key: "showAgentCollaboration",
          label: "Show Agent Collaboration",
          description: "Show detailed agent analysis phases"
        },
        {
          key: "showUIWireframe",
          label: "Show UI Wireframe",
          description: "Show the MSL signal UI wireframe"
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const currentSectionData = sections.find(s => s.id === currentSection);

  return (
    <>
      {/* Navigation Panel - Only accessible via ⌘K keyboard shortcut */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed z-[10001] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              position: 'fixed',
              ...(isOnHomepage 
                ? { bottom: '24px', left: '24px' } // Bottom-left on homepage
                : { top: '24px', left: '24px' }    // Top-left in demo mode
              ),
              zIndex: 10001,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              width: '400px',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div 
              className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between"
              style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(126, 34, 206))',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h2 className="text-white text-lg font-semibold">
                  {isOnHomepage ? 'Start Demo' : 'Demo Navigator'}
                </h2>
                <p className="text-purple-200 text-xs">
                  {isOnHomepage ? 'Jump into any demo section' : 'Control your presentation flow'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                style={{ cursor: 'pointer' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Section Info - Only show when in demo mode */}
            {!isOnHomepage && (
              <div className="px-6 py-4 bg-purple-500/10 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs uppercase tracking-wider">Current Section</span>
                    <span className="text-purple-400 text-xs font-mono">
                      Phase {currentPhase + 1}/{(currentSectionData?.stages || 0) + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-medium">{currentSectionData?.name}</h3>
                  <p className="text-white/80 text-xs mt-1">{currentSectionData?.description}</p>
                </div>
                {onBackToHomepage && (
                  <button
                    onClick={() => {
                      onBackToHomepage();
                      setIsOpen(false);
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded text-xs font-medium transition-all"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ← Back to Homepage
                  </button>
                )}
              </div>
            )}

            {/* Welcome message on homepage */}
            {isOnHomepage && (
              <div className="px-6 py-4 bg-purple-500/20">
                <h3 className="text-white font-semibold mb-2 text-base">Welcome to ORFO Demo</h3>
                <p className="text-white text-sm">
                  Select any section below to jump directly into the demo experience.
                </p>
              </div>
            )}

            {/* Sections List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {/* Homepage Navigation - Only show when in demo mode */}
              {!isOnHomepage && onBackToHomepage && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onBackToHomepage();
                      setIsOpen(false);
                    }}
                    className="w-full rounded-lg p-3 transition-all bg-white/5 border border-white/10 hover:bg-white/10"
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      padding: '12px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'left'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-white/90">
                            Homepage
                          </span>
                        </div>
                        <p className="text-xs text-white">Return to main landing page</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
              
              {sections.map((section) => {
                const isActive = section.id === currentSection;
                const isExpanded = expandedSections[section.id];

                return (
                  <div key={section.id} className="space-y-2">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full rounded-lg p-3 transition-all ${
                        isActive 
                          ? 'bg-purple-500/20 border border-purple-400/30' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        padding: '12px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${isActive ? 'rgba(192, 132, 252, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                        textAlign: 'left'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-white/60" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-white/60" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/90'}`}>
                              {section.name}
                            </span>
                            {isActive && !isOnHomepage && (
                              <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white">{section.description}</p>
                        </div>
                      </div>
                    </button>

                    {/* Phase Controls (when expanded) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-7 space-y-2 py-2">
                            {/* Jump to Section / Start Demo Button */}
                            {(!isActive || isOnHomepage) && (
                              <button
                                onClick={() => onSectionChange(section.id, getStartPhase(section.id))}
                                className="w-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 text-purple-300 px-3 py-2 rounded text-xs font-medium transition-all flex items-center justify-center gap-2"
                                style={{
                                  width: '100%',
                                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                                  border: '1px solid rgba(192, 132, 252, 0.3)',
                                  color: '#d8b4fe',
                                  padding: '8px 12px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px'
                                }}
                              >
                                <SkipForward className="w-3 h-3" />
                                {isOnHomepage ? 'Start Demo' : 'Jump to Section'}
                              </button>
                            )}

                            {/* Phase Navigation (only for active section) */}
                            {isActive && !isOnHomepage && onPhaseChange && (
                              <div className="space-y-1">
                                <div className="text-xs text-white/85 mb-2 flex items-center justify-between font-medium">
                                  <span>Phase Navigation</span>
                                  <span className="font-mono">{currentPhase + 1}/{section.stages + 1}</span>
                                </div>
                                {section.phaseLabels.map((label, index) => (
                                  <button
                                    key={index}
                                    onClick={() => onPhaseChange(index)}
                                    className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                                      currentPhase === index
                                        ? 'bg-purple-500/30 text-white border border-purple-400/40 font-medium'
                                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
                                    }`}
                                    style={{
                                      width: '100%',
                                      textAlign: 'left',
                                      padding: '6px 12px',
                                      borderRadius: '4px',
                                      fontSize: '12px',
                                      cursor: 'pointer',
                                      backgroundColor: currentPhase === index ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                                      color: currentPhase === index ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                                      border: currentPhase === index ? '1px solid rgba(192, 132, 252, 0.4)' : '1px solid transparent'
                                    }}
                                  >
                                    <span className="font-mono text-white/80 mr-2">{index + 1}.</span>
                                    {label}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Toggles (if section has them) */}
                            {section.toggles && section.toggles.length > 0 && (
                              <div className="space-y-2 pt-2">
                                <div className="text-xs text-white mb-2 font-medium">Section Options</div>
                                {section.toggles.map((toggle) => (
                                  <div
                                    key={toggle.key}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded bg-white/5 border border-white/10"
                                    style={{
                                      width: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '8px 12px',
                                      borderRadius: '4px',
                                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                      border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                  >
                                    <div className="flex-1 text-left">
                                      <div className="text-xs text-white font-medium">{toggle.label}</div>
                                      {toggle.description && (
                                        <div className="text-xs text-white mt-0.5">{toggle.description}</div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => onToggleChange?.(toggle.key, !sectionToggles[toggle.key as keyof typeof sectionToggles])}
                                      className="flex-shrink-0 ml-3 flex items-center transition-all"
                                      style={{
                                        width: '48px',
                                        height: '28px',
                                        borderRadius: '14px',
                                        backgroundColor: sectionToggles[toggle.key as keyof typeof sectionToggles] 
                                          ? 'rgba(34, 197, 94, 0.3)' 
                                          : 'rgba(239, 68, 68, 0.3)',
                                        border: sectionToggles[toggle.key as keyof typeof sectionToggles]
                                          ? '2px solid rgba(34, 197, 94, 0.6)'
                                          : '2px solid rgba(239, 68, 68, 0.6)',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <motion.div
                                        className="rounded-full flex items-center justify-center"
                                        animate={{
                                          x: sectionToggles[toggle.key as keyof typeof sectionToggles] ? 16 : 0,
                                          backgroundColor: sectionToggles[toggle.key as keyof typeof sectionToggles] 
                                            ? 'rgb(34, 197, 94)' 
                                            : 'rgb(239, 68, 68)'
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                          flexShrink: 0
                                        }}
                                      >
                                        <span 
                                          className="text-white font-bold" 
                                          style={{ 
                                            fontSize: '8px',
                                            lineHeight: 1
                                          }}
                                        >
                                          {sectionToggles[toggle.key as keyof typeof sectionToggles] ? 'ON' : 'OFF'}
                                        </span>
                                      </motion.div>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-black/50">
              <p className="text-white text-xs">
                Press <span className="text-purple-300 font-mono font-medium">⌘K</span> to toggle this panel
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
