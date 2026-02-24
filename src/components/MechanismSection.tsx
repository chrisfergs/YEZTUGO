export function MechanismSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-[#030213] mb-4">Mechanism of Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IMMUNEXIS selectively binds and neutralizes TNF-alpha, blocking its interaction with cell surface receptors to inhibit inflammatory signaling pathways.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#AA95C6' }}>
              <span className="text-white text-xl">1</span>
            </div>
            <h3 className="text-[#030213]">TNF-α Neutralization</h3>
            <p className="text-gray-600 text-sm">
              Binds soluble and transmembrane TNF-alpha, preventing receptor engagement.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#AA95C6' }}>
              <span className="text-white text-xl">2</span>
            </div>
            <h3 className="text-[#030213]">Inflammation Cascade</h3>
            <p className="text-gray-600 text-sm">
              Blocks NF-κB signaling and reduces pro-inflammatory cytokine production.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#AA95C6' }}>
              <span className="text-white text-xl">3</span>
            </div>
            <h3 className="text-[#030213]">Tissue Protection</h3>
            <p className="text-gray-600 text-sm">
              Reduces synovial inflammation and prevents joint or intestinal damage.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#AA95C6' }}>
              <span className="text-white text-xl">4</span>
            </div>
            <h3 className="text-[#030213]">Clinical Outcomes</h3>
            <p className="text-gray-600 text-sm">
              Improved disease control and remission rates in RA, Crohn's, and UC.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
