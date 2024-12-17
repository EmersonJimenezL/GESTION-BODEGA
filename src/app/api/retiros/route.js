// app/api/retiros/route.js

import dbPromise from "../../../../lib/db";

import { NextResponse } from "next/server";

export async function POST(req) {
  const { empleadoId, codigoProducto, cantidadRetirada } = await req.json();

  const db = await dbPromise;

  // Buscar el producto en el inventario
  const producto = await db.get("SELECT * FROM inventario WHERE codigo = ?", [
    codigoProducto,
  ]);
  if (!producto) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  // Verificar si hay suficiente cantidad en el inventario
  if (producto.cantidad < cantidadRetirada) {
    return NextResponse.json(
      { error: "No hay suficiente cantidad en inventario" },
      { status: 400 }
    );
  }

  // Actualizar la cantidad del producto en el inventario
  await db.run(
    "UPDATE inventario SET cantidad = cantidad - ? WHERE codigo = ?",
    [cantidadRetirada, codigoProducto]
  );

  // Registrar el retiro
  const retiro = {
    empleadoId,
    producto: producto.nombre,
    cantidad: cantidadRetirada,
    fecha: new Date().toISOString(),
  };

  // Insertar el retiro en la base de datos
  await db.run(
    "INSERT INTO retiros (empleado_id, producto, cantidad, fecha) VALUES (?, ?, ?, ?)",
    [empleadoId, producto.nombre, cantidadRetirada, retiro.fecha]
  );

  return NextResponse.json(retiro, { status: 201 });
}
