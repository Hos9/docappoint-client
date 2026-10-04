import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/dashboardComponents/DashboardSidebar';

export const metadata = {
  title: 'DocAppoint — Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#040D1A] flex flex-col pt-20">
      <Navbar />
      <div className="flex-1 grid grid-cols-12 gap-0 relative">
        <div className="hidden lg:block lg:col-span-2 border-r border-sky-500/5 bg-[#030B16]">
          <div className="sticky top-20 h-[calc(100vh-80px)]">
            <DashboardSidebar />
          </div>
        </div>
        <main className="col-span-12 lg:col-span-10 min-h-[calc(100vh-80px)] p-4 sm:p-8 lg:p-12 flex flex-col items-center">
          <div className="w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
