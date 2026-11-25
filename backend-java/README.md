# Hello Baby — Módulo Empleados (JDBC + Servlet + JSP)

Evidencia **GA7-220501096-AA2-EV01 — Codificación de módulos del software**.
Proyecto: sistema de gestión interna de barbería y peluquería.

La pantalla JSP reutiliza el diseño de `../empleados.html`, `../css/styles.css`
y `../js/app.js`, y lee y escribe en MySQL mediante el Servlet.

## Contenido

```
backend-java/
├─ pom.xml                         # empaquetado WAR (Tomcat 11)
├─ database/
│  ├─ create_database.sql          # crea la base hello_baby
│  ├─ schema.sql                   # tabla empleados (id_empleado)
│  └─ seed_data.sql                # datos del prototipo
├─ src/main/java/com/hellobaby/
│  ├─ Main.java                    # menú consola (CRUD original)
│  ├─ config/DatabaseConnection.java
│  ├─ controller/EmpleadoServlet.java
│  ├─ exception/DataAccessException.java
│  ├─ model/Empleado.java
│  ├─ repository/EmpleadoRepository.java
│  ├─ repository/EmpleadoRepositoryImpl.java
│  ├─ service/EmpleadoService.java
│  └─ util/InputUtil.java
├─ src/main/resources/db.properties.example
├─ src/main/webapp/
│  ├─ WEB-INF/views/empleados.jsp  # interfaz original adaptada a JSP
│  ├─ css/styles.css               # copia del CSS original
│  └─ js/empleados.js              # JS de la pantalla JSP
├─ src/test/                       # prueba CRUD con H2
├─ docs/                           # estándares, plan, HU, casos de uso, diagrama
└─ enlace_repositorio.txt
```

La base oficial del proyecto es:

```properties
db.url=jdbc:mysql://localhost:3306/hello_baby
```

La misma base se configuró en VS Code con SQLTools como
`Hello Baby - hello_baby` (`127.0.0.1:3306 / hello_baby`).

## 1. Requisitos

- JDK 17 o superior (`java -version`)
- Maven (`mvn -version`)
- MySQL/MariaDB de XAMPP en `localhost:3306`
- Tomcat 10.1+ / 11 (se validó con Tomcat 11.0.29)
- Git y una cuenta de GitHub

## 2. Pruebas con H2

Desde `backend-java/`:

```powershell
$env:PATH=[Environment]::GetEnvironmentVariable('Path','Machine')+';'+[Environment]::GetEnvironmentVariable('Path','User'); mvn -q test
```

`EmpleadoRepositoryTest` crea la tabla desde `database/schema.sql` en H2 en
memoria (modo MySQL) y ejecuta CREATE → READ → UPDATE → LIST → DELETE, además
de una prueba que verifica que al eliminar un empleado también se eliminan sus
citas.

Si `mvn clean` falla porque OneDrive bloquea `target/classes/com/hellobaby/config`,
ejecute `mvn test` o `mvn package` sin `clean`.

Salida:

```
Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
```

## 3. Preparar MySQL (XAMPP)

1. Inicia Apache y MySQL en el panel de XAMPP.
2. En `http://localhost/phpmyadmin` confirma la base `hello_baby` y la tabla
   `empleados`. La evidencia usó exactamente esa base, no `sena_gestion`.
3. Para una instalación nueva, ejecuta en este orden:
   - `database/create_database.sql`
   - `database/schema.sql`
   - `database/seed_data.sql`
4. Copia la configuración local:

```powershell
Copy-Item src\main\resources\db.properties.example src\main\resources\db.properties
```

5. Edita `src/main/resources/db.properties` con tu usuario/contraseña.

> `db.properties` está ignorado por Git: la contraseña nunca se sube ni se
> muestra en logs. En el entorno de evidencia el usuario es `root` y la
> contraseña está vacía.

La columna real es `id_empleado`; el repository la consulta como
`id_empleado AS id` para mapearla al campo `id` del modelo Java.

## 4. Compilar, empaquetar y desplegar

No se usa `exec:java` para la versión web (el plugin fue retirado del POM).

```powershell
$env:PATH=[Environment]::GetEnvironmentVariable('Path','Machine')+';'+[Environment]::GetEnvironmentVariable('Path','User'); mvn -q package
```

El WAR queda en:

```
backend-java/target/hello-baby-backend-1.0.0.war
```

Cópialo al directorio `webapps` de Tomcat:

```powershell
Copy-Item -LiteralPath "C:\Users\usuario\OneDrive\Documents\Hello Baby - Proyecto\Hello Baby KARENB\backend-java\target\hello-baby-backend-1.0.0.war" -Destination "D:\Downloads\apache-tomcat-11.0.29-windows-x64\apache-tomcat-11.0.29\webapps\hello-baby-backend.war" -Force
```

Abre:

```
http://localhost:8080/hello-baby-backend/empleados
```

La JSP sirve `css/styles.css` y `js/empleados.js` con el contexto de la app.
No se carga `js/app.js` porque interceptaba el formulario y guardaba en
`localStorage`.

## 5. Funciones de la interfaz

- Temas Peluquería (`#E91E63`) y Barbería (`#FF6B00`) con `aria-pressed`.
- Menú lateral responsive y encabezado oscuro original.
- Formulario con nombres, apellidos, cédula, fecha de nacimiento, correo,
  WhatsApp, `rol` según tema y `tipo` = `peluqueria`/`barberia`.
- Registro real por POST, conversión de fecha a `LocalDate` y mensaje
  `Empleado registrado correctamente.`
- Edición real por POST y mensaje `Empleado actualizado correctamente.`
- Eliminación real por POST con confirmación modal. El repositorio borra primero
  las citas del empleado y luego el registro, en una sola transacción, para
  respetar la FK `citas.id_empleado → empleados.id_empleado`.
  Mensaje: `Empleado eliminado correctamente.`
- Tabla desde MySQL con búsqueda en vivo, contador y separación por tema.
- Sin botones falsos: todas las acciones del formulario y de la tabla pasan por
  el Servlet.

## 6. VS Code

El workspace incluye `.vscode/settings.json` con la conexión SQLTools:

```json
{
    "name": "Hello Baby - hello_baby",
    "driver": "MySQL",
    "server": "127.0.0.1",
    "port": 3306,
    "database": "hello_baby",
    "username": "root"
}
```

Si no aparece, ejecuta `Ctrl + Shift + P → Developer: Reload Window`.
`src/test/resources/db.properties` apunta a H2 y **no** es la base oficial.

## 7. Versionamiento en GitHub

Repositorio: https://github.com/karenbetancursalazar-eng/hello-baby

```powershell
git add .
git commit -m "descripcion del cambio"
git push
```

## 8. Checklist antes de entregar

- [x] `mvn test` pasa correctamente.
- [x] `mvn package` genera el WAR con JSP, CSS, JS y `db.properties`.
- [x] CRUD probado en MySQL `hello_baby` con los registros de ejemplo.
- [x] Alta y actualización probadas por HTTP y MySQL.
- [x] Repositorio GitHub con los últimos cambios subidos.
- [x] `enlace_repositorio.txt` con la URL correcta.
- [x] El proyecto se entrega sin archivos comprimidos.
