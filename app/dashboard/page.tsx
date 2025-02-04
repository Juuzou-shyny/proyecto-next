import ClientCardWrapper from '@/app/ui/dashboard/client-cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import Image from 'next/image';
import { fetchFeaturedPlants } from '@/app/lib/data';

// Fetch de las plantas destacadas desde la base de datos
const featuredPlants = await fetchFeaturedPlants();
export default async function Page() {
  const featuredPlants = await fetchFeaturedPlants();

  return (
    <main className="bg-lime-700 rounded-lg min-h-screen p-6">
       <div className="p-6">
      {/* Título del Dashboard */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Bienvenido a SELVA
      </h1>

      {/* Tarjetas del Cliente */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ClientCardWrapper />
      </div>
      {/* Exposición de Plantas */}
      <div className="mt-6 rounded-xl bg-gray-50 p-4 shadow">
        <h2 className={`${lusitana.className} text-lg font-bold mb-4`}>Nuestra exposición de plantas</h2>
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
  <div className="mt-6 rounded-xl bg-gray-50 p-4 shadow md:col-span-4">
          <h2 className="text-lg font-bold mb-4">Plantas Destacadas</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredPlants.map((plant) => (
              <div
                key={plant.id}
                className="flex flex-col items-center rounded-lg bg-white p-4 shadow"
              >
                {/* Imagen de la Planta */}
                <Image
                  src={plant.imagen_url || '/default-image.png'}
                  alt={plant.nombre || 'Planta'}
                  className="rounded-lg"
                  width={128}
                  height={128}
                />
                {/* Nombre */}
                <div className="mt-4 text-lg font-semibold">
                  {plant.nombre || 'Nombre no disponible'}
                </div>
                {/* Precio */}
                <div className="mt-2 text-gray-600">
                  ${parseFloat(plant.precio).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


