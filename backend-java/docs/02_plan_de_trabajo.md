# Plan de trabajo para la construcción del software — GA7-220501096-AA2

**Proyecto:** Hello Baby — sistema de gestión interna de barbería y peluquería.
**Tecnologías seleccionadas:** Java 17, Maven, JDBC, MySQL 8 (XAMPP), H2 para pruebas, Git/GitHub.
**Duración total:** 96 horas.

| Fase | Actividad | Horas | Entregable |
|---|---|---:|---|
| 1. Análisis | Revisión de artefactos previos (casos de uso, diagrama de clases, prototipos) y definición del alcance del módulo Empleados | 12 | Alcance y historias de usuario |
| 2. Diseño | Diseño de la tabla `empleados`, definición de capas (modelo, repositorio, servicio, vista consola) y estándares de codificación | 16 | Esquema SQL, diagrama de clases, estándares |
| 3. Configuración | Creación del proyecto Maven, dependencias, configuración JDBC y repositorio Git | 10 | `pom.xml`, `db.properties.example`, repo GitHub |
| 4. Codificación | Implementación de entidad, repositorio JDBC y servicio con validaciones | 26 | Código fuente del módulo |
| 5. Pruebas | Pruebas unitarias CRUD con H2 y validación manual en MySQL | 20 | `EmpleadoRepositoryTest`, evidencia de ejecución |
| 6. Documentación y entrega | README, enlace del repositorio y empaquetado ZIP con nombre del aprendiz | 12 | ZIP `NOMBREAPELLIDO_AA2_EV01` |
| **Total** | | **96** | |

## Criterios de aceptación

- El módulo permite **insertar, consultar, actualizar y eliminar** empleados.
- La conexión a base de datos se realiza por **JDBC** con `PreparedStatement`.
- El código cumple los estándares del documento `01_estandares_codificacion.md`.
- El proyecto está versionado en GitHub con commits descriptivos.
- `mvn test` ejecuta la prueba CRUD sin depender de MySQL instalado.
