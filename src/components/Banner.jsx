'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStethoscope, FaCalendarCheck, FaArrowRight, FaShieldAlt, FaStar, FaClock } from 'react-icons/fa';

const slides = [
  {
    headline: 'Find the Right Doctor,',
    highlight: 'Book Instantly',
    sub: 'Browse hundreds of verified specialists across all major medical disciplines. Same-day appointments available.',
    badge: '🏥 Trusted by 50,000+ patients',
    cta: { label: 'Book Appointment', href: '/all-appointments' },
    accent: 'from-[#38BDF8] to-[#0EA5E9]',
    accentSolid: '#38BDF8',
    bg: 'from-[#04111F] via-[#071929] to-[#040D1A]',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    imageLabel: 'Dr. Ayesha Rahman',
    imageSpec: 'Cardiologist',
    stat: [
      { label: 'Doctors', value: '200+', icon: FaStethoscope },
      { label: 'Specialties', value: '30+', icon: FaShieldAlt },
      { label: 'Cities', value: '10+', icon: FaClock },
    ],
  },
  {
    headline: 'Your Health,',
    highlight: 'Our Priority',
    sub: 'Connect with top cardiologists, neurologists, and specialists in minutes. Verified credentials, real reviews.',
    badge: '⭐ 4.9 Average Rating',
    cta: { label: 'Browse Doctors', href: '/all-appointments' },
    accent: 'from-[#34D399] to-[#059669]',
    accentSolid: '#34D399',
    bg: 'from-[#04190F] via-[#072914] to-[#040D1A]',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    imageLabel: 'Dr. Rahim Chowdhury',
    imageSpec: 'Neurologist',
    stat: [
      { label: 'Appointments', value: '10K+', icon: FaCalendarCheck },
      { label: 'Reviews', value: '8,000+', icon: FaStar },
      { label: 'Success Rate', value: '99%', icon: FaShieldAlt },
    ],
  },
  {
    headline: 'Skip the Wait,',
    highlight: 'See a Doctor Now',
    sub: 'Easy online booking, automated reminders, and seamless follow-up — all managed in one place.',
    badge: '📅 Zero-hassle scheduling',
    cta: { label: 'Get Started Free', href: '/register' },
    accent: 'from-[#A78BFA] to-[#7C3AED]',
    accentSolid: '#A78BFA',
    bg: 'from-[#0D0419] via-[#150924] to-[#040D1A]',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    imageLabel: 'Dr. Nadia Islam',
    imageSpec: 'Dermatologist',
    stat: [
      { label: 'Avg Wait', value: '<5 min', icon: FaClock },
      { label: 'Hospitals', value: '45+', icon: FaStethoscope },
      { label: 'Support', value: '24/7', icon: FaShieldAlt },
    ],
  },
];

const BannerSlide = ({ slide }) => (
  <div className={`relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br ${slide.bg} overflow-hidden`}>

    {/* Background grid */}
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
    />

    {/* Glow blobs */}
    <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
      style={{ background: slide.accentSolid }} />
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-5"
      style={{ background: slide.accentSolid }} />

    <div className="container mx-auto px-4 md:px-12 py-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col order-2 lg:order-1">
          {/* Badge */}
          <span className={`inline-flex items-center gap-2 w-fit bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent border border-white/10 bg-white/5 text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-wider`}>
            {slide.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            {slide.headline}
            <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
              {slide.highlight}
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={slide.cta.href}
              className={`flex items-center gap-2 px-7 py-4 rounded-2xl text-white font-black text-sm bg-gradient-to-r ${slide.accent} hover:opacity-90 transition-all active:scale-95 shadow-xl`}
            >
              <FaCalendarCheck size={14} />
              {slide.cta.label}
              <FaArrowRight size={12} />
            </Link>
            <Link
              href="/all-appointments"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl text-gray-200 font-black text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <FaStethoscope size={14} />
              View All Doctors
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {slide.stat.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${slide.accent}`}>
                  <s.icon className="text-white" size={12} />
                </div>
                <div>
                  <p className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Doctor Photo ── */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative">
            {/* Outer glow ring */}
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${slide.accent} scale-110`} />

            {/* Photo circle */}
            <div className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl ring-4 ring-offset-4 ring-offset-transparent`}
              style={{ boxShadow: `0 0 60px ${slide.accentSolid}33` }}>
              <Image
                src={slide.image}
                alt={slide.imageLabel}
                fill
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                className="object-cover"
                priority
              />
              {/* Subtle overlay at bottom */}
              <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent`} />
            </div>

            {/* Doctor name card — bottom left of photo */}
            <div className="absolute -bottom-4 -left-4 bg-[#0A1829]/95 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-white font-black text-sm">{slide.imageLabel}</p>
              <p className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>{slide.imageSpec}</p>
            </div>

            {/* Rating badge — top right of photo */}
            <div className="absolute -top-3 -right-3 bg-[#0A1829]/95 backdrop-blur-md border border-yellow-400/30 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-1.5">
              <FaStar className="text-yellow-400" size={12} />
              <span className="text-yellow-400 font-black text-sm">4.9</span>
            </div>

            {/* Verified badge — right middle */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#0A1829]/95 backdrop-blur-md border border-white/10 rounded-full p-3 shadow-xl">
              <FaShieldAlt className="text-green-400" size={16} />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

const Banner = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
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
