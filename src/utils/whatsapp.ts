/**
 * WhatsApp and Direct Communications Configuration for Rugessa
 * Confirmed client telephone / WhatsApp: +212 771 010 849
 * Location: Sud-Ouest, N° 17, Zone Industrielle, Mohammédia 28810, Morocco
 */

export const WHATSAPP_PHONE = '212771010849';
export const WHATSAPP_DISPLAY = '+212 771 010 849';
export const PHONE_TEL = '+212771010849';
export const PHONE_DISPLAY = '+212 771 010 849';
export const FACTORY_ADDRESS = 'Sud-Ouest, N° 17, Zone Industrielle, Mohammédia 28810, Morocco';
export const CONTACT_EMAIL = 'info@rugessa.com';

/**
 * Generates an official WhatsApp universal direct URL that directly opens the WhatsApp app
 * into the confirmed user's room / chat on both mobile (iOS/Android) and desktop.
 */
export const getWhatsAppUrl = (message?: string): string => {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`;
  if (message && message.trim()) {
    return `${base}&text=${encodeURIComponent(message.trim())}`;
  }
  return base;
};

/**
 * Safely opens WhatsApp direct chat with fallback for popup blockers and iframes.
 */
export const openWhatsApp = (message?: string): void => {
  const url = getWhatsAppUrl(message);
  try {
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
};
