/**
 * M-Contact Component
 * 
 * Contact modal with message form and contact information display.
 * Features:
 * - Contact form with name, email, phone, message fields
 * - File attachment support
 * - Contact information display (email, phone, social links)
 * - Form validation
 * - Alert notifications for success/error states
 * - Responsive design for mobile/desktop
 * - Dark/light theme support
 * 
 * @component
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip, User, Phone, MessageSquare, Check, Mail, Calendar, Clock, ChevronLeft, ChevronRight, AlertCircle, Globe } from 'lucide-react';
import Alert from './Alert';
import useSafeAlert from '../hooks/useSafeAlert';
import { useRateLimit } from '../hooks/useRateLimit';
import DOMPurify from 'dompurify';

/**
 * Meeting interface (currently unused but kept for future meeting booking feature)
 * @interface Meeting
 */
interface Meeting {
  Date: string;
  Time: string;
  Name: string;
  Email: string;
  Reason?: string;
  "What For"?: string;
  dateObj: Date;
  MeetingLink?: string;
  GoogleEventId?: string;
  UserLocalTime?: string;
  UserTimezone?: number;
  timestamp?: number;
}

const timezones = [
  { label: 'UTC-12:00', value: -12 },
  { label: 'UTC-11:00', value: -11 },
  { label: 'UTC-10:00', value: -10 },
  { label: 'UTC-09:00', value: -9 },
  { label: 'UTC-08:00 (PST)', value: -8 },
  { label: 'UTC-07:00 (MST)', value: -7 },
  { label: 'UTC-06:00 (CST)', value: -6 },
  { label: 'UTC-05:00 (EST)', value: -5 },
  { label: 'UTC-04:00', value: -4 },
  { label: 'UTC-03:00', value: -3 },
  { label: 'UTC-02:00', value: -2 },
  { label: 'UTC-01:00', value: -1 },
  { label: 'UTC+00:00 (GMT)', value: 0 },
  { label: 'UTC+01:00 (CET)', value: 1 },
  { label: 'UTC+02:00 (EET)', value: 2 },
  { label: 'UTC+03:00 (MSK)', value: 3 },
  { label: 'UTC+04:00', value: 4 },
  { label: 'UTC+05:00', value: 5 },
  { label: 'UTC+05:30 (IST)', value: 5.5 },
  { label: 'UTC+06:00', value: 6 },
  { label: 'UTC+07:00', value: 7 },
  { label: 'UTC+08:00 (CST)', value: 8 },
  { label: 'UTC+09:00 (JST)', value: 9 },
  { label: 'UTC+10:00 (AEST)', value: 10 },
  { label: 'UTC+11:00', value: 11 },
  { label: 'UTC+12:00 (NZST)', value: 12 },
];

interface MContactProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'message' | 'meeting';
  hideTabs?: boolean;
}

const MContact = ({ onClose, initialTab = 'message', hideTabs = false }: Omit<MContactProps, 'isOpen'>) => {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    hasWhatsapp: false,
    message: '',
    attachments: [] as File[],
  });

  const [activeTab, setActiveTab] = useState<'message' | 'meeting'>(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, showAlert, hideAlert } = useSafeAlert(4000);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Rate limiting for form submissions (max 3 attempts per minute)
  const { canSubmit, remainingAttempts, recordAttempt } = useRateLimit(3, 60000);

  // User's contact information
  const contactInfo = {
    email: 'temrevil@gmail.com',
    phone: '+20 XXX XXX XXXX',
    github: 'https://github.com/y0ussefmahmoud',
    linkedin: 'https://linkedin.com/in/y0ussefmahmoud',
    twitter: 'https://twitter.com/y0ussefmahmoud'
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    if (!canSubmit) {
      showAlert({ 
        type: 'error', 
        message: `Too many attempts. Please wait before trying again. Remaining attempts: ${remainingAttempts}` 
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      showAlert({ type: 'warning', message: "Please fill in all required fields (Name, Email, Message)." });
      return;
    }
    if (!formData.email.includes('@')) {
      showAlert({ type: 'warning', message: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    recordAttempt(); // Record this submission attempt

    // Sanitize inputs to prevent XSS attacks
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      number: DOMPurify.sanitize(formData.number),
      message: DOMPurify.sanitize(formData.message),
    };

    try {
      // Simulate sending message with sanitized data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert({ type: 'success', message: "Message sent! I'll get back to you soon." });
      setFormData({
        name: '',
        email: '',
        number: '',
        hasWhatsapp: false,
        message: '',
        attachments: [],
      });
      setTimeout(onClose, 2000);
    } catch (error) {
      showAlert({ type: 'error', message: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return createPortal(
    <>
      {alert?.show && <Alert type={alert.type} message={alert.message} onClose={() => hideAlert()} duration={alert.duration ?? 4000} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1400, padding: '1rem',
        }} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 400 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            width: isMobile ? '90vw' : '600px',
            height: isMobile ? '90dvh' : '680px',
          }}
          exit={{ opacity: 0, scale: 0.3, y: 400 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 350,
            mass: 1,
            width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
          }}
          className="glass-panel-deep"
          style={{
            maxWidth: isMobile ? '90vw' : '95vw',
            maxHeight: isMobile ? '90dvh' : '92vh',
            transformOrigin: 'bottom center',
            overflow: 'hidden',
            borderRadius: isMobile ? '0' : '24px',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] dark:from-white/[0.04] to-transparent pointer-events-none -z-10" />

          <div className="flex flex-col flex-1 overflow-hidden" style={{ overscrollBehavior: 'contain' }}>
            <div className="p-6 pb-0 flex flex-col gap-4">
              <div className="flex-row-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    layoutId="contact-icon"
                    className="flex items-center justify-center"
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 350,
                      mass: 1
                    }}
                  >
                    <Mail size={24} strokeWidth={2} />
                  </motion.div>
                  <h2 className="heading-md m-0 font-bold" style={{ fontSize: '1.5rem' }}>
                    Contact Me
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="btn-icon rounded-full"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: isMobile ? 'auto' : 'hidden', padding: isMobile ? '0 16px 40px' : '0 24px 24px' }} className={isMobile ? "custom-scrollbar" : ""}>
                {/* Contact Information */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', borderRadius: '16px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Get in Touch</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href={`mailto:${contactInfo.email}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                      <Mail size={18} />
                      {contactInfo.email}
                    </a>
                    <a href={`tel:${contactInfo.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                      <Phone size={18} />
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 890"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Attachments (Optional)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                    />
                    {formData.attachments.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {formData.attachments.map((file, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{file.name}</span>
                            <button type="button" onClick={() => removeFile(index)} style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '14px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'rgb(59, 130, 246)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  , document.body);
};

export default MContact;
