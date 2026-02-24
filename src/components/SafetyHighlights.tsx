import { ShieldAlert, AlertCircle, ClipboardList, Syringe, TestTubes } from 'lucide-react';

export function SafetyHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-[#030213] mb-4">Safety Profile Highlights</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive safety data from the PURPOSE clinical trial program with over 5,000 participants
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <Syringe className="w-8 h-8" style={{ color: '#C5203F' }} />
          <h4 className="text-[#030213]">Injection Site Reactions</h4>
          <p className="text-sm text-gray-600">
            Most common adverse event. Reactions were generally mild to moderate, including pain, swelling, and erythema at the injection site.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <ClipboardList className="w-8 h-8" style={{ color: '#C5203F' }} />
          <h4 className="text-[#030213]">Common Adverse Events</h4>
          <p className="text-sm text-gray-600">
            Injection site reactions and subcutaneous nodules. Nausea reported infrequently. Overall discontinuation rates due to adverse events were low.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <TestTubes className="w-8 h-8" style={{ color: '#C5203F' }} />
          <h4 className="text-[#030213]">Required Screening</h4>
          <p className="text-sm text-gray-600">
            Confirm HIV-1 negative status before each injection. Assess renal function at baseline. Screen for hepatitis B virus infection.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <ShieldAlert className="w-8 h-8" style={{ color: '#C5203F' }} />
          <h4 className="text-[#030213]">Drug Interactions</h4>
          <p className="text-sm text-gray-600">
            Contraindicated with strong CYP3A inducers (e.g., rifampin, carbamazepine). Evaluate concomitant medications before initiating.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-900 mb-2">Important Safety Information</h4>
            <p className="text-sm text-amber-800 mb-3">
              YEZTUGO is indicated only for individuals confirmed to be HIV-1 negative immediately prior to each injection.
              Drug-resistant HIV-1 variants may emerge if YEZTUGO is used in individuals with undiagnosed HIV-1 infection.
              Individuals must be tested for HIV-1 before each injection. Do not initiate if signs or symptoms of acute HIV
              infection are present. YEZTUGO is contraindicated with co-administration of strong CYP3A inducers, which may
              significantly decrease lenacapavir plasma concentrations.
            </p>
            <a href="#" className="text-sm text-amber-900 underline hover:text-amber-950">
              View Full Prescribing Information
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
