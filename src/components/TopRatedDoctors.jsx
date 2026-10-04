'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FaStar, FaMapMarkerAlt, FaHospital, FaBriefcaseMedical } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

const TopRatedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    fetch('/doctors.json')
      .then(r => r.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => b.rating - a.rating).slice(0, 3);
        setDoctors(sorted);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    if (session?.user) {
      router.push(`/all-appointments/${id}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="py-20 bg-[#040D1A]">
      <div className="container mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Top Picks
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Top Rated{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              Doctors
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Our highest-rated specialists, chosen based on patient reviews and successful outcomes.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <ClipLoader color="#38BDF8" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doc => (
              <div
                key={doc.id}
                className="bg-[#0A1829] border border-sky-500/10 rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] group flex flex-col"
              >
                {/* Doctor Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sky-900/20 to-blue-900/20">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#040D1A]/90 px-3 py-1.5 rounded-full border border-yellow-400/30">
                    <FaStar className="text-yellow-400" size={12} />
                    <span className="text-yellow-400 font-black text-sm">{doc.rating}</span>
                  </div>
                  {/* Specialty Badge */}
                  <div className="absolute bottom-4 left-4 bg-sky-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {doc.specialty}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-black text-lg mb-1">{doc.name}</h3>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaHospital className="text-sky-400 shrink-0" size={12} />
                      <span>{doc.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaMapMarkerAlt className="text-sky-400 shrink-0" size={12} />
                      <span>{doc.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaBriefcaseMedical className="text-sky-400 shrink-0" size={12} />
                      <span>{doc.experience} experience</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5 mt-auto">
                    <div>
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Consultation Fee</span>
                      <p className="text-sky-400 font-black text-lg">৳ {doc.fee}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(doc.id)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-black text-sm hover:opacity-90 transition-all active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedDoctors;
