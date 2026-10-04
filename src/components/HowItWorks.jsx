import { FaSearch, FaCalendarCheck, FaUserMd, FaStar } from 'react-icons/fa';

const steps = [
  {
    icon: FaSearch,
    step: '01',
    title: 'Find a Doctor',
    description: 'Browse our directory of verified specialists by specialty, location, or name.',
    color: 'from-[#38BDF8] to-[#0EA5E9]',
  },
  {
    icon: FaCalendarCheck,
    step: '02',
    title: 'Book Appointment',
    description: 'Select a convenient time slot and complete your booking in under 2 minutes.',
    color: 'from-[#34D399] to-[#059669]',
  },
  {
    icon: FaUserMd,
    step: '03',
    title: 'See the Doctor',
    description: 'Visit your doctor at the hospital. Get the care you deserve.',
    color: 'from-[#A78BFA] to-[#7C3AED]',
  },
  {
    icon: FaStar,
    step: '04',
    title: 'Leave a Review',
    description: 'Share your experience to help other patients make informed decisions.',
    color: 'from-[#FBBF24] to-[#F59E0B]',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#030B16]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-14">
          <span className="inline-block bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              It Works
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Booking a doctor appointment has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative bg-[#0A1829] border border-sky-500/10 rounded-3xl p-8 hover:border-sky-500/30 transition-all duration-300 group text-center"
            >
              {/* Step number */}
              <div className="text-6xl font-black text-white/5 absolute top-4 right-6 select-none">{s.step}</div>

              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${s.color} mb-5 text-white shadow-lg`}>
                <s.icon size={24} />
              </div>

              <h3 className="text-white font-black text-lg mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
