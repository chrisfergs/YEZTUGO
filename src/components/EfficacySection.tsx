import { Microscope, ShieldCheck, BarChart3, Heart } from 'lucide-react';

export function EfficacySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-[#030213]">Efficacy in HIV-1 Prevention</h2>
            <p className="text-xl text-gray-600">
              In the pivotal PURPOSE 1 and PURPOSE 2 trials, YEZTUGO (lenacapavir) demonstrated superior efficacy in reducing HIV-1 acquisition compared to daily oral PrEP, with twice-yearly subcutaneous dosing.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Microscope className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C5203F' }} />
              <div>
                <h4 className="text-[#030213] mb-2">Primary Endpoint Achievement</h4>
                <p className="text-gray-600">
                  Demonstrated 100% efficacy in PURPOSE 1 — zero HIV infections among participants receiving lenacapavir vs. background incidence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C5203F' }} />
              <div>
                <h4 className="text-[#030213] mb-2">Superior to Daily Oral PrEP</h4>
                <p className="text-gray-600">
                  Significantly fewer HIV infections compared to daily oral TDF/FTC, with 89% lower incidence in the PURPOSE 2 trial.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C5203F' }} />
              <div>
                <h4 className="text-[#030213] mb-2">Consistent Across Populations</h4>
                <p className="text-gray-600">
                  Efficacy demonstrated across diverse populations including cisgender women, cisgender men, and transgender individuals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#C5203F' }} />
              <div>
                <h4 className="text-[#030213] mb-2">Improved Adherence</h4>
                <p className="text-gray-600">
                  Twice-yearly dosing eliminates the challenge of daily pill adherence, a key barrier to effective oral PrEP use.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-[#030213] mb-6">Key Clinical Trial Results</h3>
          
          <div className="space-y-6">
            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#C5203F' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#C5203F' }}>100%</span>
                <span className="text-gray-600">efficacy</span>
              </div>
              <p className="text-sm text-gray-600">Zero HIV infections in PURPOSE 1 lenacapavir arm</p>
            </div>

            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#C5203F' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#C5203F' }}>89%</span>
                <span className="text-gray-600">reduction</span>
              </div>
              <p className="text-sm text-gray-600">Lower HIV incidence vs. daily oral TDF/FTC in PURPOSE 2</p>
            </div>

            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#C5203F' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#C5203F' }}>2x</span>
                <span className="text-gray-600">yearly</span>
              </div>
              <p className="text-sm text-gray-600">Subcutaneous injection dosing schedule for sustained protection</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              PrEP = Pre-exposure prophylaxis; TDF/FTC = Tenofovir disoproxil fumarate / Emtricitabine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
