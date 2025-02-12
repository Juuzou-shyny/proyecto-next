"use client";

import { useState } from "react";

interface CreateProductModalProps {
  categories: any[]; // Lista de categorías
  onClose: () => void; // Función para cerrar el modal
  onCreate: (product: FormData) => void; // Función para crear el producto (ahora acepta FormData)
}

export default function CreateProductModal({
  categories,
  onClose,
  onCreate,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria_id: "",
  });

  const [imagen, setImagen] = useState<File | null>(null); // Estado para la imagen

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del archivo de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.stock || !formData.categoria_id) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Creamos FormData para manejar imágenes
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("precio", String(formData.precio)); // Convertimos números a string
    data.append("stock", String(formData.stock));
    data.append("categoria_id", formData.categoria_id);
    
    if (imagen) {
      data.append("imagen", imagen);
    }

    onCreate(data); // Llama a la función onCreate pasada como prop
    onClose(); // Cierra el modal después de crear el producto
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Campo para la imagen */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Imagen del Producto</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}
