// app/empleados/page.js
"use client";
import React, { useEffect, useState } from "react";

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Obtener los empleados desde la API
    const fetchEmpleados = async () => {
      try {
        const res = await fetch("/api/empleados");
        const data = await res.json();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div>
      <h1>Lista de Empleados</h1>
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <ul>
          {empleados.map((empleado) => (
            <li key={empleado.id}>
              <strong>{empleado.nombre}</strong> - {empleado.cargo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmpleadosPage;
