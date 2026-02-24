import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AmliLogo } from "./AmliLogo";
import immunexisIcon from "../assets/Immunexis-Icon.png";
import { 
  Globe, 
  Download, 
  MousePointer, 
  User,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Database,
  Send,
  Users,
  Eye,
  Sparkles,
  UserCheck,
  MessageCircle,
  Microscope,
  ShieldX,
  FolderHeart,
  Building2,
  Tablets,
  FileStack,
  Presentation,
  Laptop,
  LayoutTemplate,
  CalendarClock,
  Workflow,
  Activity,
  UserRound,
  RefreshCw
} from "lucide-react";

// Force Tailwind v4 to generate all classes we need - DO NOT REMOVE
const TAILWIND_CLASSES_NEEDED = [
  // Opacity classes
  "text-white/10", "text-white/20", "text-white/30", "text-white/40", "text-white/50", "text-white/60", "text-white/70", "text-white/80", "text-white/90",
  "bg-white/10", "bg-white/20", "bg-white/30", "bg-white/40", "bg-white/50", "bg-white/60", "bg-white/70", "bg-white/80", "bg-white/90",
  "border-white/10", "border-white/20", "border-white/30", "border-white/40", "border-white/50",
  "bg-black/10", "bg-black/20", "bg-black/30", "bg-black/40", "bg-black/50", "bg-black/60", "bg-black/70", "bg-black/80", "bg-black/90",
  "bg-gray-500/10", "bg-gray-500/20", "bg-gray-500/30", "bg-blue-500/10", "bg-blue-500/20", "bg-blue-500/30", "bg-blue-500/8",
  "bg-purple-500/10", "bg-purple-500/15", "bg-purple-500/20", "bg-purple-500/25", "bg-cyan-500/15", "bg-cyan-500/20",
  "shadow-gray-400/30", "shadow-blue-500/50", "shadow-purple-500/50", "shadow-cyan-500/50",
  "text-gray-400/70", "text-blue-400/70", "text-purple-400/70", "text-cyan-400/70",
  "border-blue-500/10", "border-blue-500/15", "border-blue-500/20", "border-blue-500/25", "border-blue-500/30",
  "border-purple-500/15", "border-purple-500/20", "border-purple-500/25", "border-cyan-500/15", "border-cyan-500/20",
  "text-blue-300/40", "text-blue-300/50", "text-purple-300/50", "text-cyan-300/50",
  // Text sizes
  "text-3xl", "text-xs", "text-sm", "text-xl", "text-4xl", "text-lg", "text-base",
  // Colors
  "text-gray-400", "text-blue-400", "text-purple-400", "text-cyan-400", "text-green-400", "text-white",
  "bg-gray-400", "bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-green-500", "bg-green-400",
  // Layout classes
  "font-mono", "backdrop-blur-sm", "rounded-2xl", "rounded-xl", "rounded-lg", "rounded-full", "rounded-md",
  "max-w-5xl", "max-w-6xl", "max-w-7xl", "space-y-8", "space-y-3", "space-y-3", "space-y-2", "space-y-1.5",
  "gap-2", "gap-3", "gap-4", "gap-4", "gap-12", "gap-16", "gap-2.5",
  "p-3.5", "p-4", "p-4", "p-6", "p-8", "px-2", "px-2.5", "py-1", "py-1.5", "py-2",
  "w-8", "h-8", "w-9", "h-9", "w-10", "h-10", "w-14", "h-14", "w-32", "h-32",
  "w-1.5", "h-1.5", "w-2", "h-2", "w-3", "h-3", "w-4", "h-4", "w-5", "h-5",
  "w-0.5", "blur-xl", "blur-2xl", "shadow-lg", "shadow-xl", "shadow-2xl"
];

interface DataEvolutionVisualizationProps {
  isVisible: boolean;
  onComplete?: () => void;
  onPhaseChange?: (phase: number) => void;
}

export function DataEvolutionVisualization({ isVisible, onComplete, onPhaseChange }: DataEvolutionVisualizationProps) {
  const [phase, setPhase] = useState(0);
  // 0 = static HCP only
  // 1 = + digital signals card
  // 2 = + data layer hub
  // 3 = + SVG paths drawn
  // 4 = + digital signals squishes (compact mode)
  // 5 = + particles flowing
  // 6 = + multi-channel cards appear
  // 7 = + HCP transformation + PA Denial
  // 8 = + ORFO AI chat bubble appears

  // Refs to track card positions
  const leftCardRef = React.useRef<HTMLDivElement>(null);
  const centerCardRef = React.useRef<HTMLDivElement>(null);
  const rightCardRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Refs to track actual card elements (with borders and content)
  const digitalCardRef = React.useRef<HTMLDivElement>(null);
  const dataLayerCardRef = React.useRef<HTMLDivElement>(null);
  const hcpCardRef = React.useRef<HTMLDivElement>(null);
  const marketAccessCardRef = React.useRef<HTMLDivElement>(null);
  const commercialCardRef = React.useRef<HTMLDivElement>(null);

  console.log("🟣 DataEvolutionVisualization: Rendering with phase =", phase, "isVisible =", isVisible);

  useEffect(() => {
    if (isVisible) {
      console.log("🟣 DataEvolutionVisualization: Setting phase to 0");
      setPhase(0);
      onPhaseChange?.(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]); // Only depend on isVisible, not onPhaseChange

  const handleClick = () => {
    console.log("🟣 DataEvolutionVisualization: Click detected, current phase =", phase);
    try {
      if (phase < 8) {
        const nextPhase = phase + 1;
        console.log("🟣 DataEvolutionVisualization: Advancing to phase", nextPhase);
        setPhase(nextPhase);
        onPhaseChange?.(nextPhase);
      } else if (onComplete) {
        console.log("🟣 DataEvolutionVisualization: Calling onComplete");
        onComplete();
      }
    } catch (error) {
      console.error("🔴 DataEvolutionVisualization: Error in handleClick:", error);
    }
  };

  if (!isVisible) return null;

  try {

  return (
    <div 
      className="fixed inset-0 bg-[#030213] z-[9999] flex items-center justify-center p-8 overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#030213',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <div className="w-full max-w-7xl space-y-16" style={{ width: '100%', maxWidth: '1400px' }}>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <h2 className="text-white text-3xl" style={{ color: '#ffffff', fontSize: '1.875rem', margin: 0 }}>
            L'Oréal Dermatological Beauty Data Intelligence
          </h2>
          <p className="text-white/50 text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.125rem', margin: 0 }}>
            {phase === 0 && "Static Physician Record"}
            {phase === 1 && "Digital Signals Captured"}
            {phase === 2 && "Foundational Data Layer"}
            {phase === 3 && "Connecting Streams"}
            {phase === 4 && "Data Unification"}
            {phase === 5 && "Data Activation"}
            {phase === 6 && "Multi-Channel Data"}
            {phase === 7 && "Multi-Channel Orchestration"}
            {phase === 8 && "Agentic Orchestration Activated"}
          </p>
        </motion.div>

        {/* Main Visualization Area */}
        <div
          ref={containerRef}
          className="relative h-[420px] flex items-center justify-center"
          style={{
            position: 'relative',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >

          {/* Fixed 3-Column Layout */}
          <div
            className="w-full flex items-center justify-center gap-12 px-8 relative"
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '48px',
              padding: '0 32px',
              position: 'relative',
              zIndex: 10,
              alignItems: 'center',
              justifyItems: 'center'
            }}
          >

            {/* LEFT: Data Sources */}
            <div ref={leftCardRef} className="flex-shrink-0 relative z-20" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {phase >= 6 ? (
                // Phase 3: Multi-channel - 3 stacked cards
                <div className="flex flex-col gap-4">
                  {/* Email Campaigns - Top */}
                  <AnimatePresence>
                    {phase >= 6 && (
                      <motion.div
                        initial={{ opacity: 0, y: -40, x: -60 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -40, x: -60 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                      >
                        <EmailCampaignsCard phase={phase} cardRef={marketAccessCardRef} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Digital Signals - Middle (already exists) */}
                  <AnimatePresence>
                    {phase >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <DataSourceCard phase={phase} isCompact={phase >= 4} cardRef={digitalCardRef} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Event Attendance - Bottom */}
                  <AnimatePresence>
                    {phase >= 6 && (
                      <motion.div
                        initial={{ opacity: 0, y: 40, x: -60 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 40, x: -60 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      >
                        <EventAttendanceCard phase={phase} cardRef={commercialCardRef} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Phase 1-2: Single card centered
                <AnimatePresence>
                  {phase >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <DataSourceCard phase={phase} isCompact={false} cardRef={digitalCardRef} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* CENTER: Data Layer Hub (Phase 2) */}
            <div ref={centerCardRef} className="flex-shrink-0 flex items-center justify-center relative z-20" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence>
                {phase >= 2 && (
                  <DataLayerHub phase={phase} cardRef={dataLayerCardRef} />
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: HCP Record - Always rendered with fade-in */}
            <motion.div
              ref={rightCardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0 relative z-20"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <HCPRecordCard phase={phase} cardRef={hcpCardRef} />
            </motion.div>

          </div>

          {/* Connecting Streams Orbs - Phase 3, 4, 5, 6, 7, and 8 */}
          {(phase === 3 || phase === 4 || phase === 5 || phase === 6 || phase === 7 || phase === 8) && (
            <ConnectingOrbs 
              leftRef={digitalCardRef}
              centerRef={dataLayerCardRef}
              rightRef={hcpCardRef}
              marketAccessRef={marketAccessCardRef}
              commercialRef={commercialCardRef}
              containerRef={containerRef}
              phase={phase}
            />
          )}
        </div>

        {/* ImmunAI Chat Bubble - appears after Multi-Channel Orchestration click */}
        <AnimatePresence>
          {phase >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              className="flex justify-center"
              style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
            >
              {/* Chat bubble container */}
              <div className="relative" style={{ position: 'relative' }}>
                {/* Subtle purple aura behind ImmunAI logo - matching DemoVisualization */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -left-3 w-14 h-14 rounded-full blur-2xl"
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '-12px',
                    width: '56px',
                    height: '56px',
                    background: 'radial-gradient(circle, rgba(77, 65, 114, 0.5), rgba(77, 65, 114, 0.2))',
                    borderRadius: '50%',
                    filter: 'blur(32px)'
                  }}
                />

                <div className="flex items-start gap-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  {/* ImmunAI Avatar - darker purple matching DemoVisualization */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      position: 'relative',
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#4D4172',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 25px -5px rgba(77, 65, 114, 0.4)',
                      padding: '10px'
                    }}
                  >
                    <img
                      src={immunexisIcon}
                      alt="ImmunAI"
                      className="w-full h-full object-contain"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </motion.div>

                  {/* Chat bubble */}
                  <div 
                    className="relative bg-gradient-to-br from-yellow-500/30 to-orange-500/25 border border-yellow-400/40 rounded-2xl rounded-tl-lg p-4 backdrop-blur-md shadow-xl max-w-sm"
                    style={{
                      position: 'relative',
                      background: 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.25))',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                      borderRadius: '18px',
                      borderTopLeftRadius: '6px', // Subtle chat bubble corner
                      padding: '16px 18px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 20px 40px -12px rgba(251, 191, 36, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                      maxWidth: '384px'
                    }}
                  >

                    <motion.p 
                      className="text-yellow-100 text-lg font-medium"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        color: '#fef3c7',
                        fontSize: '18px',
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: '1.4'
                      }}
                    >
                      How does LDB take advantage of these signals?
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  );
  } catch (error) {
    console.error("🔴 DataEvolutionVisualization: Render error:", error);
    return (
      <div className="fixed inset-0 bg-red-900 z-[9999] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">DataEvolutionVisualization Error</h2>
          <p>Check console for details</p>
          <button 
            onClick={onComplete} 
            className="mt-4 px-4 py-2 bg-white text-red-900 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

// Email Campaigns Card Component - matches HCP card styling approach
function EmailCampaignsCard({ phase, cardRef }: { phase: number; cardRef?: React.RefObject<HTMLDivElement> }) {
  const isActive = phase >= 3;

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════
          LAYER 1: ANIMATED GLOW (behind)
          ═══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? {
          opacity: [0, 0.25, 0.3, 0.25, 0],
        } : { opacity: 0 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          times: [0, 0.05, 0.15, 0.22, 0.28],
          ease: "easeInOut",
        }}
        className="absolute -inset-2 bg-purple-500 rounded-xl blur-xl"
      />

      {/* ═══════════════════════════════════════════
          LAYER 2: SOLID BACKGROUND (prevents transparency)
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-[#030213] rounded-xl" />

      {/* ═══════════════════════════════════════════
          LAYER 3: CARD CONTENT (on top)
          ═══════════════════════════════════════════ */}
      {/* Card - EXACT same structure as HCP */}
      <motion.div 
        ref={cardRef}
        animate={{
          borderColor: isActive ? "rgba(168, 85, 247, 0.3)" : "rgba(75, 85, 99, 0.3)",
        }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-xl p-4 shadow-xl border ${
          isActive 
            ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" 
            : "bg-gradient-to-br from-gray-800/80 to-gray-900/80"
        } backdrop-blur-sm`}
        style={{
          position: 'relative',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.3)' : 'rgba(75, 85, 99, 0.3)'}`,
          background: isActive 
            ? 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))'
            : 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8))',
          backdropFilter: 'blur(4px)',
          width: '256px'
        }}
      >
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header */}
          <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div 
              className={`w-12 h-12 ${
                isActive ? "bg-purple-500/20" : "bg-gray-700/50"
              } rounded-full flex items-center justify-center ring-1 ${
                isActive ? "ring-purple-400/40" : "ring-gray-600/50"
              } transition-all duration-500`}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.4)' : 'rgba(75, 85, 99, 0.5)'}`,
                transition: 'all 0.5s ease'
              }}
            >
              <Building2 
                className="w-6 h-6 text-gray-300" 
                style={{ width: '24px', height: '24px', color: '#d1d5db' }}
              />
            </div>
            <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
              <h3 
                className={`font-medium text-base ${
                  isActive ? "text-white" : "text-gray-400"
                } transition-colors duration-500`}
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                KOL
              </h3>
              <p 
                className={`text-sm ${
                  isActive ? "text-gray-300" : "text-gray-500"
                } transition-colors duration-500`}
                style={{
                  fontSize: '14px',
                  color: isActive ? '#d1d5db' : '#6b7280',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                External Sources
              </p>
            </div>
          </div>

          {/* Divider */}
          <div 
            className={`h-px ${
              isActive ? "bg-purple-500/20" : "bg-gray-700/50"
            } transition-colors duration-500`}
            style={{
              height: '1px',
              backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'rgba(55, 65, 81, 0.5)',
              transition: 'background-color 0.5s ease'
            }}
          />

          {/* Info rows */}
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <InfoRow 
              icon={<FolderHeart className="w-3.5 h-3.5" />}
              label="Source (clinical.gov)"
              value="2 days ago"
              isLive={isActive}
            />
            <InfoRow 
              icon={<ShieldX className="w-3.5 h-3.5" />}
              label="Event Mgmt"
              value="8 min ago"
              isLive={isActive}
            />
          </div>

          {/* Last Updated */}
          <motion.div 
            className={`pt-2 border-t ${
              isActive ? "border-purple-500/20" : "border-gray-700/50"
            } transition-colors duration-500`}
            style={{
              paddingTop: '8px',
              borderTop: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.2)' : 'rgba(55, 65, 81, 0.5)'}`,
              transition: 'border-color 0.5s ease'
            }}
          >
            <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#4ade80',
                    borderRadius: '50%'
                  }}
                />
                <span 
                  className={`text-xs ${
                    isActive ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-500`}
                  style={{
                    fontSize: '12px',
                    color: isActive ? '#9ca3af' : '#4b5563',
                    transition: 'color 0.5s ease'
                  }}
                >
                  Status
                </span>
              </div>
              <span 
                className={`text-xs font-medium ${
                  isActive ? "text-green-400" : "text-gray-500"
                } transition-colors duration-500`}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: isActive ? '#4ade80' : '#6b7280',
                  transition: 'color 0.5s ease'
                }}
              >
                Active
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Email Activity Indicator - matches HCP InfoRow structure
function EmailActivityIndicator({ 
  icon, 
  label, 
  value, 
  delay
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-2.5"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
    >
      <div 
        className="mt-0.5 text-purple-300"
        style={{
          marginTop: '2px',
          color: '#d8b4fe'
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          style: {
            width: '14px',
            height: '14px',
            color: '#d8b4fe'
          }
        })}
      </div>
      <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
        <p 
          className="text-purple-200 text-xs"
          style={{
            fontSize: '12px',
            color: '#e9d5ff',
            margin: 0
          }}
        >
          {label}
        </p>
        <p 
          className="text-white text-sm"
          style={{
            fontSize: '14px',
            color: '#ffffff',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// Event Attendance Card Component - matches HCP card styling approach
function EventAttendanceCard({ phase, cardRef }: { phase: number; cardRef?: React.RefObject<HTMLDivElement> }) {
  const isActive = phase >= 3;

  return (
    <motion.div 
      className="relative"
      style={{ position: 'relative', width: '100%', maxWidth: '256px' }}
    >
      {/* Glow effects - EXACT same as HCP */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Subtle ambient glow (always present when active) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -inset-4 bg-cyan-500 rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-16px',
                left: '-16px',
                right: '-16px',
                bottom: '-16px',
                backgroundColor: '#06b6d4',
                borderRadius: '16px',
                filter: 'blur(32px)',
                opacity: 0.08
              }}
            />
            
            {/* Active sending glow (when sending particles) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0, 0.25, 0.35, 0.3, 0.25, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                times: [0, 0.15, 0.2, 0.3, 0.35, 0.4, 0.45],
                ease: "easeInOut",
              }}
              className="absolute -inset-5 bg-cyan-500 rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                backgroundColor: '#06b6d4',
                borderRadius: '16px',
                filter: 'blur(32px)'
              }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Card - EXACT same structure as HCP */}
      <motion.div 
        ref={cardRef}
        animate={{
          borderColor: isActive ? "rgba(6, 182, 212, 0.3)" : "rgba(75, 85, 99, 0.3)",
        }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-xl p-4 shadow-xl border ${
          isActive 
            ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" 
            : "bg-gradient-to-br from-gray-800/80 to-gray-900/80"
        } backdrop-blur-sm`}
        style={{
          position: 'relative',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: `1px solid ${isActive ? 'rgba(6, 182, 212, 0.3)' : 'rgba(75, 85, 99, 0.3)'}`,
          background: isActive 
            ? 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))'
            : 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8))',
          backdropFilter: 'blur(4px)',
          width: '256px'
        }}
      >
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header */}
          <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div 
              className={`w-12 h-12 ${
                isActive ? "bg-cyan-500/20" : "bg-gray-700/50"
              } rounded-full flex items-center justify-center ring-1 ${
                isActive ? "ring-cyan-400/40" : "ring-gray-600/50"
              } transition-all duration-500`}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${isActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(75, 85, 99, 0.5)'}`,
                transition: 'all 0.5s ease'
              }}
            >
              <Tablets 
                className="w-6 h-6 text-gray-300" 
                style={{ width: '24px', height: '24px', color: '#d1d5db' }}
              />
            </div>
            <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
              <h3 
                className={`font-medium text-base ${
                  isActive ? "text-white" : "text-gray-400"
                } transition-colors duration-500`}
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                Commercial
              </h3>
              <p 
                className={`text-sm ${
                  isActive ? "text-gray-300" : "text-gray-500"
                } transition-colors duration-500`}
                style={{
                  fontSize: '14px',
                  color: isActive ? '#d1d5db' : '#6b7280',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                Field Data
              </p>
            </div>
          </div>

          {/* Divider */}
          <div 
            className={`h-px ${
              isActive ? "bg-cyan-500/20" : "bg-gray-700/50"
            } transition-colors duration-500`}
            style={{
              height: '1px',
              backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(55, 65, 81, 0.5)',
              transition: 'background-color 0.5s ease'
            }}
          />

          {/* Info rows */}
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <InfoRow 
              icon={<Presentation className="w-3.5 h-3.5" />}
              label="In-Person Visit"
              value="3 days ago"
              isLive={isActive}
            />
            <InfoRow 
              icon={<FileStack className="w-3.5 h-3.5" />}
              label="Claims Ingested"
              value="1 day ago"
              isLive={isActive}
            />
          </div>

          {/* Last Updated */}
          <motion.div 
            className={`pt-2 border-t ${
              isActive ? "border-cyan-500/20" : "border-gray-700/50"
            } transition-colors duration-500`}
            style={{
              paddingTop: '8px',
              borderTop: `1px solid ${isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(55, 65, 81, 0.5)'}`,
              transition: 'border-color 0.5s ease'
            }}
          >
            <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#4ade80',
                    borderRadius: '50%'
                  }}
                />
                <span 
                  className={`text-xs ${
                    isActive ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-500`}
                  style={{
                    fontSize: '12px',
                    color: isActive ? '#9ca3af' : '#4b5563',
                    transition: 'color 0.5s ease'
                  }}
                >
                  Status
                </span>
              </div>
              <span 
                className={`text-xs font-medium ${
                  isActive ? "text-green-400" : "text-gray-500"
                } transition-colors duration-500`}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: isActive ? '#4ade80' : '#6b7280',
                  transition: 'color 0.5s ease'
                }}
              >
                Synced
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Event Activity Indicator - matches HCP InfoRow structure
function EventActivityIndicator({ 
  icon, 
  label, 
  value, 
  delay
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-2.5"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
    >
      <div 
        className="mt-0.5 text-cyan-300"
        style={{
          marginTop: '2px',
          color: '#67e8f9'
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          style: {
            width: '14px',
            height: '14px',
            color: '#67e8f9'
          }
        })}
      </div>
      <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
        <p 
          className="text-cyan-200 text-xs"
          style={{
            fontSize: '12px',
            color: '#a5f3fc',
            margin: 0
          }}
        >
          {label}
        </p>
        <p 
          className="text-white text-sm"
          style={{
            fontSize: '14px',
            color: '#ffffff',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// Data Source Card Component - matches HCP card styling approach
function DataSourceCard({ phase, isCompact, cardRef }: { phase: number; isCompact: boolean; cardRef?: React.RefObject<HTMLDivElement> }) {
  const isActive = phase >= 1;

  return (
    <motion.div 
      className="relative"
      style={{ position: 'relative', width: '100%', maxWidth: '256px' }}
    >
      {/* Glow effects - Digital pulsates in Phase 1 and first in Phase 3 */}
      <AnimatePresence>
        {isActive && (phase === 1 || phase === 3) && (
          <>
            {/* Subtle ambient glow (always present when active) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -inset-4 bg-blue-500 rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-16px',
                left: '-16px',
                right: '-16px',
                bottom: '-16px',
                backgroundColor: '#3B82F6',
                borderRadius: '16px',
                filter: 'blur(32px)',
                opacity: 0.08
              }}
            />
            
            {/* Slow pulsing glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 3 ? [0, 0.3, 0, 0, 0, 0, 0, 0] : [0, 0.3, 0.1, 0.3, 0.1],
              }}
              transition={{
                duration: phase === 3 ? 8 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-5 bg-blue-500 rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                backgroundColor: '#3B82F6',
                borderRadius: '16px',
                filter: 'blur(32px)'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Card - more subtle like HCP card */}
      <motion.div 
        ref={cardRef}
        animate={{
          borderColor: "rgba(59, 130, 246, 0.3)",
          padding: isCompact ? '8px 12px' : '24px'
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative rounded-xl shadow-xl border backdrop-blur-sm"
        style={{
          position: 'relative',
          borderRadius: '16px',
          padding: isCompact ? '8px 12px' : '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          background: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.9), rgba(30, 64, 175, 0.9))',
          backdropFilter: 'blur(4px)',
          width: '100%'
        }}
      >
        <AnimatePresence mode="wait">
          {isCompact ? (
            // Compact mode - horizontal layout: icon left, title/subtitle center, active badge right
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-between w-full"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              {/* Icon - Left */}
              <div 
                className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center ring-1 ring-blue-400/40 flex-shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(96, 165, 250, 0.4)',
                  flexShrink: 0
                }}
              >
                <Laptop 
                  className="w-5 h-5 text-white"
                  style={{ width: '20px', height: '20px', color: '#ffffff' }}
                />
              </div>
              
              {/* Title & Subtitle - Center */}
              <div className="flex-1 min-w-0 px-2" style={{ flex: 1, minWidth: 0, padding: '0 8px' }}>
                <h3 
                  className="text-white font-medium text-xs truncate"
                  style={{ 
                    color: '#ffffff', 
                    fontWeight: 500, 
                    fontSize: '12px',
                    margin: 0,
                    lineHeight: '1.2',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Digital Engagement
                </h3>
                <p 
                  className="text-blue-200 text-xs truncate"
                  style={{ 
                    color: '#bfdbfe', 
                    fontSize: '10px',
                    margin: 0,
                    lineHeight: '1.2',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Live Activity
                </p>
              </div>

              {/* Active Badge - Right */}
              <div className="flex items-center gap-1 flex-shrink-0" style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#4ade80',
                    borderRadius: '50%'
                  }}
                />
                <span 
                  className="text-blue-200 text-xs font-medium"
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#bfdbfe'
                  }}
                >
                  Active
                </span>
              </div>
            </motion.div>
          ) : (
            // Full mode - complete card
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3" 
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {/* Header - matches HCP card header structure */}
              <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div 
                  className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center ring-1 ring-blue-400/40"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(96, 165, 250, 0.4)'
                  }}
                >
                  <Laptop 
                    className="w-6 h-6 text-white"
                    style={{ width: '24px', height: '24px', color: '#ffffff' }}
                  />
                </div>
                <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
                  <h3 
                    className="text-white font-medium text-base"
                    style={{ 
                      color: '#ffffff', 
                      fontWeight: 500, 
                      fontSize: '16px',
                      margin: 0
                    }}
                  >
                    Digital Engagement
                  </h3>
                  <p 
                    className="text-blue-200 text-sm"
                    style={{ 
                      color: '#bfdbfe', 
                      fontSize: '14px',
                      margin: 0
                    }}
                  >
                    Web Activity
                  </p>
                </div>
              </div>

              {/* Divider - matches HCP card */}
              <div 
                className="h-px bg-blue-400/30"
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(96, 165, 250, 0.3)'
                }}
              />

              {/* Activity Indicators - matches HCP info rows structure */}
              <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <ActivityIndicator 
                  icon={<MessageCircle className="w-3.5 h-3.5" />}
                  label="AI Chat Session"
                  value="2 min ago"
                  delay={0.2}
                  compact={false}
                />
                <ActivityIndicator 
                  icon={<CalendarClock className="w-3.5 h-3.5" />}
                  label="HIP Integration"
                  value="1 min ago"
                  delay={0.3}
                  compact={false}
                />
                <ActivityIndicator 
                  icon={<LayoutTemplate className="w-3.5 h-3.5" />}
                  label="Website Visit"
                  value="12 min ago"
                  delay={0.4}
                  compact={false}
                />
              </div>

              {/* Live pulse indicator - matches HCP last updated section */}
              <motion.div 
                className="pt-2 border-t border-blue-400/30"
                style={{
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(96, 165, 250, 0.3)'
                }}
              >
                <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-green-400 rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#4ade80',
                        borderRadius: '50%'
                      }}
                    />
                    <span 
                      className="text-blue-200 text-xs"
                      style={{
                        fontSize: '12px',
                        color: '#bfdbfe'
                      }}
                    >
                      Status
                    </span>
                  </div>
              <span 
                className="text-blue-200 text-xs font-medium"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#bfdbfe'
                }}
              >
                {phase >= 3 ? "Streaming" : "Tracking"}
              </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Activity Indicator - follows specification format
function ActivityIndicator({ 
  icon, 
  label, 
  value, 
  delay,
  compact = false
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  delay: number;
  compact?: boolean;
}) {
  try {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.3 }}
        className={`flex items-center gap-2 bg-blue-500/8 rounded-md border border-blue-500/10 ${
          compact ? 'px-2 py-1.5' : 'px-2.5 py-2'
        }`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          borderRadius: '6px',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          padding: compact ? '6px 8px' : '8px 10px'
        }}
      >
        <div className="text-blue-400" style={{ color: '#60a5fa' }}>
          {React.cloneElement(icon as React.ReactElement, {
            style: { width: '12px', height: '12px', color: '#60a5fa' }
          })}
        </div>
        <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
          <p className="text-white text-xs" style={{ color: '#ffffff', fontSize: '12px', margin: 0 }}>
            {label}
          </p>
          <p className="text-blue-300/40 text-xs" style={{ color: 'rgba(147, 197, 253, 0.4)', fontSize: '12px', margin: 0 }}>
            {value}
          </p>
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error("🔴 ActivityIndicator error:", error);
    return <div>Activity Error</div>;
  }
}

// Data Layer Hub - elegant card matching other cards
function DataLayerHub({ phase, cardRef }: { phase: number; cardRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
      style={{ position: 'relative', width: '100%', maxWidth: '200px' }}
    >
      {/* Purple glow effects - Data Layer pulsates in Phase 2 and second in Phase 3 */}
      <AnimatePresence>
        {(phase === 2 || phase === 3) && (
          <>
            {/* Subtle ambient glow (always present when processing) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -inset-4 bg-[#7B2DFF] rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-16px',
                left: '-16px',
                right: '-16px',
                bottom: '-16px',
                backgroundColor: '#7B2DFF',
                borderRadius: '16px',
                filter: 'blur(32px)',
                opacity: 0.08
              }}
            />
            
            {/* Slow pulsing glow - offset from Digital */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 3 ? [0, 0, 0, 0, 0.3, 0, 0, 0] : [0, 0.3, 0.1, 0.3, 0.1],
              }}
              transition={{
                duration: phase === 3 ? 8 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-5 bg-[#7B2DFF] rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                backgroundColor: '#7B2DFF',
                borderRadius: '16px',
                filter: 'blur(32px)'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Card - matches other cards' subtle approach */}
      <motion.div 
        ref={cardRef}
        animate={{
          borderColor: "rgba(123, 45, 255, 0.3)",
        }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl p-6 shadow-xl border backdrop-blur-sm"
        style={{
          position: 'relative',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(123, 45, 255, 0.3)',
          background: 'linear-gradient(to bottom right, rgba(123, 45, 255, 0.9), rgba(159, 90, 255, 0.9))',
          backdropFilter: 'blur(4px)',
          width: '200px'
        }}
      >
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header - matches other cards */}
          <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div 
              className="w-10 h-10 bg-[#7B2DFF]/20 rounded-lg flex items-center justify-center ring-1 ring-purple-400/40"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(123, 45, 255, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(196, 181, 253, 0.4)'
              }}
            >
              {phase >= 4 ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <RefreshCw 
                    className="w-5 h-5 text-white"
                    style={{ width: '20px', height: '20px', color: '#ffffff' }}
                  />
                </motion.div>
              ) : (
                <Database 
                  className="w-5 h-5 text-white"
                  style={{ width: '20px', height: '20px', color: '#ffffff' }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
              <h3 
                className="text-white font-medium text-base"
                style={{ 
                  color: '#ffffff', 
                  fontWeight: 500, 
                  fontSize: '16px',
                  margin: 0
                }}
              >
                Data Layer
              </h3>
              <p 
                className="text-purple-200 text-sm"
                style={{ 
                  color: '#e9d5ff', 
                  fontSize: '14px',
                  margin: 0
                }}
              >
                Unification
              </p>
            </div>
          </div>

          {/* Divider - matches other cards */}
          <div 
            className="h-px bg-purple-400/30"
            style={{
              height: '1px',
              backgroundColor: 'rgba(196, 181, 253, 0.3)'
            }}
          />

          {/* Processing indicators - matches other cards' info rows */}
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <DataProcessingIndicator 
              icon={<Workflow className="w-3.5 h-3.5" />}
              label="Real-Time Streaming"
              value="Active"
              delay={0.2}
            />
            <DataProcessingIndicator 
              icon={<Activity className="w-3.5 h-3.5" />}
              label="Data Activation"
              value="Processing"
              delay={0.4}
            />
          </div>

          {/* Status indicator - matches other cards */}
          <motion.div 
            className="pt-2 border-t border-purple-400/30"
            style={{
              paddingTop: '8px',
              borderTop: '1px solid rgba(196, 181, 253, 0.3)'
            }}
          >
            <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Enhanced processing indicator bars */}
                <div className="flex items-center gap-1" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [4, 10, 4],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                      className="w-1 bg-white rounded-full shadow-sm"
                      style={{
                        width: '4px',
                        backgroundColor: '#ffffff',
                        borderRadius: '2px',
                        height: '4px',
                        boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)'
                      }}
                    />
                  ))}
                </div>
                <span 
                  className="text-purple-200 text-xs"
                  style={{
                    fontSize: '12px',
                    color: '#e9d5ff'
                  }}
                >
                  Status
                </span>
              </div>
              <span 
                className="text-purple-200 text-xs font-medium"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#e9d5ff'
                }}
              >
                {phase >= 5 ? "Activating" : phase >= 4 ? "Unifying" : phase >= 3 ? "Processing" : "Ready"}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Data Processing Indicator - matches other cards' activity indicators
function DataProcessingIndicator({ 
  icon, 
  label, 
  value, 
  delay
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-2.5"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
    >
      <div 
        className="mt-0.5 text-purple-300"
        style={{
          marginTop: '2px',
          color: '#d8b4fe'
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          style: {
            width: '14px',
            height: '14px',
            color: '#d8b4fe'
          }
        })}
      </div>
      <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
        <p 
          className="text-purple-200 text-xs"
          style={{
            fontSize: '12px',
            color: '#e9d5ff',
            margin: 0
          }}
        >
          {label}
        </p>
        <motion.p 
          className="text-white text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            fontSize: '14px',
            color: '#ffffff',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}

// HCP Record Card with Glow - glows when particles arrive
function HCPRecordCard({ phase, cardRef }: { phase: number; cardRef?: React.RefObject<HTMLDivElement> }) {
  const [isLive, setIsLive] = React.useState(false);
  
  // Delay HCP transformation to let orbs start first
  React.useEffect(() => {
    if (phase >= 5) {
      const timer = setTimeout(() => {
        setIsLive(true);
      }, 1000); // 1 second delay after orbs start
      
      return () => clearTimeout(timer);
    } else {
      setIsLive(false);
    }
  }, [phase]);
  console.log("🟣 HCPRecordCard: Rendering with phase =", phase, "isLive =", isLive);

  return (
    <motion.div 
      className="relative"
      style={{ position: 'relative', width: '100%', maxWidth: '320px' }}
    >
      {/* Glow effects */}
      <AnimatePresence>
        {isLive && (
          <>
            {/* Subtle ambient glow (always present in phase 2) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -inset-4 bg-[#7B2DFF] rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-16px',
                left: '-16px',
                right: '-16px',
                bottom: '-16px',
                backgroundColor: '#7B2DFF',
                borderRadius: '16px',
                filter: 'blur(32px)',
                opacity: 0.08
              }}
            />
            
            {/* Active enrichment glow (when particles arrive) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0, 0, 0, 0, 0.25, 0.35, 0.3, 0.2, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                times: [0, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.65, 0.75, 1],
                ease: "easeInOut",
              }}
              className="absolute -inset-5 bg-[#7B2DFF] rounded-2xl blur-2xl"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                backgroundColor: '#7B2DFF',
                borderRadius: '16px',
                filter: 'blur(32px)'
              }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Card */}
      <motion.div 
        ref={cardRef}
        animate={{
          borderColor: isLive ? "rgba(123, 45, 255, 0.3)" : "rgba(75, 85, 99, 0.3)",
        }}
        transition={{ duration: 0.6 }}
        layout // Enable smooth height transitions
        className={`relative rounded-xl p-4 shadow-xl border ${
          isLive 
            ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" 
            : "bg-gradient-to-br from-gray-800/80 to-gray-900/80"
        } backdrop-blur-sm`}
        style={{
          position: 'relative',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: `1px solid ${isLive ? 'rgba(123, 45, 255, 0.3)' : 'rgba(75, 85, 99, 0.3)'}`,
          background: isLive 
            ? 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))'
            : 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8))',
          backdropFilter: 'blur(4px)',
          width: '320px'
        }}
      >
        {/* Live badge */}
        <AnimatePresence>
          {isLive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 2.5 }}
              className="absolute -top-2 -right-2 bg-[#7B2DFF] text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-lg border border-[#7B2DFF]/50"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#7B2DFF',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(123, 45, 255, 0.5)'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-green-400 rounded-full"
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#4ade80',
                  borderRadius: '50%'
                }}
              />
              LIVE
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Header */}
          <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div 
              className={`w-12 h-12 ${
                isLive ? "bg-[#7B2DFF]/20" : "bg-gray-700/50"
              } rounded-full flex items-center justify-center ring-1 ${
                isLive ? "ring-[#7B2DFF]/40" : "ring-gray-600/50"
              } transition-all duration-500`}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: isLive ? 'rgba(123, 45, 255, 0.2)' : 'rgba(55, 65, 81, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${isLive ? 'rgba(123, 45, 255, 0.4)' : 'rgba(75, 85, 99, 0.5)'}`,
                transition: 'all 0.5s ease'
              }}
            >
              <UserRound 
                className="w-6 h-6 text-gray-300" 
                style={{ width: '24px', height: '24px', color: '#d1d5db' }}
              />
            </div>
            <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
              <h3 
                className={`font-medium text-base ${
                  isLive ? "text-white" : "text-gray-400"
                } transition-colors duration-500`}
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  color: isLive ? '#ffffff' : '#9ca3af',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                Dr. Aaron Morita
              </h3>
              <p 
                className={`text-sm ${
                  isLive ? "text-gray-300" : "text-gray-500"
                } transition-colors duration-500`}
                style={{
                  fontSize: '14px',
                  color: isLive ? '#d1d5db' : '#6b7280',
                  transition: 'color 0.5s ease',
                  margin: 0
                }}
              >
                Dermatologist Specialist
              </p>
            </div>
          </div>

          {/* Divider */}
          <div 
            className={`h-px ${
              isLive ? "bg-[#7B2DFF]/20" : "bg-gray-700/50"
            } transition-colors duration-500`}
            style={{
              height: '1px',
              backgroundColor: isLive ? 'rgba(123, 45, 255, 0.2)' : 'rgba(55, 65, 81, 0.5)',
              transition: 'background-color 0.5s ease'
            }}
          />

          {/* Info rows */}
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <InfoRow 
              icon={<Mail className="w-3.5 h-3.5" />}
              label="Email"
              value="aaron.morita1@gmail.com"
              isLive={isLive}
            />
            <InfoRow 
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Location"
              value="Paris, 75008"
              isLive={isLive}
            />
            <InfoRow 
              icon={<Microscope className="w-3.5 h-3.5" />}
              label="Publications"
              value="15+ Peer-Reviewed"
              isLive={isLive}
            />
            
            {/* Abandoned Safety Chat - appears when particles start flowing (Phase 5+) */}
            <AnimatePresence>
              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 3.5,
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                >
                  <InfoRow 
                    icon={<MessageCircle className="w-3.5 h-3.5" />}
                    label="Dermo Chat"
                    value="Chat Abandoned On Mela B3"
                    isLive={phase >= 5}
                    highlight={true}
                    isNew={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interest Identified - appears first in Multi-Channel Orchestration (Phase 7+) */}
            <AnimatePresence>
              {phase >= 7 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 4.0,
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                >
                  <InfoRow 
                    icon={<Presentation className="w-3.5 h-3.5" />}
                    label="Visit Interest Identified"
                    value="Time Spent on Coverage"
                    isLive={isLive}
                    highlight={true}
                    isNew={true}
                    customColor="yellow"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* PA Denial - appears after Interest Identified (Phase 7+) */}
            <AnimatePresence>
              {phase >= 7 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 5.5,
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                >
                  <InfoRow 
                    icon={<ShieldX className="w-3.5 h-3.5" />}
                    label="Event Mgmt"
                    value="Speaker with 'Makana Pharma'"
                    isLive={isLive}
                    highlight={true}
                    isNew={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Last Updated */}
          <motion.div 
            className={`pt-2 border-t ${
              isLive ? "border-[#7B2DFF]/20" : "border-gray-700/50"
            } transition-colors duration-500`}
            style={{
              paddingTop: '8px',
              borderTop: `1px solid ${isLive ? 'rgba(123, 45, 255, 0.2)' : 'rgba(55, 65, 81, 0.5)'}`,
              transition: 'border-color 0.5s ease'
            }}
          >
            <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar 
                  className={`w-3.5 h-3.5 ${
                    isLive ? "text-[#7B2DFF]/70" : "text-gray-600"
                  } transition-colors duration-500`}
                  style={{
                    width: '14px',
                    height: '14px',
                    color: isLive ? 'rgba(123, 45, 255, 0.7)' : '#4b5563',
                    transition: 'color 0.5s ease'
                  }}
                />
                <span 
                  className={`text-xs ${
                    isLive ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-500`}
                  style={{
                    fontSize: '12px',
                    color: isLive ? '#9ca3af' : '#4b5563',
                    transition: 'color 0.5s ease'
                  }}
                >
                  Last Updated
                </span>
              </div>
              <motion.span 
                className={`text-xs font-medium ${
                  isLive ? "text-green-400" : "text-gray-500"
                } transition-colors duration-500`}
                animate={isLive ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={isLive ? { duration: 2.5, repeat: Infinity } : {}}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: isLive ? '#4ade80' : '#6b7280',
                  transition: 'color 0.5s ease'
                }}
              >
                {isLive ? "2 minutes ago" : "2025"}
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Info Row Component
function InfoRow({ 
  icon, 
  label, 
  value, 
  isLive,
  highlight = false,
  isNew = false,
  customColor
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  isLive: boolean;
  highlight?: boolean;
  isNew?: boolean;
  customColor?: string;
}) {
  return (
    <div 
      className="flex items-start gap-2.5"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
    >
      <div 
        className={`mt-0.5 ${
          customColor === 'yellow' && isNew && isLive
            ? "text-yellow-400/70"
            : isNew && isLive
              ? "text-red-400/70"
              : isLive 
                ? "text-[#7B2DFF]/70" 
                : "text-gray-600"
        } transition-colors duration-500`}
        style={{
          marginTop: '2px',
          color: customColor === 'yellow' && isNew && isLive
            ? 'rgba(251, 191, 36, 0.7)'
            : isNew && isLive
              ? 'rgba(248, 113, 113, 0.7)'
              : isLive 
                ? 'rgba(123, 45, 255, 0.7)' 
                : '#4b5563',
          transition: 'color 0.5s ease'
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          style: {
            width: '14px',
            height: '14px',
            color: customColor === 'yellow' && isNew && isLive
              ? 'rgba(251, 191, 36, 0.7)'
              : isNew && isLive
                ? 'rgba(248, 113, 113, 0.7)'
                : isLive 
                  ? 'rgba(123, 45, 255, 0.7)' 
                  : '#4b5563'
          }
        })}
      </div>
      <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
        <p 
          className={`text-xs ${
            isLive ? "text-gray-400" : "text-gray-600"
          } transition-colors duration-500`}
          style={{
            fontSize: '12px',
            color: isLive ? '#9ca3af' : '#4b5563',
            transition: 'color 0.5s ease',
            margin: 0
          }}
        >
          {label}
        </p>
        <motion.p 
          className={`text-sm ${
            customColor === 'yellow' && isNew && isLive
              ? "text-yellow-400 font-medium"
              : isNew && isLive
                ? "text-red-400 font-medium"
                : highlight && isLive 
                  ? "text-[#7B2DFF] font-medium" 
                  : isLive 
                    ? "text-white" 
                    : "text-gray-500"
          } transition-colors duration-500 truncate`}
          animate={
            (customColor === 'yellow' && isNew && isLive) || (isNew && isLive) 
              ? { opacity: [0.6, 1, 0.6] }
              : highlight && isLive 
                ? { opacity: [0.7, 1, 0.7] } 
                : {}
          }
          transition={
            (customColor === 'yellow' && isNew && isLive) || (isNew && isLive) || (highlight && isLive) 
              ? { duration: 2.5, repeat: Infinity } 
              : {}
          }
          style={{
            fontSize: '14px',
            fontWeight: (customColor === 'yellow' && isNew && isLive) || (isNew && isLive) || (highlight && isLive) ? 500 : 'normal',
            color: customColor === 'yellow' && isNew && isLive
              ? '#facc15'
              : isNew && isLive
                ? '#f87171'
                : highlight && isLive 
                  ? '#7B2DFF' 
                  : isLive 
                    ? '#ffffff' 
                    : '#6b7280',
            transition: 'color 0.5s ease',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </motion.p>
      </div>
    </div>
  );
}

// Connection lines component that draws between actual card DOM elements
function ConnectionLines({
  leftRef,
  centerRef,
  rightRef,
  containerRef,
  phase
}: {
  leftRef: React.RefObject<HTMLDivElement>;
  centerRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  phase: number;
}) {
  const [lines, setLines] = React.useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  React.useEffect(() => {
    const updateLines = () => {
      if (!leftRef.current || !centerRef.current || !rightRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const left = leftRef.current.getBoundingClientRect();
      const center = centerRef.current.getBoundingClientRect();
      const right = rightRef.current.getBoundingClientRect();

      // Calculate line coordinates relative to container
      const leftRight = left.right - container.left;
      const leftY = left.top + left.height / 2 - container.top;

      const centerLeft = center.left - container.left;
      const centerRight = center.right - container.left;
      const centerY = center.top + center.height / 2 - container.top;

      const rightLeft = right.left - container.left;
      const rightY = right.top + right.height / 2 - container.top;

      setLines([
        { x1: leftRight, y1: leftY, x2: centerLeft, y2: centerY },  // Left → Center
        { x2: rightLeft, y2: rightY, x1: centerRight, y1: centerY }  // Center → Right
      ]);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    // Update again after a short delay to catch any layout shifts
    const timer = setTimeout(updateLines, 100);

    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timer);
    };
  }, [leftRef, centerRef, rightRef, containerRef, phase]);

  if (lines.length === 0) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <defs>
        <linearGradient id="blueToP" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#7B2DFF" />
        </linearGradient>
        <linearGradient id="purpleG" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7B2DFF" />
          <stop offset="100%" stopColor="#9F5AFF" />
        </linearGradient>
      </defs>

      {/* Line 1: Digital → Data */}
      <line
        x1={lines[0].x1}
        y1={lines[0].y1}
        x2={lines[0].x2}
        y2={lines[0].y2}
        stroke="url(#blueToP)"
        strokeWidth="4"
        opacity="0.8"
      >
        <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="1s" fill="freeze" />
      </line>

      {/* Line 2: Data → HCP */}
      <line
        x1={lines[1].x1}
        y1={lines[1].y1}
        x2={lines[1].x2}
        y2={lines[1].y2}
        stroke="url(#purpleG)"
        strokeWidth="6"
        opacity="0.9"
      >
        <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="0.8s" fill="freeze" begin="1s" />
      </line>

      {/* Animated particles in Phase 4+ */}
      {phase >= 4 && (
        <>
          <circle r="4" fill="#3B82F6">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath xlinkHref="#path1" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="5" fill="#9F5AFF">
            <animateMotion dur="1.5s" repeatCount="indefinite">
              <mpath xlinkHref="#path2" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Hidden paths for particle motion */}
          <path id="path1" d={`M ${lines[0].x1},${lines[0].y1} L ${lines[0].x2},${lines[0].y2}`} fill="none" />
          <path id="path2" d={`M ${lines[1].x1},${lines[1].y1} L ${lines[1].x2},${lines[1].y2}`} fill="none" />
        </>
      )}
    </svg>
  );
}

// Dynamic Connection Lines - Uses actual card positions
function DynamicConnectionLines({
  leftRef,
  centerRef,
  rightRef,
  containerRef
}: {
  leftRef: React.RefObject<HTMLDivElement>;
  centerRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [paths, setPaths] = React.useState<{ d: string; width: number; gradient: string }[]>([]);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const updatePaths = () => {
      if (!leftRef.current || !centerRef.current || !rightRef.current || !containerRef.current) {
        console.log("⚠️ DynamicConnectionLines: Refs not ready");
        return;
      }

      const container = containerRef.current.getBoundingClientRect();
      const left = leftRef.current.getBoundingClientRect();
      const center = centerRef.current.getBoundingClientRect();
      const right = rightRef.current.getBoundingClientRect();

      console.log("📐 DynamicConnectionLines: Container", { width: container.width, height: container.height });
      console.log("📐 DynamicConnectionLines: Left card", { left: left.left - container.left, right: left.right - container.left, centerY: left.top + left.height / 2 - container.top });
      console.log("📐 DynamicConnectionLines: Center card", { left: center.left - container.left, right: center.right - container.left, centerY: center.top + center.height / 2 - container.top });
      console.log("📐 DynamicConnectionLines: Right card", { left: right.left - container.left, right: right.right - container.left, centerY: right.top + right.height / 2 - container.top });

      // Calculate exact centerpoints
      const x1 = left.right - container.left;
      const y1 = left.top + left.height / 2 - container.top;

      const x2 = center.left - container.left;
      const y2 = center.top + center.height / 2 - container.top;

      const x3 = center.right - container.left;
      const y3 = center.top + center.height / 2 - container.top;

      const x4 = right.left - container.left;
      const y4 = right.top + right.height / 2 - container.top;

      // Path 1: Digital (right edge center) → Data (left edge center)
      const path1 = `M ${x1},${y1} L ${x2},${y2}`;

      // Path 2: Data (right edge center) → HCP (left edge center)
      const path2 = `M ${x3},${y3} L ${x4},${y4}`;

      console.log("✨ DynamicConnectionLines: Path 1:", path1);
      console.log("✨ DynamicConnectionLines: Path 2:", path2);

      setPaths([
        { d: path1, width: 4, gradient: 'lineGradient1' },
        { d: path2, width: 6, gradient: 'lineGradient2' }
      ]);
      setIsReady(true);
    };

    // Multiple update attempts to catch layout shifts
    const timer1 = setTimeout(updatePaths, 0);
    const timer2 = setTimeout(updatePaths, 100);
    const timer3 = setTimeout(updatePaths, 300);
    const timer4 = setTimeout(updatePaths, 500);

    window.addEventListener('resize', updatePaths);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('resize', updatePaths);
    };
  }, [leftRef, centerRef, rightRef, containerRef]);

  if (!isReady || paths.length === 0) {
    console.log("⚠️ DynamicConnectionLines: Not ready to render");
    return null;
  }

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <defs>
        <linearGradient id="lineGradient1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#7B2DFF" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7B2DFF" />
          <stop offset="100%" stopColor="#9F5AFF" />
        </linearGradient>
        <filter id="dynamicParticleGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Line from Digital to Data */}
      <path
        d={paths[0].d}
        fill="none"
        stroke={`url(#${paths[0].gradient})`}
        strokeWidth={paths[0].width}
        opacity="0.8"
      />

      {/* Line from Data to HCP */}
      <path
        d={paths[1].d}
        fill="none"
        stroke={`url(#${paths[1].gradient})`}
        strokeWidth={paths[1].width}
        opacity="0.9"
      />

      {/* Animated particles on path 1 (Digital → Data) */}
      <circle r="6" fill="#3B82F6" filter="url(#dynamicParticleGlow)">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath xlinkHref="#dynamicPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
      </circle>

      <circle r="6" fill="#60A5FA" filter="url(#dynamicParticleGlow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
          <mpath xlinkHref="#dynamicPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>

      {/* Animated particles on path 2 (Data → HCP) */}
      <circle r="7" fill="#9F5AFF" filter="url(#dynamicParticleGlow)">
        <animateMotion dur="2.5s" repeatCount="indefinite">
          <mpath xlinkHref="#dynamicPath2" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
      </circle>

      <circle r="7" fill="#7B2DFF" filter="url(#dynamicParticleGlow)">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.2s">
          <mpath xlinkHref="#dynamicPath2" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
      </circle>

      {/* Hidden paths for particle motion */}
      <path id="dynamicPath1" d={paths[0].d} fill="none" />
      <path id="dynamicPath2" d={paths[1].d} fill="none" />
    </svg>
  );
}

// Elegant Flowing Pipeline with Multiple Particles - Behind cards (z-index: 1)
function FlowingPipeline({ channelCount, phase }: { channelCount: number; phase: number }) {
  console.log("🔵 FlowingPipeline: Rendering with channelCount =", channelCount, "phase =", phase);

  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      console.log("📐 SVG Element Position:", {
        x: svgRect.x,
        y: svgRect.y,
        width: svgRect.width,
        height: svgRect.height,
        top: svgRect.top,
        left: svgRect.left
      });

      // Try to find the cards
      const container = svgRef.current.parentElement;
      if (container) {
        console.log("📐 SVG Container:", container.getBoundingClientRect());

        // Look for card elements
        const allElements = document.querySelectorAll('[class*="bg-"]');
        console.log("📐 Found", allElements.length, "potential card elements");
      }
    }
  }, [channelCount, phase]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Beautiful gradient for the main flow path - Blue to Purple */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#7B2DFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9F5AFF" stopOpacity="0.4" />
        </linearGradient>

        {/* Glow filter for elegant visual effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Stronger glow for particles */}
        <filter id="particleGlow">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Radial gradient for particles */}
        <radialGradient id="particleGradient1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
        </radialGradient>

        <radialGradient id="particleGradient2">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#7B2DFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B2DFF" stopOpacity="0.3" />
        </radialGradient>

        <radialGradient id="particleGradient3">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#9F5AFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9F5AFF" stopOpacity="0.3" />
        </radialGradient>

        <radialGradient id="particleGradient4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {channelCount === 1 ? (
        // Single channel mode (Phase 3-4) - Left card → Data Layer → Profile (2 segments)
        // Adjusted for actual card edges accounting for padding and gaps
        <>
          {/* Segment 1: Digital Signals → Data Layer hub */}
          <path
            d="M 18,50 Q 34,48 50,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.6"
            strokeOpacity="0.4"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="1s"
              begin="0.5s"
              fill="freeze"
            />
          </path>

          <path
            d="M 18,50 Q 34,48 50,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.4"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-6"
              dur="4s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Segment 2: Data Layer hub → Profile - UNIFIED stream */}
          <path
            d="M 50,50 L 82,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="0.8s"
              begin="1.5s"
              fill="freeze"
            />
          </path>

          <path
            d="M 50,50 L 82,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.8"
            strokeDasharray="6 6"
            strokeOpacity="0.7"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-12"
              dur="2.5s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </>
      ) : (
        // Multi-channel mode (Phase 3) - 3 paths converge at Data Layer, then 1 unified stream to Profile
        // Adjusted for actual card edges accounting for padding and gaps
        <>
          {/* INBOUND STREAMS - All converge at Data Layer (center) */}

          {/* Top path: Email Campaigns → Data Layer */}
          <path
            d="M 18,35 Q 34,32 50,45"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.6"
            strokeOpacity="0.4"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="1s"
              begin="0.5s"
              fill="freeze"
            />
          </path>

          <path
            d="M 18,35 Q 34,32 50,45"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.4"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-6"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          {/* Middle path: Digital Signals → Data Layer */}
          <path
            d="M 18,50 Q 34,48 50,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.6"
            strokeOpacity="0.4"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="1s"
              begin="0.6s"
              fill="freeze"
            />
          </path>

          <path
            d="M 18,50 Q 34,48 50,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.4"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-6"
              dur="4s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Bottom path: Event Attendance → Data Layer */}
          <path
            d="M 18,65 Q 34,68 50,55"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.6"
            strokeOpacity="0.4"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="1s"
              begin="0.7s"
              fill="freeze"
            />
          </path>

          <path
            d="M 18,65 Q 34,68 50,55"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.4"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-6"
              dur="4s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </path>

          {/* UNIFIED OUTBOUND STREAM - Single stream from Data Layer → Profile */}
          <path
            d="M 50,50 L 82,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="0.8s"
              begin="1.7s"
              fill="freeze"
            />
          </path>

          <path
            d="M 50,50 L 82,50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="0.8"
            strokeDasharray="6 6"
            strokeOpacity="0.7"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-12"
              dur="2.5s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </>
      )}

      {/* Flowing Particles - Only in Phase 5+ */}
      {phase >= 5 && channelCount === 1 ? (
        // Single channel - Phase 4+
        <>
          {/* SEGMENT 1: Digital Signals → Data Layer */}
          <circle r="1.2" fill="url(#particleGradient1)" filter="url(#particleGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s" path="M 18,50 Q 34,48 50,50" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle r="1" fill="url(#particleGradient2)" filter="url(#particleGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M 18,50 Q 34,48 50,50" />
            <animate attributeName="opacity" values="0;0.8;1;0.8;0" keyTimes="0;0.15;0.5;0.85;1" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </circle>

          {/* SEGMENT 2: Data Layer → Profile (UNIFIED stream) - triggers HCP transformation */}
          <circle r="1.4" fill="url(#particleGradient3)" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="2s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.95;1;0.95;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle r="1.2" fill="url(#particleGradient2)" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="3s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="3s" repeatCount="indefinite" />
          </circle>

          {/* Smaller trailing particles for depth */}
          <circle r="0.8" fill="#3B82F6" opacity="0.7" filter="url(#particleGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.2s" path="M 18,50 Q 34,48 50,50" />
            <animate attributeName="opacity" values="0;0.7;0.9;0.7;0" keyTimes="0;0.15;0.5;0.85;1" dur="3s" begin="1.2s" repeatCount="indefinite" />
          </circle>
        </>
      ) : phase >= 5 && channelCount === 3 ? (
        // Multi-channel - Phase 3 (3 inbound streams, 1 unified outbound)
        <>
          {/* SEGMENT 1: Three separate inbound streams to Data Layer */}

          {/* Top: Email Campaigns → Data Layer (Purple) */}
          <circle r="1" fill="url(#particleGradient2)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1.5s" path="M 18,35 Q 34,32 50,45" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="1.5s" repeatCount="indefinite" />
          </circle>
          <circle r="1" fill="url(#particleGradient2)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="3.5s" path="M 18,35 Q 34,32 50,45" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="3.5s" repeatCount="indefinite" />
          </circle>

          {/* Middle: Digital Signals → Data Layer (Blue) */}
          <circle r="1" fill="url(#particleGradient1)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M 18,50 Q 34,48 50,50" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle r="1" fill="url(#particleGradient1)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="4s" path="M 18,50 Q 34,48 50,50" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="4s" repeatCount="indefinite" />
          </circle>

          {/* Bottom: Event Attendance → Data Layer (Cyan) */}
          <circle r="1" fill="url(#particleGradient4)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2.5s" path="M 18,65 Q 34,68 50,55" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="2.5s" repeatCount="indefinite" />
          </circle>
          <circle r="1" fill="url(#particleGradient4)" filter="url(#particleGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="4.5s" path="M 18,65 Q 34,68 50,55" />
            <animate attributeName="opacity" values="0;0.9;1;0.9;0" keyTimes="0;0.15;0.5;0.85;1" dur="4s" begin="4.5s" repeatCount="indefinite" />
          </circle>

          {/* SEGMENT 2: Single UNIFIED stream from Data Layer → Profile (Purple gradient - shows unification) */}
          <circle r="1.4" fill="url(#particleGradient3)" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="2.2s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.95;1;0.95;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="1.4" fill="url(#particleGradient2)" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="3.2s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.95;1;0.95;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="3.2s" repeatCount="indefinite" />
          </circle>
          <circle r="1.4" fill="url(#particleGradient3)" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="4.2s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.95;1;0.95;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="4.2s" repeatCount="indefinite" />
          </circle>

          {/* Smaller trailing particles for the unified stream */}
          <circle r="0.8" fill="#9F5AFF" opacity="0.8" filter="url(#particleGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="2.8s" path="M 50,50 L 82,50" />
            <animate attributeName="opacity" values="0;0.8;1;0.8;0" keyTimes="0;0.2;0.5;0.8;1" dur="2.5s" begin="2.8s" repeatCount="indefinite" />
          </circle>
        </>
      ) : null}

    </svg>
  );
}

// Connecting Orbs - Smooth orbs traveling between cards
function ConnectingOrbs({
  leftRef,
  centerRef,
  rightRef,
  marketAccessRef,
  commercialRef,
  containerRef,
  phase
}: {
  leftRef: React.RefObject<HTMLDivElement>;
  centerRef: React.RefObject<HTMLDivElement>;
  rightRef?: React.RefObject<HTMLDivElement>;
  marketAccessRef?: React.RefObject<HTMLDivElement>;
  commercialRef?: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  phase: number;
}) {
  const [path1, setPath1] = React.useState<string>(""); // Digital -> Data Layer
  const [path2, setPath2] = React.useState<string>(""); // Data Layer -> HCP
  const [path3, setPath3] = React.useState<string>(""); // Market Access -> Data Layer center
  const [path4, setPath4] = React.useState<string>(""); // Commercial -> Data Layer center
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const updatePath = () => {
      if (!leftRef.current || !centerRef.current || !containerRef.current) {
        return;
      }

      // Validation constants
      const minValidPosition = 20;
      const minCardWidth = 50;
      const minCardHeight = 50;

      const container = containerRef.current.getBoundingClientRect();
      const left = leftRef.current.getBoundingClientRect();
      const center = centerRef.current.getBoundingClientRect();

      // Calculate path 1: Digital (right edge center) to Data Layer (left edge center)
      const x1 = left.right - container.left;
      const y1 = left.top + left.height / 2 - container.top;
      const x2 = center.left - container.left;
      const y2 = center.top + center.height / 2 - container.top;

      // Basic sanity check - just ensure we have reasonable coordinates
      if (
        isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) ||
        x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0 ||
        x1 >= x2 // Digital should be left of Data Layer
      ) {
        console.log("🔴 ConnectingOrbs: Basic validation failed", { 
          x1, y1, x2, y2,
          digitalCard: { width: left.width, height: left.height },
          dataCard: { width: center.width, height: center.height },
          spacing: Math.abs(x2 - x1)
        });
        return;
      }
      
      console.log("✅ ConnectingOrbs: Path1 validation passed", { x1, y1, x2, y2, spacing: Math.abs(x2 - x1) });

      const pathString1 = `M ${x1},${y1} L ${x2},${y2}`;
      setPath1(pathString1);

      // Calculate path 2: Data Layer to HCP (Phase 5+)
      if (phase >= 5 && rightRef?.current) {
        const right = rightRef.current.getBoundingClientRect();
        
        const x3 = center.right - container.left;
        const y3 = center.top + center.height / 2 - container.top;
        const x4 = right.left - container.left;
        const y4 = right.top + right.height / 2 - container.top;

        // Validate second path coordinates
        if (
          x3 < minValidPosition || y3 < minValidPosition || 
          x4 < minValidPosition || y4 < minValidPosition || 
          x3 >= x4 || 
          right.width < minCardWidth || right.height < minCardHeight ||
          Math.abs(x4 - x3) < 100
        ) {
          console.log("🔴 ConnectingOrbs: Invalid path2 coordinates, skipping", { x3, y3, x4, y4 });
          setPath2("");
        } else {
          const pathString2 = `M ${x3},${y3} L ${x4},${y4}`;
          setPath2(pathString2);
        }
      } else {
        setPath2("");
      }

      // Calculate path 3: Market Access -> Data Layer center (Phase 7 only)
      if (phase >= 7 && marketAccessRef?.current) {
        const marketAccess = marketAccessRef.current.getBoundingClientRect();
        const centerX = center.left + center.width / 2 - container.left;
        const centerY = center.top + center.height / 2 - container.top;

        const x5 = marketAccess.right - container.left;
        const y5 = marketAccess.top + marketAccess.height / 2 - container.top;

        if (
          x5 > minValidPosition && y5 > minValidPosition &&
          centerX > minValidPosition && centerY > minValidPosition &&
          marketAccess.width > minCardWidth && marketAccess.height > minCardHeight
        ) {
          const pathString3 = `M ${x5},${y5} L ${centerX},${centerY}`;
          setPath3(pathString3);
        } else {
          setPath3("");
        }
      } else {
        setPath3("");
      }

      // Calculate path 4: Commercial -> Data Layer center (Phase 7 only)
      if (phase >= 7 && commercialRef?.current) {
        const commercial = commercialRef.current.getBoundingClientRect();
        const centerX = center.left + center.width / 2 - container.left;
        const centerY = center.top + center.height / 2 - container.top;

        const x6 = commercial.right - container.left;
        const y6 = commercial.top + commercial.height / 2 - container.top;

        if (
          x6 > minValidPosition && y6 > minValidPosition &&
          centerX > minValidPosition && centerY > minValidPosition &&
          commercial.width > minCardWidth && commercial.height > minCardHeight
        ) {
          const pathString4 = `M ${x6},${y6} L ${centerX},${centerY}`;
          setPath4(pathString4);
        } else {
          setPath4("");
        }
      } else {
        setPath4("");
      }

      setIsReady(true);
    };

    // Multiple update attempts to catch layout shifts
    const timer1 = setTimeout(updatePath, 0);
    const timer2 = setTimeout(updatePath, 100);
    const timer3 = setTimeout(updatePath, 300);
    const timer4 = setTimeout(updatePath, 500);
    const timer5 = setTimeout(updatePath, 1000);

    window.addEventListener('resize', updatePath);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      window.removeEventListener('resize', updatePath);
    };
  }, [leftRef, centerRef, rightRef, marketAccessRef, commercialRef, containerRef, phase]);

  if (!isReady || !path1) {
    return null;
  }

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      <defs>
        <radialGradient id="orbGradient1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="orbGradient2">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="orbGradient3">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#7B2DFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B2DFF" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="orbGradient4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#9F5AFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9F5AFF" stopOpacity="0.3" />
        </radialGradient>
        <filter id="orbGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Path 1 Orbs: Digital -> Data Layer */}
      <circle r="12" fill="url(#orbGradient1)" filter="url(#orbGlow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
          <mpath xlinkHref="#orbPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>

      <circle r="10" fill="url(#orbGradient2)" filter="url(#orbGlow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="2.5s">
          <mpath xlinkHref="#orbPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="2.5s" repeatCount="indefinite" />
      </circle>

      <circle r="11" fill="url(#orbGradient1)" filter="url(#orbGlow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="4s">
          <mpath xlinkHref="#orbPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="4s" repeatCount="indefinite" />
      </circle>

      {/* Path 2 Orbs: Data Layer -> HCP (Phase 5 only) */}
      {path2 && (
        <>
          <circle r="12" fill="url(#orbGradient3)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
              <mpath xlinkHref="#orbPath2" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </circle>

          <circle r="10" fill="url(#orbGradient4)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="3s">
              <mpath xlinkHref="#orbPath2" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="3s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Path 3 Orbs: Market Access -> Data Layer center (Phase 7 - diagonal) */}
      {path3 && phase >= 7 && (
        <>
          <circle r="12" fill="url(#orbGradient2)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s">
              <mpath xlinkHref="#orbPath3" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="0.8s" repeatCount="indefinite" />
          </circle>

          <circle r="10" fill="url(#orbGradient2)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="2.3s">
              <mpath xlinkHref="#orbPath3" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="2.3s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Path 4 Orbs: Commercial -> Data Layer center (Phase 7 - diagonal) */}
      {path4 && phase >= 7 && (
        <>
          <circle r="12" fill="url(#orbGradient4)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.2s">
              <mpath xlinkHref="#orbPath4" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="1.2s" repeatCount="indefinite" />
          </circle>

          <circle r="10" fill="url(#orbGradient4)" filter="url(#orbGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="2.8s">
              <mpath xlinkHref="#orbPath4" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" begin="2.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Hidden paths for orb motion */}
      <path id="orbPath1" d={path1} fill="none" />
      {path2 && <path id="orbPath2" d={path2} fill="none" />}
      {path3 && <path id="orbPath3" d={path3} fill="none" />}
      {path4 && <path id="orbPath4" d={path4} fill="none" />}
    </svg>
  );
}
