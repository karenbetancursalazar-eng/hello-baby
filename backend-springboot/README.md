# Hello Baby — Módulo Empleados con Spring Boot (AA3-EV01)

Codificación del módulo **Empleados** usando **Spring Boot 3.3.5** con
Spring MVC, JdbcTemplate y transacciones declarativas. Se conserva el diseño
original (`empleados.html`, `css/styles.css`, `js/empleados.js`) y la base MySQL
`hello_baby`.

Este módulo es independiente del WAR de AA2 (`backend-java`), por lo que la
evidencia anterior queda intacta.

## Artefactos aplicados

- `backend-java/docs/01_estandares_codificacion.md`: paquetes, nombres, Javadoc
  y constantes `UPPER_SNAKE_CASE`.
- `backend-java/docs/02_plan_de_trabajo.md`: organización por capas.
- `backend-java/docs/03_historias_de_usuario.md` y `04_casos_de_uso.md`:
  registro, edición y eliminación de empleados.
- `backend-java/docs/05_diagrama_de_clases.md`: `Empleado`, repositorio y
  servicio se mantienen con las mismas responsabilidades.

## Estructura

```text
src/main/java/com/hellobaby/
├── HelloBabyApplication.java          configuración y arranque
├── controller/EmpleadoController.java  MVC: GET y POST (PRG)
├── service/EmpleadoService.java        reglas de negocio y @Transactional
├── repository/EmpleadoRepository.java  contrato CRUD
├── repository/JdbcEmpleadoRepository.java  implementación JdbcTemplate
└── model/Empleado.java                 entidad del dominio
src/main/webapp/
├── WEB-INF/views/empleados.jsp         vista JSTL (sin scriptlets)
├── css/styles.css                      diseño original
└── js/empleados.js                     comportamiento original
src/test/                               pruebas H2 y MockMvc
```

## Ejecutar

```powershell
# Base de datos: usar scripts de backend-java/database/
$env:DB_URL='jdbc:mysql://localhost:3306/hello_baby?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true'
$env:DB_USER='root'
$env:DB_PASSWORD=''
mvn spring-boot:run
```

La pantalla queda en:

```text
http://localhost:8081/hello-baby-springboot/empleados
```

También se puede generar y ejecutar el WAR:

```powershell
mvn -q test
mvn -q package
java -jar target/hello-baby-springboot.war
```

> Las credenciales se leen de variables de entorno; `db.properties` no se
> versiona. El entorno local usa Java 25, por eso Surefire habilita el modo
> experimental de Byte Buddy en `pom.xml`.

## Pruebas

- `EmpleadoRepositoryTest`: CRUD y borrado en cascada de citas con H2.
- `EmpleadoControllerTest`: modelo de la JSP y patrón POST-Redirect-GET.

```powershell
mvn -q test
```

Resultado verificado: **5 pruebas, 0 fallos, 0 errores**.
