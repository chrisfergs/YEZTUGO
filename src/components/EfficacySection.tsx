import { TrendingUp, Award, Users, BarChart3 } from 'lucide-react';
import microscopeIcon from '../assets/Microscope.png';
import geneticsIcon from '../assets/Genetics.png';
import chartIcon from '../assets/Chart.png';
import heartIcon from '../assets/Heart.png';

export function EfficacySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-[#030213]">Efficacy in Rheumatoid Arthritis & IBD</h2>
            <p className="text-xl text-gray-600">
              In pivotal Phase III studies, IMMUNEXIS demonstrated significant improvements in disease activity scores and remission rates in patients with moderate to severe rheumatoid arthritis and inflammatory bowel disease.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img src={microscopeIcon} alt="Microscope" className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-[#030213] mb-2">Primary Endpoint Achievement</h4>
                <p className="text-gray-600">
                  Met ACR20 response with 65% of RA patients achieving improvement vs 30% placebo at week 24.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src={geneticsIcon} alt="Genetics" className="w-6 h-6 object-contain flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-[#030213] mb-2">Rapid Onset of Action</h4>
                <p className="text-gray-600">
                  Significant symptom improvement observed as early as week 2 in both RA and IBD trials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src={chartIcon} alt="Chart" className="w-6 h-6 object-contain flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-[#030213] mb-2">Sustained Remission Rates</h4>
                <p className="text-gray-600">
                  38% of Crohn's patients achieved clinical remission at 52 weeks with maintained dosing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src={heartIcon} alt="Heart" className="w-6 h-6 object-contain flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-[#030213] mb-2">Quality of Life Improvements</h4>
                <p className="text-gray-600">
                  Significant improvements in physical function, pain scores, and fatigue from baseline.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-[#030213] mb-6">Key Clinical Trial Results</h3>
          
          <div className="space-y-6">
            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#7DD1C1' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#7DD1C1' }}>65%</span>
                <span className="text-gray-600">ACR20</span>
              </div>
              <p className="text-sm text-gray-600">Rheumatoid Arthritis Response Rate at Week 24</p>
            </div>

            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#7DD1C1' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#7DD1C1' }}>42%</span>
                <span className="text-gray-600">remission</span>
              </div>
              <p className="text-sm text-gray-600">Clinical Remission in Crohn's Disease at Week 26</p>
            </div>

            <div className="border-l-4 pl-4" style={{ borderLeftColor: '#7DD1C1' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl" style={{ color: '#7DD1C1' }}>58%</span>
                <span className="text-gray-600">mucosal healing</span>
              </div>
              <p className="text-sm text-gray-600">Endoscopic Improvement in Ulcerative Colitis</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              ACR20 = American College of Rheumatology 20% improvement criteria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
