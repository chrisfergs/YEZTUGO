import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AmliLogo } from "./AmliLogo";
import immunexisIcon from "../assets/Immunexis-Icon.png";
import { 
  Orbit,
  Brain,
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  AlertTriangle,
  Target,
  Sparkles,
  MessageSquare,
  Cpu,
  Activity,
  RefreshCw,
  SquareTerminal
} from "lucide-react";

// Force Tailwind v4 to generate all classes we need - DO NOT REMOVE
const TAILWIND_CLASSES_NEEDED = [
  // Opacity classes
  "text-white/10", "text-white/20", "text-white/30", "text-white/40", "text-white/50", "text-white/60", "text-white/70", "text-white/80", "text-white/90",
  "bg-white/10", "bg-white/20", "bg-white/30", "bg-white/40", "bg-white/50", "bg-white/60", "bg-white/70", "bg-white/80", "bg-white/90",
  "border-white/10", "border-white/20", "border-white/30", "border-white/40", "border-white/50",
  "bg-black/10", "bg-black/20", "bg-black/30", "bg-black/40", "bg-black/50", "bg-black/60", "bg-black/70", "bg-black/80", "bg-black/90",
  "bg-purple-500/10", "bg-purple-500/15", "bg-purple-500/20", "bg-purple-500/25", "bg-orange-500/10", "bg-orange-500/15", "bg-orange-500/20",
  "shadow-purple-500/50", "shadow-orange-500/50", "shadow-blue-500/50",
  "text-purple-400/70", "text-orange-400/70", "text-blue-400/70",
  "border-purple-500/15", "border-purple-500/20", "border-purple-500/25", "border-orange-500/15", "border-orange-500/20",
  "text-purple-300/50", "text-orange-300/50", "text-blue-300/50",
  // Layout classes
  "rounded-2xl", "rounded-xl", "rounded-lg", "rounded-full", "rounded-md",
  "max-w-4xl", "max-w-5xl", "space-y-8", "space-y-6", "space-y-4", "space-y-3", "space-y-2",
  "gap-6", "gap-8", "gap-12", "gap-16", "gap-20",
  "p-6", "p-8", "px-6", "py-4", "py-6",
  "w-12", "h-12", "w-16", "h-16", "w-20", "h-20",
  "blur-xl", "blur-2xl", "shadow-2xl",
  // Custom scrollbar hiding
  "scrollbar-hide"
];

interface AgenticOrchestrationVisualizationProps {
  isVisible: boolean;
  onComplete?: () => void;
  onPhaseChange?: (phase: number) => void;
  skipOrfoIntro?: boolean;
  fastStreaming?: boolean;
  startPhase?: number;
}

export function AgenticOrchestrationVisualization({ isVisible, onComplete, onPhaseChange, skipOrfoIntro = false, fastStreaming = false, startPhase = 0 }: AgenticOrchestrationVisualizationProps) {
  const [phase, setPhase] = useState(0);
  // 0 = ImmunAI introduction
  // 1 = Planner Agent appears
  // 2 = Streaming prompt appears
  // 3 = Immediate transition (skip entire section)

  console.log("🟠 AgenticOrchestrationVisualization: Rendering with phase =", phase, "isVisible =", isVisible, "startPhase =", startPhase);

  useEffect(() => {
    if (isVisible) {
      // Determine initial phase based on startPhase and skip toggles
      let initialPhase: number;

      if (startPhase > 0) {
        // If jumping directly to a phase, use that
        initialPhase = startPhase;
      } else {
        // Otherwise, determine based on skip toggles
        // skipOrfoIntro = !showOrfoIntro (phase 0 control)
        // fastStreaming = !slowStreaming (phase 2 control)

        if (skipOrfoIntro && fastStreaming) {
          // Skip both → go directly to transition
          initialPhase = 3;
        } else if (skipOrfoIntro) {
          // Skip ImmunAI intro → go to Planner
          initialPhase = 1;
        } else {
          // Show everything (or just skip streaming content)
          initialPhase = 0;
        }
      }

      console.log(`🟠 AgenticOrchestrationVisualization: Setting phase to ${initialPhase} (startPhase: ${startPhase}, skipOrfoIntro: ${skipOrfoIntro}, fastStreaming: ${fastStreaming})`);
      setPhase(initialPhase);
      onPhaseChange?.(initialPhase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, skipOrfoIntro, fastStreaming, startPhase]); // Don't depend on onPhaseChange

  // Auto-advance to next section when phase 3 is reached (skip entire section)
  useEffect(() => {
    if (phase === 3 && onComplete) {
      console.log("🟠 AgenticOrchestrationVisualization: Phase 3 reached - immediately transitioning to next section");
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]); // Only depend on phase, not onComplete (to avoid infinite loop)

  const handleClick = () => {
    // Phase 3 auto-transitions via useEffect - ignore clicks
    if (phase === 3) {
      console.log("🟠 AgenticOrchestrationVisualization: Ignoring click at phase 3 (auto-transition phase)");
      return;
    }

    console.log("🟠 AgenticOrchestrationVisualization: Click detected, current phase =", phase);
    try {
      if (phase < 2) {
        const nextPhase = phase + 1;
        console.log("🟠 AgenticOrchestrationVisualization: Advancing to phase", nextPhase);
        setPhase(nextPhase);
        onPhaseChange?.(nextPhase);
      } else if (onComplete) {
        console.log("🟠 AgenticOrchestrationVisualization: Calling onComplete");
        onComplete();
      }
    } catch (error) {
      console.error("🔴 AgenticOrchestrationVisualization: Error in handleClick:", error);
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
      <div className="w-full flex flex-col" style={{ width: '100%', maxWidth: '1200px', height: '90vh', margin: '0 auto' }}>

        {/* Title - Fixed at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1 mb-6 flex-shrink-0"
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
        >
          <h2 className="text-white text-2xl" style={{ color: '#ffffff', fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>
            Agentic Orchestration Layer
          </h2>
          <p className="text-white/50 text-base" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem', margin: 0 }}>
            {phase === 0 && "ImmunAI Alert Activated"}
            {phase === 1 && "Planner Agent Called"}
            {phase === 2 && "Planner Thinking..."}
          </p>
        </motion.div>

        {/* Column Headers - Always visible */}
        <div
          className="grid mb-4 flex-shrink-0"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 25% 25% 33.33% 1fr',
            gap: '16px'
          }}
        >
          <div></div>
          <div className="text-center">
            <h3 className="text-white/70 text-sm font-medium">ImmunAI</h3>
          </div>
          <div className="text-center">
            <h3 className="text-white/70 text-sm font-medium">Planner Agent</h3>
          </div>
          <div className="text-center">
            <h3 className="text-white/70 text-sm font-medium">Analysis Engine</h3>
          </div>
          <div></div>
        </div>

        {/* Three Column Layout - Flexible height */}
        <div className="flex-1" style={{ minHeight: 0 }}>
          <div
            className="grid h-full"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 25% 25% 33.33% 1fr',
              gap: '16px',
              height: '100%',
              alignItems: 'start'
            }}
          >

            {/* Left spacer (8.335%) - empty for centering */}
            <div></div>

            {/* Column 1: ImmunAI (25%) */}
            <div>
              <AmliAiColumn phase={phase} />
            </div>

            {/* Column 2: Planner Agent (25%) */}
            <div>
              <AnimatePresence mode="wait">
                {phase >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <PlannerAgentColumn phase={phase} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Column 3: Analysis Engine (33.33%) */}
            <div style={{ width: '100%', minWidth: 0, height: '100%' }}>
              <AnimatePresence mode="wait">
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ height: '100%' }}
                  >
                    <StreamingPromptColumn phase={phase} fastStreaming={fastStreaming} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right spacer (8.335%) - empty for centering */}
            <div></div>

          </div>
        </div>


      </div>
    </div>
  );
}

// ImmunAI Column Component
function AmliAiColumn({ phase }: { phase: number }) {
  return (
    <div className="w-full" style={{ width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-black/20 border border-white rounded-2xl p-6 backdrop-blur-sm shadow-2xl"
      >
        {/* ImmunAI Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div 
            className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: '#4D4172',
              padding: '8px'
            }}
          >
            <img
              src={immunexisIcon}
              alt="ImmunAI"
              className="w-full h-full object-contain"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <h3 className="text-white text-base font-medium">ImmunAI</h3>
            <p className="text-white/60 text-xs">Alert Flagged & Activated</p>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3"
        >
          <p className="text-white text-sm mb-2">
            Hey, I got something for you.
          </p>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span className="text-white/70 text-xs">
              High-priority alert detected
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Planner Agent Column Component
function PlannerAgentColumn({ phase }: { phase: number }) {
  const isThinking = phase >= 1;

  return (
    <div className="w-full" style={{ width: '100%' }}>
      <div className="relative bg-black/20 border border-white rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
            style={{
              background: 'linear-gradient(to bottom right, #ea580c, #c2410c)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <Orbit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-base font-medium">Planner Agent</h3>
            <p className="text-white/60 text-xs">Strategic Orchestration Agent</p>
          </div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4"
        >
          <p className="text-white text-sm">
            Hm, that is interesting. Let me <b><i><span style={{ color: '#facc15' }}>think</span></i></b> about this...
          </p>
        </motion.div>

        {/* Status */}
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span className="text-white/70 text-xs">Status</span>
          </div>
          <span className="text-orange-400 text-xs font-medium">
            {isThinking ? "Analyzing..." : "Standby"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Streaming Prompt Column Component
function StreamingPromptColumn({ phase, fastStreaming = false }: { phase: number; fastStreaming?: boolean }) {
  const [streamedText, setStreamedText] = useState("");
  const isStreaming = phase >= 2;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const fullPrompt = `📋 MY INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When ImmunAI sends me an alert, I must:

1. CLASSIFY THE ALERT
   • Determine alert type and severity
   • Assess clinical information needs

2. MAKE GO/NO-GO DECISION
   • Evaluate HCP engagement quality
   • Check consultation opportunity
   • Determine urgency level

3. IF GO: DEVELOP HCP STRATEGY
   • Choose engagement approach
   • Personalize based on HCP journey
   • Address specific clinical questions

4. ORCHESTRATE AGENT DEPLOYMENT
   • Deploy specialized agents
   • Ensure regulatory compliance
   • Create actionable Medical Affairs Signal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 ALERT RECEIVED
HCP: Dr. Aaron Morita, Rheumatologist Specialist
Email: aaron.morita1@gmail.com
Alert: Safety Inquiry - TNF inhibitor questions
Context: IMMUNEXIS for moderate-severe RA patient
Urgency: HIGH PRIORITY

💭 OKAY, LET ME THINK THROUGH THIS...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: CLASSIFY THE ALERT
Engaged prescriber with clinical concerns:
• Rheumatologist specialist (15+ publications)
• Patient: moderate-severe RA, failed methotrexate
• Initially asked about payer requirements & screening
• Discussed TB screening (PPD/IGRA required)
• Discussed hepatitis B testing requirements
• Reviewed DMARD failure documentation needs
• Asked about vaccination status & live vaccine risks
• Then requested self-administration training info
• Received resource packet to aaron.morita1@gmail.com
• Started typing question about adverse events
  and monitoring parameters (INQUIRY INTERRUPTED)

Severity: HIGH
Type: Clinical Safety + Treatment Initiation

Step 2: GO/NO-GO DECISION
✓ HCP Intent: STRONG (initiating TNF inhibitor)
✓ Patient Impact: HIGH (moderate-severe RA)
✓ Opportunity: CLEAR (safety & monitoring question)
✓ Window: 24-48 hours (active treatment planning)
✓ Contact: Email provided (aaron.morita1@gmail.com)

DECISION: GO ✅

Step 3: HCP CONVERSION STRATEGY
Dr. Morita needs clinical support:
• Address common adverse event profile
• Explain infection risk monitoring protocols
• Provide injection site reaction management
• Discuss TB screening interpretation guidelines
• Deliver personalized Medical Affairs consultation

Approach: Safety-focused RA treatment support
Channel: Personalized Medical Affairs Signal

Step 4: ORCHESTRATE AGENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Deploying team...

🤖 IMMUNAI
   → Analyze conversation history
   → Extract clinical questions asked
   → Identify TB screening & infection concerns
   → Note self-administration interest

📚 CONTENT ALIGNER
   → Compile TNF inhibitor safety data
   → Prepare infection monitoring protocols
   → Include ACR20 response data
   → Self-injection training materials

📞 CALL COACH
   → Create Medical Affairs talking points
   → Include TB screening guidelines
   → Prepare hepatitis B reactivation protocols
   → Reference vaccination timing recommendations

🎪 FINAL OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Medical Affairs Signal created with:
• Dr. Morita's incomplete adverse event question
• Contact: aaron.morita1@gmail.com
• Treatment initiation context (RA patient ready)
• Safety monitoring data package
• Self-administration training resources
• Direct Medical Affairs consultation scheduled

→ Convert clinical inquiry into confidence
→ Enable IMMUNEXIS prescribing ✨`;

  useEffect(() => {
    if (isStreaming) {
      let currentIndex = 0;
      // Adjust streaming speed based on toggle
      const speed = fastStreaming ? 2 : 15; // Much faster in fast mode
      const streamInterval = setInterval(() => {
        if (currentIndex < fullPrompt.length) {
          setStreamedText(fullPrompt.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(streamInterval);
        }
      }, speed);

      return () => clearInterval(streamInterval);
    }
  }, [isStreaming, fullPrompt, fastStreaming]);

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [streamedText]);

  return (
    <div className="w-full" style={{ width: '100%', minWidth: 0 }}>
      {/* Hide scrollbar CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .streaming-content::-webkit-scrollbar {
            display: none;
          }
          .streaming-content {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
      <div
        className="relative bg-black/20 border border-white rounded-2xl p-6 backdrop-blur-sm shadow-2xl"
        style={{ minWidth: 0 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center ring-1 ring-blue-400/40 flex-shrink-0">
            <SquareTerminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-base font-medium">Prompt Instructions</h3>
            <p className="text-white/60 text-xs">Reasoning Framework</p>
          </div>
        </div>

        {/* Streaming Content - FIXED HEIGHT with internal scroll */}
        <div
          ref={scrollContainerRef}
          className="bg-black/30 border border-white rounded-xl p-4 mb-4 overflow-y-auto streaming-content"
          style={{ 
            minWidth: 0, 
            width: '100%', 
            scrollBehavior: 'smooth', 
            height: '400px', 
            maxHeight: '400px'
          }}
        >
          <pre className="text-white text-xs font-mono leading-relaxed m-0" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'anywhere', maxWidth: '100%' }}>
            {streamedText}
            {isStreaming && streamedText.length < fullPrompt.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-blue-400"
              >
                ▋
              </motion.span>
            )}
          </pre>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-white/70 text-xs">Status</span>
          </div>
          <span className="text-blue-400 text-xs font-medium">
            {isStreaming && streamedText.length < fullPrompt.length ? "Streaming..." : "Complete"}
          </span>
        </div>
      </div>
    </div>
  );
}
