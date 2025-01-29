import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { PlantsTableSkeleton } from '@/app/ui/skeletons';

export interface Plant {
  id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
}

export default function PlantsTable({ plants }: { plants: Plant[] }) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Carrito de Plantas
      </h1>
      <Search placeholder="Buscar plantas en el carrito..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <Suspense fallback={<PlantsTableSkeleton />}>
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                  <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                      <th className="px-4 py-5 font-medium sm:pl-6">Planta</th>
                      <th className="px-3 py-5 font-medium">Precio</th>
                      <th className="px-3 py-5 font-medium">Cantidad</th>
                      <th className="px-4 py-5 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-900">
                    {plants.map((plant) => (
                      <tr key={plant.id} className="group">
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                          <div className="flex items-center gap-3">
                            <Image
                              src={plant.image_url}
                              className="rounded-md"
                              alt={`Imagen de ${plant.name}`}
                              width={40}
                              height={40}
                            />
                            <p>{plant.name}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          ${plant.price.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {plant.quantity}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm font-medium">
                          ${(plant.price * plant.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
