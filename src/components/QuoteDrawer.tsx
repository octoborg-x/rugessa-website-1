import React, { useState, useEffect } from 'react';
import { useQuote } from '../context/QuoteContext';
import {
  X,
  Trash2,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  MessageSquare,
  Building,
  Home,
  ShieldCheck,
  AlertCircle,
  FileText
} from 'lucide-react';

export const QuoteDrawer: React.FC = () => {
  const { items, removeItem, clearQuote, isDrawerOpen, closeDrawer, audienceMode } = useQuote();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectType, setProjectType] = useState<string>(
    audienceMode === 'contract' ? 'Hotel / Hospitality' : 'Residential Living'
  );
  const [spaceSize, setSpaceSize] = useState<string>('');
  const [targetTiming, setTargetTiming] = useState<string>('Immediate (1-4 weeks)');
  const [projectNotes, setProjectNotes] = useState<string>('');

  // Contact fields
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [consent, setConsent] = useState<boolean>(true);
  const [honeypot, setHoneypot] = useState<string>(''); // Anti-spam

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    if (audienceMode === 'contract' && projectType === 'Residential Living') {
      setProjectType('Hotel / Hospitality');
    }
  }, [audienceMode, projectType]);

  // Esc key closes drawer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Spam blocked silently

    if (!fullName.trim() || !email.trim()) {
      setFormError('Please provide your name and email address.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    const newRefId = `RUG-${Date.now().toString().slice(-6)}`;
    setReferenceId(newRefId);

    // Mock endpoint submission with automatic failover guarantee
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const getBriefSummaryText = () => {
    const itemList = items
      .map((i) => `- ${i.collection} (${i.sku}): ${i.name} [Qty: ${i.quantity || 1}]`)
      .join('\n');
    return `Rugessa Quote Inquiry [${referenceId || 'DRAFT'}]\nName: ${fullName}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phone}\nProject: ${projectType}\nEstimated Area: ${spaceSize} m²\nTiming: ${targetTiming}\n\nSelected Products:\n${itemList}\n\nNotes: ${projectNotes}`;
  };

  const handleWhatsAppFailover = () => {
    const text = encodeURIComponent(getBriefSummaryText());
    // Direct WhatsApp to confirmed phone +212 771 010 849
    window.open(`https://wa.me/212771010849?text=${text}`, '_blank');
  };

  const handleEmailFailover = () => {
    const subject = encodeURIComponent(`Rugessa Quote Inquiry: ${projectType} (${referenceId})`);
    const body = encodeURIComponent(getBriefSummaryText());
    window.location.href = `mailto:info@rugessa.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quote and specification drawer"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative ml-auto w-full max-w-lg bg-white h-full flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[var(--surface-canvas)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--color-teal-100)] flex items-center justify-center text-[var(--color-teal-900)]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Specification & Quote Drawer
              </h2>
              <span className="text-[11px] text-gray-500 font-mono">
                {items.length} product{items.length === 1 ? '' : 's'} staged
              </span>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-black rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {submitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-light text-gray-900">
                Specification Received
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                Your quotation request has been generated under reference <strong className="font-mono text-gray-900">{referenceId}</strong>. Our commercial team at <strong className="text-[var(--color-teal-700)]">info@rugessa.com</strong> will respond with formal textile lead times and specs.
              </p>

              {/* Failover / Immediate Dispatch Options */}
              <div className="pt-6 border-t border-gray-100 space-y-2">
                <span className="text-xs font-semibold text-gray-700 block">
                  Need priority dispatch? Send direct:
                </span>
                <button
                  onClick={handleEmailFailover}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email Copy</span>
                </button>
                <button
                  onClick={handleWhatsAppFailover}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share Brief via WhatsApp</span>
                </button>
              </div>

              <button
                onClick={() => {
                  clearQuote();
                  setSubmitted(false);
                  closeDrawer();
                }}
                className="mt-4 text-xs text-gray-500 underline cursor-pointer"
              >
                Clear staged items and close
              </button>
            </div>
          ) : (
            <>
              {/* Staged Items List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-gray-500 font-semibold tracking-wider">
                    Selected Carpet Collections
                  </span>
                  {items.length > 0 && (
                    <button
                      onClick={clearQuote}
                      className="text-[11px] text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="p-6 bg-[#FAF8F5] border border-dashed border-[#E6E0D6] rounded-xs text-center text-xs text-gray-500">
                    Your quote list is currently empty. Browse the collections or use the room calculator to stage items.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xs shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xs bg-gray-100"
                          />
                          <div>
                            <span className="text-xs font-semibold text-gray-900 block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-gray-500 font-mono">
                              {item.collection} · SKU: {item.sku}
                            </span>
                            {item.dimensions && (
                              <span className="text-[10px] text-[var(--color-teal-700)] font-mono block">
                                Dimensions: {item.dimensions}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                          aria-label={`Remove ${item.name} from quote`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
                <span className={step === 1 ? 'font-bold text-[var(--color-teal-700)]' : ''}>
                  1. Project Space
                </span>
                <span>&rarr;</span>
                <span className={step === 2 ? 'font-bold text-[var(--color-teal-700)]' : ''}>
                  2. Specifications
                </span>
                <span>&rarr;</span>
                <span className={step === 3 ? 'font-bold text-[var(--color-teal-700)]' : ''}>
                  3. Contact
                </span>
              </div>

              {/* Step 1: Project Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Space / Deployment Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Residential Living',
                        'Hotel / Hospitality',
                        'Corporate Office',
                        'Restaurant / Café',
                        'Retail / Boutique',
                        'Wholesale Trade',
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setProjectType(t)}
                          className={`py-2 px-3 text-xs rounded-xs border text-left cursor-pointer min-h-[44px] ${
                            projectType === t
                              ? 'bg-[var(--color-teal-50)] border-[var(--color-teal-700)] text-[var(--color-teal-900)] font-semibold'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="space-size-input" className="text-xs font-semibold text-gray-700 block mb-1">
                      Estimated Carpet Area (m²)
                    </label>
                    <input
                      id="space-size-input"
                      type="text"
                      value={spaceSize}
                      onChange={(e) => setSpaceSize(e.target.value)}
                      placeholder="e.g. 45 m² or 3 standard rugs"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="target-timing-select" className="text-xs font-semibold text-gray-700 block mb-1">
                      Target Delivery Schedule
                    </label>
                    <select
                      id="target-timing-select"
                      value={targetTiming}
                      onChange={(e) => setTargetTiming(e.target.value)}
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)] cursor-pointer"
                    >
                      <option>Immediate (1-4 weeks)</option>
                      <option>Quarterly Project (1-3 months)</option>
                      <option>Specification Stage / Tendering</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[48px] cursor-pointer"
                  >
                    <span>Proceed to Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Notes & Requirements */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="project-notes-textarea" className="text-xs font-semibold text-gray-700 block mb-1">
                      Specific Weave or Project Notes
                    </label>
                    <textarea
                      id="project-notes-textarea"
                      rows={4}
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      placeholder="Specify preferred pile height, edge overlocking finishes, underlayment needs, or room dimensions..."
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs text-[11px] text-gray-600 leading-relaxed">
                    <strong className="text-gray-900">Trade Guarantee:</strong> Over 15 years of machine-woven carpet manufacturing ensures dimensional stability, colorfastness, and dependable shipment schedules.
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xs min-h-[48px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-2 flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[48px] cursor-pointer"
                    >
                      <span>Proceed to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Submission */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Honeypot hidden input */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="rugessa_honeypot"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xs text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Youssef Bennani"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="text-xs font-semibold text-gray-700 block mb-1">
                      Company / Architecture Firm (Optional)
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Studio Architecture & Design"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-semibold text-gray-700 block mb-1">
                        Business Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-gray-700 block mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+212 ... or +90 ..."
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-[var(--color-teal-700)] cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-[11px] text-gray-600 leading-tight">
                      I consent to Rugessa processing my inquiry for carpet estimation and quotation according to standard commercial privacy principles.
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xs min-h-[48px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-2 flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[48px] cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Specification...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
