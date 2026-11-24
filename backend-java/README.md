# Hello Baby — Módulo Empleados con JDBC

Evidencia **GA7-220501096-AA2-EV01 — Codificación de módulos del software**.
Proyecto: sistema de gestión interna de barbería y peluquería (prototipo en `../`).

## Contenido

```
backend-java/
├─ pom.xml
├─ database/
│  ├─ create_database.sql # crea la base hello_baby
│  ├─ schema.sql          # tabla empleados
│  └─ seed_data.sql       # datos del prototipo
├─ src/main/java/com/hellobaby/
│  ├─ Main.java               # menú consola (CRUD)
│  ├─ config/DatabaseConnection.java
│  ├─ exception/DataAccessException.java
│  ├─ model/Empleado.java
│  ├─ repository/EmpleadoRepository.java
│  ├─ repository/EmpleadoRepositoryImpl.java
│  ├─ service/EmpleadoService.java
│  └─ util/InputUtil.java
├─ src/main/resources/db.properties.example
├─ src/test/                 # prueba CRUD con H2
├─ docs/                     # estándares, plan, HU, casos de uso, diagrama
└─ enlace_repositorio.txt
```

## 1. Requisitos

- JDK 17 o superior (`java -version`)
- Maven (`mvn -version`)
- MySQL 8 con XAMPP (para ejecutar la app real)
- Git y una cuenta de GitHub

## 2. Probar sin instalar MySQL (recomendado primero)

Desde esta carpeta:

```powershell
mvn clean test
```

La prueba `EmpleadoRepositoryTest` crea la tabla en H2 en memoria y ejecuta
CREATE → READ → UPDATE → LIST → DELETE con el mismo código JDBC.

## 3. Preparar MySQL (XAMPP)

1. Inicia Apache y MySQL en el panel de XAMPP.
2. Entra a `http://localhost/phpmyadmin` y crea la base `hello_baby` (o ejecuta `database/create_database.sql`).
3. Abre la pestaña **SQL** y ejecuta, en este orden:
   - `database/schema.sql`
   - `database/seed_data.sql`
4. Copia el archivo de configuración:

```powershell
Copy-Item src\main\resources\db.properties.example src\main\resources\db.properties
```

5. Edita `src/main/resources/db.properties` con tu usuario/contraseña de MySQL.

> `db.properties` está en `.gitignore`: nunca subas tu contraseña a GitHub.

## 4. Ejecutar la aplicación

```powershell
mvn clean compile exec:java
```

Menú disponible: consultar, registrar, actualizar (nombres, apellidos, correo, WhatsApp y rol), eliminar y buscar por id.

## 5. Versionamiento en GitHub

Repositorio: https://github.com/karenbetancursalazar-eng/hello-baby

Para subir cambios nuevos:

```powershell
git add .
git commit -m "descripcion del cambio"
git push
```

## 6. Empaquetar la evidencia

Comprimir la carpeta del proyecto (`backend-java`, el frontend y el archivo
`enlace_repositorio.txt`) en un ZIP llamado `KARENPATRICIABETANCURSALAZAR_AA2_EV01.zip`.

## 7. Checklist antes de entregar

- [ ] `mvn test` pasa correctamente.
- [ ] CRUD probado en MySQL con los registros de ejemplo.
- [ ] Repositorio GitHub público con los últimos cambios subidos.
- [ ] `enlace_repositorio.txt` con la URL correcta.
- [ ] ZIP con el nombre `KARENPATRICIABETANCURSALAZAR_AA2_EV01`.
