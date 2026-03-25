import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ClinicPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <div className="container mx-auto p-4">
      {/* Example of optimized image usage */}
      <div className="relative w-full h-64">
        <Image 
          src="/clinic-placeholder.jpg" 
          alt={slug} 
          fill 
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">Clinic: {slug}</h1>
      {/* Rest of your clinic details component */}
    </div>
  );
}
