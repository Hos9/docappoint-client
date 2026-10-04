import DoctorDetailsClient from '@/components/DoctorDetailsClient';
import { notFound } from 'next/navigation';
import { readFile } from 'fs/promises';
import path from 'path';

async function getDoctor(id) {
  const filePath = path.join(process.cwd(), 'public', 'doctors.json');
  const data = await readFile(filePath, 'utf-8');
  const doctors = JSON.parse(data);
  return doctors.find(d => d.id === id) || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const doc = await getDoctor(id);
  return {
    title: doc ? `DocAppoint — ${doc.name}` : 'Doctor Not Found',
    description: doc?.description,
  };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  const doctor = await getDoctor(id);
  if (!doctor) notFound();
  return <DoctorDetailsClient doctor={doctor} />;
}
