package com.hellobaby.controller;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.hellobaby.dto.RespuestaAutenticacion;
import com.hellobaby.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

/** Pruebas del servicio web REST con MockMvc y el servicio simulado. */
@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    /** El registro correcto responde 201 y devuelve el mensaje de éxito. */
    @Test
    @DisplayName("POST /api/auth/register responde 201")
    void registrarResponde201() throws Exception {
        when(authService.registrar("karen", "clave123"))
            .thenReturn(new RespuestaAutenticacion(true, "Registro satisfactorio.", "karen"));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"usuario\":\"karen\",\"contrasena\":\"clave123\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.autenticado").value(true))
            .andExpect(jsonPath("$.mensaje").value("Registro satisfactorio."))
            .andExpect(jsonPath("$.usuario").value("karen"));

        verify(authService).registrar("karen", "clave123");
    }

    /** El alias password permite usar clientes que no usan "contrasena". */
    @Test
    @DisplayName("POST /api/auth/register acepta el alias password")
    void registrarAceptaAliasPassword() throws Exception {
        when(authService.registrar("karen", "clave123"))
            .thenReturn(new RespuestaAutenticacion(true, "Registro satisfactorio.", "karen"));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"usuario\":\"karen\",\"password\":\"clave123\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.autenticado").value(true));
    }

    /** La autenticación correcta responde 200 con mensaje satisfactorio. */
    @Test
    @DisplayName("POST /api/auth/login responde 200")
    void loginResponde200() throws Exception {
        when(authService.iniciarSesion("karen", "clave123"))
            .thenReturn(new RespuestaAutenticacion(
                true, "Autenticación satisfactoria.", "karen"));

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"usuario\":\"karen\",\"contrasena\":\"clave123\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.autenticado").value(true))
            .andExpect(jsonPath("$.mensaje").value("Autenticación satisfactoria."));
    }

    /** Las credenciales incorrectas responden 401 con el error en el cuerpo. */
    @Test
    @DisplayName("POST /api/auth/login responde 401")
    void loginResponde401() throws Exception {
        when(authService.iniciarSesion(anyString(), anyString()))
            .thenReturn(new RespuestaAutenticacion(
                false, "Error en la autenticación: usuario o contraseña incorrectos.", "karen"));

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"usuario\":\"karen\",\"contrasena\":\"mal1234\"}"))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.autenticado").value(false))
            .andExpect(jsonPath("$.mensaje").value(
                "Error en la autenticación: usuario o contraseña incorrectos."));
    }

    /** Un registro duplicado responde 400 con el mensaje de validación. */
    @Test
    @DisplayName("POST /api/auth/register responde 400 si el usuario existe")
    void registroDuplicadoResponde400() throws Exception {
        when(authService.registrar(anyString(), anyString()))
            .thenThrow(new IllegalArgumentException("El usuario ya está registrado."));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"usuario\":\"karen\",\"contrasena\":\"clave123\"}"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.autenticado").value(false))
            .andExpect(jsonPath("$.mensaje").value("El usuario ya está registrado."));
    }
}
