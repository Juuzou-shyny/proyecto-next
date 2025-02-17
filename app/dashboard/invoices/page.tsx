// app/dashboard/invoices/page.tsx
import { Suspense } from "react";
import ProductsTable from "@/app/ui/invoices/table";
import { ToolsSkeleton } from "@/app/ui/skeletons";
import { fetchFilteredProducts } from "@/app/lib/data";
import Search from "@/app/ui/search";

interface PageProps {
  params?: Promise<Record<string, string>> | undefined;
  searchParams?: Promise<Record<string, string | string[] | undefined>> | undefined;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query =
    typeof resolvedSearchParams?.query === "string"
      ? resolvedSearchParams.query
      : "";
  const currentPage =
    typeof resolvedSearchParams?.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

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
        <ProductsContent query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

// Componente separado para manejar async/await
async function ProductsContent({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);
  return <ProductsTable products={products} />;
}