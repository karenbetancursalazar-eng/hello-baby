/**
 * DataTable: tabla genérica de datos con acciones de editar y eliminar.
 * Justificación: empleados, clientes, servicios y citas comparten la misma
 * estructura de listado; un solo componente evita repetir código.
 */
import Button from './Button.jsx';

function DataTable({ columnas, datos, onEditar, onEliminar, mensajeVacio }) {
  if (!datos.length) {
    return <p className="table-empty">{mensajeVacio}</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.clave} scope="col">
                {columna.etiqueta}
              </th>
            ))}
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              {columnas.map((columna) => (
                <td key={columna.clave}>
                  {columna.render
                    ? columna.render(fila)
                    : fila[columna.clave]}
                </td>
              ))}
              <td className="acciones">
                <Button variant="outline" onClick={() => onEditar(fila)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => onEliminar(fila)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
