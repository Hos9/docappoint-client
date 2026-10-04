'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative font-bold text-sm transition-colors duration-200 group ${
        isActive ? 'text-sky-400' : 'text-gray-300 hover:text-sky-400'
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] rounded-full transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
};

export default NavLink;
