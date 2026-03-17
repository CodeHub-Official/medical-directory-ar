'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clinic } from '@/utils/data';

interface ClinicCardProps {
  clinic: Clinic;
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinic/${clinic.id}`}>
      <div className="card hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-48 mb-4 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {clinic.specialty}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Name and Rating */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
              {clinic.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-semibold text-gray-700 mr-1">
                  {clinic.googleRating}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({clinic.googleReviews} تقييم)
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
            <span>📍</span>
            <div>
              <p className="font-semibold">{clinic.district}</p>
              <p className="text-xs text-gray-500">{clinic.city}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {clinic.description}
          </p>

          {/* Services */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {clinic.services.slice(0, 3).map((service, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
              {clinic.services.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  +{clinic.services.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
            <span>📞</span>
            <span>{clinic.phone}</span>
          </div>

          {/* Social Media */}
          {Object.keys(clinic.socialMedia).length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
              {clinic.socialMedia.facebook && (
                <a
                  href={clinic.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  f
                </a>
              )}
              {clinic.socialMedia.instagram && (
                <a
                  href={clinic.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  📷
                </a>
              )}
              {clinic.socialMedia.whatsapp && (
                <a
                  href={`https://wa.me/${clinic.socialMedia.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  💬
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
