import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Menu,
  X,
  ArrowDown,
  ArrowUpRight,
  Play,
  MessageCircle,
  Mail,
  Briefcase,
  Store,
  Youtube,
} from 'lucide-react';
import {
  ScrollProgressBar,
  FloatingBlueBlobs,
  WordReveal,
  ScrollRevealSection,
  StaggerRevealItem,
  TiltCard,
  MagneticAction,
  ResilientImage,
} from './components/InteractiveMotion';
import {
  Icon3DDesign,
  Icon3DDashboard,
  Icon3DAIAutomation,
  Icon3DWebDev,
  Icon3DVideo,
  Icon3DDiscover,
  Icon3DBlueprint,
  Icon3DBuild,
  Icon3DLaunch,
} from './components/Icons3D';
import { CaseStudyModal, PortfolioProject } from './components/CaseStudyModal';

/* ============================================================================
 * PORTFOLIO DATA ARRAY — Edit, add, or reorder projects right here.
 * Categories supported: 'mobile' | 'dashboards' | 'websites' | 'video'
 * ========================================================================== */
const PORTFOLIO_ITEMS: PortfolioProject[] = [
  {
    id: 'pulsepay',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    metric: '+38% onboarding',
    title: 'PulsePay Banking',
    summary: 'iOS & Android fintech experience with instant transfers.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrA00bXRortZkYBTtelGZHAWGaL8nRpvxvb2GVS-NNxQy4gxI8nYmZyHmu_kuzxtI2MiIJMXl7qDdQ-W3bmwFwMz_pIl4RJzIlNUnwQ1WhopXhzwv4yGT1C0qqNJvOiB7lOOSNUhNBO8R-qGJ1OtwI8QpS4LuTZHkhvr10UdiKSgnl-H9522cyTtVaIbc1p4Z4P2WSzbze-KB6O3wS-jZPiC8uRxE3pQYKDaH-yQomiib-ASFI4v_M35yuqIvOLCZjb_SQ',
    imageAlt: 'PulsePay Mobile Banking App mockup',
    challenge: 'High drop-off during KYC verification and transfer setup.',
    solution:
      'Streamlined 3-step onboarding with biometric quick-send cards.',
    outcome: '+38% completed signups in 30 days',
    serviceFocus: 'UI/UX Design',
  },
  {
    id: 'metricflow',
    category: 'dashboards',
    categoryLabel: 'Dashboards',
    metric: '2.1x faster triage',
    title: 'MetricFlow Analytics',
    summary: 'Real-time revenue, cohort, and retention command center.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAj1FHr_uqO_Wd10ETjYWoz8RPZfadDJchxo_ERrzSujE7g-scackb1dD5E9ipnHFFONr_pOrV7kOcpJp-6W80oGsuXFYSIRVAJIxTsbuTgMeBiTku-Btli0WNEEZb5S5JDkxHqwkOqsGN4MTZRp0bPAKPHI8yfDkc_NPAfDudxnsMF0heaZNwZXrtz_w8kp7kTRKWPxUlP30JQ_uoJEzWcJgNPqOWd-gWPy5vPPtFAWxm-q1ZgRYY1XuoECBForCQdkg',
    imageAlt: 'MetricFlow SaaS Analytics Dashboard mockup',
    challenge: 'Founders struggled to spot churn signals across 12 tables.',
    solution: 'Unified executive KPI hierarchy with cohort drill-down.',
    outcome: '2.1x faster daily metric triage',
    serviceFocus: 'Dashboards',
  },
  {
    id: 'novaai',
    category: 'websites',
    categoryLabel: 'Websites',
    metric: '4.8% demo CVR',
    title: 'NovaAI Platform',
    summary: 'High-speed marketing site and interactive demo flow.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrCJKfdV1RA2x2SvuFnJv_ZvY5kabfLjUkFKIm1MUxAxEuwDzpF2teHM1r9z7-zftcDbd7A0qAPbNRYmq3Eq0Of4Ikm1ZARbdkAE41Hwd35P6mtr8EYg-7dWxI4tiznhSKp63EzWNeRkLWg__BSyFbx_yt2IWMarYxAmzNY42VDDGWivN6OkGt694paaCQG4raEqSmdkvEPFhfRrnlokyVzG7Ahdy7jhNTrWpzsWjBtUZp7KXmz1TXzVA2FyUST_',
    imageAlt: 'NovaAI Automation Platform Website mockup',
    challenge: 'Technical product story felt abstract to non-technical buyers.',
    solution: 'Built interactive workflow previews and clear ROI framing.',
    outcome: '4.8% visitor-to-demo conversion',
    serviceFocus: 'Web Development',
  },
  {
    id: 'kinetix',
    category: 'video',
    categoryLabel: 'Video',
    metric: '180K launch views',
    title: 'Kinetix Launch Film',
    summary: '90-second 3D and UI motion launch reel for Series A.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrADjp3E6wnubnRLTMEbb4i_JsJQrHdTJCDxl6b-coFSLfhs-1BpjJ_SKlB56udaBI2xrstyJU4jmQDeUCKlwDihtRlUsOfZWrw6xM_k1Q0Q8QPg3WGRdX-35xfBTkqlW4yo5aTOXT3cc4SoOf-hvySZ9aepVrUd1DBHT9XgqYoGwb1d8yfe2lgfRTBVjhVVPF-joVpLXq0IMzNtlLdBhQtAw8TTKr6e3DONr6Cnwn5IgYHGmDP0CoQ-m2S2X-9WDA',
    imageAlt: 'Kinetix Product Launch Film thumbnail',
    challenge: 'Needed flagship launch film for Series A announcement.',
    solution: 'Directed 90s 3D hardware + UI motion reel with sound design.',
    outcome: '180K organic views in launch week',
    serviceFocus: 'Video Production',
    isVideo: true,
  },
  {
    id: 'veloce',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    metric: '4.9 App Store',
    title: 'Veloce Habit App',
    summary: 'Daily routine coaching with adaptive streak tracking.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAWZPYLsqDRHc87zwuYLTuMRCPEGZsqDrouqeueFZvppWq8NP_sNoQVS95YT2cYaQcqb8FrN0p78Wh3PvfqW7yowTQzc2-0vbjdR1kvXGFvO0hms5HtvZqndHD-xrFXUHZlgI7-jmvy9MaPokBZM0BT22wJURRedbFHngcAs1WXpgn_SMYzJ4ehVD4ZRS4YFTW7ims14CpKFj-A53at_V9aMIEkR24Z_679f4Sq4mxsQ4xzXlPdPaMHmdD6QUegxHE',
    imageAlt: 'Veloce Fitness and Habit Tracker Mobile App mockup',
    challenge: 'Users abandoned rigid daily checklists after week one.',
    solution: 'Designed adaptive streak rings and 1-tap check-in widgets.',
    outcome: '4.9 App Store rating across 2K+ reviews',
    serviceFocus: 'UI/UX Design',
  },
  {
    id: 'dispatchos',
    category: 'dashboards',
    categoryLabel: 'Dashboards',
    metric: '14 hrs/wk saved',
    title: 'DispatchOS Center',
    summary: 'Automated agent monitoring and workflow orchestration UI.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrBSI9xS5pmSCFN4Uo49RuodN3X6mOzYjA7V-jA7y95lbTnbyzlMZiU1w8M7TbfG0yI9trBU7BzuWeeEOCdoZuIZQMfidwDOrzLNZk1m8fEkMW3aGUO9pBabzns_MEhQ_PK3KV_6j-QDEu8muJ8YXqIS2NNcZqD9rBGmihLBY6mSCjCehe-LVLsajYffFZm3t5oe31RVhuGo8SSYrq8aNmbbQl2SOHbaO3yHCt4-ZnPdnlzCAP2uV4H1lkKQYCQxfdU',
    imageAlt: 'DispatchOS AI Ops Command Center mockup',
    challenge: 'Manual ticket routing slowed down operations teams.',
    solution: 'Built live AI agent monitor with exception-only alerts.',
    outcome: '14 hours/week saved per ops manager',
    serviceFocus: 'AI Automation',
  },
];

/* ============================================================================
 * BRAND ASSETS & CONTACT CONFIGURATION
 * ========================================================================== */
const BRAND_ASSETS = {
  headerLogo:
    'https://lh3.googleusercontent.com/aida/ALJJyrAyQHmDEqq-CDTMNrh1UZHBTeeMYOH-783E-9mqvjid8NZByALjoAIFWEnxoDeTuCWLBrlv4ybDdrRTufb4HOtoyLCzKig_q0EZ_rZfBE3COJUaAIirbVSQRMvEiek59BYkASS5wRvPtbqMZAnJbTydJwpwbuX5d_1NCiBP-54hP7-l2jX2aX5_jb2kbe-320Fnsj9mR33RLDiKD4Pczc0pM8NpC2ihrYjyF00e0JcdmO5rHc7-vPpvCv4',
  footerLogo:
    'https://lh3.googleusercontent.com/aida/ALJJyrB5JOQV8CgSvfnmoN6ghQZhl-jMGEZQj4JC5t1YgjVzP1zkMjLdbdSUXqOlKv4Ya66SMSRBlKbBPvCwes4QEUcG_1rez55b0uDxPVk2FIe0_bggD_2eJAQRBXGjyM2AQeonZpM-MZkEdjGHCpfnDVdoJGYOeeZzsV56pISArrN-gz3pf6GGqrT-Rlk7eUkKF7jbHq5DaOoxr7Jch14axNp6k5ZhF2vI5bb2f3lrQIT-vU2ZtEE08fxNJLk',
  founderAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrAtdyskTx1_rgG9h1zhDaaMD42UiaUiAKmaMA0HpMWCsLNrjtIzUlFTUAG58c6Ugy3n6Ijq31n-ezIgXtpMV5e7UqBJrwbPlIWmGE2P2d6pQp50S_miJccGYSqa5mV4D4ubY6PgKtdO2NLs_hOBB8jGf7_Z2JqLxpVldKC_q9nJbySEEj7f7_ovdFv0nLaCwqg1cE4-7N-KvzQ3Gg4HtC6RzR7TjQf8aI3MF9qx_tOtuudo-sAA_tGqzBCV',
};

const CONTACT_LINKS = {
  whatsappNumber: '923217573714',
  email: 'splashstudiousa@gmail.com',
  linkedin: 'https://linkedin.com/in/splashstudioz',
  fiverr: 'https://fiverr.com/aeyazman',
  youtube: 'https://youtube.com/@splashstudio-usa',
};

const NAV_LINKS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#portfolio', id: 'portfolio' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'Reviews', href: '#testimonials', id: 'testimonials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const SERVICES = [
  {
    title: 'UI/UX Design',
    sprint: '2–3 wk sprint',
    mobileSprint: '2–3 wks',
    Icon3D: Icon3DDesign,
    description:
      'Web and mobile product interfaces, scalable design systems, and interactive prototypes built for clarity and conversion.',
    wide: true,
  },
  {
    title: 'Dashboards',
    sprint: '2–4 wk sprint',
    mobileSprint: '2–4 wks',
    Icon3D: Icon3DDashboard,
    description:
      'Data-dense SaaS control centers, executive KPI views, and real-time operational workspaces that stay effortless to scan.',
    wide: true,
  },
  {
    title: 'AI Automation',
    sprint: '1–2 wks',
    mobileSprint: '1–2 wks',
    Icon3D: Icon3DAIAutomation,
    description:
      'Custom LLM agents, CRM pipelines, and workflow automations that eliminate manual bottlenecks.',
    wide: false,
  },
  {
    title: 'Web Development',
    sprint: '2–4 wks',
    mobileSprint: '2–4 wks',
    Icon3D: Icon3DWebDev,
    description:
      'Fast, responsive marketing sites and production web apps engineered with modern frameworks.',
    wide: false,
  },
  {
    title: 'Video Production',
    sprint: '1–2 wks',
    mobileSprint: '1–2 wks',
    Icon3D: Icon3DVideo,
    description:
      'Product launch films, UI motion explainers, and crisp commercial edits tailored for growth.',
    wide: false,
  },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'websites', label: 'Websites' },
  { id: 'video', label: 'Video' },
] as const;

const PROCESS_STEPS = [
  {
    title: 'Discover',
    Icon3D: Icon3DDiscover,
    description:
      'Align on business goals, user bottlenecks, and technical scope before a single pixel is drawn.',
  },
  {
    title: 'Design',
    Icon3D: Icon3DBlueprint,
    description:
      'Craft wireframes, interactive prototypes, and a cohesive visual system you can test early.',
  },
  {
    title: 'Build',
    Icon3D: Icon3DBuild,
    description:
      'Develop responsive web apps, AI workflows, and motion assets with production-grade polish.',
  },
  {
    title: 'Launch',
    Icon3D: Icon3DLaunch,
    description:
      'Ship cleanly, monitor real usage, and iterate rapidly with post-launch support.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      '"Muzammil redesigned our entire SaaS analytics dashboard in two weeks. Our enterprise trial-to-paid conversion jumped immediately."',
    name: 'Daniela Ortiz',
    role: 'VP Product, MetricFlow',
  },
  {
    quote:
      '"Splash Studio automated our lead qualification with a custom AI agent and rebuilt our landing page. It paid for itself in the first month."',
    name: 'Tariq Al-Mansoor',
    role: 'Founder, DispatchOS',
  },
  {
    quote:
      '"Our launch film looked like a $30k studio production. Clear communication, fast iterations, and zero hand-holding needed."',
    name: 'Hannah Lindqvist',
    role: 'Co-founder, Kinetix',
  },
];

const SCOPER_SERVICES = [
  'UI/UX Design',
  'Dashboards',
  'AI Automation',
  'Web Development',
  'Video Production',
];

const SCOPER_TIMELINES = [
  'ASAP (2 weeks)',
  '1–2 months',
  'Ongoing retainer',
];

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [scopeService, setScopeService] = useState<string>('UI/UX Design');
  const [scopeTimeline, setScopeTimeline] = useState<string>('ASAP (2 weeks)');
  const [activeNavSection, setActiveNavSection] = useState<string>('');

  // Highlight active nav link as user scrolls
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((n) => n.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.01 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const briefMessage = `Hi Muzammil, I'd like to scope a ${scopeService} sprint on an ${scopeTimeline} timeline with Splash Studio.`;
  const encodedBrief = encodeURIComponent(briefMessage);
  const whatsappHref = `https://wa.me/${CONTACT_LINKS.whatsappNumber}?text=${encodedBrief}`;
  const emailHref = `mailto:${CONTACT_LINKS.email}?subject=${encodeURIComponent(
    `Splash Studio — ${scopeService}`
  )}&body=${encodedBrief}`;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Electric-blue top scroll progress bar */}
      <ScrollProgressBar />

      {/* Soft floating blurred blue ambient shapes + scroll parallax + cursor aura */}
      <FloatingBlueBlobs />

      {/* ====================================================================
          TOP NAVIGATION (Sticky Desktop + Mobile Hamburger Drawer)
      ==================================================================== */}
      <header className="sticky top-0 z-40 bg-light-surface/95 backdrop-blur-xs border-b border-light-outline-variant">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <a
            href="#top"
            className="inline-flex items-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-primary rounded-sm transition-transform duration-150 hover:scale-[1.02]"
          >
            <img
              src={BRAND_ASSETS.headerLogo}
              alt="Splash Studio"
              referrerPolicy="no-referrer"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Links with Animated Underline */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-active={activeNavSection === link.id ? 'true' : 'false'}
                className={`nav-link-underline font-body text-label-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  activeNavSection === link.id
                    ? 'text-light-primary'
                    : 'text-light-on-surface-variant hover:text-light-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Primary Action */}
          <div className="hidden md:flex items-center shrink-0">
            <MagneticAction
              as="a"
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-light-primary text-light-on-primary px-5 py-2.5 font-body text-label-md shrink-0 whitespace-nowrap transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
            >
              <span>Hire me</span>
            </MagneticAction>
          </div>

          {/* Mobile Hamburger Button (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant transition-colors duration-150 hover:border-light-primary hover:text-light-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Collapsible Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, height: 0 }
              }
              animate={{ opacity: 1, height: 'auto' }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-light-outline-variant bg-light-surface-container-lowest"
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {NAV_LINKS.slice(0, 4).map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 font-body text-label-lg text-light-on-surface hover:text-light-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 font-body text-label-lg text-light-primary"
                >
                  Hire me
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top" className="flex-1">
        {/* ==================================================================
            1. HERO SECTION
        ================================================================== */}
        <section className="max-w-[1200px] mx-auto px-5 md:px-8 pt-12 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-3xl flex flex-col items-start gap-5 md:gap-7">
            {/* Founder badge pill */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              className="inline-flex items-center gap-2.5 md:gap-3 rounded-full bg-light-surface-container-lowest border border-light-outline-variant pl-1.5 pr-3.5 md:pl-2 md:pr-4 py-1 md:py-1.5 shadow-sm transition-colors hover:border-[#2F5BFF]/40"
            >
              <img
                src={BRAND_ASSETS.founderAvatar}
                alt="Muzammil, founder of Splash Studio"
                referrerPolicy="no-referrer"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
              />
              <span className="font-body text-label-md text-light-on-surface whitespace-nowrap">
                <span className="md:hidden">Muzammil · Splash Studio</span>
                <span className="hidden md:inline">
                  Muzammil · Founder of Splash Studio
                </span>
              </span>
            </motion.div>

            {/* Word-by-word animated headline */}
            <WordReveal
              text="Hi, I'm Muzammil"
              className="font-display text-display-lg-mobile md:text-display-lg text-light-on-surface text-balance min-w-0"
            />

            {/* Lead copy */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-body text-body-md md:text-body-lg text-light-on-surface-variant max-w-prose text-pretty"
            >
              <span className="md:hidden">
                Founder of Splash Studio — a digital agency crafting UI/UX
                design, analytics dashboards, AI automations, web apps, and
                launch videos.
              </span>
              <span className="hidden md:inline">
                I lead Splash Studio, a digital agency helping founders and
                product teams ship high-converting UI/UX design, analytics
                dashboards, AI automations, custom web apps, and launch videos.
              </span>
            </motion.p>

            {/* Primary & Secondary CTAs with Magnetic Pull + Tap Ripple */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full md:w-auto flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3 md:gap-4 pt-2"
            >
              <MagneticAction
                as="a"
                href="#portfolio"
                className="group w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-primary text-light-on-primary px-6 py-3.5 md:px-7 font-body text-label-lg whitespace-nowrap transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <span>View my work</span>
                <ArrowDown
                  className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </MagneticAction>

              <MagneticAction
                as="a"
                href="#contact"
                rippleColor="rgba(47, 91, 255, 0.16)"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant px-6 py-3.5 md:px-7 font-body text-label-lg whitespace-nowrap transition-colors duration-150 ease-out hover:border-light-primary hover:text-light-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <span>Hire me</span>
              </MagneticAction>
            </motion.div>

            {/* Above-the-fold Proof Strip */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.34,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full pt-5 md:pt-8 mt-1 md:mt-2 border-t border-light-outline-variant grid grid-cols-3 gap-3 md:gap-6 max-w-xl"
            >
              <div className="flex flex-col gap-0.5 md:gap-1">
                <span className="font-headline text-title-lg md:text-headline-md text-light-on-surface tabular-nums">
                  45+
                </span>
                <span className="font-body text-label-sm md:text-label-md text-light-on-surface-variant">
                  <span className="md:hidden">Shipped</span>
                  <span className="hidden md:inline">Products shipped</span>
                </span>
              </div>
              <div className="flex flex-col gap-0.5 md:gap-1">
                <span className="font-headline text-title-lg md:text-headline-md text-light-on-surface tabular-nums">
                  5.0
                </span>
                <span className="font-body text-label-sm md:text-label-md text-light-on-surface-variant">
                  <span className="md:hidden">Rating</span>
                  <span className="hidden md:inline">Client rating</span>
                </span>
              </div>
              <div className="flex flex-col gap-0.5 md:gap-1">
                <span className="font-headline text-title-lg md:text-headline-md text-light-on-surface tabular-nums">
                  <span className="md:hidden">2–4w</span>
                  <span className="hidden md:inline">2–4 wks</span>
                </span>
                <span className="font-body text-label-sm md:text-label-md text-light-on-surface-variant">
                  <span className="md:hidden">Sprint</span>
                  <span className="hidden md:inline">Typical sprint</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================================================================
            2. SERVICES SECTION (Custom 3D Icons + Staggered Scroll + Tilt)
        ================================================================== */}
        <ScrollRevealSection
          id="services"
          className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 border-t border-light-outline-variant"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="flex flex-col gap-2 md:gap-3 max-w-xl">
              <span className="font-body text-label-md text-light-primary">
                Services
              </span>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
                What Splash Studio builds
              </h2>
            </div>
            <p className="hidden md:block font-body text-body-md text-light-on-surface-variant max-w-sm text-pretty">
              End-to-end execution across product design, engineering,
              automation, and motion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 items-stretch">
            {SERVICES.map((service, idx) => {
              const IconComponent = service.Icon3D;
              return (
                <StaggerRevealItem
                  key={service.title}
                  index={idx}
                  className={`${
                    service.wide ? 'md:col-span-3' : 'md:col-span-2'
                  } h-full`}
                >
                  <TiltCard
                    className={`${
                      service.wide ? 'md:p-8' : 'md:p-7'
                    } h-full flex flex-col justify-between gap-3 md:gap-6 rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-5 portfolio-card-shadow`}
                  >
                    <div className="relative z-10 flex items-center justify-between gap-3 md:gap-4">
                      <div className="flex items-center gap-3">
                        {/* 3D Icon Pedestal */}
                        <div
                          className={`${
                            service.wide
                              ? 'w-12 h-12 md:w-14 md:h-14'
                              : 'w-11 h-11 md:w-13 md:h-13'
                          } shrink-0 rounded-xl bg-light-primary-container/75 border border-[#2F5BFF]/10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5`}
                        >
                          <IconComponent
                            className={
                              service.wide
                                ? 'w-9 h-9 md:w-11 md:h-11'
                                : 'w-8 h-8 md:w-10 md:h-10'
                            }
                          />
                        </div>
                        <h3 className="md:hidden font-headline text-title-lg text-light-on-surface">
                          {service.title}
                        </h3>
                      </div>

                      <span className="font-body text-label-sm text-light-primary bg-light-primary-container px-2.5 md:px-3 py-1 rounded-full shrink-0 whitespace-nowrap">
                        <span className="md:hidden">{service.mobileSprint}</span>
                        <span className="hidden md:inline">
                          {service.sprint}
                        </span>
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2">
                      <h3
                        className={`hidden md:block font-headline ${
                          service.wide ? 'text-headline-md' : 'text-title-lg'
                        } text-light-on-surface transition-colors duration-200 group-hover:text-light-primary`}
                      >
                        {service.title}
                      </h3>
                      <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
                        {service.description}
                      </p>
                    </div>
                  </TiltCard>
                </StaggerRevealItem>
              );
            })}
          </div>
        </ScrollRevealSection>

        {/* ==================================================================
            3. PORTFOLIO SECTION (Animated Filter Pill + Hover Previews)
        ================================================================== */}
        <ScrollRevealSection
          id="portfolio"
          className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 border-t border-light-outline-variant"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="font-body text-label-md text-light-primary">
                Selected Work
              </span>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
                Recent projects
              </h2>
            </div>

            {/* Category Filter Controls with Gliding Active Pill */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-2 md:gap-2.5"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(option.id)}
                    className={`relative inline-flex items-center justify-center rounded-full px-3.5 md:px-4 py-2 font-body text-label-md whitespace-nowrap shrink-0 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary ${
                      isActive
                        ? 'text-light-on-primary'
                        : 'bg-light-surface-container-lowest text-light-on-surface-variant border border-light-outline-variant hover:border-light-primary hover:text-light-primary'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={
                          shouldReduceMotion
                            ? undefined
                            : 'portfolio-filter-pill'
                        }
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-light-primary"
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filterable Grid */}
          <motion.div
            layout={!shouldReduceMotion}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout={!shouldReduceMotion}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 16, scale: 0.97 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.28,
                    delay: Math.min(idx * 0.04, 0.16),
                    ease: [0.2, 0, 0, 1],
                  }}
                  className="h-full"
                >
                  <TiltCard
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    aria-label={`Preview case study: ${project.title}`}
                    className="h-full cursor-pointer flex flex-col overflow-hidden rounded-xl bg-light-surface-container-lowest border border-light-outline-variant portfolio-card-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-light-surface-container-low relative">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackLabel={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Video Play Badge (for Video category) */}
                      {project.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-light-surface-container-lowest/95 text-light-primary flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110">
                            <Play
                              className="w-5 h-5 md:w-6 md:h-6 fill-current ml-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      )}

                      {/* Hover Preview Bar */}
                      <div
                        aria-hidden="true"
                        className="hidden md:flex absolute inset-x-0 bottom-0 p-5 pt-14 bg-gradient-to-t from-navy-ink/85 via-navy-ink/45 to-transparent items-end justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-out pointer-events-none"
                      >
                        <div className="flex flex-col gap-0.5 text-white">
                          <span className="font-body text-label-sm text-white/80">
                            Outcome
                          </span>
                          <span className="font-headline text-title-md">
                            {project.outcome}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-light-surface-container-lowest text-light-on-surface px-3.5 py-1.5 font-body text-label-sm shadow-sm">
                          <span>Case study</span>
                          <ArrowUpRight className="w-[15px] h-[15px]" />
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-3 md:gap-4 p-5 md:p-7 flex-1">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-body text-label-md text-light-primary">
                          {project.categoryLabel} · {project.metric}
                        </span>
                        <h3 className="font-headline text-title-lg text-light-on-surface transition-colors duration-200 group-hover:text-light-primary">
                          {project.title}
                        </h3>
                        <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
                          {project.summary}
                        </p>
                      </div>
                      <span className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border border-light-outline-variant flex items-center justify-center text-light-on-surface group-hover:border-light-primary group-hover:bg-light-primary group-hover:text-light-on-primary transition-all duration-200">
                        <ArrowUpRight
                          className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollRevealSection>

        {/* ==================================================================
            4. PROCESS SECTION (3D Icons + Staggered Scroll)
        ================================================================== */}
        <ScrollRevealSection
          id="process"
          className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 border-t border-light-outline-variant"
        >
          <div className="flex flex-col gap-2 md:gap-3 max-w-xl mb-8 md:mb-12">
            <span className="font-body text-label-md text-light-primary">
              Process
            </span>
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
              How we ship together
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon3D = step.Icon3D;
              return (
                <StaggerRevealItem
                  key={step.title}
                  index={idx}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={4}
                    className="h-full flex flex-col gap-3 md:gap-4 rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-5 md:p-7 portfolio-card-shadow"
                  >
                    <div className="relative z-10 flex items-center gap-3 md:block">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-light-primary-container/75 border border-[#2F5BFF]/10 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
                        <StepIcon3D className="w-8 h-8 md:w-9 md:h-9" />
                      </div>
                      <h3 className="md:hidden font-headline text-title-lg text-light-on-surface">
                        {step.title}
                      </h3>
                    </div>
                    <h3 className="relative z-10 hidden md:block font-headline text-title-lg text-light-on-surface transition-colors duration-200 group-hover:text-light-primary">
                      {step.title}
                    </h3>
                    <p className="relative z-10 font-body text-body-md text-light-on-surface-variant text-pretty">
                      {step.description}
                    </p>
                  </TiltCard>
                </StaggerRevealItem>
              );
            })}
          </div>
        </ScrollRevealSection>

        {/* ==================================================================
            4b. CLIENT REVIEWS SECTION
        ================================================================== */}
        <ScrollRevealSection
          id="testimonials"
          className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 border-t border-light-outline-variant"
        >
          <div className="flex flex-col gap-2 md:gap-3 max-w-xl mb-8 md:mb-12">
            <span className="font-body text-label-md text-light-primary">
              Client Feedback
            </span>
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
              <span className="md:hidden">Trusted by founders</span>
              <span className="hidden md:inline">
                Trusted by founders &amp; teams
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {TESTIMONIALS.map((review, idx) => (
              <StaggerRevealItem
                key={review.name}
                index={idx}
                className="h-full"
              >
                <TiltCard
                  maxTilt={3.5}
                  className="h-full flex flex-col justify-between gap-4 md:gap-6 rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-5 md:p-7 portfolio-card-shadow"
                >
                  <p className="relative z-10 font-body text-body-md text-light-on-surface text-pretty">
                    {review.quote}
                  </p>
                  <div className="relative z-10 flex flex-col gap-0.5 pt-3 md:pt-4 border-t border-light-outline-variant">
                    <span className="font-headline text-title-md text-light-on-surface">
                      {review.name}
                    </span>
                    <span className="font-body text-label-md text-light-on-surface-variant">
                      {review.role}
                    </span>
                  </div>
                </TiltCard>
              </StaggerRevealItem>
            ))}
          </div>
        </ScrollRevealSection>

        {/* ==================================================================
            5. CONTACT & 30-SECOND PROJECT SCOPER SECTION
        ================================================================== */}
        <ScrollRevealSection
          id="contact"
          className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 md:pt-10 pb-16 md:pb-24"
        >
          <div className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-6 md:p-12 portfolio-card-shadow flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-3 max-w-lg">
              <span className="font-body text-label-md text-light-primary">
                30-Second Project Scoper
              </span>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
                Ready to build with Splash Studio?
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
                Pick what you need below to pre-fill a brief, or message me
                directly. I reply within a few hours.
              </p>
            </div>

            {/* Interactive Project Scoper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 p-4 md:p-6 rounded-lg bg-light-surface-container-low border border-light-outline-variant">
              <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
                <div className="flex flex-col gap-2 md:gap-2.5">
                  <span className="font-body text-label-md text-light-on-surface">
                    1. Select service focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SCOPER_SERVICES.map((serviceName) => {
                      const active = scopeService === serviceName;
                      return (
                        <button
                          key={serviceName}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setScopeService(serviceName)}
                          className={`relative rounded-full px-3 md:px-4 py-1.5 md:py-2 font-body text-label-md whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary ${
                            active
                              ? 'text-light-on-primary'
                              : 'bg-light-surface-container-lowest text-light-on-surface-variant border border-light-outline-variant hover:border-light-primary hover:text-light-primary'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId={
                                shouldReduceMotion
                                  ? undefined
                                  : 'scoper-service-pill'
                              }
                              transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 32,
                              }}
                              className="absolute inset-0 rounded-full bg-light-primary"
                            />
                          )}
                          <span className="relative z-10">{serviceName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:gap-2.5">
                  <span className="font-body text-label-md text-light-on-surface">
                    2. Target timeline
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SCOPER_TIMELINES.map((timeline) => {
                      const active = scopeTimeline === timeline;
                      return (
                        <button
                          key={timeline}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setScopeTimeline(timeline)}
                          className={`relative rounded-full px-3 md:px-4 py-1.5 md:py-2 font-body text-label-md whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary ${
                            active
                              ? 'text-light-on-primary'
                              : 'bg-light-surface-container-lowest text-light-on-surface-variant border border-light-outline-variant hover:border-light-primary hover:text-light-primary'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId={
                                shouldReduceMotion
                                  ? undefined
                                  : 'scoper-timeline-pill'
                              }
                              transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 32,
                              }}
                              className="absolute inset-0 rounded-full bg-light-primary"
                            />
                          )}
                          <span className="relative z-10">{timeline}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-3 md:gap-4 rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-4 md:p-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-body text-label-sm text-light-primary uppercase">
                    Recommended Brief
                  </span>
                  <p className="font-body text-body-md text-light-on-surface text-pretty">
                    "{briefMessage}"
                  </p>
                </div>
                <span className="font-body text-label-sm text-light-on-surface-variant">
                  Pre-filled automatically when you click WhatsApp or Email
                  below
                </span>
              </div>
            </div>

            {/* Direct Contact Channels (Magnetic + Tap Ripple) */}
            <div className="grid grid-cols-1 md:flex md:flex-wrap items-center gap-3 md:gap-3.5">
              {/* WhatsApp */}
              <MagneticAction
                as="a"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-primary text-light-on-primary px-5 md:px-6 py-3.5 font-body text-label-lg whitespace-nowrap transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <MessageCircle className="w-[18px] h-[18px]" aria-hidden="true" />
                <span>WhatsApp</span>
              </MagneticAction>

              {/* Email */}
              <MagneticAction
                as="a"
                href={emailHref}
                rippleColor="rgba(47, 91, 255, 0.16)"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant px-5 md:px-6 py-3.5 font-body text-label-lg whitespace-nowrap transition-all duration-150 ease-out hover:border-light-primary hover:text-light-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <Mail className="w-[18px] h-[18px] text-light-primary" aria-hidden="true" />
                <span>Email</span>
              </MagneticAction>

              {/* LinkedIn */}
              <MagneticAction
                as="a"
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="rgba(47, 91, 255, 0.16)"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant px-5 md:px-6 py-3.5 font-body text-label-lg whitespace-nowrap transition-all duration-150 ease-out hover:border-light-primary hover:text-light-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <Briefcase className="w-[18px] h-[18px] text-light-primary" aria-hidden="true" />
                <span>LinkedIn</span>
              </MagneticAction>

              {/* Fiverr */}
              <MagneticAction
                as="a"
                href={CONTACT_LINKS.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="rgba(47, 91, 255, 0.16)"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant px-5 md:px-6 py-3.5 font-body text-label-lg whitespace-nowrap transition-all duration-150 ease-out hover:border-light-primary hover:text-light-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <Store className="w-[18px] h-[18px] text-light-primary" aria-hidden="true" />
                <span>Fiverr</span>
              </MagneticAction>

              {/* YouTube */}
              <MagneticAction
                as="a"
                href={CONTACT_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="rgba(47, 91, 255, 0.16)"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant px-5 md:px-6 py-3.5 font-body text-label-lg whitespace-nowrap transition-all duration-150 ease-out hover:border-light-primary hover:text-light-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <Youtube className="w-[18px] h-[18px] text-light-primary" aria-hidden="true" />
                <span>YouTube</span>
              </MagneticAction>
            </div>
          </div>
        </ScrollRevealSection>
      </main>

      {/* ====================================================================
          FOOTER (Dark Navy Anchor with Light Logo)
      ==================================================================== */}
      <footer className="bg-light-inverse-surface text-light-inverse-on-surface">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={BRAND_ASSETS.footerLogo}
              alt="Splash Studio"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain"
            />
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-5 md:gap-6"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="font-body text-label-md text-light-inverse-on-surface/80 hover:text-light-inverse-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="font-body text-label-sm text-light-inverse-on-surface/70">
            © 2026 Splash Studio · Muzammil
          </p>
        </div>
      </footer>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={(service) => setScopeService(service)}
      />
    </div>
  );
}
