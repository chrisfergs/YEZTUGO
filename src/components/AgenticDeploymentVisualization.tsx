import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AmliLogo } from "./AmliLogo";
import immunexisIcon from "../assets/Immunexis-Icon.png";
import { 
  Users,
  FileText,
  Shield,
  MessageSquare,
  CheckCircle,
  Clock,
  Sparkles,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Award,
  Target,
  Zap,
  Brain,
  Eye,
  Heart,
  Star,
  TextSearch,
  Megaphone,
  Orbit,
  Headphones,
  Headset,
  RadioTower,
  PenLine,
  ChartSpline,
  History,
  Replace
} from "lucide-react";

// Force Tailwind v4 to generate all classes we need - DO NOT REMOVE
const TAILWIND_CLASSES_NEEDED = [
  // Opacity classes
  "text-white/10", "text-white/20", "text-white/30", "text-white/40", "text-white/50", "text-white/60", "text-white/70", "text-white/80", "text-white/90",
  "bg-white/10", "bg-white/20", "bg-white/30", "bg-white/40", "bg-white/50", "bg-white/60", "bg-white/70", "bg-white/80", "bg-white/90",
  "border-white/10", "border-white/20", "border-white/30", "border-white/40", "border-white/50",
  "bg-black/10", "bg-black/20", "bg-black/30", "bg-black/40", "bg-black/50", "bg-black/60", "bg-black/70", "bg-black/80", "bg-black/90",
  "bg-purple-500/10", "bg-purple-500/15", "bg-purple-500/20", "bg-purple-500/25", 
  "bg-green-500/10", "bg-green-500/15", "bg-green-500/20", "bg-green-500/25",
  "bg-blue-500/10", "bg-blue-500/15", "bg-blue-500/20", "bg-blue-500/25",
  "bg-red-500/10", "bg-red-500/15", "bg-red-500/20", "bg-red-500/25",
  "bg-orange-500/10", "bg-orange-500/15", "bg-orange-500/20", "bg-orange-500/25",
  "shadow-purple-500/50", "shadow-green-500/50", "shadow-blue-500/50", "shadow-red-500/50", "shadow-orange-500/50",
  "text-purple-400/70", "text-green-400/70", "text-blue-400/70", "text-red-400/70", "text-orange-400/70",
  "border-purple-500/15", "border-purple-500/20", "border-purple-500/25", 
  "border-green-500/15", "border-green-500/20", "border-green-500/25",
  "border-blue-500/15", "border-blue-500/20", "border-blue-500/25",
  "border-red-500/15", "border-red-500/20", "border-red-500/25",
  "border-orange-500/15", "border-orange-500/20", "border-orange-500/25",
  "text-purple-300/50", "text-green-300/50", "text-blue-300/50", "text-red-300/50", "text-orange-300/50",
  // Gradient classes
  "bg-gradient-to-br", "from-orange-600", "to-orange-700", "from-blue-600", "to-blue-700", 
  "from-green-600", "to-green-700", "from-purple-400", "to-purple-500",
  "from-[#7B2DFF]", "to-[#9F5AFF]",
  // Layout classes
  "rounded-2xl", "rounded-xl", "rounded-lg", "rounded-full", "rounded-md",
  "max-w-4xl", "max-w-5xl", "space-y-8", "space-y-6", "space-y-4", "space-y-3", "space-y-2",
  "gap-6", "gap-8", "gap-12", "gap-16", "gap-20",
  "p-6", "p-8", "px-6", "py-4", "py-6",
  "w-12", "h-12", "w-16", "h-16", "w-20", "h-20",
  "blur-xl", "blur-2xl", "shadow-2xl", "shadow-lg",
  // Custom scrollbar hiding
  "scrollbar-hide"
];

interface AgentDeploymentVisualizationProps {
  isVisible: boolean;
  onComplete?: () => void;
  onPhaseChange?: (phase: number) => void;
  skipAgentCollaboration?: boolean; // Flag to temporarily skip phases 1-3 (agent analysis)
  showUIWireframe?: boolean; // Flag to show/hide UI wireframe building (phases 6-7)
  startPhase?: number;
}

export function AgentDeploymentVisualization({ isVisible, onComplete, onPhaseChange, skipAgentCollaboration = false, showUIWireframe = true, startPhase = 0 }: AgentDeploymentVisualizationProps) {
  const [phase, setPhase] = useState(0);
  const hasInitialized = useRef(false);
  // 0 = Orion starts deployment
  // 1 = Engagement Agent activates
  // 2 = Content Agent activates
  // 3 = Compliance Agent activates
  // 4 = Agents fade out, container border appears
  // 5 = Orion regenerates with new message
  // 6 = UI wireframe starts building
  // 7 = UI wireframe completes
  // 8 = Final completion
  // 9 = Immediate transition (skip entire section)

  console.log("🟢 AgentDeploymentVisualization: Rendering with phase =", phase, "isVisible =", isVisible, "startPhase =", startPhase);

  useEffect(() => {
    if (isVisible && !hasInitialized.current) {
      console.log("🟢 AgentDeploymentVisualization: Starting deployment sequence");

      // Determine initial phase based on startPhase and skip toggles
      let initialPhase: number;

      if (startPhase > 0) {
        // If jumping directly to a phase, use that
        initialPhase = startPhase;
      } else {
        // Otherwise, determine based on skip toggles
        // skipAgentCollaboration = !showAgentCollaboration (phases 0-3 control)
        // showUIWireframe controls phases 6-7

        if (skipAgentCollaboration && !showUIWireframe) {
          // Skip both → go directly to transition
          initialPhase = 9;
        } else if (skipAgentCollaboration) {
          // Skip agent collaboration → go to Signal assembly
          initialPhase = 4;
        } else {
          // Show everything (or just skip UI wireframe)
          initialPhase = 0;
        }
      }

      console.log("🟢 AgentDeploymentVisualization: Setting initial phase to", initialPhase, "(skipAgentCollaboration:", skipAgentCollaboration, "showUIWireframe:", showUIWireframe, ")");
      setPhase(initialPhase);
      onPhaseChange?.(initialPhase);
      hasInitialized.current = true;
    } else if (!isVisible) {
      // Reset when component becomes invisible
      hasInitialized.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, skipAgentCollaboration, showUIWireframe, startPhase]); // Don't depend on onPhaseChange

  // Auto-advance to next section when phase 9 is reached (skip entire section)
  useEffect(() => {
    if (phase === 9 && onComplete) {
      console.log("🟢 AgentDeploymentVisualization: Phase 9 reached - immediately transitioning to next section");
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]); // Only depend on phase, not onComplete (to avoid infinite loop)

  // Simple phase progression - each agent triggers the next when done
  const triggerNextPhase = () => {
    if (phase === 0) {
      // Phase 0 always advances to phase 1 (Engagement Agent)
      // Note: We only reach phase 0 if skipAgentCollaboration is false
      setTimeout(() => {
        setPhase(1);
        onPhaseChange?.(1);
      }, 200);
    } else if (phase === 1) {
      setTimeout(() => {
        setPhase(2);
        onPhaseChange?.(2);
      }, 200); // Content Agent
    } else if (phase === 2) {
      setTimeout(() => {
        setPhase(3);
        onPhaseChange?.(3);
      }, 200); // Compliance Agent
    }
  };

  const handleClick = () => {
    console.log("🟢 AgentDeploymentVisualization: Click detected, current phase =", phase);
    console.log("🟢 AgentDeploymentVisualization: onComplete callback exists =", !!onComplete);
    try {
      // Determine minimum clickable phase based on skip flag
      const minClickablePhase = skipAgentCollaboration ? 4 : 3;

      // Only allow manual advancement from the appropriate phase onwards
      if (phase >= minClickablePhase && phase < 8) {
        // If at phase 3 and showUIWireframe is OFF, skip entire Signal Assembly (phases 4-7)
        if (phase === 3 && !showUIWireframe) {
          console.log("🟢 AgentDeploymentVisualization: Skipping Signal Assembly and UI wireframe, jumping to phase 8");
          setPhase(8);
          onPhaseChange?.(8);
        }
        // Skip UI wireframe phases (6-7) if showUIWireframe is false
        else if (phase === 5 && !showUIWireframe) {
          console.log("🟢 AgentDeploymentVisualization: Skipping UI wireframe, jumping to phase 8");
          setPhase(8);
          onPhaseChange?.(8);
        } else {
          const nextPhase = phase + 1;
          console.log("🟢 AgentDeploymentVisualization: Advancing to phase", nextPhase);
          setPhase(nextPhase);
          onPhaseChange?.(nextPhase);
        }
      } else if (phase >= 8) {
        console.log("🟢 AgentDeploymentVisualization: Phase 8 reached, calling onComplete");
        if (onComplete) {
          console.log("🟢 AgentDeploymentVisualization: Executing onComplete callback");
          onComplete();
        } else {
          console.error("🔴 AgentDeploymentVisualization: onComplete callback is missing!");
        }
      }
      // Early phases: Do nothing, let sequential auto-advancement handle it
    } catch (error) {
      console.error("🔴 AgentDeploymentVisualization: Error in handleClick:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-[#030213] z-[9999] flex items-center justify-center overflow-hidden cursor-pointer"
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
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <div className="w-full flex flex-col" style={{ width: '100%', maxWidth: '1200px', height: '90vh', margin: '0 auto', padding: '0 20px' }}>

        {/* Title - Fixed at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1 mb-6 flex-shrink-0"
        >
          <h2 className="text-white text-2xl font-semibold">
            {phase >= 4 ? "Meet Your New Agentic Experience" : "Meet Your New Digital Co-Workers"}
          </h2>
          <p className="text-white/50 text-base">
            {phase === 0 && (skipAgentCollaboration ? "Orion Preparing Signal Assembly..." : "Orion Deploying Analysis Team...")}
            {phase === 1 && "ImmunAI Analyzing Engagement Data"}
            {phase === 2 && "Content Aligner Searching Knowledge Base"}
            {phase === 3 && "Call Coach Determining Next Best Action"}
            {phase === 4 && (skipAgentCollaboration ? "Building Medical Affairs Signal Interface..." : "Analysis Complete - Transitioning to Signal Assembly")}
            {phase === 5 && "Orion Assembling Medical Affairs Signal..."}
            {phase === 6 && showUIWireframe && "Building Interface Components..."}
            {phase === 7 && showUIWireframe && "Adding Engagement Analytics..."}
            {phase >= 8 && "Medical Affairs Signal Ready for Deployment"}
          </p>
        </motion.div>

        {/* Main Content Area - Dynamic Layout */}
        <div className="flex-1" style={{ minHeight: 0 }}>
          
          {/* Phase 0-3: Two Column Layout with Analysis Team */}
          {phase <= 3 && (
            <div 
              className="grid h-full"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 30% 60% 1fr',
                gap: '16px',
                height: '100%',
                alignItems: 'start'
              }}
            >
              
              {/* Left buffer */}
              <div></div>
              
              {/* Column 1: Orion Planner (33%) */}
              <div className="flex flex-col" style={{ minHeight: 0 }}>
                <h3 className="text-white/70 text-sm font-medium mb-3 text-center">Strategic Orchestrator</h3>
                <div className="flex-1" style={{ minHeight: 0 }}>
                  <OrionDeploymentCard phase={phase} onComplete={triggerNextPhase} />
                </div>
              </div>

              {/* Column 2: Other Agents (66%) */}
              <div className="flex flex-col" style={{ minHeight: 0 }}>
                <h3 className="text-white/70 text-sm font-medium mb-3 text-center">AI Analysis Team</h3>
                <div className="flex-1 space-y-2 overflow-y-auto" style={{ minHeight: 0 }}>
                  
                  {/* ImmunAI */}
                  {phase >= 1 && <EngagementAgentCard phase={phase} onComplete={triggerNextPhase} />}
                  
                  {/* Content Aligner */}
                  {phase >= 2 && <ContentAgentCard phase={phase} onComplete={triggerNextPhase} />}
                  
                  {/* Call Coach */}
                  {phase >= 3 && <ComplianceAgentCard phase={phase} />}

                </div>
              </div>

              {/* Right buffer */}
              <div></div>

            </div>
          )}

          {/* Phase 4+: Keep Two Column Structure - Orion (33%) + UI (66%) */}
          {/* Only render phases 4-7 if showUIWireframe is true */}
          {phase >= 4 && phase < 8 && showUIWireframe && (
            <div
              className="grid h-full"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 30% 60% 1fr',
                gap: '16px',
                height: '100%',
                alignItems: 'start'
              }}
            >

              {/* Left buffer */}
              <div></div>

              {/* Column 1: Orion Signal Assembly (33%) */}
              <div className="flex flex-col" style={{ minHeight: 0 }}>
                <h3 className="text-white/70 text-sm font-medium mb-3 text-center">Signal Assembly</h3>
                <div className="flex-1" style={{ minHeight: 0 }}>
                  <OrionSignalAssemblyCard phase={phase} showUIWireframe={showUIWireframe} />
                </div>
              </div>

              {/* Column 2: UI Components (66%) */}
              <div className="flex flex-col" style={{ minHeight: 0 }}>
                <h3 className="text-white/70 text-sm font-medium mb-3 text-center">Medical Affairs Interface</h3>
                <div className="flex-1 space-y-2 overflow-y-auto" style={{ minHeight: 0 }}>

                  {/* Signal Card */}
                  {phase >= 6 && showUIWireframe && <SignalCard phase={phase} />}


                </div>
              </div>

              {/* Right buffer */}
              <div></div>

            </div>
          )}

        </div>


      </div>
    </div>
  );
}

// Orion Deployment Card
function OrionDeploymentCard({ phase, onComplete }: { phase: number; onComplete?: () => void }) {
  const [streamedText, setStreamedText] = useState("");
  const fullMessage = "Team, we have a Medical Affairs inquiry request from Dr. Morita. He asked about TB screening requirements and infection risk management with IMMUNEXIS for rheumatoid arthritis patients. ImmunAI - analyze his conversation history and clinical concerns. Content Aligner - compile TB screening protocols, infection monitoring data, and TNF-alpha inhibitor safety profiles. Call Coach - create Medical Affairs consultation strategy focused on his immunosuppressant safety questions.";

  useEffect(() => {
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setStreamedText(fullMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        if (onComplete) onComplete();
      }
        }, 15); // Match other agents' speed

    return () => clearInterval(streamInterval);
  }, [fullMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-black/20 border border-white rounded-2xl p-4 backdrop-blur-sm shadow-2xl"
    >
      {/* Slack-style Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <div 
          className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, #ea580c, #c2410c)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Orbit className="w-4 h-4 text-white" />
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">Planner Agent</h4>
          <span className="text-white/40 text-xs">now</span>
        </div>
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 mb-2"
      >
        <p className="text-white text-sm">
          {streamedText}
          {streamedText.length < fullMessage.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-orange-400"
            >
              ▋
            </motion.span>
          )}
        </p>
        {streamedText.length >= fullMessage.length && (
          <div className="flex items-start gap-2 mt-2">
            <Target className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span className="text-white/70 text-xs">
              @immunai @content-agent @call-coach
            </span>
          </div>
        )}
      </motion.div>

      {/* Thread indicator */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <MessageSquare className="w-3 h-3" />
        <span>{phase >= 3 ? "3 replies" : phase >= 2 ? "2 replies" : phase >= 1 ? "1 reply" : "Thread started"}</span>
      </div>
    </motion.div>
  );
}

// ImmunAI Engagement Agent Card
function EngagementAgentCard({ phase, onComplete }: { phase: number; onComplete?: () => void }) {
  const [streamedText, setStreamedText] = useState("");
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const fullMessage = "Analysis complete! 🤖 Dr. Morita, Rheumatologist (12+ years), engaged in comprehensive clinical discussion. Initial question about screening protocols for RA patients - answered with TB screening and hepatitis B testing requirements. Then asked about patient training resources for self-administration - provided injection training materials and nurse educator contact. Now asking sophisticated safety question: most common adverse events and infection risk monitoring for IMMUNEXIS in rheumatoid arthritis patients. Accepted MedInfo Inquiry and Medical Affairs consultation offer. High engagement with immunosuppressant safety concerns detected.";

  useEffect(() => {
    if (phase >= 1 && streamedText === "") {
      // Small delay before starting to stream
      const startDelay = setTimeout(() => {
        let currentIndex = 0;
        intervalRef.current = setInterval(() => {
          if (currentIndex < fullMessage.length) {
            setStreamedText(fullMessage.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (onComplete) onComplete();
          }
        }, 15);
      }, 800);

      return () => {
        clearTimeout(startDelay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [phase, fullMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="relative bg-black/20 border border-white rounded-2xl p-4 backdrop-blur-sm shadow-2xl"
    >
      {/* Slack-style Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: '#4D4172',
            padding: '6px'
          }}
        >
          <img
            src={immunexisIcon}
            alt="ImmunAI"
            className="w-full h-full object-contain"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">ImmunAI</h4>
          <span className="text-white/40 text-xs">1m</span>
        </div>
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 mb-2"
      >
        <p className="text-white text-sm">
          {streamedText}
          {phase >= 1 && streamedText.length < fullMessage.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-purple-400"
            >
              ▋
            </motion.span>
          )}
        </p>
      </motion.div>

      {/* Reply indicator */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <div className="w-1 h-4 bg-purple-400/30 rounded-full" />
        <span>Reply to thread</span>
      </div>
    </motion.div>
  );
}

// Content Agent Card
function ContentAgentCard({ phase, onComplete }: { phase: number; onComplete?: () => void }) {
  const [streamedText, setStreamedText] = useState("");
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const fullMessage = "Knowledge base search complete! 📚 Found comprehensive safety data for IMMUNEXIS (TNF-α inhibitor) in rheumatoid arthritis. Based on Dr. Morita's infection risk question, I recommend our MLR-approved materials on 'TNF-Alpha Inhibition Mechanism & Immune Response', 'Infection Risk Monitoring Protocols', 'Common Adverse Events Profile', and 'TB Screening & Vaccination Guidelines' - all grounded in clinical trial safety data. Content addresses mechanism of inflammatory cytokine neutralization, infection surveillance protocols, injection site reaction management, and vaccination timing that directly match his immunosuppressant safety concerns for RA patients.";

  useEffect(() => {
    if (phase >= 2 && streamedText === "") {
      // Small delay before starting to stream
      const startDelay = setTimeout(() => {
        let currentIndex = 0;
        intervalRef.current = setInterval(() => {
          if (currentIndex < fullMessage.length) {
            setStreamedText(fullMessage.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (onComplete) onComplete();
          }
        }, 15);
      }, 800);

      return () => {
        clearTimeout(startDelay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [phase, fullMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="relative bg-black/20 border border-white rounded-2xl p-4 backdrop-blur-sm shadow-2xl"
    >
      {/* Slack-style Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <div 
          className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <TextSearch className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">Content Aligner</h4>
          <span className="text-white/40 text-xs">2m</span>
        </div>
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 mb-2"
      >
        <p className="text-white text-sm">
          {streamedText}
          {phase >= 2 && streamedText.length < fullMessage.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-blue-400"
            >
              ▋
            </motion.span>
          )}
        </p>
      </motion.div>

      {/* Reply indicator */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <div className="w-1 h-4 bg-blue-400/30 rounded-full" />
        <span>Reply to thread</span>
      </div>
    </motion.div>
  );
}

// Call Coach Card
function ComplianceAgentCard({ phase }: { phase: number }) {
  const [streamedText, setStreamedText] = useState("");
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const fullMessage = "Critical opportunity! 🎯 Dr. Morita requested Medical Affairs consultation via MedInfo Inquiry - this is a warm lead with contact information. I recommend immediate Medical Affairs outreach focused on infection risk management and adverse event counseling for IMMUNEXIS. Offer expert consultation on TNF-alpha inhibitor safety profile, TB screening requirements, common adverse events (injection site reactions, upper respiratory infections), and infection monitoring protocols for RA patients. His sophisticated immunosuppressant safety question shows strong clinical interest and recommendation consideration for rheumatoid arthritis patients. Optimal window: next 24-48 hours. Consultation conversion probability: 94%.";

  useEffect(() => {
    if (phase >= 3 && streamedText === "") {
      // Small delay before starting to stream
      const startDelay = setTimeout(() => {
        let currentIndex = 0;
        intervalRef.current = setInterval(() => {
          if (currentIndex < fullMessage.length) {
            setStreamedText(fullMessage.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }, 15);
      }, 800);

      return () => {
        clearTimeout(startDelay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [phase, fullMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="relative bg-black/20 border border-white rounded-2xl p-4 backdrop-blur-sm shadow-2xl"
    >
      {/* Slack-style Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <div 
          className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, #16a34a, #15803d)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <Headset className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">Call Coach</h4>
          <span className="text-white/40 text-xs">3m</span>
        </div>
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 mb-2"
      >
        <p className="text-white text-sm">
          {streamedText}
          {phase >= 3 && streamedText.length < fullMessage.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-green-400"
            >
              ▋
            </motion.span>
          )}
        </p>
      </motion.div>

      {/* Reply indicator */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <div className="w-1 h-4 bg-green-400/30 rounded-full" />
        <span>Reply to thread</span>
      </div>
    </motion.div>
  );
}

// MSL Signal Builder Component
function MSLSignalBuilder({ phase, showUIWireframe = true }: { phase: number; showUIWireframe?: boolean }) {
  return (
    <div className="h-full bg-black/20 border border-white/20 rounded-2xl p-6 backdrop-blur-sm shadow-2xl overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-medium">Medical Affairs Safety Consultation</h3>
            <p className="text-white/60 text-sm">Dr. Aaron Morita - Infection Risk Management & IMMUNEXIS Safety Profile</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${phase >= 7 ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span className="text-white/70 text-sm">
            {phase >= 7 ? 'Ready to Send' : 'Building...'}
          </span>
        </div>
      </div>

      {/* Webinar Analysis Section - Phase 4 */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-medium">Clinical Engagement Analysis</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">HCP Profile</p>
                  <p className="text-purple-400 font-medium">Rheumatologist (12+ years)</p>
                  <p className="text-white/60 text-xs">Active RA prescriber</p>
                </div>
                <div>
                  <p className="text-white/70 mb-1">AI Chat Session</p>
                  <p className="text-purple-400 font-medium">3 clinical questions</p>
                  <p className="text-white/60 text-xs">Focus: TB screening + infection risks + adverse events</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Knowledge Base Content - Phase 5 */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-medium">Intelligent Content Selection</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">MLR-approved 'TNF-Alpha Inhibition & Immune Response Modulation'</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">Infection risk surveillance protocols and TB screening guidelines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">Common adverse events profile: injection site reactions, URI, headache</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">Vaccination timing guidance and contraindications for RA patients</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Coach Recommendation - Phase 6 */}
      <AnimatePresence>
        {phase >= 6 && showUIWireframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-medium">Next Best Action Recommendation</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">Medical Affairs consultation on infection risk and adverse event management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">Optimal engagement window: Next 24-48 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">Consultation conversion probability: 94%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Registration Invitation - Phase 7 */}
      <AnimatePresence>
        {phase >= 7 && showUIWireframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-medium">Personalized Medical Affairs Outreach Ready</h4>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white text-sm leading-relaxed">
                  <span className="text-purple-400 font-medium">Expert Medical Affairs consultation</span> for Dr. Morita focused on 
                  infection risk management and adverse event counseling for IMMUNEXIS. Features TNF-alpha inhibitor safety profile, 
                  TB screening requirements, common adverse events (injection site reactions, upper respiratory infections, headache, nausea), 
                  and infection monitoring protocols directly addressing his sophisticated immunosuppressant safety question for RA patients. 
                  <span className="text-yellow-400"> Builds on MedInfo Inquiry request</span> to convert complex clinical concern into recommendation confidence.
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <span className="text-white/70 text-sm">Expected Outcome</span>
                <span className="text-green-400 font-medium">94% consultation conversion probability</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Orion Signal Assembly Card - New message for Phase 5+
function OrionSignalAssemblyCard({ phase, showUIWireframe = true }: { phase: number; showUIWireframe?: boolean }) {
  const [streamedText, setStreamedText] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Original message for phases 0-4
  const originalMessage = "Team, we have a Medical Affairs inquiry request from Dr. Morita. He asked about TB screening requirements and infection risk management with IMMUNEXIS for rheumatoid arthritis patients. ImmunAI - analyze his conversation history and clinical concerns. Content Aligner - compile TB screening protocols, infection monitoring data, and TNF-alpha inhibitor safety profiles. Call Coach - create Medical Affairs consultation strategy focused on his immunosuppressant safety questions.";
  
  // New message for phase 5+
  const newMessage = "Perfect analysis team! 🎯 Now let me synthesize this into an actionable Medical Affairs Signal:\n\n✅ ImmunAI confirmed: Sophisticated immunosuppressant safety inquiry (infection risks + adverse events) + MedInfo Inquiry accepted with contact information\n✅ Content Aligner identified: TNF-alpha inhibitor safety profile + TB screening guidelines + infection monitoring protocols + adverse events data - perfect match\n✅ Call Coach recommends:\nImmediate Medical Affairs consultation focused on infection risk management and adverse event counseling (24-48hr window, 94% conversion probability)\n\nAssembling Signal: Dr. Morita needs expert-level rheumatology discussion on infection risk monitoring, TB screening requirements, and common adverse events (injection site reactions, URI, headache) for IMMUNEXIS through direct Medical Affairs consultation. Converting complex immunosuppressant safety question into recommendation confidence.";

  const fullMessage = phase >= 5 ? newMessage : originalMessage;

  useEffect(() => {
    if (phase >= 4 && streamedText === "") {
      // Stream synthesis message when Signal Assembly appears (phase 4+)
      const startDelay = setTimeout(() => {
        let currentIndex = 0;
        intervalRef.current = setInterval(() => {
          if (currentIndex < newMessage.length) {
            setStreamedText(newMessage.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }, 15);
      }, 300);

      return () => {
        clearTimeout(startDelay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [phase, newMessage]);

  return (
    <div className="relative bg-black/20 border border-white rounded-2xl p-4 backdrop-blur-sm shadow-2xl flex flex-col" style={{ height: '70vh', maxHeight: '650px' }}>
      {/* Slack-style Header */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
        <div 
          className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, #ea580c, #c2410c)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Orbit className="w-4 h-4 text-white" />
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">Planner Agent</h4>
          <span className="text-white/40 text-xs">now</span>
        </div>
      </div>

      {/* Message Bubble - Flexible height */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-2 flex-1 overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        <div className="text-white text-sm space-y-3">
          {streamedText.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
          {streamedText.length < fullMessage.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-orange-400"
            >
              ▋
            </motion.span>
          )}
        </div>
        {phase <= 4 && streamedText.length >= originalMessage.length && (
          <div className="flex items-start gap-2 mt-2">
            <Target className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span className="text-white/70 text-xs">
              @immunai @content-agent @call-coach
            </span>
          </div>
        )}
      </motion.div>

      {/* Status section - fixed at bottom */}
      <div className="mt-3 pt-3 border-t border-white/20 flex-shrink-0" style={{ minHeight: '60px' }}>
        {phase >= 4 && streamedText.length >= newMessage.length && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border border-orange-400/50 border-t-orange-400 rounded-full"
              />
              <span>Assembling Medical Affairs Signal...</span>
            </div>
            
            {phase >= 6 && showUIWireframe && (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <CheckCircle className="w-3 h-3" />
                <span>Interface components generated</span>
              </div>
            )}

            {phase >= 7 && showUIWireframe && (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <CheckCircle className="w-3 h-3" />
                <span>UI elements streaming in</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// UI Wireframe Builder Component
function UIWireframeBuilder({ phase }: { phase: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="h-full bg-black/30 border border-white/20 rounded-2xl p-4 backdrop-blur-sm overflow-hidden"
    >
      {/* Wireframe Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between mb-4 pb-3 border-b border-white/10"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400/60 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400/60 rounded-full" />
          <div className="w-3 h-3 bg-green-400/60 rounded-full" />
        </div>
        <div className="text-white/40 text-xs">Medical Affairs Signal Interface</div>
      </motion.div>

      {/* Wireframe Content */}
      <div className="space-y-3">
        
        {/* Header Section */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <div className="h-4 bg-white/40 rounded w-3/4" />
            <div className="h-2 bg-white/25 rounded w-1/2" />
          </motion.div>
        )}

        {/* Profile Card */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="border border-white/30 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500/60 rounded-full" />
              <div className="space-y-1 flex-1">
                <div className="h-2 bg-white/40 rounded w-2/3" />
                <div className="h-1.5 bg-white/25 rounded w-1/2" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Engagement Metrics */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 gap-2"
          >
            <div className="border border-white/30 rounded p-2">
              <div className="h-1.5 bg-blue-400/60 rounded w-full mb-1" />
              <div className="h-1 bg-white/30 rounded w-2/3" />
            </div>
            <div className="border border-white/30 rounded p-2">
              <div className="h-1.5 bg-green-400/60 rounded w-full mb-1" />
              <div className="h-1 bg-white/30 rounded w-2/3" />
            </div>
          </motion.div>
        )}

        {/* Content Recommendations */}
        {phase >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-2"
          >
            <div className="h-2 bg-white/40 rounded w-1/3" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                <div className="h-1.5 bg-white/30 rounded flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                <div className="h-1.5 bg-white/30 rounded flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                <div className="h-1.5 bg-white/30 rounded flex-1" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        {phase >= 7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-4"
          >
            <div className="h-8 bg-purple-500/40 border border-purple-500/60 rounded-lg flex items-center justify-center">
              <div className="h-1.5 bg-purple-400/80 rounded w-1/3" />
            </div>
          </motion.div>
        )}

      </div>

      {/* Building Animation Overlay */}
      {phase === 6 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            animation: 'shimmer 2s ease-in-out infinite'
          }}
        />
      )}
    </motion.div>
  );
}

// Signal Card - Full Webpage Mockup
function SignalCard({ phase }: { phase: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-black/20 border border-white rounded-2xl backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col"
      style={{ height: '70vh', maxHeight: '650px' }}
    >
      {/* Agent Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 p-4 border-b border-white/10 flex-shrink-0"
      >
        <div
          className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, #dc2626, #b91c1c)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <RadioTower className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white text-sm font-medium">HCP Requested Medical Affairs Consultation</h4>
          <span className="text-white/40 text-xs">signal</span>
        </div>
      </motion.div>

      {/* Webpage Mockup */}
      <div className="p-4 flex-1 flex flex-col" style={{ minHeight: 0 }}>
        {/* Page Content */}
        <div className="flex-1 flex flex-col gap-4" style={{ minHeight: 0 }}>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              boxShadow: [
                '0 0 20px rgba(192, 132, 252, 0.15), inset 0 1px 0 rgba(192, 132, 252, 0.1)',
                '0 0 40px rgba(192, 132, 252, 0.4), inset 0 1px 0 rgba(192, 132, 252, 0.2)',
                '0 0 20px rgba(192, 132, 252, 0.15), inset 0 1px 0 rgba(192, 132, 252, 0.1)'
              ]
            }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              ease: "easeOut",
              boxShadow: { delay: 0.8, duration: 2, times: [0, 0.5, 1] }
            }}
            className="border border-purple-400/50 rounded-lg p-4 flex items-center gap-3"
            style={{
              borderColor: '#c084fc80',
              boxShadow: '0 0 20px rgba(192, 132, 252, 0.15), inset 0 1px 0 rgba(192, 132, 252, 0.1)',
              flex: '0 0 18%'
            }}
          >
            <PenLine className="w-4 h-4 text-purple-400" style={{ color: '#c084fc' }} />
            <span className="text-purple-400 text-sm font-medium" style={{ color: '#c084fc' }}>SUMMARY</span>
          </motion.div>

          {/* Analytics and Timeline Row */}
          <div className="grid grid-cols-2 gap-4" style={{ flex: '0 0 18%' }}>
            {/* Analytics Section */}
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: [
                  '0 0 20px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(251, 146, 60, 0.1)',
                  '0 0 40px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(251, 146, 60, 0.2)',
                  '0 0 20px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(251, 146, 60, 0.1)'
                ]
              }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: "easeOut",
                boxShadow: { delay: 1.1, duration: 2, times: [0, 0.5, 1] }
              }}
              className="border border-orange-400/50 rounded-lg p-4 flex items-center gap-3"
              style={{
                borderColor: '#fb923c80',
                boxShadow: '0 0 20px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(251, 146, 60, 0.1)'
              }}
            >
              <ChartSpline className="w-4 h-4 text-orange-400" style={{ color: '#fb923c' }} />
              <span className="text-orange-400 text-sm font-medium" style={{ color: '#fb923c' }}>ANALYTICS</span>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: [
                  '0 0 20px rgba(250, 204, 21, 0.15), inset 0 1px 0 rgba(250, 204, 21, 0.1)',
                  '0 0 40px rgba(250, 204, 21, 0.4), inset 0 1px 0 rgba(250, 204, 21, 0.2)',
                  '0 0 20px rgba(250, 204, 21, 0.15), inset 0 1px 0 rgba(250, 204, 21, 0.1)'
                ]
              }}
              transition={{
                delay: 1.1,
                duration: 0.6,
                ease: "easeOut",
                boxShadow: { delay: 1.4, duration: 2, times: [0, 0.5, 1] }
              }}
              className="border border-yellow-400/50 rounded-lg p-4 flex items-center gap-3"
              style={{
                borderColor: '#facc1580',
                boxShadow: '0 0 20px rgba(250, 204, 21, 0.15), inset 0 1px 0 rgba(250, 204, 21, 0.1)'
              }}
            >
              <History className="w-4 h-4 text-yellow-400" style={{ color: '#facc15' }} />
              <span className="text-yellow-400 text-sm font-medium" style={{ color: '#facc15' }}>TIMELINE</span>
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: [
                '0 0 20px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(96, 165, 250, 0.1)',
                '0 0 40px rgba(96, 165, 250, 0.4), inset 0 1px 0 rgba(96, 165, 250, 0.2)',
                '0 0 20px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(96, 165, 250, 0.1)'
              ]
            }}
            transition={{
              delay: 1.4,
              duration: 0.6,
              ease: "easeOut",
              boxShadow: { delay: 1.7, duration: 2, times: [0, 0.5, 1] }
            }}
            className="border border-blue-400/50 rounded-lg p-4 flex items-center gap-3"
            style={{
              borderColor: '#60a5fa80',
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(96, 165, 250, 0.1)',
              flex: '1 1 auto'
            }}
          >
            <FileText className="w-4 h-4 text-blue-400" style={{ color: '#60a5fa' }} />
            <span className="text-blue-400 text-sm font-medium" style={{ color: '#60a5fa' }}>CONTENT</span>
          </motion.div>

          {/* Next Best Action Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                '0 0 20px rgba(74, 222, 128, 0.15), inset 0 1px 0 rgba(74, 222, 128, 0.1)',
                '0 0 40px rgba(74, 222, 128, 0.4), inset 0 1px 0 rgba(74, 222, 128, 0.2)',
                '0 0 20px rgba(74, 222, 128, 0.15), inset 0 1px 0 rgba(74, 222, 128, 0.1)'
              ]
            }}
            transition={{
              delay: 1.7,
              duration: 0.8,
              ease: "easeOut",
              boxShadow: { delay: 2.0, duration: 2, times: [0, 0.5, 1] }
            }}
            className="border border-green-400/50 rounded-lg p-4 flex items-center gap-3"
            style={{
              borderColor: '#4ade8080',
              boxShadow: '0 0 20px rgba(74, 222, 128, 0.15), inset 0 1px 0 rgba(74, 222, 128, 0.1)',
              flex: '0 0 14%'
            }}
          >
            <Replace className="w-4 h-4 text-green-400" style={{ color: '#4ade80' }} />
            <span className="text-green-400 text-sm font-medium" style={{ color: '#4ade80' }}>NEXT BEST ACTION</span>
          </motion.div>

        </div>

        {/* Assembly Complete */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
          className="text-center pt-4 border-t border-white/10 flex-shrink-0"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-green-400">
            <CheckCircle className="w-3 h-3" />
            <span>Medical Affairs Interface Ready</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
