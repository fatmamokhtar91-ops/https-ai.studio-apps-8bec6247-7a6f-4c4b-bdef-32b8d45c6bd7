import React, { useEffect, useState } from 'react';
import { ContactSection, PrefillBrief } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PackagesSection } from './components/PackagesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustedBySection } from './components/TrustedBySection';
import { WhatsAppFab } from './components/WhatsAppFab';
import { Language, SERVICES } from './data/portfolioData';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [prefill, setPrefill] = useState<PrefillBrief | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const scrollToContact = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleRequestSimilar = (serviceKey: string, referenceTitle: string) => {
    const matchedService = SERVICES.find((s) => s.id === serviceKey);
    const serviceLabel = matchedService ? matchedService.title[lang] : SERVICES[0].title[lang];
    const note =
      lang === 'ar'
        ? `أرغب في تنفيذ مشروع بمستوى إخراجي مشابه لعمل: «${referenceTitle}».`
        : `I would like to commission a production with a similar creative direction to: "${referenceTitle}".`;

    setPrefill({ service: serviceLabel, note });
    scrollToContact();
  };

  const handleBookService = (serviceId: string) => {
    const matchedService = SERVICES.find((s) => s.id === serviceId);
    const serviceLabel = matchedService ? matchedService.title[lang] : SERVICES[0].title[lang];
    setPrefill({ service: serviceLabel });
    scrollToContact();
  };

  const handleSelectPackage = (packageName: string, priceLabel: string) => {
    const serviceLabel = `${packageName} — ${priceLabel}`;
    const note =
      lang === 'ar'
        ? `أرغب في حجز «${packageName}» (${priceLabel}). إليك تفاصيل العلامة التجارية وموعد الإطلاق المطلوب:`
        : `I would like to book the "${packageName}" (${priceLabel}). Here are our brand details and target launch date:`;

    setPrefill({ service: serviceLabel, note });
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#121211] flex flex-col">
      <Navbar lang={lang} onStartProject={scrollToContact} />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onToggleLang={handleToggleLang}
          onStartProject={scrollToContact}
        />

        <TrustedBySection lang={lang} />

        <PortfolioSection
          lang={lang}
          onRequestSimilar={handleRequestSimilar}
        />

        <ServicesSection
          lang={lang}
          onBookService={handleBookService}
        />

        <TestimonialsSection lang={lang} />

        <PackagesSection
          lang={lang}
          onSelectPackage={handleSelectPackage}
        />

        <ContactSection lang={lang} prefill={prefill} />

        <FAQSection lang={lang} onContactClick={scrollToContact} />
      </main>

      <Footer lang={lang} onToggleLang={handleToggleLang} />

      <WhatsAppFab lang={lang} />
    </div>
  );
}
