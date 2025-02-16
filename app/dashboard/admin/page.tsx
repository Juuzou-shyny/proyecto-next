// app/dashboard/admin/page.tsx
import AdminProductsTable from "@/app/ui/admin/admin-table";
import { fetchFilteredProducts, fetchCategories } from "@/app/lib/data";
import Search from "@/app/ui/search";
import AddProductButton from "@/app/ui/admin/AddProductButton";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  // No necesitas hacer await en searchParams, ya es un objeto
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch productos y categorías desde la API o base de datos
  const products = await fetchFilteredProducts(query, currentPage);
  const categories = await fetchCategories();

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        {/* Botón para agregar producto */}
        <AddProductButton categories={categories} />
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>

      {/* Tabla de productos */}
      <AdminProductsTable products={products} />
    </div>
  );
}
