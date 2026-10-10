import React, { useState } from 'react';
import { useQuote } from '../context/QuoteContext';
import { Calculator, Check, Plus, Sparkles } from 'lucide-react';

export const RugCalculator: React.FC = () => {
  const { addItem } = useQuote();
  const [width, setWidth] = useState<number>(2.0);
  const [length, setLength] = useState<number>(2.9);
  const [selectedPreset, setSelectedPreset] = useState<string>('living');
  const [added, setAdded] = useState(false);

  const surfaceM2 = parseFloat((width * length).toFixed(2));

  const presets = [
    { id: 'living', name: 'Living Room Standard', w: 2.0, l: 2.9, desc: 'Ideal for 3-seater sofa arrangements' },
    { id: 'bedroom', name: 'Master Bedroom', w: 1.6, l: 2.3, desc: 'Fits under queen/king bed perimeters' },
    { id: 'accent', name: 'Accent / Reading Corner', w: 1.2, l: 1.7, desc: 'Cozy fireside or armchair placement' },
    { id: 'runner', name: 'Hallway Runner', w: 0.8, l: 3.0, desc: 'Long corridor high-traffic weave' },
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setSelectedPreset(preset.id);
    setWidth(preset.w);
    setLength(preset.l);
  };

  const handleAddCustomToQuote = () => {
    addItem({
      id: `custom-size-${Date.now()}`,
      sku: 'CUSTOM-DIM',
      name: `Custom Dimension Rug (${width}m × ${length}m)`,
      collection: 'Custom Specification',
      image: '/assets/products/classic_cl-001.jpg',
      dimensions: `${width}m × ${length}m`,
      surfaceM2: surfaceM2,
      quantity: 1,
      notes: `Requested surface: ${surfaceM2} m² (${selectedPreset} configuration)`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="calculator" className="py-16 bg-[#F2EEE8] border-y border-[var(--border-subtle)]">
      {/* Q: How much carpet do I need for my space, and what standard size applies? */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E6E0D6] rounded-full text-xs font-semibold text-[var(--color-teal-700)] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Parametric Space Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
            Room Dimension & Surface Calculator
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 font-light">
            Estimate surface square-meters for standard room placements or define bespoke machine-woven dimensions for trade specification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Presets List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase text-gray-500 tracking-wider block mb-1">
              Architectural Room Presets
            </span>
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className={`w-full text-left p-4 rounded-xs border transition-all cursor-pointer ${
                  selectedPreset === p.id
                    ? 'bg-white border-[var(--color-teal-700)] shadow-xs ring-1 ring-[var(--color-teal-700)]'
                    : 'bg-white/70 border-gray-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-gray-900">{p.name}</span>
                  <span className="font-mono text-xs text-[var(--color-teal-700)] font-bold">
                    {p.w}m × {p.l}m
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{p.desc}</p>
              </button>
            ))}
          </div>

          {/* Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-[var(--border-subtle)] shadow-xs">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500">Total Calculated Surface</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-light font-serif text-[var(--color-text-primary)]">
                    {surfaceM2}
                  </span>
                  <span className="text-lg font-mono text-gray-500 font-normal">m²</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Aspect Ratio</span>
                <div className="text-sm font-mono text-gray-700 font-semibold mt-1">
                  1 : {(length / (width || 1)).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Dimensional Sliders & Inputs */}
            <div className="py-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <label htmlFor="width-slider" className="font-semibold text-gray-700">Width (meters)</label>
                  <span className="font-mono font-bold text-[var(--color-teal-700)]">{width} m</span>
                </div>
                <input
                  id="width-slider"
                  type="range"
                  min="0.6"
                  max="5.0"
                  step="0.1"
                  value={width}
                  onChange={(e) => {
                    setWidth(parseFloat(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-[var(--color-teal-700)] cursor-pointer"
                  aria-label="Rug width in meters"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0.6 m</span>
                  <span>2.5 m</span>
                  <span>5.0 m</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <label htmlFor="length-slider" className="font-semibold text-gray-700">Length (meters)</label>
                  <span className="font-mono font-bold text-[var(--color-teal-700)]">{length} m</span>
                </div>
                <input
                  id="length-slider"
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => {
                    setLength(parseFloat(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-[var(--color-teal-700)] cursor-pointer"
                  aria-label="Rug length in meters"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>1.0 m</span>
                  <span>5.0 m</span>
                  <span>10.0 m</span>
                </div>
              </div>
            </div>

            {/* Visual 2D Carpet Proportion Box */}
            <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs p-4 flex items-center justify-center mb-6 min-h-[90px]">
              <div
                style={{
                  width: `${Math.min(240, Math.max(60, width * 50))}px`,
                  height: `${Math.min(120, Math.max(40, length * 18))}px`,
                }}
                className="bg-[var(--color-teal-500)]/20 border-2 border-dashed border-[var(--color-teal-700)] rounded-xs flex items-center justify-center transition-all duration-300"
              >
                <span className="text-[11px] font-mono font-bold text-[var(--color-teal-900)]">
                  {width}m × {length}m
                </span>
              </div>
            </div>

            {/* Add to Quote Button */}
            <button
              onClick={handleAddCustomToQuote}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold rounded-xs shadow-xs transition-all cursor-pointer min-h-[48px] ${
                added
                  ? 'bg-green-700 text-white'
                  : 'bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {surfaceM2}m² to Quote Specification</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {surfaceM2}m² Dimension to Quote Drawer</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
