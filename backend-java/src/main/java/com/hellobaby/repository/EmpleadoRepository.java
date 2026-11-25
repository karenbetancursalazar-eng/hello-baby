package com.hellobaby.repository;

import com.hellobaby.model.Empleado;
import java.util.List;
import java.util.Optional;

/** Contrato de persistencia del módulo Empleados (operaciones CRUD). */
public interface EmpleadoRepository {

    List<Empleado> findAll();

    Optional<Empleado> findById(long id);

    /** Inserta un empleado y le asigna el id generado por la base de datos. */
    Empleado save(Empleado empleado);

    boolean update(Empleado empleado);

    boolean deleteById(long id);

    /** Da de baja al empleado conservando el registro y sus citas. */
    boolean desactivarEmpleado(long id);
}
