package com.hellobaby.service;

import com.hellobaby.model.Empleado;
import com.hellobaby.repository.EmpleadoRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Reglas de negocio y validaciones del módulo Empleados. */
@Service
public class EmpleadoService {

    private static final Pattern PATRON_CEDULA = Pattern.compile("\\d{8,10}");
    private static final Pattern PATRON_CORREO =
        Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private final EmpleadoRepository empleadoRepository;

    /**
     * Crea el servicio con el repositorio inyectado.
     *
     * @param empleadoRepository repositorio de empleados
     */
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository =
            Objects.requireNonNull(empleadoRepository, "El repositorio es obligatorio.");
    }

    /** Lista todos los empleados. */
    @Transactional(readOnly = true)
    public List<Empleado> listarEmpleados() {
        return empleadoRepository.findAll();
    }

    /** Busca un empleado por id. */
    @Transactional(readOnly = true)
    public Optional<Empleado> buscarEmpleado(long id) {
        validarId(id);
        return empleadoRepository.findById(id);
    }

    /** Registra un empleado después de validarlo. */
    @Transactional
    public Empleado registrarEmpleado(Empleado empleado) {
        validarEmpleado(empleado);
        return empleadoRepository.save(empleado);
    }

    /** Actualiza un empleado después de validarlo. */
    @Transactional
    public boolean actualizarEmpleado(Empleado empleado) {
        validarEmpleado(empleado);
        validarId(empleado.getId());
        return empleadoRepository.update(empleado);
    }

    /** Elimina un empleado y sus citas en la misma transacción. */
    @Transactional
    public boolean eliminarEmpleado(long id) {
        validarId(id);
        return empleadoRepository.deleteById(id);
    }

    private void validarId(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("El id debe ser mayor que cero.");
        }
    }

    /** Valida campos obligatorios y formatos de cédula y correo. */
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
        validarTexto(empleado.getTipo(), "Área");
        if (!"peluqueria".equalsIgnoreCase(empleado.getTipo())
                && !"barberia".equalsIgnoreCase(empleado.getTipo())) {
            throw new IllegalArgumentException("El área debe ser 'peluqueria' o 'barberia'.");
        }
    }

    private void validarTexto(String valor, String nombreCampo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException("El campo " + nombreCampo + " es obligatorio.");
        }
    }
}
