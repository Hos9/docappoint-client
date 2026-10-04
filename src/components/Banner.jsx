'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaStethoscope, FaCalendarCheck, FaStar, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    headline: 'Find the Right Doctor,',
    highlight: 'Book Instantly',
    sub: 'Browse hundreds of verified specialists. Same-day appointments available.',
    badge: '🏥 Trusted by 50,000+ patients',
    cta: { label: 'Book Appointment', href: '/all-appointments' },
    accent: 'from-[#38BDF8] to-[#0EA5E9]',
    bg: 'from-[#04111F] via-[#071929] to-[#040D1A]',
    stat: [
      { label: 'Doctors', value: '200+' },
      { label: 'Specialties', value: '30+' },
      { label: 'Cities', value: '10+' },
    ],
  },
  {
    headline: 'Your Health,',
    highlight: 'Our Priority',
    sub: 'Connect with top cardiologists, neurologists, and specialists in minutes.',
    badge: '⭐ 4.9 Average Rating',
    cta: { label: 'Browse Doctors', href: '/all-appointments' },
    accent: 'from-[#34D399] to-[#059669]',
    bg: 'from-[#04190F] via-[#072914] to-[#040D1A]',
    stat: [
      { label: 'Appointments', value: '10K+' },
      { label: 'Reviews', value: '8,000+' },
      { label: 'Success', value: '99%' },
    ],
  },
  {
    headline: 'Skip the Wait,',
    highlight: 'See a Doctor Now',
    sub: 'Easy online booking, reminders, and follow-up — all in one place.',
    badge: '📅 Zero-hassle scheduling',
    cta: { label: 'Get Started', href: '/register' },
    accent: 'from-[#A78BFA] to-[#7C3AED]',
    bg: 'from-[#0D0419] via-[#150924] to-[#040D1A]',
    stat: [
      { label: 'Avg Wait', value: '<5 min' },
      { label: 'Hospitals', value: '45+' },
      { label: 'Support', value: '24/7' },
    ],
  },
];

const BannerSlide = ({ slide }) => (
  <div className={`relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br ${slide.bg} overflow-hidden`}>
    {/* Background grid */}
    <div className="absolute inset-0 opacity-5"
      style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
    />
    {/* Glow blobs */}
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 md:px-12 py-24 relative z-10">
      <div className="max-w-3xl">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
          {slide.badge}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
          {slide.headline}
          <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
            {slide.highlight}
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href={slide.cta.href}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-black text-base bg-gradient-to-r ${slide.accent} hover:opacity-90 transition-all active:scale-95 shadow-xl`}
          >
            <FaCalendarCheck />
            {slide.cta.label}
            <FaArrowRight size={14} />
          </Link>
          <Link
            href="/all-appointments"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-200 font-black text-base border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <FaStethoscope />
            View Doctors
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8">
          {slide.stat.map((s, i) => (
            <div key={i} className="text-center">
              <p className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Banner = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Lazy-load Swiper since it's a client component
    const loadSwiper = async () => {
      const { register } = await import('swiper/element/bundle');
      register();
    };
    loadSwiper();
  }, []);

  return (
    <section className="pt-20">
      <swiper-container
        ref={swiperRef}
        slides-per-view="1"
        loop="true"
        autoplay-delay="5000"
        autoplay-disable-on-interaction="false"
        pagination="true"
        navigation="true"
        style={{
          '--swiper-pagination-color': '#38BDF8',
          '--swiper-navigation-color': '#38BDF8',
        }}
      >
        {slides.map((slide, i) => (
          <swiper-slide key={i}>
            <BannerSlide slide={slide} />
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
};

export default Banner;
