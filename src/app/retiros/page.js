"use client";
import { useState, useEffect } from "react";

const RetirosPage = () => {
  const [codigo, setCodigo] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");

  useEffect(() => {
    // Cargar la lista de empleados
    fetch("/api/empleados")
      .then((res) => res.json())
      .then((data) => setEmpleados(data));
  }, []);

  useEffect(() => {
    // Buscar el producto basado en el código de barras
    if (codigo) {
      fetch(`/api/inventario?codigo=${codigo}`)
        .then((res) => res.json())
        .then((data) => setProducto(data));
    }
  }, [codigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto) {
      alert("Producto no encontrado");
      return;
    }

    // Aquí harás la lógica para registrar el retiro
    const retiroData = {
      codigo,
      empleado: empleadoSeleccionado,
      cantidad,
    };

    // Enviar los datos al backend para registrar el retiro
    await fetch("/api/retiros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retiroData),
    });

    // Actualizar el inventario (esto dependerá de tu lógica)
    await fetch(`/api/inventario/actualizar/${producto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cantidad: producto.cantidad - cantidad }),
    });

    // Limpiar el formulario después de un retiro exitoso
    setCodigo("");
    setEmpleadoSeleccionado("");
    setCantidad(1);
    setProducto(null);
  };

  return (
    <div>
      <h1>Registrar Retiro de Inventario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Escanea el código del producto:</label>
          <input
            type="text"
            placeholder="Código de barras"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>

        {producto && (
          <div>
            <h3>Producto encontrado:</h3>
            <p>{producto.descripcion}</p>
            <p>Cantidad disponible: {producto.cantidad}</p>
          </div>
        )}

        <div>
          <label>Empleado que realiza el retiro:</label>
          <select
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.nombre} {empleado.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Cantidad a retirar:</label>
          <input
            type="number"
            value={cantidad}
            min="1"
            max={producto ? producto.cantidad : 1}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <button type="submit">Registrar Retiro</button>
      </form>
    </div>
  );
};

export default RetirosPage;
