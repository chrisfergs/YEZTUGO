import React, { useState, useEffect } from 'react';
import { WebinarRegistrationForm } from './components/WebinarRegistrationForm';
import { AmliLogo } from './components/AmliLogo';
import { MechanismSection } from './components/MechanismSection';
import { EfficacySection } from './components/EfficacySection';
import { SafetyHighlights } from './components/SafetyHighlights';
import { AmliAiChat } from './components/AmliAiChat';
import { DemoOverlay } from './components/DemoOverlay';
import { DemoVisualization } from './components/DemoVisualization';
import { DataEvolutionVisualization } from './components/DataEvolutionVisualization';
import { AgenticOrchestrationVisualization } from './components/AgenticOrchestrationVisualization';
import { AgentDeploymentVisualization } from './components/AgenticDeploymentVisualization';
import { DemoNav, DemoSection, SectionToggles, getSessionId, loadSettings, saveSettings } from './components/DemoNav';
import { ShieldCheck, Stethoscope, BookOpen, UserCheck, FileBarChart, Video, Atom, Syringe, ClipboardCheck, CalendarDays, ShieldAlert, Users, MessageCircle } from 'lucide-react';
import { Badge } from './components/ui/badge';
import gileadLogo from './assets/Gilead-Logo.svg';
import yeztugoLogo from './assets/Yeztugo-Logo.svg';
import sarahPhoto from './assets/Sarah.png';
import jamesPhoto from './assets/James.png';

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [demoMode, setDemoMode] = useState<'hidden' | 'dark' | 'visualization' | 'data-evolution' | 'agentic-orchestration' | 'agent-deployment'>('hidden');
  const [resetKey, setResetKey] = useState(0);
  
  // Default settings
  const defaultToggles: SectionToggles = {
    // Demo Tracking toggles (ON = show feature)
    showUserPerspective: true,
    showIdentityReveal: true,
    // Data Evolution toggle (ON = show section)
    showDataEvolution: true,
    // Agentic Orchestration toggles (ON = show feature)
    showOrfoIntro: true,
    slowStreaming: true,
    // Agent Deployment toggles (ON = show feature)
    showAgentCollaboration: true,
    showUIWireframe: true
  };
  
  // Section toggles for DemoNav - persists per session
  const [sectionToggles, setSectionToggles] = useState<SectionToggles>(defaultToggles);
  const [sessionId] = useState<string>(() => getSessionId());

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = loadSettings(sessionId);
    if (savedSettings) {
      console.log('📦 App: Loaded saved settings from session:', sessionId, savedSettings);
      setSectionToggles(savedSettings);
    } else {
      console.log('📦 App: No saved settings found, using defaults');
    }
  }, [sessionId]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    saveSettings(sessionId, sectionToggles);
    console.log('💾 App: Saved settings to session:', sessionId, sectionToggles);
  }, [sessionId, sectionToggles]);
  
  console.log("🟠 App: Rendering with state:", { showChat, demoMode });

  // Map demoMode to DemoSection
  const getCurrentSection = (): DemoSection | null => {
    if (demoMode === 'visualization') return 'demo-tracking';
    if (demoMode === 'data-evolution') return 'data-evolution';
    if (demoMode === 'agentic-orchestration') return 'agentic-orchestration';
    if (demoMode === 'agent-deployment') return 'agent-deployment';
    return null;
  };

  // Track current phase for each section
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  // Handle section changes from DemoNav
  const handleSectionChange = (section: DemoSection, startPhaseOverride?: number) => {
    console.log("🎯 App: Section change requested:", section, "startPhase:", startPhaseOverride);

    // Map DemoSection to demoMode
    const modeMap: Record<DemoSection, typeof demoMode> = {
      'demo-tracking': 'visualization',
      'data-evolution': 'data-evolution',
      'agentic-orchestration': 'agentic-orchestration',
      'agent-deployment': 'agent-deployment'
    };

    // Set the current phase if provided, otherwise start at 0
    const initialPhase = startPhaseOverride !== undefined ? startPhaseOverride : 0;
    console.log("🎯 App: Setting currentPhase to:", initialPhase);
    setCurrentPhase(initialPhase);

    setDemoMode(modeMap[section]);
  };

  // Handle phase changes from DemoNav or visualizations
  const handlePhaseChange = (phase: number) => {
    console.log("🎯 App: Phase change requested:", phase);
    setCurrentPhase(phase);
  };

  // Handle toggle changes from DemoNav
  const handleToggleChange = (key: string, value: boolean) => {
    console.log("🎯 App: Toggle change:", key, value);
    setSectionToggles(prev => {
      const newToggles = { ...prev, [key]: value };

      // If we're currently in a demo section, recalculate the phase based on new toggles
      if (demoMode !== 'hidden' && demoMode !== 'dark') {
        const section = getCurrentSection();
        if (section) {
          // Calculate what the starting phase should be with the new toggle settings
          const newStartPhase = getStartPhaseForSection(section, newToggles);
          console.log("🎯 App: Recalculating phase due to toggle change, new phase:", newStartPhase);
          setCurrentPhase(newStartPhase);
        }
      }

      return newToggles;
    });
  };

  // Helper function to calculate starting phase for a section based on toggles
  const getStartPhaseForSection = (section: DemoSection, toggles: SectionToggles): number => {
    switch (section) {
      case "demo-tracking":
        const skipUser = !toggles.showUserPerspective;
        const skipIdentity = !toggles.showIdentityReveal;
        if (skipUser && skipIdentity) return 3;
        if (skipUser) return 2;
        if (skipIdentity) return 1;
        return 1;

      case "data-evolution":
        return 0;

      case "agentic-orchestration":
        const skipOrfo = !toggles.showOrfoIntro;
        const fastStream = !toggles.slowStreaming;
        if (skipOrfo && fastStream) return 3;
        if (skipOrfo) return 1;
        return 0;

      case "agent-deployment":
        const skipAgents = !toggles.showAgentCollaboration;
        const skipWireframe = !toggles.showUIWireframe;
        if (skipAgents && skipWireframe) return 9;
        if (skipAgents) return 4;
        return 0;

      default:
        return 0;
    }
  };

  // Handle back to homepage from DemoNav
  const handleBackToHomepage = () => {
    console.log("🎯 App: Returning to homepage");
    setDemoMode('hidden');
    setShowChat(false);
    setTimeout(() => {
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const currentSection = getCurrentSection();

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Main page content - hidden during demo mode */}
      <div className={demoMode !== 'hidden' ? 'hidden' : ''} style={demoMode !== 'hidden' ? { display: 'none' } : {}}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src={gileadLogo} alt="Gilead" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300" />
            <img src={yeztugoLogo} alt="Yeztugo" className="h-10 object-contain" />
          </div>
          <Badge variant="outline" className="" style={{ borderColor: '#C5203F', color: '#C5203F' }}>
            For Healthcare Professionals
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge 
                className="border-0" 
                style={{ 
                  backgroundColor: 'rgba(197, 32, 63, 0.1)', 
                  color: '#C5203F',
                  fontWeight: 'bold'
                }}
              >
                lenacapavir - HIV-1 capsid inhibitor
              </Badge>
              <h1 className="text-5xl text-[#030213]">
                Understanding Safety & Evidence with YEZTUGO
              </h1>
              <p className="text-xl text-gray-600">
              A first-in-class, long-acting HIV-1 capsid inhibitor administered as a twice-yearly subcutaneous injection. YEZTUGO (lenacapavir) is indicated for HIV-1 pre-exposure prophylaxis (PrEP) to reduce the risk of sexually acquired HIV-1 infection.
              </p>
            </div>

            {/* Key Safety Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Atom className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C5203F' }} />
                <div>
                  <h4 className="text-[#030213] mb-1">Multi-Stage Capsid Inhibition</h4>
                  <p className="text-gray-600">
                  Targets the HIV-1 capsid protein at multiple stages of the viral lifecycle, inhibiting viral replication through a mechanism distinct from all other approved antiretrovirals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Syringe className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C5203F' }} />
                <div>
                  <h4 className="text-[#030213] mb-1">Twice-Yearly Dosing</h4>
                  <p className="text-gray-600">
                  Administered as a subcutaneous injection every 6 months by a healthcare provider, offering a long-acting alternative to daily oral PrEP regimens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ClipboardCheck className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C5203F' }} />
                <div>
                  <h4 className="text-[#030213] mb-1">Safety & Monitoring</h4>
                  <p className="text-gray-600">
                  Confirm HIV-negative status before each injection. Monitor for injection site reactions and assess renal function at baseline and as clinically indicated.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right - Registration Form */}
          <div id="register">
            <WebinarRegistrationForm 
              key={resetKey}
              onRegistrationComplete={() => setShowChat(true)} 
            />
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <MechanismSection />

      {/* Efficacy Section */}
      <EfficacySection />

      {/* Safety Highlights */}
      <SafetyHighlights />

      {/* Featured Speakers */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-[#030213] mb-8 text-center">Featured Speakers</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4">
            <img 
              src={sarahPhoto} 
              alt="Dr. Sarah Okonkwo" 
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px #E07A87' }}
            />
            <div>
              <h3 className="text-[#030213]">Dr. Sarah Okonkwo</h3>
              <p className="text-gray-600">Lead Clinical Investigator, PURPOSE Trials</p>
              <p className="text-sm text-gray-500 mt-1">HIV Prevention & Infectious Disease Research</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4">
            <img 
              src={jamesPhoto} 
              alt="Dr. James Liu" 
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px #E07A87' }}
            />
            <div>
              <h3 className="text-[#030213]">Dr. James Liu</h3>
              <p className="text-gray-600">Director of Antiretroviral Safety Research</p>
              <p className="text-sm text-gray-500 mt-1">Long-Acting PrEP & Drug Interaction Pharmacology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Webinar Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C5203F' }}>
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[#030213]">Webinar Agenda: YEZTUGO Safety Deep Dive</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <ShieldAlert className="w-8 h-8" style={{ color: '#C5203F' }} />
              <h3 className="text-[#030213]">Safety Profile & Screening</h3>
              <p className="text-gray-600">
                Overview of injection site reactions, drug interactions, CYP3A inducer contraindications, and HIV testing requirements from the PURPOSE trials
              </p>
              <p className="text-sm" style={{ color: '#C5203F' }}>30 minutes</p>
            </div>

            <div className="space-y-3">
              <Stethoscope className="w-8 h-8" style={{ color: '#C5203F' }} />
              <h3 className="text-[#030213]">Clinical Efficacy & Real-World Data</h3>
              <p className="text-gray-600">
                In-depth review of PURPOSE 1 and PURPOSE 2 trial outcomes, twice-yearly dosing adherence, and efficacy across diverse populations
              </p>
              <p className="text-sm" style={{ color: '#C5203F' }}>25 minutes</p>
            </div>

            <div className="space-y-3">
              <MessageCircle className="w-8 h-8" style={{ color: '#C5203F' }} />
              <h3 className="text-[#030213]">Implementation & Q&A</h3>
              <p className="text-gray-600">
                Practical guidance on patient selection, renal monitoring, concomitant medication review, and interactive session with HIV prevention specialists
              </p>
              <p className="text-sm" style={{ color: '#C5203F' }}>35 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div style={{ backgroundColor: '#C5203F' }} className="rounded-2xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Ready to Learn More About YEZTUGO Safety & Evidence?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading HIV prevention researchers for an in-depth exploration of lenacapavir's 
            safety profile, twice-yearly dosing, and patient screening strategies.
          </p>
          <a 
            href="#top" 
            className="bg-white px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 mx-auto" style={{ color: '#C5203F' }}
          >
            <Video className="w-5 h-5" />
            Register for Webinar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#54565B' }} className="text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={gileadLogo} alt="Gilead" className="h-8 object-contain brightness-0 invert" />
                <div className="h-6 w-px bg-white" />
                <img src={yeztugoLogo} alt="Yeztugo" className="h-10 object-contain brightness-0 invert" />
              </div>
              <p className="text-white text-sm">
                Pioneering healthcare solutions for a better tomorrow
              </p>
            </div>
            <div>
              <h4 className="mb-4">Clinical Resources</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#" className="hover:text-white">Efficacy Data</a></li>
                <li><a href="#" className="hover:text-white">Safety Profile</a></li>
                <li><a href="#" className="hover:text-white">Prescribing Information</a></li>
                <li><a href="#" className="hover:text-white">Dosing Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Patient Education</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Healthcare Provider Support</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#" className="hover:text-white">Medical Information</a></li>
                <li><a href="#" className="hover:text-white">Report Adverse Event</a></li>
                <li><a href="#" className="hover:text-white">Reimbursement Support</a></li>
                <li><a href="#" className="hover:text-white">Patient Assistance</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
            <div className="border-t border-white pt-8 text-sm text-white text-center">
            <p>© 2025 Gilead Sciences, Inc. All rights reserved. This is a proof of concept for demonstration purposes.</p>
            <p className="mt-2">YEZTUGO (lenacapavir) is for HIV-1 pre-exposure prophylaxis. Please consult full prescribing information.</p>
          </div>
        </div>
      </footer>
      </div>

      {/* AMLI AI Chat Widget */}
      <AmliAiChat 
        key={resetKey}
        isVisible={showChat} 
        onDemoModeActivate={() => {
          console.log("🟠 App: Demo mode activated - setting to 'dark'");
          setDemoMode('dark');
        }}
        isDemoMode={demoMode !== 'hidden'}
      />

      {/* Demo Components */}
      <DemoOverlay 
        isVisible={demoMode === 'dark'}
        onAdvance={() => {
          console.log("🟠 App: DemoOverlay advance - setting to 'visualization'");
          setDemoMode('visualization');
        }}
      />

      <DemoVisualization
        isVisible={demoMode === 'visualization'}
        skipUserPerspective={!sectionToggles.showUserPerspective}
        skipIdentityReveal={!sectionToggles.showIdentityReveal}
        startPhase={demoMode === 'visualization' ? currentPhase : 0}
        onPhaseChange={handlePhaseChange}
        onComplete={() => {
          console.log('🟠 App: Demo visualization complete - checking next section');
          setCurrentPhase(0);

          if (!sectionToggles.showDataEvolution) {
            console.log('🟠 App: Skipping Data Evolution (toggle OFF) - checking Agentic Orchestration');
            const skipOrfoIntro = !sectionToggles.showOrfoIntro;
            const fastStreaming = !sectionToggles.slowStreaming;

            if (skipOrfoIntro && fastStreaming) {
              console.log('🟠 App: Skipping Agentic Orchestration (both toggles OFF) - going to Agent Deployment');
              setDemoMode('agent-deployment');
            } else {
              console.log('🟠 App: Transitioning to Agentic Orchestration');
              setDemoMode('agentic-orchestration');
            }
          } else {
            console.log('🟠 App: Transitioning to Data Evolution');
            setDemoMode('data-evolution');
          }
        }}
      />

      <DataEvolutionVisualization
        isVisible={demoMode === 'data-evolution'}
        onPhaseChange={handlePhaseChange}
        onComplete={() => {
          console.log('🟠 App: Data Evolution complete - checking next section');
          setCurrentPhase(0);

          const skipOrfoIntro = !sectionToggles.showOrfoIntro;
          const fastStreaming = !sectionToggles.slowStreaming;

          if (skipOrfoIntro && fastStreaming) {
            console.log('🟠 App: Skipping Agentic Orchestration (both toggles OFF) - going to Agent Deployment');
            setDemoMode('agent-deployment');
          } else {
            console.log('🟠 App: Transitioning to Agentic Orchestration');
            setDemoMode('agentic-orchestration');
          }
        }}
      />

      <AgenticOrchestrationVisualization
        isVisible={demoMode === 'agentic-orchestration'}
        skipOrfoIntro={!sectionToggles.showOrfoIntro}
        fastStreaming={!sectionToggles.slowStreaming}
        startPhase={demoMode === 'agentic-orchestration' ? currentPhase : 0}
        onPhaseChange={handlePhaseChange}
        onComplete={() => {
          console.log('🟠 App: Agentic Orchestration complete - checking next section');
          setCurrentPhase(0);

          const skipAgentCollaboration = !sectionToggles.showAgentCollaboration;
          const skipUIWireframe = !sectionToggles.showUIWireframe;

          if (skipAgentCollaboration && skipUIWireframe) {
            console.log('🟠 App: Skipping Agent Deployment (both toggles OFF) - resetting to home');
            setDemoMode('hidden');
            setShowChat(false);
            setResetKey(prev => prev + 1);
            setTimeout(() => {
              document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            console.log('🟠 App: Transitioning to Agent Deployment');
            setDemoMode('agent-deployment');
          }
        }}
      />

      <AgentDeploymentVisualization
        isVisible={demoMode === 'agent-deployment'}
        skipAgentCollaboration={!sectionToggles.showAgentCollaboration}
        showUIWireframe={sectionToggles.showUIWireframe}
        startPhase={demoMode === 'agent-deployment' ? currentPhase : 0}
        onPhaseChange={handlePhaseChange}
        onComplete={() => {
          console.log('🟠 App: Agent Deployment complete - resetting to fresh state');
          console.log('🟠 App: Current state before reset:', { demoMode, showChat, resetKey });
          setCurrentPhase(0);
          setDemoMode('hidden');
          setShowChat(false);
          setResetKey(prev => prev + 1);
          setTimeout(() => {
            document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          console.log('🟠 App: Reset complete');
        }}
      />

      {/* Demo Navigation Tool - Always available */}
      <DemoNav
        currentSection={currentSection || 'demo-tracking'}
        onSectionChange={handleSectionChange}
        currentPhase={currentPhase}
        onPhaseChange={handlePhaseChange}
        sectionToggles={sectionToggles}
        onToggleChange={handleToggleChange}
        isOnHomepage={demoMode === 'hidden'}
        onBackToHomepage={handleBackToHomepage}
      />

    </div>
  );
}
