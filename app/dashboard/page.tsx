import ClientCardWrapper from '@/app/ui/dashboard/client-cards'; // Importamos el nuevo componente
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { 
  LatestInvoicesSkeleton, 
  RevenueChartSkeleton,
} from '@/app/ui/skeletons';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function Page() {
  // Datos simulados para las plantas destacadas
  const featuredPlants = [
    { id: 1, name: 'Cactus', image_url: '/images/cactus.jpg', price: 5 },
    { id: 2, name: 'Rosa', image_url: '/images/rosa.jpg', price: 10 },
    { id: 3, name: 'Orquídea', image_url: '/images/orquidea.jpg', price: 15 },
    { id: 4, name: 'Helecho', image_url: '/images/helecho.jpg', price: 7 },
  ];

  return (
    <main className="bg-lime-700 rounded-lg min-h-screen p-6">
       <div className="p-6">
      {/* Título del Dashboard */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Bienvenido a tu espacio de plantas
      </h1>

      {/* Tarjetas del Cliente */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ClientCardWrapper />
      </div>
      {/* Exposición de Plantas */}
      <div className="mt-6 rounded-xl bg-gray-50 p-4 shadow">
        <h2 className="text-lg font-bold mb-4">Esta es nuestra exposición de plantas</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
    {/* Imagen 1 */}
    <div className="flex justify-center">
      <Image
        src="/planta2.png"
        alt="Exposición de planta 1"
        className="rounded-lg shadow-md max-w-full"
        width={500}
        height={500}
      />
    </div>
    {/* Imagen 2 */}
    <div className="flex justify-center">
      <Image
        src="/planta5.png"
        alt="Exposición de planta 2"
        className="rounded-lg shadow-md max-w-full"
        width={500}
        height={500}
      />
    </div>
  </div>
      </div>


      {/* Plantas Destacadas en formato Grid */}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
        <div className="rounded-xl bg-gray-50 p-4 shadow md:col-span-4">
          <h2 className="text-lg font-bold mb-4">Plantas Destacadas</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredPlants.map((plant) => (
              <div
                key={plant.id}
                className="flex flex-col items-center rounded-lg bg-white p-4 shadow"
              >
                <div
                  className="h-32 w-32 rounded-lg bg-gray-200"
                  style={{
                    backgroundImage: `url(${plant.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="mt-4 text-lg font-semibold">{plant.name}</div>
                <div className="mt-2 text-gray-600">${plant.price}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
    </main>
  );
}
