import Pagination from '@/app/ui/plants/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/cart/table'; // Cambia esto a tu tabla específica para plantas
import { AddPlant } from '@/app/ui/cart/buttons'; // Botón para agregar plantas
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { PlantsTableSkeleton } from '@/app/ui/skeletons'; // Skeleton específico para plantas
import { fetchPlantsPages, fetchPlants } from '@/app/lib/data'; // Cambia esto a tu función para obtener páginas de plantas y plantas
import PlantsTable from '@/app/ui/cart/table';

export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPlantsPages(query); // Cambia para obtener el total de páginas de plantas
    const plants = await fetchPlants(query, currentPage); // Obtén las plantas para la página actual

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Carrito de Plantas</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar plantas en el carrito..." />
          <AddPlant /> {/* Botón para agregar una planta */}
        </div>
        <Suspense key={query + currentPage} fallback={<PlantsTableSkeleton />}>
          <Table query={query} currentPage={currentPage} /> {/* Tabla de plantas */}
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  }
<Suspense fallback={<PlantsTableSkeleton />}>
  <PlantsTable plants={plantsInCart} />
</Suspense>
