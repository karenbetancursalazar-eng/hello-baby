# Hello Baby — Módulo Empleados con Spring Boot (AA3-EV01)

Codificación del módulo **Empleados** con **Spring Boot 3.3.5**, Spring MVC,
JdbcTemplate y transacciones declarativas. Se conservan el diseño original
(`empleados.html`, `css/styles.css`, `js/empleados.js`) y la base MySQL
`hello_baby`.

El trabajo se realizó en una carpeta separada para no modificar el WAR de AA2.
La migración sigue el plan por capas de la EV02: vista, controlador, servicio,
repositorio y modelo. Los documentos y scripts citados abajo se incluyen en este ZIP.

## Artefactos usados

- `backend-java/docs/01_estandares_codificacion.md`: paquetes, nombres y Javadoc.
- `backend-java/docs/02_plan_de_trabajo.md`: organización por capas.
- `backend-java/docs/03_historias_de_usuario.md` y `04_casos_de_uso.md`:
  registro, edición y eliminación de empleados.
- `backend-java/docs/05_diagrama_de_clases.md`: entidad, repositorio y servicio.

## Estructura

```text
src/main/java/com/hellobaby/
├── HelloBabyApplication.java              arranque de la aplicación
├── controller/EmpleadoController.java     rutas GET y POST
├── service/EmpleadoService.java           validaciones y @Transactional
├── repository/EmpleadoRepository.java     contrato CRUD
├── repository/JdbcEmpleadoRepository.java implementación con JdbcTemplate
└── model/Empleado.java                    entidad
src/main/webapp/
├── WEB-INF/views/empleados.jsp            vista con JSTL
├── css/styles.css                         diseño original
└── js/empleados.js                        comportamiento original
src/test/                                  pruebas con H2 y MockMvc
```

## Ejecutar

```powershell
# Crear la base con los scripts de backend-java/database/ antes de arrancar.
$env:DB_URL='jdbc:mysql://localhost:3306/hello_baby?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true'
$env:DB_USER='root'
$env:DB_PASSWORD=''
mvn spring-boot:run
```

Pantalla:

```text
http://localhost:8081/hello-baby-springboot/empleados
```

También se puede generar el WAR:

```powershell
mvn -q test
mvn -q package
java -jar target/hello-baby-springboot.war
```

> La contraseña se toma de `DB_PASSWORD`; `db.properties` no se versiona.

## Pruebas

- `EmpleadoRepositoryTest`: CRUD y borrado de citas con H2.
- `EmpleadoControllerTest`: modelo de la JSP y redirecciones con MockMvc.

```powershell
mvn -q test
```

Al ejecutarlas pasan las 5 pruebas sin fallos.
