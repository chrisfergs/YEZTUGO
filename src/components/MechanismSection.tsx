export function MechanismSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-[#030213] mb-4">Mechanism of Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YEZTUGO (lenacapavir) targets the HIV-1 capsid protein at multiple stages of the viral lifecycle, offering a first-in-class, long-acting mechanism for HIV prevention.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E07A87' }}>
              <span className="text-white text-xl">1</span>
            </div>
            <h3 className="text-[#030213]">Capsid Binding</h3>
            <p className="text-gray-600 text-sm">
              Binds directly to the HIV-1 capsid protein (CA), interfering with capsid-mediated nuclear uptake of the viral genome.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E07A87' }}>
              <span className="text-white text-xl">2</span>
            </div>
            <h3 className="text-[#030213]">Viral Replication Block</h3>
            <p className="text-gray-600 text-sm">
              Inhibits HIV-1 DNA synthesis and integration into the host cell genome by disrupting capsid disassembly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E07A87' }}>
              <span className="text-white text-xl">3</span>
            </div>
            <h3 className="text-[#030213]">Assembly Disruption</h3>
            <p className="text-gray-600 text-sm">
              Disrupts late-stage viral particle assembly and release, preventing formation of mature infectious virions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E07A87' }}>
              <span className="text-white text-xl">4</span>
            </div>
            <h3 className="text-[#030213]">Long-Acting Protection</h3>
            <p className="text-gray-600 text-sm">
              Extended pharmacokinetics enable twice-yearly dosing, providing sustained protection against HIV-1 acquisition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
