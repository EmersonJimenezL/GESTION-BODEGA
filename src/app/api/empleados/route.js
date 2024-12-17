// app/api/empleados/route.js

import dbPromise from "../../../../lib/db";

import { NextResponse } from "next/server";

// Obtener todos los empleados
export async function GET() {
  const db = await dbPromise;
  const empleados = await db.all("SELECT * FROM empleados");
  return NextResponse.json(empleados);
}

// Agregar un nuevo empleado
export async function POST(req) {
  const { nombre, cargo } = await req.json();
  const db = await dbPromise;

  const result = await db.run(
    "INSERT INTO empleados (nombre, cargo) VALUES (?, ?)",
    [nombre, cargo]
  );
  const nuevoEmpleado = {
    id: result.lastID,
    nombre,
    cargo,
  };

  return NextResponse.json(nuevoEmpleado, { status: 201 });
}
