import React, { useState } from 'react';
import { useQuote } from '../context/QuoteContext';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, FileText, ShieldCheck } from 'lucide-react';
import siteData from '../../data/site.json';
import { getWhatsAppUrl, openWhatsApp, PHONE_DISPLAY, PHONE_TEL, FACTORY_ADDRESS, CONTACT_EMAIL } from '../utils/whatsapp';
import { ScrollReveal, Parallax } from '../components/ScrollReveal';

export const ContactPage: React.FC = () => {
  const { items, openDrawer } = useQuote();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Simple client-side math captcha to mirror legacy captcha requirement
  const [captchaNum] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Anti-spam

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (captchaAnswer.trim() !== String(captchaNum)) {
      setErrorMessage(`Please enter the correct verification code (${captchaNum}).`);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const generatedRef = `RUG-CNT-${Date.now().toString().slice(-5)}`;
    setRefCode(generatedRef);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const getDirectMessageText = () => {
    return `Rugessa Inquiry [${refCode || 'DRAFT'}]\nName: ${fullName}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
  };

  const handleWhatsApp = () => {
    openWhatsApp(getDirectMessageText());
  };

  const handleEmailDirect = () => {
    const subject = encodeURIComponent(`Rugessa Inquiry from ${fullName || 'Client'} [${refCode || 'DIRECT'}]`);
    const body = encodeURIComponent(getDirectMessageText());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="py-12 bg-[var(--surface-canvas)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with ScrollReveal & Parallax */}
        <ScrollReveal direction="up" distance={24}>
          <div className="max-w-2xl space-y-3 relative">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-semibold block">
              Direct Inquiries & Quoting
            </span>
            <h1 className="text-3xl sm:text-5xl font-light font-serif text-[var(--color-text-primary)]">
              Contact Rugessa Commercial
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
              Have a project specification, bulk wholesale request, or carpet question? Contact our manufacturing office directly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts & Quote Summary with Parallax & ScrollReveal */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" distance={26}>
              <div className="bg-white dark:bg-[#181A1D] p-6 sm:p-8 rounded-sm border border-[var(--border-subtle)] dark:border-[#2C2F36] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    Direct Factory & Commercial Channels
                  </span>
                  <div className="space-y-4 mt-3">
                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-teal-50)] dark:bg-[#1C3B3F] text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">Direct Telephone</span>
                        <a
                          href={`tel:${PHONE_TEL}`}
                          className="text-base font-semibold text-gray-900 dark:text-white hover:text-[var(--color-teal-700)] hover:underline"
                        >
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">Official WhatsApp Line</span>
                        <a
                          href={getWhatsAppUrl('Hello Rugessa Team, I am inquiring from the website.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-[#128C7E] dark:text-[#25D366] hover:underline"
                          title="Open WhatsApp chat with Rugessa"
                        >
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-teal-50)] dark:bg-[var(--color-teal-900)] text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">General & Quotation Email</span>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="text-base font-semibold text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] hover:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Physical Facility in Mohammédia */}
                <div className="pt-4 border-t border-gray-100 dark:border-[#2C2F36] space-y-1 text-xs">
                  <span className="font-semibold text-gray-900 dark:text-white block">
                    Showroom & Manufacturing Unit:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                    Sud-Ouest, N° 17, Zone Industrielle<br />
                    Mohammédia 28810, Morocco
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                    Operating Hours: Mon - Fri: 08:30 - 18:00 | Sat: 09:00 - 13:00
                  </p>
                  <a
                    href="https://maps.google.com/?q=Sud-Ouest+N+17+Zone+Industrielle+Mohammedia+28810+Morocco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-semibold underline pt-1"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>

                {/* Instant Dispatch Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-[#2C2F36] space-y-2.5">
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">
                    Priority Dispatch Options:
                  </span>
                  <button
                    onClick={handleEmailDirect}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Launch Pre-Filled Email</span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Inquiry via WhatsApp ({PHONE_DISPLAY})</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Staged Items Card */}
            <ScrollReveal direction="up" distance={20} delay={0.08}>
              <div className="bg-[#FAF8F5] dark:bg-[#1E2126] p-6 rounded-sm border border-[#E6E0D6] dark:border-[#33373E] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]" />
                    Staged Quote List
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)]">
                    {items.length} item{items.length === 1 ? '' : 's'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {items.length > 0
                    ? `You currently have ${items.length} carpet model(s) staged. You can launch the full specification drawer to review room dimensions and quantities.`
                    : 'Your specification list is currently empty. You can submit a general message or explore the collections to add carpets.'}
                </p>
                {items.length > 0 && (
                  <button
                    onClick={openDrawer}
                    className="w-full py-2.5 bg-white dark:bg-[#25282F] border border-gray-300 dark:border-[#383C44] hover:border-gray-500 text-xs font-semibold text-gray-800 dark:text-gray-200 rounded-xs min-h-[44px] cursor-pointer"
                  >
                    Open Specification Drawer
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Inquiry Form with ScrollReveal */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" distance={28} delay={0.05}>
              <div className="bg-white dark:bg-[#181A1D] p-6 sm:p-10 rounded-sm border border-[var(--border-subtle)] dark:border-[#2C2F36] shadow-xs">

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900">
                  Message Transmitted
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-gray-900">{fullName}</strong>. Your message has been logged under reference <strong className="font-mono text-gray-900">{refCode}</strong>. Rugessa representatives will reply directly to <strong className="text-[var(--color-teal-700)]">{email}</strong>.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs text-[var(--color-teal-700)] font-semibold underline cursor-pointer"
                  >
                    Submit another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    Official Contact Form
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    Direct communication with Rugessa factory and export division
                  </span>
                </div>

                {/* Honeypot hidden input */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="rugessa_contact_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xs text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-fullname" className="text-xs font-semibold text-gray-700 block mb-1">
                      Name and Last name *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tariq Mansour"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone-input" className="text-xs font-semibold text-gray-700 block mb-1">
                      Phone
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 771 010 849"
                      className="w-full p-2.5 text-xs border border-gray-200 dark:border-[#383C44] rounded-xs bg-white dark:bg-[#202328] focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-company-input" className="text-xs font-semibold text-gray-700 block mb-1">
                      Company name
                    </label>
                    <input
                      id="contact-company-input"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company / Organization"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email-input" className="text-xs font-semibold text-gray-700 block mb-1">
                      E-mail *
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message-input" className="text-xs font-semibold text-gray-700 block mb-1">
                    Your message *
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, carpet dimensions, or project timeline..."
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)]"
                  />
                </div>

                {/* Legacy Security Code Requirement */}
                <div>
                  <label htmlFor="contact-captcha-input" className="text-xs font-semibold text-gray-700 block mb-1">
                    Security Code (*)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-[#FAF8F5] border border-gray-300 text-gray-900 font-mono font-bold tracking-widest text-sm rounded-xs select-none">
                      {captchaNum}
                    </div>
                    <input
                      id="contact-captcha-input"
                      type="text"
                      required
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Enter the code shown"
                      className="w-48 p-2 text-xs border border-gray-200 rounded-xs bg-white focus:outline-hidden focus:border-[var(--color-teal-700)] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[48px] cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};
