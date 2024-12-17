// app/api/inventario/route.js

import dbPromise from "../../../../lib/db";

import { NextResponse } from "next/server";

// Obtener todos los productos del inventario
export async function GET() {
  const db = await dbPromise;
  const productos = await db.all("SELECT * FROM inventario");
  return NextResponse.json(productos);
}

// Agregar un nuevo producto al inventario
export async function POST(req) {
  const { nombre, codigo, cantidad } = await req.json();
  const db = await dbPromise;

  const result = await db.run(
    "INSERT INTO inventario (nombre, codigo, cantidad) VALUES (?, ?, ?)",
    [nombre, codigo, cantidad]
  );
  const nuevoProducto = {
    id: result.lastID,
    nombre,
    codigo,
    cantidad,
  };

  return NextResponse.json(nuevoProducto, { status: 201 });
}

// Actualizar la cantidad de un producto
export async function PUT(req) {
  const { id, cantidad } = await req.json();
  const db = await dbPromise;

  const result = await db.run(
    "UPDATE inventario SET cantidad = ? WHERE id = ?",
    [cantidad, id]
  );

  if (result.changes === 0) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ id, cantidad });
}
