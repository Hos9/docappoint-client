import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AppointmentsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
