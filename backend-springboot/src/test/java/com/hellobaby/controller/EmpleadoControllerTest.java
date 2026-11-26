package com.hellobaby.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import com.hellobaby.model.Empleado;
import com.hellobaby.service.EmpleadoService;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Pruebas del controlador MVC con MockMvc y el servicio simulado.
 *
 * <p>Valida el patron POST-Redirect-GET y el modelo que recibe la vista JSP.</p>
 */
@WebMvcTest(EmpleadoController.class)
class EmpleadoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmpleadoService empleadoService;

    /** La lista de empleados alimenta los contadores de la vista. */
    @Test
    @DisplayName("GET /empleados prepara el modelo de la JSP")
    void listarPreparaModelo() throws Exception {
        when(empleadoService.listarEmpleados()).thenReturn(List.of());

        mockMvc.perform(get("/empleados"))
            .andExpect(status().isOk())
            .andExpect(view().name("empleados"))
            .andExpect(model().attribute("totalEmpleados", 0))
            .andExpect(model().attributeExists("empleados", "form"));
    }

    /** Un registro correcto debe redirigir para evitar reenvios duplicados. */
    @Test
    @DisplayName("POST crear redirige a la lista")
    void registrarRedirige() throws Exception {
        when(empleadoService.registrarEmpleado(any(Empleado.class)))
            .thenAnswer(invocacion -> invocacion.getArgument(0));

        mockMvc.perform(post("/empleados")
                .param("accion", "crear")
                .param("nombres", "Evidencia")
                .param("apellidos", "AA3")
                .param("cedula", "9999999999")
                .param("correo", "evidencia.aa3@hellobaby.com")
                .param("whatsapp", "3001234567")
                .param("rol", "Barbero")
                .param("tipo", "barberia")
                .param("fechaNacimiento", "2000-01-01")
                .param("activo", "true"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrl("/empleados"));

        verify(empleadoService).registrarEmpleado(any(Empleado.class));
    }

    /** La eliminacion tambien sigue el patron POST-Redirect-GET. */
    @Test
    @DisplayName("POST eliminar redirige a la lista")
    void eliminarRedirige() throws Exception {
        when(empleadoService.eliminarEmpleado(1L)).thenReturn(true);

        mockMvc.perform(post("/empleados")
                .param("accion", "eliminar")
                .param("id", "1"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrl("/empleados"));

        verify(empleadoService).eliminarEmpleado(1L);
    }
}
