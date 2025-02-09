// ui/button/AddProductButton.tsx
"use client";

import { useState } from "react";
import CreateProductModal from "./create-form"; // Asegúrate de que esta ruta sea correcta
import { Button } from "@/app/ui/button"; // Importa tu componente Button

interface AddProductButtonProps {
  categories: any[]; // Lista de categorías para el modal
}

export default function AddProductButton({ categories }: AddProductButtonProps) {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal

  const handleOpenModal = () => {
    setModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  const handleCreateProduct = async (newProduct: any) => {
    try {
      const response = await fetch("/app/api/products/route", { // Asegúrate de que la URL sea correcta
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create product.");
      }

      const createdProduct = await response.json();
      console.log("Producto creado:", createdProduct);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("No se pudo crear el producto. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      {/* Botón para abrir el modal utilizando el componente Button */}
      <Button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-600">
        Agregar Producto
      </Button>

      {/* Modal para crear productos */}
      {isModalOpen && (
        <CreateProductModal
          categories={categories} // Pasa las categorías al modal
          onClose={handleCloseModal} // Función para cerrar el modal
          onCreate={handleCreateProduct} // Función para crear el producto
        />
      )}
    </>
  );
}