'use client';

import {
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  AcademicCapIcon as LeafIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';

const iconMap = {
  plants: LeafIcon,
  tools: WrenchScrewdriverIcon,
  fertilizers: BanknotesIcon,
  cart: ShoppingCartIcon,
};

export default function ClientCardWrapper() {
  // Estado para simular los productos en el carrito
  const [cartData, setCartData] = useState({
    totalProducts: 3, // Inicialmente 3 productos en el carrito
  });

  // Simulación de datos dinámicos para las tarjetas
  const cardData = {
    plants: "Explora nuestra colección",
    tools: "Encuentra tus herramientas",
    fertilizers: "Mejora tus cultivos",
    cart: `${cartData.totalProducts} producto(s) en el carrito`,
  };

  return (
    <>
      {/* Menú desplegable dentro de la tarjeta de plantas */}
      <ClientCardDropdown
        title="Todas las plantas"
        value={cardData.plants}
        type="plants"
        menuItems={[
          { name: "Interior" },
          { name: "Exterior" },
          { name: "Todas las Plantas" },
          { name: "Poco Riego" },
          { name: "Helechos" },
          { name: "Enredaderas" },
          { name: "Tropicales" },
          { name: "Aromáticas" },
        ]}
      />
      {/* Menú desplegable dentro de la tarjeta de herramientas */}
      <ClientCardDropdown
        title="Herramientas"
        value={cardData.tools}
        type="tools"
        menuItems={[
          { name: "Tijeras" },
          { name: "Palas" },
          { name: "Aspersores" },
          { name: "Guantes" },
          { name: "Cuerdas" },
          { name: "Macetas" },
        ]}
      />
      {/* Menú desplegable dentro de la tarjeta de fertilizantes y sustratos */}
      <ClientCardDropdown
        title="Fertilizantes y sustratos"
        value={cardData.fertilizers}
        type="fertilizers"
        menuItems={[
          { name: "Fertilizantes" },
          { name: "Sustratos" },
          { name: "Gravas" },
          { name: "Rocas" },
        ]}
      />
      {/* Tarjeta simple para el carrito */}
      <ClientCard title="Carrito" value={cardData.cart} type="cart" />
    </>
  );
}

function ClientCardDropdown({
  title,
  value,
  type,
  menuItems,
}: {
  title: string;
  value: string;
  type: 'plants' | 'tools' | 'fertilizers';
  menuItems: { name: string }[];
}) {
  const Icon = iconMap[type] as React.ComponentType<{ className: string }>;

  return (
    <div className="relative group rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-green-500" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-lg text-gray-600`}
      >
        {value}
      </p>

      {/* Menú desplegable */}
      <div className="absolute left-0 hidden w-full rounded-lg bg-white shadow-lg group-hover:block">
        <ul className="py-2 text-gray-700">
          {menuItems.map((item) => (
            <li key={item.name}>
              <span className="block px-4 py-2 cursor-pointer hover:bg-green-100">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ClientCard({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: 'plants' | 'tools' | 'fertilizers' | 'cart';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-green-500" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-lg text-gray-600`}
      >
        {value}
      </p>
    </div>
  );
}
