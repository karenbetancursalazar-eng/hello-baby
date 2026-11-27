package com.hellobaby.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.hellobaby.dto.RespuestaAutenticacion;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/** Pruebas unitarias del servicio de registro e inicio de sesión. */
class AuthServiceTest {

    private final AuthService servicio = new AuthService();

    /** Un usuario registrado debe poder autenticarse con su contraseña. */
    @Test
    @DisplayName("Registro e inicio de sesión satisfactorios")
    void registrarEIniciarSesion() {
        RespuestaAutenticacion registro = servicio.registrar("karen", "clave123");
        assertTrue(registro.isAutenticado());
        assertEquals("Registro satisfactorio.", registro.getMensaje());

        RespuestaAutenticacion sesion = servicio.iniciarSesion("karen", "clave123");
        assertTrue(sesion.isAutenticado());
        assertEquals("Autenticación satisfactoria.", sesion.getMensaje());
    }

    /** Una contraseña distinta debe devolver error de autenticación. */
    @Test
    @DisplayName("Contraseña incorrecta devuelve error")
    void contrasenaIncorrecta() {
        servicio.registrar("karen", "clave123");

        RespuestaAutenticacion sesion = servicio.iniciarSesion("karen", "otra5678");
        assertFalse(sesion.isAutenticado());
        assertTrue(sesion.getMensaje().contains("Error en la autenticación"));
    }

    /** No se permite registrar dos veces el mismo usuario. */
    @Test
    @DisplayName("Usuario duplicado se rechaza")
    void usuarioDuplicado() {
        servicio.registrar("karen", "clave123");

        IllegalArgumentException error = assertThrows(
            IllegalArgumentException.class,
            () -> servicio.registrar("karen", "clave123"));
        assertEquals("El usuario ya está registrado.", error.getMessage());
    }

    /** Los campos vacíos o demasiado cortos se rechazan antes de guardar. */
    @Test
    @DisplayName("Credenciales inválidas se rechazan")
    void credencialesInvalidas() {
        assertThrows(IllegalArgumentException.class,
            () -> servicio.registrar(" ", "clave123"));
        assertThrows(IllegalArgumentException.class,
            () -> servicio.registrar("karen", "abc"));
    }
}
