import MyBookingsClient from '@/components/dashboardComponents/MyBookingsClient';

export const metadata = {
  title: 'DocAppoint — My Bookings',
  description: 'Manage all your doctor appointments in one place.',
};

export default function MyBookingsPage() {
  return <MyBookingsClient />;
}
