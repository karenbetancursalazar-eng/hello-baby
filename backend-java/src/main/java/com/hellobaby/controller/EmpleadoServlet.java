package com.hellobaby.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hellobaby.exception.DataAccessException;
import com.hellobaby.model.Empleado;
import com.hellobaby.repository.EmpleadoRepositoryImpl;
import com.hellobaby.service.EmpleadoService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Controlador web del módulo de empleados.
 * Reutiliza EmpleadoService y el repositorio JDBC existentes.
 */
@WebServlet("/empleados")
public class EmpleadoServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private static final List<String> ROLES_PERMITIDOS = Arrays.asList(
        "Administrador", "Recepcionista", "Barbero", "Estilista"
    );

    private static final String[] PARAMETROS_FORMULARIO = {
        "id", "accion", "nombres", "apellidos", "cedula", "correo",
        "whatsapp", "rol", "tipo", "fechaNacimiento", "activo"
    };

    private EmpleadoService empleadoService;

    @Override
    public void init() throws ServletException {
        empleadoService = new EmpleadoService(new EmpleadoRepositoryImpl());
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        if ("1".equals(request.getParameter("registrado"))) {
            request.setAttribute("mensaje", "Empleado registrado correctamente.");
        } else if ("1".equals(request.getParameter("actualizado"))) {
            request.setAttribute("mensaje", "Empleado actualizado correctamente.");
        } else if ("1".equals(request.getParameter("eliminado"))) {
            request.setAttribute("mensaje", "Empleado eliminado correctamente.");
        }

        mostrarPagina(request, response);
    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        Map<String, String> valores = capturarFormulario(request);
        request.setAttribute("form", valores);

        String accion = valores.get("accion");
        if (accion == null || accion.isBlank()) {
            accion = "crear";
        }

        try {
            if ("eliminar".equals(accion)) {
                long id = parsearId(valores.get("id"));
                if (!empleadoService.eliminarEmpleado(id)) {
                    throw new IllegalArgumentException(
                        "No se encontró el empleado con id " + id + "."
                    );
                }
                redirigir(request, response, "eliminado");
                return;
            }

            LocalDate fecha = parsearFecha(valores.get("fechaNacimiento"));
            validarRol(valores.get("rol"));

            Empleado empleado = construirEmpleado(valores, fecha);

            if ("actualizar".equals(accion)) {
                empleado.setId(parsearId(valores.get("id")));
                if (!empleadoService.actualizarEmpleado(empleado)) {
                    throw new IllegalArgumentException(
                        "No se pudo actualizar el empleado. Verifica el identificador."
                    );
                }
                redirigir(request, response, "actualizado");
                return;
            }

            empleadoService.registrarEmpleado(empleado);
            redirigir(request, response, "registrado");

        } catch (DateTimeParseException excepcion) {
            request.setAttribute(
                "error",
                "La fecha de nacimiento no tiene un formato válido."
            );
            mostrarPagina(request, response);

        } catch (NumberFormatException excepcion) {
            request.setAttribute("error", "El identificador del empleado no es válido.");
            mostrarPagina(request, response);

        } catch (DataAccessException excepcion) {
            request.setAttribute("error", excepcion.getMessage());
            mostrarPagina(request, response);

        } catch (IllegalArgumentException excepcion) {
            request.setAttribute("error", excepcion.getMessage());
            mostrarPagina(request, response);

        } catch (RuntimeException excepcion) {
            getServletContext().log(
                "Error al procesar el empleado.",
                excepcion
            );
            request.setAttribute(
                "error",
                "No fue posible completar la operación. Revisa la conexión con la base de datos."
            );
            mostrarPagina(request, response);
        }
    }

    private Map<String, String> capturarFormulario(HttpServletRequest request) {
        Map<String, String> valores = new HashMap<>();
        for (String nombre : PARAMETROS_FORMULARIO) {
            String valor = request.getParameter(nombre);
            valores.put(nombre, valor == null ? "" : valor.trim());
        }
        if (valores.get("activo").isEmpty()) {
            valores.put("activo", "true");
        }
        if (valores.get("accion").isEmpty()) {
            valores.put("accion", "crear");
        }
        return valores;
    }

    private LocalDate parsearFecha(String texto) {
        if (texto == null || texto.isBlank()) {
            return null;
        }
        LocalDate fecha = LocalDate.parse(texto);
        if (fecha.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Ingresa una fecha de nacimiento válida.");
        }
        return fecha;
    }

    private long parsearId(String texto) {
        long id = Long.parseLong(texto == null || texto.isBlank() ? "0" : texto);
        if (id <= 0) {
            throw new IllegalArgumentException("El identificador del empleado no es válido.");
        }
        return id;
    }

    private void validarRol(String rol) {
        if (!ROLES_PERMITIDOS.contains(rol)) {
            throw new IllegalArgumentException(
                "El rol debe ser Administrador, Recepcionista, Barbero o Estilista."
            );
        }
    }

    private Empleado construirEmpleado(Map<String, String> valores, LocalDate fecha) {
        Empleado empleado = new Empleado(
            valores.get("nombres"),
            valores.get("apellidos"),
            valores.get("cedula"),
            valores.get("correo"),
            valores.get("whatsapp"),
            valores.get("rol"),
            valores.get("tipo"),
            fecha
        );
        empleado.setActivo(!"false".equalsIgnoreCase(valores.get("activo")));
        return empleado;
    }

    private void redirigir(
            HttpServletRequest request,
            HttpServletResponse response,
            String resultado)
            throws IOException {
        response.sendRedirect(
            request.getContextPath() + "/empleados?" + resultado + "=1"
        );
    }

    private void mostrarPagina(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        try {
            request.setAttribute("empleados", empleadoService.listarEmpleados());
        } catch (RuntimeException excepcion) {
            getServletContext().log("Error al consultar los empleados.", excepcion);

            if (request.getAttribute("error") == null) {
                request.setAttribute(
                    "error",
                    "No se pudieron consultar los empleados. Revisa la conexión con MySQL."
                );
            }
        }

        request.getRequestDispatcher("/WEB-INF/views/empleados.jsp").forward(request, response);
    }
}
