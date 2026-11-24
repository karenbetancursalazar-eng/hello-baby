# Estándares de codificación — Hello Baby (Java)

Basado en las convenciones de Oracle/Google para Java, aplicadas a este proyecto.

| Elemento | Regla | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|---|
| Paquetes | Minúsculas, dominio invertido, sin guiones | `com.hellobaby.repository` | `Com.HelloBaby.Repository` |
| Clases | `PascalCase`, sustantivo | `EmpleadoService` | `empleadoService`, `empleado_service` |
| Interfaces | `PascalCase`, describe la responsabilidad | `EmpleadoRepository` | `iempleadorepository` |
| Métodos | `camelCase`, verbo + sustantivo | `findById`, `registrarEmpleado` | `Buscar_Empleado` |
| Variables / atributos | `camelCase`, privadas en la entidad | `fechaNacimiento` | `Fecha_Nacimiento` |
| Constantes | `UPPER_SNAKE_CASE`, `static final` | `SQL_FIND_ALL` | `sqlFindAll` |
| Booleanos | Prefijo `is`/`has` en getters | `isActivo()` | `getActivo()` |

## Idioma de los nombres

- **Repositorio (acceso a datos):** nombres en inglés (`findAll`, `findById`, `save`, `update`, `deleteById`), siguiendo la convención CRUD usada comúnmente en Java para esta capa.
- **Servicio, modelo y consola:** nombres en español del dominio del negocio (`registrarEmpleado`, `Empleado`, `fechaNacimiento`), para que coincidan con el lenguaje del establecimiento y con las historias de usuario.
- En ambos casos se mantiene la misma regla de formato: `PascalCase` en clases, `camelCase` en métodos y variables.

## Reglas adicionales aplicadas

- Un archivo público por clase, con el mismo nombre del archivo.
- Encabezado con paquete, imports y luego la clase; sin `import *`.
- `try-with-resources` para `Connection`, `PreparedStatement` y `ResultSet`.
- `PreparedStatement` en todas las consultas (evita inyección SQL).
- Excepción propia `DataAccessException` para errores de base de datos.
- Comentarios Javadoc en clases y métodos públicos importantes; español en mensajes de usuario.
- Indentación de 4 espacios, máximo ~100 caracteres por línea, codificación UTF-8.
- Nombres de tablas/columnas en snake_case: `fecha_nacimiento`.

## Verificación

Antes de entregar, revisa que:

```powershell
mvn -q clean test
```

pase sin errores y que no existan clases, métodos ni variables con nombres fuera de la tabla.
