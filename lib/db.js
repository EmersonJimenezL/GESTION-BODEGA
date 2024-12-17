// lib/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPromise = open({
  filename: path.join(process.cwd(), "database.sqlite"), // Ruta absoluta desde la raíz del proyecto
  driver: sqlite3.Database,
});

export default dbPromise;
