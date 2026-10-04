'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { FaStethoscope } from 'react-icons/fa';
import NavLink from './NavLink';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'All Appointments', href: '/all-appointments' },
  { name: 'Dashboard', href: '/dashboard/my-bookings' },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    const privateRoutes = ['/dashboard'];
    const isPrivate = privateRoutes.some(r => pathname.startsWith(r));
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenus();
          isPrivate ? router.push('/login') : router.refresh();
        },
      },
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 bg-[#040D1A]/95 backdrop-blur-md border-b border-sky-500/10">
        <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeMenus} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2 rounded-xl text-white group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              <FaStethoscope size={22} />
            </div>
            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              DocAppoint
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-8 items-center">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.name}</NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="h-10 w-24 bg-white/10 animate-pulse rounded-full" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full border border-sky-500/20 transition-all relative z-[130]"
                >
                  <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-sky-500/50">
                    {user?.image ? (
                      <Image src={user.image} alt="User" width={40} height={40} className="object-cover" />
                    ) : (
                      <div className="h-full w-full bg-sky-600 flex items-center justify-center text-white text-sm font-bold">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block font-bold text-gray-200 text-sm">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 w-screen h-screen bg-transparent z-[120]"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-52 bg-[#0A1829] border border-sky-500/20 rounded-xl shadow-2xl py-2 overflow-hidden z-[140]">
                      <Link href="/dashboard/my-bookings" onClick={closeMenus} className="block px-4 py-2.5 text-gray-200 font-semibold hover:bg-white/5 text-sm">
                        My Bookings
                      </Link>
                      <Link href="/dashboard/my-profile" onClick={closeMenus} className="block px-4 py-2.5 text-gray-200 font-semibold hover:bg-white/5 text-sm">
                        My Profile
                      </Link>
                      <hr className="border-white/5 my-1" />
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-red-400 font-semibold hover:bg-white/5 text-sm">
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex gap-3">
                <Link href="/login" className="px-5 py-2 border border-sky-500/40 text-sky-400 rounded-full font-bold text-sm hover:bg-sky-500/10 transition-all">
                  Login
                </Link>
                <Link href="/register" className="px-5 py-2 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden text-3xl text-sky-400">
              <HiOutlineMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenus}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-[#040D1A] border-l border-sky-500/10 z-[160] transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          <button onClick={closeMenus} className="self-end text-3xl text-gray-400 mb-8">
            <HiX />
          </button>

          {user && (
            <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-sky-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-sky-500">
                  {user?.image ? (
                    <Image src={user.image} alt="User" width={48} height={48} className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-sky-600 flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-bold truncate text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <Link href="/dashboard/my-bookings" onClick={closeMenus} className="block text-center py-2 bg-sky-500/10 rounded-lg text-sm font-bold text-sky-400 border border-sky-500/20">
                Dashboard
              </Link>
            </div>
          )}

          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <NavLink href={link.href} onClick={closeMenus}>{link.name}</NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            {user ? (
              <button onClick={handleSignOut} className="w-full py-3 rounded-xl border border-red-500/50 text-red-400 font-bold">
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={closeMenus} className="block text-center py-3 rounded-xl border border-sky-500/40 text-sky-400 font-bold">
                  Login
                </Link>
                <Link href="/register" onClick={closeMenus} className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-bold">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
