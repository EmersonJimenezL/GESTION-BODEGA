// lib/init-db.js

import dbPromise from "./db";

async function init() {
  const db = await dbPromise;

  // Crear la tabla de empleados
  await db.run(`
    CREATE TABLE IF NOT EXISTS empleados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      cargo TEXT NOT NULL
    )
  `);

  // Crear la tabla de inventario
  await db.run(`
    CREATE TABLE IF NOT EXISTS inventario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      codigo TEXT NOT NULL,
      cantidad INTEGER NOT NULL
    )
  `);

  // Crear la tabla de retiros
  await db.run(`
    CREATE TABLE IF NOT EXISTS retiros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empleado_id INTEGER NOT NULL,
      producto TEXT NOT NULL,
      cantidad INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      FOREIGN KEY (empleado_id) REFERENCES empleados(id)
    )
  `);

  console.log("Base de datos inicializada");
}

init();
