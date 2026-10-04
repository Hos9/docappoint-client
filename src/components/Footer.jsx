'use client';
import Link from 'next/link';
import { FaStethoscope, FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { Icon: FaFacebookF, color: 'hover:bg-blue-600', href: '#' },
  { Icon: FaInstagram, color: 'hover:bg-pink-600', href: '#' },
  { Icon: FaXTwitter, color: 'hover:bg-gray-700', href: '#' },
  { Icon: FaYoutube, color: 'hover:bg-red-600', href: '#' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Appointments', href: '/all-appointments' },
  { label: 'Dashboard', href: '/dashboard/my-bookings' },
];

const contactInfo = [
  { Icon: FaMapMarkerAlt, text: 'Dhanmondi, Dhaka, Bangladesh' },
  { Icon: FaPhoneAlt, text: '+880 1800-000000' },
  { Icon: FaEnvelope, text: 'support@docappoint.com' },
];

const Footer = () => {
  return (
    <footer className="bg-[#030B16] text-gray-400 border-t border-sky-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5 flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                <FaStethoscope size={20} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
                DocAppoint
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs text-center sm:text-left">
              Connecting patients with trusted doctors.
              <br className="hidden sm:block" />
              Book. Heal. Repeat.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:text-white hover:border-transparent ${item.color}`}
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3 text-center sm:text-left">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3 group justify-center sm:justify-start">
                  <div className="text-sky-400 bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500/20 transition-colors shrink-0 mt-0.5">
                    <item.Icon size={13} />
                  </div>
                  <span className="text-sm font-medium leading-tight pt-1.5">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Support</h3>
            <ul className="space-y-3 text-center sm:text-left">
              {[
                { label: 'FAQs', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms & Conditions', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-medium hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium opacity-60 text-center">
            &copy; {new Date().getFullYear()} DocAppoint. All rights reserved.
          </p>
          <p className="text-xs opacity-40">Made with ♥ for better healthcare</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
