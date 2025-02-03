"use client"
import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { addToCart } from '@/app/lib/actions';

export default function ProductsTable({ products }: { products: any[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Producto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Descripción
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stock
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Añadir</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.imagen_url || '/default-image.png'}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${product.nombre || 'Producto'} image`}
                        />
                        <p>{product.nombre || 'Producto'}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {product.descripcion || 'Sin descripción'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(product.precio || 0)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {product.stock > 0 ? product.stock : 'Agotado'}
                    </td>
                    <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        className={`px-4 py-2 text-sm font-medium text-white rounded ${
                          product.stock > 0
                            ? 'bg-lime-600 hover:bg-lime-700'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No hay productos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
