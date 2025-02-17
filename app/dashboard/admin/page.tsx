import AdminProductsTable from "@/app/ui/admin/admin-table";
import { fetchFilteredProducts, fetchCategories } from "@/app/lib/data";
import Search from "@/app/ui/search";
import AddProductButton from "@/app/ui/admin/AddProductButton";

export default async function AdminPage({ searchParams }: any) {
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch productos y categorías desde la API o base de datos
  const products = await fetchFilteredProducts(query, currentPage);
  const categories = await fetchCategories();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <AddProductButton categories={categories} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <AdminProductsTable products={products} />
    </div>
  );
}
