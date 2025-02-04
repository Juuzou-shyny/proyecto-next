import { Suspense } from 'react';
import ProductsTable from '@/app/ui/invoices/table'; // Asegúrate de importar el componente correctamente
import { ToolsSkeleton } from '@/app/ui/skeletons'; // Importa el skeleton para mostrar mientras carga
import { fetchFilteredProducts } from '@/app/lib/data'; // Asegúrate de tener esta función
import Search from '@/app/ui/search'; // Importa el buscador desde la ubicación correcta

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || ''; // Obtén la consulta de búsqueda
  const currentPage = Number(searchParams?.page) || 1; // Obtén la página actual

  // Fetch productos desde la API o base de datos
  const products = await fetchFilteredProducts(query, currentPage);


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>     
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      {/* Suspense para el fallback mientras los datos cargan */}
      <Suspense fallback={<ToolsSkeleton products={[]} />}>
        <ProductsTable products={products} />
      </Suspense>
    </div>
  );
}


