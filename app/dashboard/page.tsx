import ClientCardWrapper from '@/app/ui/dashboard/client-cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import Image from 'next/image';
import { fetchFeaturedPlants } from '@/app/lib/data';
import ThemeToggle from '@/app/ui/components/ThemeToggle'; // 👈 Importa el botón

const featuredPlants = await fetchFeaturedPlants();

export default async function Page() {
  return (
    <main className="bg-lime-700 dark:bg-gray-900 text-black dark:text-white rounded-lg min-h-screen p-6">
      <div className="p-6">
        {/* Header con botón de Dark Mode */}
        <div className="flex justify-between items-center mb-4">
          <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
            Bienvenido a SELVA
          </h1>
          <ThemeToggle /> {/* 👈 Agregamos el botón aquí */}
        </div>

        {/* Tarjetas del Cliente */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ClientCardWrapper />
        </div>

        {/* Exposición de Plantas */}
        <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 shadow">
          <h2 className={`${lusitana.className} text-lg font-bold mb-4`}>
            Nuestra exposición de plantas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src="/planta2.png"
                alt="Exposición de planta 1"
                className="rounded-lg shadow-md max-w-full"
                width={500}
                height={500}
              />
            </div>
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

        {/* Plantas Destacadas */}
        <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 shadow">
          <h2 className="text-lg font-bold mb-4">Plantas Destacadas</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredPlants.map((plant) => (
              <div
                key={plant.id}
                className="flex flex-col items-center rounded-lg bg-white dark:bg-gray-700 p-4 shadow"
              >
                <Image
                  src={plant.imagen_url || '/default-image.png'}
                  alt={plant.nombre || 'Planta'}
                  className="rounded-lg"
                  width={128}
                  height={128}
                />
                <div className="mt-4 text-lg font-semibold">
                  {plant.nombre || 'Nombre no disponible'}
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
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
