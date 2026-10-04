'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FaStar, FaMapMarkerAlt, FaHospital, FaBriefcaseMedical, FaSearch, FaSortAmountDown } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

const AllAppointmentsClient = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    fetch('/doctors.json')
      .then(r => r.json())
      .then(data => { setDoctors(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let arr = [...doctors];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.hospital.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'fee_asc') arr.sort((a, b) => a.fee - b.fee);
    else if (sortBy === 'fee_desc') arr.sort((a, b) => b.fee - a.fee);
    return arr;
  }, [doctors, search, sortBy]);

  const handleViewDetails = (id) => {
    if (session?.user) router.push(`/all-appointments/${id}`);
    else router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#040D1A] py-12">
      <div className="container mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            All{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              Appointments
            </span>
          </h1>
          <p className="text-gray-400">Find and book appointments with our verified doctors.</p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by doctor name, specialty, or hospital..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0A1829] border border-sky-500/10 outline-none text-white placeholder:text-gray-600 focus:border-sky-400/50 transition-all text-sm"
            />
          </div>
          <div className="relative">
            <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="pl-11 pr-8 py-3.5 rounded-2xl bg-[#0A1829] border border-sky-500/10 outline-none text-white text-sm focus:border-sky-400/50 transition-all appearance-none cursor-pointer"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="fee_asc">Sort: Fee (Low to High)</option>
              <option value="fee_desc">Sort: Fee (High to Low)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <ClipLoader color="#38BDF8" size={50} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white font-bold text-xl mb-2">No doctors found</p>
            <p className="text-gray-400 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(doc => (
              <div
                key={doc.id}
                className="bg-[#0A1829] border border-sky-500/10 rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] group flex flex-col"
              >
                <div className="relative h-52 bg-gradient-to-br from-sky-900/20 to-blue-900/20 overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#040D1A]/90 px-3 py-1 rounded-full border border-yellow-400/20">
                    <FaStar className="text-yellow-400" size={11} />
                    <span className="text-yellow-400 font-black text-xs">{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-sky-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {doc.specialty}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-black text-lg mb-3">{doc.name}</h3>
                  <div className="flex flex-col gap-1.5 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2"><FaHospital className="text-sky-400" size={11} />{doc.hospital}</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-sky-400" size={11} />{doc.location}</div>
                    <div className="flex items-center gap-2"><FaBriefcaseMedical className="text-sky-400" size={11} />{doc.experience} experience</div>
                  </div>
                  <div className="mb-4 mt-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Consultation Fee</p>
                    <p className="text-sky-400 font-black text-lg">৳ {doc.fee}</p>
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
    </div>
  );
};

export default AllAppointmentsClient;
