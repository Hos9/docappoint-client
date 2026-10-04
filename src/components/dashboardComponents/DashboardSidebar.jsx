'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendarCheck, FaUser } from 'react-icons/fa';

const links = [
  { name: 'My Bookings', href: '/dashboard/my-bookings', icon: FaCalendarCheck },
  { name: 'My Profile', href: '/dashboard/my-profile', icon: FaUser },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="p-4 flex flex-col gap-2 h-full">
      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-3 mb-3">Dashboard Menu</p>
      {links.map(link => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              active
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <link.icon size={16} />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardSidebar;
