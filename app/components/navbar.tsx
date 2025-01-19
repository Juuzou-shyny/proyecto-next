// components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="bg-green-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            🌱 Tienda de Plantas
          </a>
          <div className="space-x-4">
            <a href="/" className="hover:underline">
              Inicio
            </a>
            <a href="/shop" className="hover:underline">
              Tienda
            </a>
            <a href="/cart" className="hover:underline">
              Carrito
            </a>
          </div>
        </div>
      </nav>
    );
  }
  