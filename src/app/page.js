import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Bodega</h1>
      <nav>
        <ul>
          <li>
            <Link href="/empleados">Gestionar Empleados</Link>
          </li>
          <li>
            <Link href="/inventario">Gestionar Inventario</Link>
          </li>
          <li>
            <Link href="/retiros">Registrar Retiros</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
