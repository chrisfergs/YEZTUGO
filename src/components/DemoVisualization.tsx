import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AmliLogo } from "./AmliLogo";
import immunexisIcon from "../assets/Immunexis-Icon.png";

// Force Tailwind to generate all classes we need - DO NOT REMOVE
const TAILWIND_CLASSES_NEEDED = [
  // Opacity classes
  "text-white/10", "text-white/20", "text-white/30", "text-white/40", "text-white/50", "text-white/60", "text-white/70", "text-white/80", "text-white/90",
  "bg-white/10", "bg-white/20", "bg-white/30", "bg-white/40", "bg-white/50", "bg-white/60", "bg-white/70", "bg-white/80", "bg-white/90",
  "border-white/10", "border-white/20", "border-white/30", "border-white/40", "border-white/50",
  "bg-black/10", "bg-black/20", "bg-black/30", "bg-black/40", "bg-black/50", "bg-black/60", "bg-black/70", "bg-black/80", "bg-black/90",
  "bg-gray-500/10", "bg-gray-500/20", "bg-gray-500/30", "bg-yellow-500/10", "bg-yellow-500/20", "bg-yellow-500/30",
  "shadow-gray-400/30", "shadow-yellow-500/50", "shadow-purple-500/50", "shadow-red-500/50",
  "text-gray-400/70", "text-yellow-400/70", "text-red-400/70",
  // Text sizes
  "text-3xl", "text-xs", "text-sm", "text-xl", "text-4xl",
  // Colors
  "text-gray-400", "text-yellow-400", "text-red-400", "bg-gray-400", "bg-yellow-500", "bg-red-500", "bg-green-500",
  // Safelist arbitrary hex color utilities used in gradients/glows (prevents JIT purge)
  "from-[#4D4172]", "to-[#4D4172]", // brand purples (darker shade)
  "bg-[#4D4172]", "text-[#4D4172]",
  // Other classes
  "font-mono", "backdrop-blur-sm", "rounded-2xl", "max-w-5xl", "space-y-8", "space-y-3"
];
import {
  MousePointerClick,
  Globe,
  Eye,
  Sparkles,
  UserCheck,
  MessageCircle,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

interface DemoVisualizationProps {
  isVisible: boolean;
  onComplete?: () => void;
  onPhaseChange?: (phase: number) => void;
  skipUserPerspective?: boolean;
  skipIdentityReveal?: boolean;
  startPhase?: number;
}

export function DemoVisualization({
  isVisible,
  onComplete,
  onPhaseChange,
  skipUserPerspective = false,
  skipIdentityReveal = false,
  startPhase = 0,
}: DemoVisualizationProps) {
  console.log("🔴 DemoVisualization: Component rendering, isVisible =", isVisible, "startPhase =", startPhase);

  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTransitioned = useRef(false);

  console.log("🔴 DemoVisualization: Current stage =", stage);

  // Reset stage when becoming visible or when startPhase changes
  useEffect(() => {
    console.log("🔴 DemoVisualization: isVisible useEffect running, isVisible =", isVisible, "startPhase =", startPhase);

    if (isVisible) {
      // Determine the correct initial stage based on startPhase and toggles
      let initialStage: number;

      if (startPhase > 0) {
        // If jumping directly to a phase, use that
        initialStage = startPhase;
      } else {
        // Otherwise, determine based on skip toggles
        // Stage 1 = User Perspective ("What if..." animation)
        // Stage 2 = SystemTrackingView (event timeline)
        // Stage 3 = Transition to next section

        if (skipUserPerspective && skipIdentityReveal) {
          // Skip both stages → go directly to transition
          initialStage = 3;
        } else if (skipUserPerspective) {
          // Skip user perspective → go to SystemTrackingView
          initialStage = 2;
        } else if (skipIdentityReveal) {
          // Skip SystemTrackingView → show user perspective then transition
          // We'll handle the skip in the click handler
          initialStage = 1;
        } else {
          // Show everything
          initialStage = 1;
        }
      }

      console.log("🔴 DemoVisualization: Setting stage to", initialStage, "(skipUserPerspective:", skipUserPerspective, "skipIdentityReveal:", skipIdentityReveal, ")");
      setStage(initialStage);
      onPhaseChange?.(initialStage);
      hasTransitioned.current = false; // Reset transition flag when stage changes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, skipUserPerspective, skipIdentityReveal, startPhase]); // Don't depend on onPhaseChange

  // Handle stage 3 transition
  useEffect(() => {
    if (stage === 3 && onComplete && !hasTransitioned.current) {
      hasTransitioned.current = true;
      console.log("🔴 DemoVisualization: Stage 3 - Scheduling transition to next section");
      const timer = setTimeout(() => {
        console.log("🔴 DemoVisualization: Calling onComplete to transition to next section");
        onComplete();
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]); // Only depend on stage, not onComplete

  const handleClick = () => {
    console.log("🔴 DemoVisualization: Main click handler, stage =", stage);

    if (stage === 1) {
      if (skipIdentityReveal) {
        console.log("🔴 DemoVisualization: Skipping SystemTrackingView, advancing from stage 1 to stage 3 (Transition)");
        setStage(3);
        onPhaseChange?.(3);
      } else {
        console.log("🔴 DemoVisualization: Advancing from stage 1 to stage 2 (SystemTrackingView)");
        setStage(2);
        onPhaseChange?.(2);
      }
    }
    // Stage 2 clicks should be handled by SystemTrackingView - don't interfere
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#030213] z-[9999] overflow-y-auto"
          style={{ cursor: stage === 1 ? 'pointer' : 'default' }}
          onClick={stage === 1 ? handleClick : undefined}
        >
          {/* Stage 1: ImmunAI wondering where HCP went */}
          {stage === 1 && (
            console.log("🔴 DemoVisualization: Rendering Stage 1 - ImmunAI perspective"),
            <div className="min-h-screen flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center space-y-8 max-w-2xl"
              >
                {/* ImmunAI Logo - animated and "alive" */}
                <motion.div
                  animate={{
                    rotateY: [0, -15, 15, -10, 10, 0],
                    scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    {/* Glowing aura (purple glow) */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full blur-[75px]"
                      style={{ background: 'radial-gradient(circle, rgba(77, 65, 114, 0.5), rgba(77, 65, 114, 0.2))' }}
                    />

                    {/* Main AI icon container */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-32 h-32 rounded-full flex items-center justify-center p-6 shadow-2xl"
                      style={{ backgroundColor: '#4D4172' }}
                    >
                      <img
                        src={immunexisIcon}
                        alt="ImmunAI"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    {/* Searching/confused particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          x: [0, (i - 1) * 80, (i - 1) * 120],
                          y: [0, -40, -60],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#4D4172' }}
                      />
                    ))}
                  </div>

                  {/* ImmunAI Branding */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4D4172' }} />
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-2xl font-medium">
                        ImmunAI
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Confused/wondering text - streaming */}
                <StreamingText />

                {/* Pulsing dot that appears after text completes */}
                <PulsingScrollDot />
              </motion.div>
            </div>
          )}

          {/* Stage 2: Tracking Journey - system POV */}
          {stage === 2 && (
            console.log("🔴 DemoVisualization: Rendering Stage 2 - SystemTrackingView"),
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-h-screen flex items-center justify-center px-6 py-20"
            >
              <SystemTrackingView
                onComplete={() => {
                  setStage(3);
                  onPhaseChange?.(3);
                }}
                skipIdentityReveal={skipIdentityReveal}
              />
            </motion.div>
          )}

          {/* Stage 3: Transition to next section */}
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="text-white text-xl">Transitioning to next section...</div>
            </motion.div>
          )}

          {/* Ambient particles floating in background */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined"
                      ? window.innerWidth
                      : 1920),
                  y:
                    Math.random() *
                    (typeof window !== "undefined"
                      ? window.innerHeight
                      : 1080),
                  opacity: 0,
                }}
                animate={{
                  y: [
                    null,
                    Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 1080),
                  ],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-1 h-1 rounded-full blur-sm"
                style={{
                  backgroundColor: '#4D4172',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Streaming text component
function StreamingText() {
  const [text1, setText1] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const message1 = "What if you could transform a single inquiry into a complete picture of what every HCP truly needs?";

  useEffect(() => {
    // Initial delay before message starts
    const initialDelay = setTimeout(() => {
      let index1 = 0;

      // Stream the message
      const timer1 = setInterval(() => {
        if (index1 < message1.length) {
          setText1(message1.substring(0, index1 + 1));
          index1++;
        } else {
          clearInterval(timer1);
          // Mark as complete after message finishes
          setTimeout(() => {
            setIsComplete(true);
          }, 600);
        }
      }, 70); // Speed of message
    }, 1200); // Initial delay before anything starts

    return () => clearTimeout(initialDelay);
  }, [message1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="space-y-4"
    >
      {/* Single bold statement */}
      <h2 className="text-white text-4xl min-h-[3rem]" style={{ color: '#ffffff' }}>
        {text1}
        {text1.length > 0 && text1.length < message1.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-8 bg-white ml-1 align-middle"
          />
        )}
      </h2>
    </motion.div>
  );
}

// Pulsing scroll dot
function PulsingScrollDot() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 6.5, duration: 0.6 }}
      className="flex flex-col items-center gap-4 pt-12"
    >
      {/* Pulsing dot */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-4 h-4 rounded-full shadow-lg"
        style={{ backgroundColor: '#4D4172', boxShadow: '0 10px 25px rgba(77, 65, 114, 0.4)' }}
      />

      {/* Down arrow hint */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-white/40 text-sm"
      >
        ↓
      </motion.div>
    </motion.div>
  );
}

// System Tracking View - backend perspective with phased reveal
function SystemTrackingView({ onComplete, skipIdentityReveal = false }: { onComplete?: () => void; skipIdentityReveal?: boolean }) {
  console.log("🔵 SystemTrackingView: Component rendering/re-rendering");
  
  const [phase, setPhase] = useState<
    "anonymous" | "identity-reveal" | "known"
  >("anonymous");
  const [visibleEvents, setVisibleEvents] = useState<number[]>(
    [],
  );
  const [showSummary, setShowSummary] = useState(false);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerHeight < 900; // 13" laptops typically have ~900px height
      setIsSmallScreen(isSmall);
      console.log("📱 Screen size check:", { 
        height: window.innerHeight, 
        isSmallScreen: isSmall 
      });
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Smooth internal scrolling - container stays static, content scrolls up
  useEffect(() => {
    console.log("🔍 SCROLL EFFECT TRIGGERED:", {
      visibleEventsLength: visibleEvents.length,
      phase,
      showSummary,
      isSmallScreen,
      trigger: "phase or isSmallScreen changed"
    });

    if (containerRef.current) {
      console.log("📱 Phase-based scrolling triggered for phase:", phase);
      
      // Multi-step animation: 1) Container expands, 2) Scroll smoothly, 3) Events stream
      setTimeout(() => {
        if (containerRef.current) {
          const scrollHeight = containerRef.current.scrollHeight;
          const clientHeight = containerRef.current.clientHeight;
          const currentScrollTop = containerRef.current.scrollTop;
          const shouldScroll = scrollHeight > clientHeight;
          
          console.log("🔍 DETAILED SCROLL INFO:", { 
            scrollHeight, 
            clientHeight,
            currentScrollTop,
            shouldScroll,
            isSmallScreen,
            phase,
            showSummary,
            visibleEventsCount: visibleEvents.length
          });
          
          if (shouldScroll) {
            // Phase-specific scrolling with redistributed buffers
            let extraPadding = 80; // Default padding for first batch
            
            if (phase === "identity-reveal") {
              extraPadding = 200; // Bit more buffer for KOL divider + events
              console.log("🟡 IDENTITY-REVEAL SCROLL: Using 200px buffer");
            } else if (phase === "known") {
              extraPadding = 450; // Larger buffer that fully accounts for summary (was 350)
              console.log("🟣 KNOWN PHASE SCROLL: Using 450px buffer (should handle summary without additional scroll)");
            }
            
            const optimalScrollTop = Math.max(0, scrollHeight - clientHeight + extraPadding);
            
            console.log("🔍 SCROLL CALCULATION:", {
              formula: `${scrollHeight} - ${clientHeight} + ${extraPadding} = ${optimalScrollTop}`,
              willScrollFrom: currentScrollTop,
              willScrollTo: optimalScrollTop,
              scrollDistance: optimalScrollTop - currentScrollTop
            });
            
            containerRef.current.scrollTo({
              top: optimalScrollTop,
              behavior: 'smooth'
            });
            console.log("📱 EXECUTED SCROLL - Phase:", phase, "Buffer:", extraPadding, "ScrollTop:", optimalScrollTop);
          } else {
            console.log("📱 NO SCROLL NEEDED - Content fits in container");
          }
        }
      }, 1000); // Wait for container expansion + content rendering
    }
  }, [phase, isSmallScreen]);

  // Pre-scroll IMMEDIATELY on phase transitions - scroll first, then stream content
  useEffect(() => {
    if (containerRef.current && phase !== "anonymous") {
      console.log("📱 IMMEDIATE PRE-SCROLL for phase transition:", phase);

      // Immediate scroll when phase changes (before any events stream in)
      setTimeout(() => {
        if (containerRef.current) {
          // Calculate scroll based on what content is COMING, not what's currently there
          const currentScrollHeight = containerRef.current.scrollHeight;
          const clientHeight = containerRef.current.clientHeight;
          
          // Estimate final content height including upcoming events + summary
          let estimatedFinalHeight = currentScrollHeight;
          
          if (phase === "identity-reveal") {
            estimatedFinalHeight += 200; // Estimate for KOL divider + 2 yellow events
          } else if (phase === "known") {
            estimatedFinalHeight += 400; // Estimate for 3 purple/red events + summary metrics
          }
          
          const shouldScroll = estimatedFinalHeight > clientHeight;
          
          console.log("📱 PRE-SCROLL CALCULATION:", {
            phase,
            currentScrollHeight,
            clientHeight,
            estimatedFinalHeight,
            shouldScroll
          });

          if (shouldScroll) {
            // Generous buffer for upcoming content
            let extraPadding = phase === "identity-reveal" ? 250 : 650; // Extra generous for known phase + summary
            
            const optimalScrollTop = Math.max(0, estimatedFinalHeight - clientHeight + extraPadding);
            
            containerRef.current.scrollTo({
              top: optimalScrollTop,
              behavior: 'smooth'
            });
            console.log("📱 PRE-SCROLL EXECUTED:", { 
              phase, 
              extraPadding, 
              optimalScrollTop,
              message: "Scrolled BEFORE events stream in"
            });
          }
        }
      }, 100); // Very quick pre-scroll before events start streaming
    }
  }, [phase, isSmallScreen]);

  // Ensure summary is fully visible when it appears
  useEffect(() => {
    if (showSummary && containerRef.current) {
      console.log("📊 Summary appeared - analyzing container for full visibility");
      
      setTimeout(() => {
        if (containerRef.current) {
          const scrollHeight = containerRef.current.scrollHeight;
          const clientHeight = containerRef.current.clientHeight;
          const currentScrollTop = containerRef.current.scrollTop;
          
          console.log("📊 SUMMARY SCROLL ANALYSIS:", {
            scrollHeight,
            clientHeight,
            currentScrollTop,
            contentOverflow: scrollHeight - clientHeight,
            summaryNeedsSpace: scrollHeight > clientHeight
          });
          
          // Scroll way beyond bottom to ensure complete summary visibility
          const generousScrollTop = scrollHeight + 800; // Ultra generous padding for complete visibility
          
          containerRef.current.scrollTo({
            top: generousScrollTop,
            behavior: 'smooth'
          });
          
          console.log("📊 SUMMARY SCROLL EXECUTED:", {
            targetScrollTop: generousScrollTop,
            extraPadding: 800,
            message: "Scrolled way beyond bottom for complete summary"
          });
          
          // Log final position after scroll
          setTimeout(() => {
            if (containerRef.current) {
              console.log("📊 FINAL SCROLL POSITION:", {
                finalScrollTop: containerRef.current.scrollTop,
                maxPossibleScroll: containerRef.current.scrollHeight - containerRef.current.clientHeight
              });
              console.log("🎯 SystemTrackingView: Summary complete - ready for click to advance to Data Evolution");
            }
          }, 1000);
        }
      }, 300); // Small delay to let summary render
    }
  }, [showSummary]);

  console.log("🔵 SystemTrackingView: Current state:", {
    phase,
    visibleEvents,
    showSummary,
    waitingForClick
  });

  useEffect(() => {
    console.log("🟢 SystemTrackingView: Initial useEffect running - setting up timers");
    
    // Phase 1: Container expands first, then events stream in
    const timers = [
      // Container expansion happens immediately, then events stream in after delay
      setTimeout(() => {
        console.log("⏰ Timer 1: Setting visibleEvents to [0] at 1000ms (after container expansion)");
        setVisibleEvents([0]);
      }, 1000), // Delayed to allow container to expand first
      setTimeout(() => {
        console.log("⏰ Timer 2: Setting visibleEvents to [0, 1] at 1800ms");
        setVisibleEvents([0, 1]);
      }, 1800),
      setTimeout(() => {
        console.log("⏰ Timer 3: Setting visibleEvents to [0, 1, 2] at 2600ms");
        setVisibleEvents([0, 1, 2]);
      }, 2600),
      setTimeout(() => {
        console.log("⏰ Timer 4: Setting visibleEvents to [0, 1, 2, 3] at 3400ms");
        setVisibleEvents([0, 1, 2, 3]);
      }, 3400),

      // Wait for user click to reveal identity after webinar registration
      setTimeout(() => {
        console.log("⏰ Timer 5: Setting waitingForClick to true at 4200ms");
        setWaitingForClick(true);
      }, 4200),
    ];

    console.log("🟢 SystemTrackingView: Timers set up:", timers.length, "timers created");

    return () => {
      console.log("🔴 SystemTrackingView: Cleaning up timers");
      timers.forEach(clearTimeout);
    };
  }, []);

  // Continue after click
  useEffect(() => {
    console.log("🟡 SystemTrackingView: Phase useEffect running, phase =", phase);
    
    if (phase === "identity-reveal") {
      console.log("🟡 SystemTrackingView: Setting up identity-reveal timers");
      
      const timers = [
        // Phase 2: Container expands first, then identity events stream in
        setTimeout(() => {
          console.log("⏰ Identity Timer 1: Setting visibleEvents to [0, 1, 2, 3, 4] at 1000ms (after container expansion)");
          setVisibleEvents([0, 1, 2, 3, 4]);
        }, 1000), // Delayed to allow container expansion

        // Profile merge step (Event 5: Profile Enriched)
        setTimeout(() => {
          console.log("⏰ Identity Timer 2: Setting visibleEvents to [0, 1, 2, 3, 4, 5] at 1800ms");
          setVisibleEvents([0, 1, 2, 3, 4, 5]);
        }, 1800),

      ];

      console.log("🟡 SystemTrackingView: Identity-reveal timers set up:", timers.length, "timers created");

      return () => {
        console.log("🔴 SystemTrackingView: Cleaning up identity-reveal timers");
        timers.forEach(clearTimeout);
      };
    }
  }, [phase]);

  // Known phase timers - separate useEffect to prevent cleanup issues
  useEffect(() => {
    if (phase === "known") {
      console.log("🟣 SystemTrackingView: Setting up known phase timers");
      
      const knownTimers = [
        // Container expands first, then known events stream in sequentially
        setTimeout(() => {
          console.log("⏰ Known Timer 1: Setting visibleEvents to [0, 1, 2, 3, 4, 5, 6] at 1000ms (after container expansion)");
          setVisibleEvents([0, 1, 2, 3, 4, 5, 6]);
        }, 1000), // Event 6: Chat Initiated (delayed for container expansion)
        setTimeout(() => {
          console.log("⏰ Known Timer 2: Setting visibleEvents to [0, 1, 2, 3, 4, 5, 6, 7] at 1800ms");
          setVisibleEvents([0, 1, 2, 3, 4, 5, 6, 7]);
        }, 1800), // Event 7: Deep Engagement (800ms gap)
        setTimeout(() => {
          console.log("⏰ Known Timer 3: Setting visibleEvents to [0, 1, 2, 3, 4, 5, 6, 7, 8] AND showSummary to true at 2600ms");
          setVisibleEvents([0, 1, 2, 3, 4, 5, 6, 7, 8]);
          setShowSummary(true); // Summary appears WITH the last event
        }, 2600), // Event 8: Chat Abandoned + Summary metrics together
      ];

      console.log("🟣 SystemTrackingView: Known phase timers set up:", knownTimers.length, "timers created");

      return () => {
        console.log("🔴 SystemTrackingView: Cleaning up known phase timers");
        knownTimers.forEach(clearTimeout);
      };
    }
  }, [phase]);

  const handleClick = (e: React.MouseEvent) => {
    console.log("👆 SystemTrackingView: Click detected!", {
      phase,
      waitingForClick,
      showSummary,
      skipIdentityReveal,
      canAdvanceToIdentityReveal: waitingForClick && phase === "anonymous",
      canAdvanceToKnown: phase === "identity-reveal",
      canAdvanceToDataEvolution: phase === "known" && showSummary
    });
    
    e.stopPropagation();
    if (waitingForClick && phase === "anonymous") {
      // Skip identity-reveal phase if toggle is enabled
      if (skipIdentityReveal) {
        console.log("👆 SystemTrackingView: Skipping identity-reveal, going directly to known phase");
        setWaitingForClick(false);
        setPhase("known");
      } else {
        console.log("👆 SystemTrackingView: Advancing to identity-reveal phase");
        setWaitingForClick(false);
        setPhase("identity-reveal");
      }
    } else if (phase === "identity-reveal") {
      console.log("👆 SystemTrackingView: Advancing to known phase");
      setPhase("known");
    } else if (phase === "known" && showSummary && onComplete) {
      console.log("👆 SystemTrackingView: Summary complete - advancing to Data Evolution");
      onComplete();
    } else {
      console.log("👆 SystemTrackingView: Click ignored - conditions not met");
    }
  };

  const events = [
    // ANONYMOUS PHASE
    {
      time: "14:23:15",
      action: "Targeted Ad Click Detected",
      detail: "",
      icon: MousePointerClick,
      phase: "anonymous",
      color: "gray",
    },
    {
      time: "14:23:18",
      action: "Personalized Landing Page Load",
      detail: "",
      icon: Globe,
      phase: "anonymous",
      color: "gray",
    },
    {
      time: "14:23:42",
      action: "Safety Content Reviewed",
      detail: "",
      icon: Eye,
      phase: "anonymous",
      color: "gray",
    },
    {
      time: "14:24:15",
      action: "Webinar Registration",
      detail: "Email Captured: aaron.morita1@gmail.com",
      icon: UserCheck,
      phase: "anonymous",
      color: "green",
      becomesKnown: true,
    },

    // IDENTITY REVEAL
    {
      time: "14:24:29",
      action: "KOL Profile Merged",
      detail:
        "Email: aaron.morita1@gmail.com → Dr. Aaron Morita",
      icon: Sparkles,
      phase: "reveal",
      color: "yellow",
      isIdentityReveal: true,
    },

    // PROFILE ENRICHMENT
    {
      time: "14:24:31",
      action: "Profile Enriched",
      detail:
        "KOL • 15+ Publications • Tier 1",
      icon: UserCheck,
      phase: "reveal",
      color: "yellow",
      isProfileMerge: true,
    },

    // KNOWN PHASE
    {
      time: "14:25:05",
      action: "Chat Initiated",
      detail: "Dermo Chat Session",
      icon: MessageCircle,
      phase: "known",
      color: "purple",
    },
    {
      time: "14:25:48",
      action: "Deep Engagement",
      detail: "Melasyl, Mela B3",
      icon: BarChart3,
      phase: "known",
      color: "purple",
    },

    // ABANDONMENT
    {
      time: "14:26:33",
      action: "Chat Abandoned",
      detail: "Response deemed to be in need of improvement.",
      icon: AlertTriangle,
      phase: "abandoned",
      color: "red",
      isAbandoned: true,
    },
  ];

  const getColorClasses = (
    color: string,
    isActive: boolean,
  ) => {
    if (!isActive) return "text-white/40";

    switch (color) {
      case "gray":
        return "text-gray-100";
      case "green":
        return "text-green-200";
      case "yellow":
        return "text-yellow-200";
      case "purple":
        return "text-[#B080FF]";
      case "red":
        return "text-red-200";
      default:
        return "text-white/90";
    }
  };

  const getDotClasses = (color: string, isActive: boolean) => {
    if (!isActive) return "bg-white/10";

    switch (color) {
      case "gray":
        return "bg-gray-400 shadow-lg shadow-gray-400/30";
      case "green":
        return "bg-green-500 shadow-lg shadow-green-500/50";
      case "yellow":
        return "bg-yellow-500 shadow-lg shadow-yellow-500/50";
      case "purple":
        return "bg-[#FF6B6B] shadow-lg shadow-red-500/50";
      case "red":
        return "bg-red-500 shadow-lg shadow-red-500/50";
      default:
        return "bg-white/20";
    }
  };

  // Only show events up to current phase
  const displayedEvents =
    phase === "anonymous"
      ? events.slice(0, 4) // Now 4 anonymous events (including webinar registration)
      : phase === "identity-reveal"
        ? events.slice(0, 6) // Include both identity reveal AND profile merge (now events 0-5)
        : events; // Show ALL 9 events in known phase

  console.log("📊 SystemTrackingView: Event filtering:", {
    phase,
    totalEvents: events.length,
    displayedEventsCount: displayedEvents.length,
    visibleEventsCount: visibleEvents.length,
    displayedEventIndices: displayedEvents.map((_, i) => i),
    visibleEventIndices: visibleEvents
  });


  console.log("🎨 SystemTrackingView: About to render component");

  return (
    <div
      className="w-full max-w-5xl space-y-8"
      onClick={handleClick}
      style={{
        width: '100%',
        maxWidth: '80rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10,
        cursor: (waitingForClick && phase === "anonymous") || phase === "identity-reveal" || (phase === "known" && showSummary) ? 'pointer' : 'default'
      }}
    >

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
        style={{ textAlign: 'center', marginBottom: '24px' }}
      >
        <div className="flex items-center justify-center gap-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
            style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}
          />
          <h2 className="text-white text-3xl" style={{ color: '#ffffff', fontSize: '1.875rem', margin: 0 }}>
            Understanding Digital Body Language
          </h2>
        </div>
        <p className="text-white/70" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
          {phase === "anonymous" &&
            "Tracking Anonymous Visitor..."}
          {phase === "identity-reveal" &&
            "KOL Identified → Profile Enriched"}
          {phase === "known" &&
            "Anonymous → KOL → Engaged → Inquiry"}
        </p>
      </motion.div>


      {/* Event Timeline - Container expands first, then content streams in */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: 1, 
          height: isSmallScreen ? 
                 (phase === "known" && showSummary ? "600px" : "450px") : // Even larger height when summary appears
                 (phase === "anonymous" ? "400px" : 
                  phase === "identity-reveal" ? "650px" : 
                  "900px") // Dynamic heights only on large screens
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-sm"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px',
          fontFamily: '"Courier New", Consolas, "Liberation Mono", Menlo, Monaco, "Lucida Console", monospace',
          fontSize: '14px',
          overflow: 'auto', // Always scrollable for smooth experience
          width: '100%'
        }}
        layout // This enables smooth height transitions
      >
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayedEvents.map((event, index) => {
            const isVisible = visibleEvents.includes(index);
            const isStreaming =
              isVisible &&
              index === visibleEvents[visibleEvents.length - 1];
            const Icon = event.icon;

            console.log(`📋 Event ${index}:`, {
              action: event.action,
              isVisible,
              isStreaming,
              color: event.color,
              phase: event.phase
            });

            return (
              <div key={index}>
                {/* Identity reveal divider */}
                {event.isIdentityReveal &&
                  phase !== "anonymous" && (
                    console.log("🟡 Rendering KOL IDENTIFIED divider for event:", event.action),
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="my-6 relative"
                      style={{
                        margin: '32px 0',
                        position: 'relative',
                        height: '80px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Glowing divider line */}
                      <div 
                        className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" 
                        style={{
                          height: '1px',
                          width: '100%',
                          background: 'linear-gradient(to right, transparent, #eab308, transparent)',
                          position: 'absolute',
                          top: '50%',
                          left: 0,
                          right: 0
                        }}
                      />

                      {/* Identity badge - centered with flexbox */}
                      <motion.div
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                        style={{
                          backgroundColor: '#030213',
                          padding: '12px 24px',
                          borderRadius: '9999px',
                          border: '2px solid #eab308',
                          zIndex: 10,
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto'
                        }}
                      >
                        <span 
                          className="text-yellow-400 text-sm uppercase tracking-wider font-semibold"
                          style={{
                            color: '#facc15',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 600
                          }}
                        >
                          KOL Identified
                        </span>
                      </motion.div>
                    </motion.div>
                  )}

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    x: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-4"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    opacity: isVisible ? 1 : 0
                  }}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 pt-1" style={{ flexShrink: 0, paddingTop: '4px' }}>
                    <motion.div
                      animate={
                        isStreaming
                          ? {
                              scale: [1, 1.4, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.6,
                        repeat: isStreaming ? Infinity : 0,
                      }}
                      className={`w-3 h-3 rounded-full ${getDotClasses(event.color, isVisible)}`}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: isVisible ? (
                          event.color === 'gray' ? '#9ca3af' :
                          event.color === 'green' ? '#10b981' :
                          event.color === 'yellow' ? '#eab308' :
                          event.color === 'purple' ? '#7B2DFF' :
                          event.color === 'red' ? '#ef4444' : '#ffffff'
                        ) : 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>

                  {/* Event details */}
                  <div className="flex-1 space-y-1.5" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        className={`text-sm ${isVisible ? "text-white/90" : "text-white/40"}`}
                        style={{
                          fontSize: '14px',
                          color: isVisible ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        {event.time}
                      </span>
                      <Icon
                        className={`w-5 h-5 ${getColorClasses(event.color, isVisible)}`}
                        style={{
                          width: '20px',
                          height: '20px',
                          color: isVisible ? (
                            event.color === 'gray' ? '#f3f4f6' :
                            event.color === 'green' ? '#bbf7d0' :
                            event.color === 'yellow' ? '#fef08a' :
                            event.color === 'purple' ? '#B080FF' :
                            event.color === 'red' ? '#fecaca' : '#ffffff'
                          ) : 'rgba(255, 255, 255, 0.4)'
                        }}
                      />
                      <span
                        className={`text-base ${getColorClasses(event.color, isVisible)}`}
                        style={{
                          fontSize: '16px',
                          color: isVisible ? (
                            event.color === 'gray' ? '#f3f4f6' :
                            event.color === 'green' ? '#bbf7d0' :
                            event.color === 'yellow' ? '#fef08a' :
                            event.color === 'purple' ? '#B080FF' :
                            event.color === 'red' ? '#fecaca' : '#ffffff'
                          ) : 'rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        {event.action}
                      </span>

                      {/* Anonymous badge */}
                      {event.phase === "anonymous" && !event.becomesKnown &&
                        isVisible && (
                          <span 
                            className="text-sm text-gray-500 bg-gray-500/10 px-2 py-0.5 rounded"
                            style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              backgroundColor: 'rgba(107, 114, 128, 0.1)',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            UNKNOWN
                          </span>
                        )}

                      {/* Becomes Known badge */}
                      {event.becomesKnown && isVisible && (
                        <span 
                          style={{
                            fontSize: '13px',
                            color: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          BECOMES KNOWN
                        </span>
                      )}

                      {/* Identity badge */}
                      {event.isIdentityReveal && isVisible && (
                        <span 
                          className="text-sm text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded"
                          style={{
                            fontSize: '13px',
                            color: '#facc15',
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(234, 179, 8, 0.3)'
                          }}
                        >
                          KOL IDENTIFIED
                        </span>
                      )}

                      {/* Profile merge badge */}
                      {event.isProfileMerge && isVisible && (
                        <span 
                          className="text-sm text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded"
                          style={{
                            fontSize: '13px',
                            color: '#facc15',
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(234, 179, 8, 0.3)'
                          }}
                        >
                          ENRICHED
                        </span>
                      )}
                    </div>
                    {event.detail && (
                      <div
                        className={`text-base pl-20 ${
                          isVisible
                            ? getColorClasses(event.color, true)
                                .replace("text-", "text-")
                                .replace("-400", "-400/70")
                                .replace("-500", "-400/70")
                            : "text-white/30"
                        }`}
                        style={{
                          fontSize: '16px',
                          paddingLeft: '80px',
                          color: isVisible ? (
                            event.color === 'gray' ? 'rgba(243, 244, 246, 0.95)' :
                            event.color === 'green' ? 'rgba(187, 247, 208, 0.95)' :
                            event.color === 'yellow' ? 'rgba(254, 240, 138, 0.95)' :
                            event.color === 'purple' ? 'rgba(176, 128, 255, 0.95)' :
                            event.color === 'red' ? 'rgba(254, 202, 202, 0.95)' : 'rgba(255, 255, 255, 0.85)'
                          ) : 'rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        {event.detail}
                      </div>
                    )}
                  </div>

                  {/* Streaming indicator */}
                  {isStreaming && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                      className={getColorClasses(
                        event.color,
                        true,
                      )}
                    >
                      ●
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Journey Summary */}
        {showSummary && (
          console.log("📊 SystemTrackingView: Rendering Journey Summary - showSummary =", showSummary),
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.6 }}
            className="mt-8 pt-6 border-t border-white/10"
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              opacity: 1
            }}
          >
            <div 
              className="grid grid-cols-4 gap-6 text-center"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                textAlign: 'center'
              }}
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-3xl text-gray-200 mb-2"
                  style={{
                    fontSize: '1.875rem',
                    color: '#e5e7eb',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  1:14
                </motion.div>
                <div 
                  className="text-white/70 text-sm"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  Anonymous Phase
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-3xl text-[#B080FF] mb-2"
                  style={{
                    fontSize: '1.875rem',
                    color: '#B080FF',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  2:04
                </motion.div>
                <div 
                  className="text-white/70 text-sm"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  Known + Engaged
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="text-3xl text-[#B080FF] mb-2"
                  style={{
                    fontSize: '1.875rem',
                    color: '#B080FF',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  9
                </motion.div>
                <div 
                  className="text-white/70 text-sm"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  Events Captured
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-3xl text-red-300 mb-2"
                  style={{
                    fontSize: '1.875rem',
                    color: '#fca5a5',
                    marginBottom: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  1
                </motion.div>
                <div 
                  className="text-white/70 text-sm"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  Inquiry
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

    </div>
  );
}
