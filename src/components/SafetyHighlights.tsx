import { ShieldCheck, AlertCircle, ClipboardCheck, HeartPulse } from 'lucide-react';
import shieldRedHeartIcon from '../assets/Shield_Red_Heart.png';
import clipboardIcon from '../assets/Clipboard.png';
import laptopIcon from '../assets/Laptop.png';
import syringeIcon from '../assets/Syringe.png';

export function SafetyHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-[#030213] mb-4">Safety Profile Highlights</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive safety data from clinical trials with over 1,200 patient-years of exposure
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <img src={shieldRedHeartIcon} alt="Shield Red Heart" className="w-8 h-8 object-contain" />
          <h4 className="text-[#030213]">Serious Risks</h4>
          <p className="text-sm text-gray-600">
            Serious infections including TB and sepsis, malignancies, hepatitis B reactivation, and heart failure exacerbation.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <img src={clipboardIcon} alt="Clipboard" className="w-8 h-8 object-contain" />
          <h4 className="text-[#030213]">Common Adverse Events</h4>
          <p className="text-sm text-gray-600">
          Injection site reactions, upper respiratory infections, headache, nausea, and rash.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <img src={laptopIcon} alt="Laptop" className="w-8 h-8 object-contain" />
          <h4 className="text-[#030213]">Required Screening</h4>
          <p className="text-sm text-gray-600">
            TB testing (PPD or IGRA) and hepatitis B screening required before initiating therapy.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
          <img src={syringeIcon} alt="Syringe" className="w-8 h-8 object-contain" />
          <h4 className="text-[#030213]">Vaccination Guidance</h4>
          <p className="text-sm text-gray-600">
            Live vaccines contraindicated. Update vaccinations prior to initiating treatment.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-900 mb-2">Important Safety Information</h4>
            <p className="text-sm text-amber-800 mb-3">
              IMMUNEXIS increases the risk of serious infections leading to hospitalization or death, including tuberculosis, 
              bacterial sepsis, invasive fungal infections, and infections due to opportunistic pathogens. Patients should be 
              tested for latent TB before and during treatment. Monitor all patients closely for signs and symptoms of infection 
              during and after treatment, including possible development of TB in patients who tested negative prior to therapy.
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
