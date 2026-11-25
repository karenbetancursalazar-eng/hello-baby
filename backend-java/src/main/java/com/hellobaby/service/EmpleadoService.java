package com.hellobaby.service;

import com.hellobaby.model.Empleado;
import com.hellobaby.repository.EmpleadoRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;

/** Reglas de negocio y validaciones del módulo Empleados. */
public class EmpleadoService {

    private static final Pattern PATRON_CEDULA = Pattern.compile("\\d{8,10}");
    private static final Pattern PATRON_CORREO = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = Objects.requireNonNull(empleadoRepository, "El repositorio es obligatorio.");
    }

    public List<Empleado> listarEmpleados() {
        return empleadoRepository.findAll();
    }

    public Optional<Empleado> buscarEmpleado(long id) {
        validarId(id);
        return empleadoRepository.findById(id);
    }

    public Empleado registrarEmpleado(Empleado empleado) {
        validarEmpleado(empleado);
        return empleadoRepository.save(empleado);
    }

    public boolean actualizarEmpleado(Empleado empleado) {
        validarEmpleado(empleado);
        validarId(empleado.getId());
        return empleadoRepository.update(empleado);
    }

    public boolean eliminarEmpleado(long id) {
        validarId(id);
        return empleadoRepository.deleteById(id);
    }

    public boolean desactivarEmpleado(long id) {
        validarId(id);
        return empleadoRepository.desactivarEmpleado(id);
    }

    private void validarId(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("El id debe ser mayor que cero.");
        }
    }

    private void validarEmpleado(Empleado empleado) {
        Objects.requireNonNull(empleado, "El empleado es obligatorio.");
        validarTexto(empleado.getNombres(), "Nombres");
        validarTexto(empleado.getApellidos(), "Apellidos");
        validarTexto(empleado.getCedula(), "Cédula");

        String cedula = empleado.getCedula().trim();
        if (!PATRON_CEDULA.matcher(cedula).matches()) {
            throw new IllegalArgumentException("La cédula debe tener entre 8 y 10 dígitos.");
        }

        validarTexto(empleado.getCorreo(), "Correo electrónico");
        if (!PATRON_CORREO.matcher(empleado.getCorreo().trim()).matches()) {
            throw new IllegalArgumentException("Ingresa un correo electrónico válido.");
        }

        validarTexto(empleado.getRol(), "Rol");
        validarTexto(empleado.getTipo(), "Tipo");
        if (!"peluqueria".equalsIgnoreCase(empleado.getTipo())
                && !"barberia".equalsIgnoreCase(empleado.getTipo())) {
            throw new IllegalArgumentException("El tipo debe ser 'peluqueria' o 'barberia'.");
        }
    }

    private void validarTexto(String valor, String nombreCampo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException("El campo " + nombreCampo + " es obligatorio.");
        }
    }
}
