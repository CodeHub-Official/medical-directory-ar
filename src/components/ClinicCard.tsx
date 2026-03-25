import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Clinic {
  id: string;
  name: string;
  specialty: string;
  city: string;
  image?: string;
}

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="card hover:shadow-xl transition-all duration-300 cursor-pointer h-full border rounded-lg overflow-hidden bg-white">
      <Link href={`/clinic/${clinic.id}`} className="block">
        <div className="relative w-full h-48">
          <Image 
            src={clinic.image || '/images/placeholder.jpg'} 
            alt={clinic.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{clinic.name}</h3>
          <p className="text-blue-600 font-medium">{clinic.specialty}</p>
          <p className="text-gray-500 text-sm mt-1">{clinic.city}</p>
        </div>
      </Link>
    </div>
  );
}
