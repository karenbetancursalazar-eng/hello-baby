package com.hellobaby.controller;

import com.hellobaby.model.Empleado;
import com.hellobaby.service.EmpleadoService;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controlador MVC del modulo Empleados.
 *
 * <p>El patron POST-Redirect-GET evita el reenvio duplicado del formulario al
 * recargar la pagina. Los mensajes se pasan como atributos flash y la vista
 * JSP se resuelve mediante el prefijo configurado en {@code application.properties}.</p>
 */
@Controller
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    /**
     * Crea el controlador con el servicio inyectado.
     *
     * @param empleadoService servicio del modulo Empleados
     */
    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    /** Redirige la raiz de la aplicacion a la pantalla de empleados. */
    @GetMapping("/")
    public String inicio() {
        return "redirect:/empleados";
    }

    /**
     * Prepara el modelo para la pantalla de empleados.
     *
     * @param modelo modelo de la vista
     * @return nombre logico de la vista JSP
     */
    @GetMapping("/empleados")
    public String listar(Model modelo) {
        List<Empleado> empleados = empleadoService.listarEmpleados();
        long peluqueria = empleados.stream()
            .filter(empleado -> !"barberia".equalsIgnoreCase(empleado.getTipo()))
            .count();

        modelo.addAttribute("empleados", empleados);
        modelo.addAttribute("form", new HashMap<String, String>());
        modelo.addAttribute("totalEmpleados", empleados.size());
        modelo.addAttribute("totalPeluqueria", peluqueria);
        modelo.addAttribute("totalBarberia", empleados.size() - peluqueria);
        return "empleados";
    }

    /**
     * Registra un empleado nuevo.
     *
     * @param parametros datos enviados por el formulario
     * @param redirect atributos flash para la siguiente peticion
     * @return redireccion a la lista de empleados
     */
    @PostMapping(path = "/empleados", params = "accion=crear")
    public String crear(@RequestParam Map<String, String> parametros,
                        RedirectAttributes redirect) {
        try {
            empleadoService.registrarEmpleado(construirEmpleado(parametros, 0));
            redirect.addFlashAttribute("mensaje", "Empleado registrado correctamente.");
        } catch (RuntimeException excepcion) {
            rechazar(redirect, parametros, excepcion);
        }
        return "redirect:/empleados";
    }

    /**
     * Actualiza un empleado existente.
     *
     * @param parametros datos enviados por el formulario
     * @param redirect atributos flash para la siguiente peticion
     * @return redireccion a la lista de empleados
     */
    @PostMapping(path = "/empleados", params = "accion=actualizar")
    public String actualizar(@RequestParam Map<String, String> parametros,
                             RedirectAttributes redirect) {
        try {
            long id = Long.parseLong(valor(parametros, "id"));
            empleadoService.actualizarEmpleado(construirEmpleado(parametros, id));
            redirect.addFlashAttribute("mensaje", "Empleado actualizado correctamente.");
        } catch (RuntimeException excepcion) {
            rechazar(redirect, parametros, excepcion);
        }
        return "redirect:/empleados";
    }

    /**
     * Elimina un empleado y sus citas asociadas.
     *
     * @param parametros datos enviados por el formulario oculto
     * @param redirect atributos flash para la siguiente peticion
     * @return redireccion a la lista de empleados
     */
    @PostMapping(path = "/empleados", params = "accion=eliminar")
    public String eliminar(@RequestParam Map<String, String> parametros,
                           RedirectAttributes redirect) {
        try {
            long id = Long.parseLong(valor(parametros, "id"));
            empleadoService.eliminarEmpleado(id);
            redirect.addFlashAttribute("mensaje", "Empleado eliminado correctamente.");
        } catch (RuntimeException excepcion) {
            rechazar(redirect, parametros, excepcion);
        }
        return "redirect:/empleados";
    }

    /** Carga los atributos flash de error y conserva lo digitado por el usuario. */
    private void rechazar(RedirectAttributes redirect, Map<String, String> parametros,
                          RuntimeException excepcion) {
        String mensaje = excepcion.getMessage();
        redirect.addFlashAttribute("error",
            mensaje == null || mensaje.isBlank() ? "No se pudo completar la operación." : mensaje);
        redirect.addFlashAttribute("form", new HashMap<>(parametros));
    }

    /** Convierte los parametros HTTP en la entidad de dominio. */
    private Empleado construirEmpleado(Map<String, String> parametros, long id) {
        Empleado empleado = new Empleado();
        empleado.setId(id);
        empleado.setNombres(valor(parametros, "nombres"));
        empleado.setApellidos(valor(parametros, "apellidos"));
        empleado.setCedula(valor(parametros, "cedula"));
        empleado.setCorreo(valor(parametros, "correo"));
        empleado.setWhatsapp(valor(parametros, "whatsapp"));
        empleado.setRol(valor(parametros, "rol"));
        empleado.setTipo(valor(parametros, "tipo"));
        String fecha = valor(parametros, "fechaNacimiento");
        if (!fecha.isEmpty()) {
            empleado.setFechaNacimiento(LocalDate.parse(fecha));
        }
        empleado.setActivo(!"false".equalsIgnoreCase(valor(parametros, "activo")));
        return empleado;
    }

    /** Obtiene un parametro recortado, o una cadena vacia si no viene. */
    private String valor(Map<String, String> parametros, String clave) {
        String contenido = parametros.get(clave);
        return contenido == null ? "" : contenido.trim();
    }
}
