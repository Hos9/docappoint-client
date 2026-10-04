import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import TopRatedDoctors from '@/components/TopRatedDoctors';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';

export const metadata = {
  title: 'DocAppoint — Home',
  description:
    'Browse top-rated doctors and book appointments easily with DocAppoint.',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <TopRatedDoctors />
        <HowItWorks />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}
