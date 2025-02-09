"use client";

import { useState } from "react";
import EditProductModal from "./EditProductModal";


export default function AdminProductsTable({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleUpdate = () => {
    window.location.reload();
  };

  console.log("Productos en AdminProductsTable:", products); // Depuración

  return (
    <div className="mt-6">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>${Number(product.precio).toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.categoria || "Sin categoría"}</td>
              <td>
                <button
                  onClick={() => handleEdit(product)}
                  className="mr-2 bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={handleClose}
          onUpdate={handleUpdate}
          categories={[]}
        />
      )}
    </div>
  );
}
