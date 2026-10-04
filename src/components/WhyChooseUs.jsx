import { FaShieldAlt, FaClock, FaUserCheck, FaHeadset } from 'react-icons/fa';

const features = [
  { icon: FaShieldAlt, title: 'Verified Doctors', desc: 'All doctors are fully licensed and background-checked for your safety.', color: 'text-sky-400 bg-sky-400/10' },
  { icon: FaClock, title: 'Instant Booking', desc: 'Same-day appointments available. No long waiting periods.', color: 'text-green-400 bg-green-400/10' },
  { icon: FaUserCheck, title: 'Patient First', desc: 'Transparent pricing, no hidden fees. Your health and comfort come first.', color: 'text-purple-400 bg-purple-400/10' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'Our support team is available round the clock to help you.', color: 'text-yellow-400 bg-yellow-400/10' },
];

const WhyChooseUs = () => (
  <section className="py-20 bg-[#040D1A]">
    <div className="container mx-auto px-4 md:px-12">
      <div className="text-center mb-14">
        <span className="inline-block bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          Why Us
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
          Why Choose{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
            DocAppoint
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          We are committed to making quality healthcare accessible and convenient for everyone.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-[#0A1829] border border-sky-500/10 rounded-3xl p-8 hover:border-sky-500/30 transition-all duration-300 text-center group">
            <div className={`inline-flex p-4 rounded-2xl ${f.color} mb-5 group-hover:scale-110 transition-transform`}>
              <f.icon size={24} />
            </div>
            <h3 className="text-white font-black text-base mb-3">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
