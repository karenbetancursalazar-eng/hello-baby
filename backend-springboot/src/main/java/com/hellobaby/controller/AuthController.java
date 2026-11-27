package com.hellobaby.controller;

import com.hellobaby.dto.Credenciales;
import com.hellobaby.dto.RespuestaAutenticacion;
import com.hellobaby.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Servicio web REST de registro e inicio de sesión de Hello Baby.
 *
 * <p>Expone operaciones JSON bajo el prefijo {@code /api/auth}. Los mensajes
 * de error se devuelven en el cuerpo de la respuesta para que el front-end
 * pueda mostrarlos al usuario.</p>
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Crea el controlador con el servicio inyectado.
     *
     * @param authService servicio de registro e inicio de sesión
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registra un usuario con la información recibida en el cuerpo JSON.
     *
     * @param credenciales usuario y contraseña enviados por el cliente
     * @return {@code 201} si se crea, {@code 400} si los datos son inválidos
     */
    @PostMapping("/register")
    public ResponseEntity<RespuestaAutenticacion> registrar(
            @RequestBody Credenciales credenciales) {
        try {
            RespuestaAutenticacion respuesta = authService.registrar(
                credenciales.getUsuario(), credenciales.getContrasena());
            return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
        } catch (IllegalArgumentException excepcion) {
            return ResponseEntity.badRequest().body(
                new RespuestaAutenticacion(false, excepcion.getMessage(),
                    credenciales.getUsuario()));
        }
    }

    /**
     * Verifica las credenciales recibidas.
     *
     * @param credenciales usuario y contraseña enviados por el cliente
     * @return {@code 200} si la autenticación es satisfactoria,
     *         {@code 401} si las credenciales son incorrectas
     */
    @PostMapping("/login")
    public ResponseEntity<RespuestaAutenticacion> iniciarSesion(
            @RequestBody Credenciales credenciales) {
        RespuestaAutenticacion respuesta = authService.iniciarSesion(
            credenciales.getUsuario(), credenciales.getContrasena());

        if (respuesta.isAutenticado()) {
            return ResponseEntity.ok(respuesta);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respuesta);
    }
}
