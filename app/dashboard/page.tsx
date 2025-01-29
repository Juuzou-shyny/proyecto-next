import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import PlantsTable from '@/app/ui/cart/table'; // Tabla del carrito
import { PlantsTableSkeleton } from '@/app/ui/skeletons';

import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';
import { Suspense } from 'react';
import { 
  LatestInvoicesSkeleton, 
  RevenueChartSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  // Datos simulados para el carrito
  const plantsInCart = [
    { id: 1, name: 'Cactus', image_url: '/images/cactus.jpg', price: 5, quantity: 2 },
    { id: 2, name: 'Rosa', image_url: '/images/rosa.jpg', price: 10, quantity: 1 },
  ];

  return (
    <main>
      {/* Título del Dashboard */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Enlaces a las Plantas y al Carrito */}
      <div className="mb-6 flex gap-4">
        <a
          href="/dashboard/plants"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
        >
          🌱 Ver Plantas Disponibles
        </a>
        <a
          href="/dashboard/cart"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition"
        >
          🛒 Ir al Carrito
        </a>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* Gráficos y Facturas */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>

      {/* Resumen del Carrito (Tabla Simplificada) */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Resumen del Carrito</h2>
        <Suspense fallback={<PlantsTableSkeleton />}>
          <PlantsTable plants={plantsInCart} />
        </Suspense>
      </div>
    </main>
  );
}
