import openDB from "../../lib/db";

export default async function handler(req, res) {
  const db = await openDB();

  if (req.method === "GET") {
    const inventario = await db.all("SELECT * FROM inventario");
    res.status(200).json(inventario);
  }

  if (req.method === "POST") {
    const { codigo, descripcion, cantidad } = req.body;
    await db.run(
      "INSERT INTO inventario (codigo, descripcion, cantidad) VALUES (?, ?, ?)",
      [codigo, descripcion, cantidad]
    );
    res.status(201).json({ message: "Objeto agregado al inventario" });
  }
}
