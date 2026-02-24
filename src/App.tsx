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
import { ShieldCheck, Stethoscope, BookOpen, UserCheck, FileBarChart, Video } from 'lucide-react';
import { Badge } from './components/ui/badge';
import makanaLogo from './assets/Makana_Logo.png';
import makanaLogoWhite from './assets/Makana_Logo_White.png';
import immunexisLogo from './assets/Immunexis_Logo.png';
import moleculeIcon from './assets/Molecule.png';
import syringeIcon from './assets/Syringe.png';
import clipboardIcon from './assets/Clipboard.png';
import dateInputIcon from './assets/Date_Input.png';
import shieldPurpleHeartIcon from './assets/Shield_Purple_Heart.png';
import stethescopeIcon from './assets/Stethescope.png';
import caringIcon from './assets/Caring.png';
import cameraIcon from './assets/Camera.png';
import noelleKuhlman from './assets/Noelle_Kuhlman.jpg';
import isabellaMagnani from './assets/Isabella_Magnani.jpg';
import ryanFerguson from './assets/Ryan_Ferguson.jpg';

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
            <img src={makanaLogo} alt="Makana Health" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300" />
            <img src={immunexisLogo} alt="Immunexis" className="h-6 object-contain" />
          </div>
          <Badge variant="outline" className="" style={{ borderColor: '#615586', color: '#615586' }}>
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
                  backgroundColor: 'rgba(170, 149, 198, 0.1)', 
                  color: '#615586',
                  fontWeight: 'bold'
                }}
              >
                ramutelimab - TNF-α inhibitor
              </Badge>
              <h1 className="text-5xl text-[#030213]">
                Understanding Safety & Evidence with IMMUNEXIS
              </h1>
              <p className="text-xl text-gray-600">
              A fully human monoclonal antibody that selectively inhibits TNF-alpha to reduce inflammation. It's indicated for moderate to severe rheumatoid arthritis, Crohn's disease, and ulcerative colitis in patients who have inadequate response to conventional therapy.
              </p>
            </div>

            {/* Key Safety Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img src={moleculeIcon} alt="Molecule" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#030213] mb-1">Targeted Mechanism</h4>
                  <p className="text-gray-600">
                  Selectively inhibits TNF-alpha, blocking inflammatory cytokine signaling to reduce disease activity and prevent joint damage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img src={syringeIcon} alt="Syringe" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#030213] mb-1">Dosing & Administration</h4>
                  <p className="text-gray-600">
                  Administered as a subcutaneous injection every 2 weeks or IV infusion for loading dose, with option for self-administration after training.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img src={clipboardIcon} alt="Clipboard" className="w-6 h-6 object-contain flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#030213] mb-1">Infection Risk Management</h4>
                  <p className="text-gray-600">
                  Screen for latent tuberculosis and hepatitis B before initiating therapy, and monitor for serious infections throughout treatment.
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
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4">
            <img 
              src={noelleKuhlman} 
              alt="Dr. Noelle Kuhlman" 
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px #AA95C6' }}
            />
            <div>
              <h3 className="text-[#030213]">Dr. Noelle Kuhlman</h3>
              <p className="text-gray-600">Lead Clinical Investigator</p>
              <p className="text-sm text-gray-500 mt-1">Rheumatology & Clinical Trials Specialist</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4">
            <img 
              src={isabellaMagnani} 
              alt="Dr. Isabella Magnani" 
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px #AA95C6' }}
            />
            <div>
              <h3 className="text-[#030213]">Dr. Isabella Magnani</h3>
              <p className="text-gray-600">Director of Safety Research</p>
              <p className="text-sm text-gray-500 mt-1">TNF Inhibitor Safety & Infection Monitoring</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4">
            <img 
              src={ryanFerguson} 
              alt="Dr. Ryan Ferguson" 
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px #AA95C6' }}
            />
            <div>
              <h3 className="text-[#030213]">Dr. Ryan Ferguson</h3>
              <p className="text-gray-600">Gastroenterology Specialist</p>
              <p className="text-sm text-gray-500 mt-1">IBD & Biologic Therapy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Webinar Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#615586' }}>
              <img src={dateInputIcon} alt="Date Input" className="w-5 h-5 object-contain" />
            </div>
            <h2 className="text-[#030213]">Webinar Agenda: Safety Deep Dive</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <img src={shieldPurpleHeartIcon} alt="Shield Purple Heart" className="w-8 h-8 object-contain" />
              <h3 className="text-[#030213]">Safety Profile Overview</h3>
              <p className="text-gray-600">
                Detailed analysis of infection risk, contraindications, and screening protocols from Phase III trials in RA and IBD
              </p>
              <p className="text-sm text-[#615586]">30 minutes</p>
            </div>

            <div className="space-y-3">
              <img src={stethescopeIcon} alt="Stethoscope" className="w-8 h-8 object-contain" />
              <h3 className="text-[#030213]">Long-Term Safety Data</h3>
              <p className="text-gray-600">
                In-depth review of safety outcomes from 52-week extension studies across rheumatoid arthritis and inflammatory bowel disease populations
              </p>
              <p className="text-sm text-[#615586]">25 minutes</p>
            </div>

            <div className="space-y-3">
              <img src={caringIcon} alt="Caring" className="w-8 h-8 object-contain" />
              <h3 className="text-[#030213]">Patient Management & Q&A</h3>
              <p className="text-gray-600">
                Practical guidance on TB screening, vaccination timing, and interactive session with immunology specialists
              </p>
              <p className="text-sm text-[#615586]">35 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div style={{ backgroundColor: '#615586' }} className="rounded-2xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Ready to Learn More About IMMUNEXIS Safety & Evidence?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading rheumatologists and gastroenterologists for an in-depth exploration of ramutelimab's 
            safety profile, infection risk management, and patient monitoring strategies.
          </p>
          <a 
            href="#top" 
            className="bg-white px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 mx-auto" style={{ color: '#615586' }}
          >
            <img src={cameraIcon} alt="Camera" className="w-5 h-5 object-contain" />
            Register for Webinar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#3F4760' }} className="text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={makanaLogoWhite} alt="Makana Health" className="h-8 object-contain" />
                <div className="h-6 w-px bg-white" />
                <img src={immunexisLogo} alt="Immunexis" className="h-6 object-contain" />
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
            <p>© 2025 Makana Health. All rights reserved. This is a proof of concept for demonstration purposes.</p>
            <p className="mt-2">IMMUNEXIS (ramutelimab) is an investigational drug. Please consult full prescribing information.</p>
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
