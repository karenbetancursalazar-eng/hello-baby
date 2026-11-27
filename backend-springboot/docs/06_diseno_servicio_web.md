# Diseño del servicio web — GA7-220501096-AA5-EV01

## Caso

Se requiere un servicio web para registrar usuarios e iniciar sesión. El
servicio recibe un **usuario** y una **contraseña**. Si la autenticación es
correcta devuelve un mensaje satisfactorio; en caso contrario devuelve un
error de autenticación.

## Endpoints

Base: `http://localhost:8081/hello-baby-springboot/api/auth`

| Operación | Método y ruta | Cuerpo | Respuesta correcta | Respuesta de error |
|---|---|---|---|---|
| Registro | `POST /register` | `{"usuario":"karen","contrasena":"clave123"}` | `201 Created` + `Registro satisfactorio.` | `400 Bad Request` si faltan datos o el usuario ya existe |
| Inicio de sesión | `POST /login` | `{"usuario":"karen","contrasena":"clave123"}` | `200 OK` + `Autenticación satisfactoria.` | `401 Unauthorized` + `Error en la autenticación...` |

El campo `password` se acepta como alias de `contrasena`.

## Formato de respuesta

```json
{
  "autenticado": true,
  "mensaje": "Autenticación satisfactoria.",
  "usuario": "karen"
}
```

## Flujo

1. El cliente envía las credenciales en JSON.
2. `AuthController` recibe la petición y llama a `AuthService`.
3. `AuthService` valida longitud y caracteres obligatorios.
4. En el registro se genera una sal aleatoria y una firma SHA-256; nunca se
   guarda la contraseña en texto plano.
5. En el inicio de sesión se recalcula la firma y se compara con la guardada.
6. El controlador traduce el resultado a un código HTTP y a un mensaje.

## Clases

```text
com.hellobaby.controller.AuthController  -> endpoints REST /api/auth
com.hellobaby.service.AuthService        -> registro, validación y autenticación
com.hellobaby.dto.Credenciales           -> datos de entrada
com.hellobaby.dto.RespuestaAutenticacion -> datos de salida
```

## Pruebas

- `AuthServiceTest`: registro, login correcto, contraseña incorrecta,
  usuario duplicado y credenciales inválidas.
- `AuthControllerTest`: códigos `201`, `200`, `401` y `400`, y alias `password`.

> Los usuarios se guardan en memoria solo mientras se ejecuta la aplicación.
> Para producción se recomienda BCrypt y persistencia en MySQL.
