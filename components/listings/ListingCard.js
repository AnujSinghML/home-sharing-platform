import Link from 'next/link';
import Image from 'next/image';

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <div className="relative w-full h-48">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
        <p className="text-gray-600 mb-2">{listing.location}</p>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-gray-600">
            {listing.bedrooms} {listing.bedrooms === 1 ? 'bed' : 'beds'}
          </span>
          <span className="text-gray-600">
            {listing.bathrooms} {listing.bathrooms === 1 ? 'bath' : 'baths'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">${listing.price}<span className="text-gray-500 text-sm">/night</span></span>
          <Link href={`/listings/${listing._id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-lg text-sm transition duration-200">
            View
          </Link>
        </div>
        {listing.availableDates && listing.availableDates.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Available: {new Date(listing.availableDates[0].start).toLocaleDateString()} - {new Date(listing.availableDates[0].end).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
} 