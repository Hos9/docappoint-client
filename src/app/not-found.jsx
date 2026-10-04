'use client';
import Link from 'next/link';
import { FaStethoscope, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#040D1A] px-6 text-center relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />

      {/* 404 Ghost Text */}
      <h1 className="text-[150px] md:text-[200px] font-black text-white/[0.03] absolute pointer-events-none select-none tracking-tighter">
        404
      </h1>

      <div className="relative z-10 max-w-xl">
        <div className="mb-8">
          <div className="inline-flex p-6 bg-sky-500/10 border border-sky-500/20 rounded-3xl mb-4 text-sky-400">
            <FaStethoscope size={48} />
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white text-xs font-black px-4 py-2 rounded-full rotate-12 shadow-lg animate-bounce">
            Page Not Found
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          Oops! This{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
            page
          </span>{' '}
          doesn&apos;t exist
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          The page you&apos;re looking for has been moved or doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-black hover:opacity-90 transition-all active:scale-95">
            <FaHome size={16} /> Go Home
          </Link>
          <Link href="/all-appointments"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-sky-500/20 text-sky-400 font-black hover:bg-sky-500/10 transition-all">
            <FaStethoscope size={16} /> Browse Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
