# Diagrama de clases — Módulo Empleados

```mermaid
classDiagram
    class Empleado {
        -long id
        -String nombres
        -String apellidos
        -String cedula
        -String correo
        -String whatsapp
        -String rol
        -String tipo
        -LocalDate fechaNacimiento
        -boolean activo
        +getId() long
        +setId(long) void
        +getNombres() String
        +getApellidos() String
        +getCedula() String
        +getCorreo() String
        +getRol() String
        +getTipo() String
        +isActivo() boolean
        +toString() String
    }

    class EmpleadoRepository {
        <<interface>>
        +findAll() List~Empleado~
        +findById(long) Optional~Empleado~
        +save(Empleado) Empleado
        +update(Empleado) boolean
        +deleteById(long) boolean
    }

    class EmpleadoRepositoryImpl {
        -SQL_FIND_ALL : String
        -SQL_FIND_BY_ID : String
        -SQL_INSERT : String
        -SQL_UPDATE : String
        -SQL_DELETE : String
        +findAll() List~Empleado~
        +findById(long) Optional~Empleado~
        +save(Empleado) Empleado
        +update(Empleado) boolean
        +deleteById(long) boolean
        -mapearFila(ResultSet) Empleado
        -asignarParametros(PreparedStatement, Empleado, int) void
    }

    class EmpleadoService {
        -empleadoRepository : EmpleadoRepository
        +listarEmpleados() List~Empleado~
        +buscarEmpleado(long) Optional~Empleado~
        +registrarEmpleado(Empleado) Empleado
        +actualizarEmpleado(Empleado) boolean
        +eliminarEmpleado(long) boolean
        -validarEmpleado(Empleado) void
    }

    class DatabaseConnection {
        <<final>>
        +getConnection() Connection$
    }

    class DataAccessException {
        +DataAccessException(String, Throwable)
    }

    class Main {
        +main(String[]) void$
        -imprimirMenu() void$
        -listarEmpleados() void$
        -registrarEmpleado() void$
        -actualizarEmpleado() void$
        -eliminarEmpleado() void$
    }

    EmpleadoRepository <|.. EmpleadoRepositoryImpl
    EmpleadoRepositoryImpl --> Empleado : CRUD
    EmpleadoRepositoryImpl --> DatabaseConnection : usa
    EmpleadoRepositoryImpl ..> DataAccessException : lanza
    EmpleadoService --> EmpleadoRepository : usa
    Main --> EmpleadoService : usa
    EmpleadoService --> Empleado : valida
```

## Relación con los artefactos previos

- La entidad `Empleado` corresponde a los objetos `empleados` del prototipo (`index.html`, `empleados.html`, `js/app.js`).
- Los casos de uso y las historias de usuario se derivan del rol **Administrador** definido en `MODULES_BY_ROLE`.
- El diseño de pantallas se conserva en los archivos HTML/CSS de la carpeta `Hello Baby KARENB`.
