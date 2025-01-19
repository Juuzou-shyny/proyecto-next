import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from 'next/image';
// app/page.tsx
export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      description: "Una planta tropical exuberante con hojas grandes y brillantes.",
      price: 25.99,
      imageUrl: "/images/monstera.jpg",
    },
    {
      id: 2,
      name: "Cactus San Pedro",
      description: "Perfecto para climas secos y con poco cuidado.",
      price: 15.49,
      imageUrl: "/images/cactus.jpg",
    },
    {
      id: 3,
      name: "Palma Areca",
      description: "Ideal para interiores con luz indirecta.",
      price: 45.00,
      imageUrl: "/images/areca.jpg",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="w-full bg-green-200 p-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">Bienvenido a la Tienda de Plantas</h1>
        <p className="text-lg text-green-700 mt-4">
          Descubre las mejores plantas para decorar tu hogar.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-bold mt-4">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <a
        href="/shop"
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Ver toda la tienda
      </a>
    </main>
  );
}
