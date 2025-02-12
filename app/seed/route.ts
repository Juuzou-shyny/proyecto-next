import bcrypt from 'bcrypt';
import { db, sql, VercelPoolClient } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import 'dotenv/config';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

async function getClient() {
  return await db.connect();
}

async function seedUsers(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedInvoices(client: VercelPoolClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  await Promise.all(
    invoices.map(async (invoice) => {
      await client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedCustomers(client: VercelPoolClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  await Promise.all(
    customers.map(async (customer) => {
      await client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedRevenue(client: VercelPoolClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  await Promise.all(
    revenue.map(async (rev) => {
      await client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `;
    })
  );
}

export async function GET() {
  const client = await getClient();

  try {
    await client.sql`BEGIN`;
    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
    await seedCategories(client); // Nueva función
    await seedProducts(client); // Nueva función
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), {
      status: 200,
    });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error('Error seeding database:', error);
    return new Response(JSON.stringify({ error: 'Failed to seed database' }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}

async function seedCategories(client: VercelPoolClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS categorias (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL
    );
  `;

  // Datos de ejemplo para categorías
  const categories = [
    { id: 1, nombre: 'Plantas de Interior' },
    { id: 2, nombre: 'Plantas de Exterior' },
    { id: 3, nombre: 'Suculentas' },
    { id: 4, nombre: 'Plantas Medicinales' },
  ];

  await Promise.all(
    categories.map(async (category) => {
      await client.sql`
        INSERT INTO categorias (id, nombre)
        VALUES (${category.id}, ${category.nombre})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}


async function seedProducts(client: VercelPoolClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
      stock INT NOT NULL DEFAULT 0,
      imagen_url VARCHAR(255),
      categoria_id INT NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Datos de ejemplo para productos
  const products = [
    {
      id: 1,
      nombre: 'Planta de Interior 1',
      descripcion: 'Una hermosa planta de interior.',
      precio: 19.99,
      stock: 10,
      imagen_url: 'https://example.com/planta1.jpg',
      categoria_id: 1,
    },
    {
      id: 2,
      nombre: 'Planta de Exterior 1',
      descripcion: 'Una planta resistente para exteriores.',
      precio: 29.99,
      stock: 5,
      imagen_url: 'https://example.com/planta2.jpg',
      categoria_id: 2,
    },
  ];

  await Promise.all(
    products.map(async (product) => {
      await client.sql`
        INSERT INTO productos (id, nombre, descripcion, precio, stock, imagen_url, categoria_id)
        VALUES (${product.id}, ${product.nombre}, ${product.descripcion}, ${product.precio}, ${product.stock}, ${product.imagen_url}, ${product.categoria_id})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}



// import { createProduct } from '@/app/lib/data';
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { nombre, descripcion, precio, stock, categoria_id, imagen_url } = body;

    if (!nombre || !precio || !stock || !categoria_id) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400 });
    }

    await sql`
      UPDATE productos
      SET 
        nombre = ${nombre},
        descripcion = ${descripcion || null},
        precio = ${precio},
        stock = ${stock},
        categoria_id = ${categoria_id},
        imagen_url = ${imagen_url || null},
        updated_at = NOW()
      WHERE id = ${params.id}
    `;

    return new Response(
      JSON.stringify({ success: true, message: 'Producto actualizado con éxito' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar producto' }), { status: 500 });
  }
}

import { createProduct } from "@/app/lib/data";
import { writeFile } from 'fs';
import path from 'path';


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("📩 Datos recibidos:", formData);

    const nombre = formData.get("nombre") as string | null;
    const descripcion = formData.get("descripcion") as string | null;
    const precio = Number(formData.get("precio"));
    const stock = Number(formData.get("stock"));
    const categoria_id = Number(formData.get("categoria_id"));
    const imagen = formData.get("imagen") as File | null;

    if (!nombre || !precio || !stock || !categoria_id) {
      console.error("❌ Error: Faltan datos obligatorios", { nombre, precio, stock, categoria_id });
      return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
    }

    let imageUrl = "";
    if (imagen) {
      const bytes = await imagen.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), "public/uploads", imagen.name);

      await writeFile(filePath, buffer, (err) => {
        if (err) throw err;
      });
      imageUrl = `/uploads/${imagen.name}`;
    }

    const newProduct = await createProduct({
      nombre,
      descripcion: descripcion ?? "",
      precio,
      stock,
      categoria_id,
      imagen_url: imageUrl,
    });

    console.log("✅ Producto creado correctamente:", newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("🚨 Error en el servidor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
