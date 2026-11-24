# Hello Baby — Módulo Empleados con JDBC

Evidencia **GA7-220501096-AA2-EV01 — Codificación de módulos del software**.
Proyecto: sistema de gestión interna de barbería y peluquería (prototipo en `../`).

## Contenido

```
backend-java/
├─ pom.xml
├─ database/
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
2. Entra a `http://localhost/phpmyadmin` y crea la base `hellobaby_db`.
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

Menú disponible: consultar, registrar, actualizar, eliminar y buscar por id.

## 5. Versionamiento en GitHub

```powershell
git init
git add .
git commit -m "feat: modulo empleados con CRUD JDBC y estandares de codificacion"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/hello-baby-backend.git
git push -u origin main
```

Después reemplaza el enlace en `enlace_repositorio.txt` con tu URL real y haz
`git add enlace_repositorio.txt` + `git commit` + `git push`.

## 6. Empaquetar la evidencia

Desde la carpeta `Hello Baby KARENB` (un nivel arriba de `backend-java`):

```powershell
$destino = "NOMBREAPELLIDO_AA2_EV01"
New-Item -ItemType Directory -Force $destino | Out-Null
Copy-Item -Recurse -Force ".\backend-java\*" $destino
Copy-Item -Recurse -Force ".\css" "$destino\frontend\css"
Copy-Item -Recurse -Force ".\js" "$destino\frontend\js"
Copy-Item -Force ".\*.html" "$destino\frontend"
Compress-Archive -Path "$destino\*" -DestinationPath "$destino.zip" -Force
```

**Importante:** cambia `NOMBREAPELLIDO` por tu nombre real, por ejemplo
`KARENRAMIREZ_AA2_EV01.zip`. Ese ZIP es el que se envía al área de la actividad.

## 7. Checklist antes de entregar

- [ ] `mvn test` pasa correctamente.
- [ ] CRUD probado en MySQL con los 5 registros de ejemplo.
- [ ] Repositorio GitHub público con al menos un commit.
- [ ] `enlace_repositorio.txt` con la URL correcta.
- [ ] ZIP con el nombre `NOMBREAPELLIDO_AA2_EV01`.
