// app/api/products/route.ts
import { NextResponse } from "next/server";
import { createProduct } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Datos recibidos en la API:", body); // Depuración

    const { nombre, descripcion, precio, stock, categoria_id, imagen_url } = body;

    if (!nombre || !precio || !stock || !categoria_id) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios no han sido proporcionados." },
        { status: 400 }
      );
    }

    const newProduct = await createProduct({
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      imagen_url: imagen_url || null,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}