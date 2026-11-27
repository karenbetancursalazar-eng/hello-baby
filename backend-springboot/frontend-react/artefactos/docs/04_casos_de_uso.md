# Diagrama de casos de uso — Módulo Empleados

```mermaid
usecaseDiagram
    actor Administrador as Administrador
    actor Recepcionista as Recepcionista

    rectangle "Sistema Hello Baby" {
        usecase UC1 as "Registrar empleado"
        usecase UC2 as "Consultar empleados"
        usecase UC3 as "Actualizar empleado"
        usecase UC4 as "Eliminar empleado"
        usecase UC5 as "Buscar por id"
    }

    Administrador --> UC1
    Administrador --> UC2
    Administrador --> UC3
    Administrador --> UC4
    Administrador --> UC5
    Recepcionista --> UC2
    Recepcionista --> UC5
```

**Actor principal:** Administrador (según `MODULES_BY_ROLE` en `js/app.js`).
**Actor secundario:** Recepcionista (solo lectura en este módulo).
