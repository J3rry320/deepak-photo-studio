'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { navigationConfig } from '@/config/navigation';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function InquirySection() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: '',
    services: 'both',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again or chat via WhatsApp.');
      }
    } catch {
      setErrorMsg('Network connection issue. Please try again or chat via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const phoneRaw = navigationConfig.contact.whatsapp.replace(/\D/g, '');
  const waPreFill = encodeURIComponent(
    `Hello Deepak Photo Films, we are inquiring for our wedding on ${formData.weddingDate || '[Date]'} at ${formData.location || '[City/Venue]'}. Names: ${formData.names || '[Names]'}.`
  );
  const whatsappDirectUrl = `https://wa.me/${phoneRaw}?text=${waPreFill}`;

  return (
    <section id="inquire" className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context, Availability & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
                {t('inquiry.title')}
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                {t('inquiry.lead')}
              </p>
            </div>

            {/* Availability Notice */}
            <div className="p-5 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-2">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                {t('inquiry.badgeAvailability')}
              </p>
              <p className="font-body text-xs text-[var(--color-text-faint)] leading-relaxed">
                {navigationConfig.contact.location}
              </p>
            </div>

            {/* Direct WhatsApp Quick-Action */}
            <div className="pt-2 space-y-3">
              <span className="block font-body text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                {t('inquiry.whatsappDivider')}
              </span>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.2em] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[var(--color-accent)] group-hover:text-[#ffffff]" />
                <span>{t('inquiry.whatsappAction')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Editorial Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-accent)] mx-auto" />
                <h3 className="font-display text-2xl text-[var(--color-highlight)]">
                  {t('inquiry.successTitle')}
                </h3>
                <p className="font-body text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
                  {t('inquiry.successDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                {/* Names */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {t('inquiry.nameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.names}
                    onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                    placeholder={t('inquiry.namePlaceholder')}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {t('inquiry.emailLabel')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('inquiry.emailPlaceholder')}
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {t('inquiry.phoneLabel')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('inquiry.phonePlaceholder')}
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Wedding Date & City / Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {t('inquiry.dateLabel')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      placeholder={t('inquiry.datePlaceholder')}
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {t('inquiry.locationLabel')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder={t('inquiry.locationPlaceholder')}
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {t('inquiry.servicesLabel')}
                  </label>
                  <select
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors"
                  >
                    <option value="both">{t('inquiry.serviceOptionBoth')}</option>
                    <option value="photo">{t('inquiry.serviceOptionPhoto')}</option>
                    <option value="cinema">{t('inquiry.serviceOptionCinema')}</option>
                    <option value="prewed">{t('inquiry.serviceOptionPreWed')}</option>
                  </select>
                </div>

                {/* Vision / Notes */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {t('inquiry.notesLabel')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t('inquiry.notesPlaceholder')}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-[var(--color-highlight)] text-sm outline-none transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-[var(--color-bg-primary)] border border-red-500/40 text-red-600 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? t('inquiry.submitting') : t('inquiry.submitBtn')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
