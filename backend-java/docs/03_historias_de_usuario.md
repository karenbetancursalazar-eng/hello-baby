# Historias de usuario — Módulo Empleados

| ID | Historia | Criterios de aceptación |
|---|---|---|
| HU-01 | Como **administrador** quiero **registrar un empleado** para **tener su información en el sistema**. | El formulario valida nombres, apellidos, cédula (8-10 dígitos, única), correo válido, rol y tipo (peluqueria/barberia). Al guardar se muestra el id generado. |
| HU-02 | Como **administrador** quiero **consultar la lista de empleados** para **conocer el personal de cada área**. | Se listan todos los empleados ordered por id, con nombre, cédula, correo, rol y tipo. Si no hay datos se muestra un mensaje. |
| HU-03 | Como **administrador** quiero **actualizar los datos de un empleado** para **corregir información**. | Al buscara por id se cargan sus datos; se pueden cambiar nombres, apellidos y rol. Si el id no existe se avisa. |
| HU-04 | Como **administrador** quiero **eliminar un empleado** para **retirarlo del personal**. | Se elimina por id y se confirma el resultado. Si el id no existe se avisa. |
| HU-05 | Como **administrador** quiero **buscar un empleado por id** para **ver su detalle rápidamente**. | Muestra los datos del empleado o un mensaje de "no existe". |

## Notas

- Los datos iniciales son los mismos del prototipo `js/app.js` (Camila, Laura, Mariana, Juan, Andrés).
- El campo `tipo` conserva la lógica de temas del prototipo: `peluqueria` / `barberia`.
