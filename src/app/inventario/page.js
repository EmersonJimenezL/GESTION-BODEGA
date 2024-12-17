"use client";
import { useState, useEffect } from "react";

const InventarioPage = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos desde la API al cargar la página
  useEffect(() => {
    fetch("/api/inventario")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      codigo,
      cantidad,
    };

    // Enviar nuevo producto a la API
    await fetch("/api/inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    });

    // Actualizar la lista de productos
    setProductos((prev) => [...prev, nuevoProducto]);

    // Limpiar el formulario
    setNombre("");
    setCodigo("");
    setCantidad(0);
  };

  return (
    <div>
      <h1>Gestión de Inventario</h1>

      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <h2>Lista de productos</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>
                <button
                  onClick={async () => {
                    // Lógica para editar el producto (por ejemplo, incrementar o reducir la cantidad)
                    const nuevaCantidad = producto.cantidad + 1;
                    await fetch(`/api/inventario/${producto.codigo}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ cantidad: nuevaCantidad }),
                    });
                    setProductos((prev) =>
                      prev.map((p) =>
                        p.codigo === producto.codigo
                          ? { ...p, cantidad: nuevaCantidad }
                          : p
                      )
                    );
                  }}
                >
                  Aumentar cantidad
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Código de barras:</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default InventarioPage;
