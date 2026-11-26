package com.hellobaby.repository;

import com.hellobaby.model.Empleado;
import java.util.List;
import java.util.Optional;

/** Contrato de persistencia del módulo Empleados. */
public interface EmpleadoRepository {

    /** Lista todos los empleados ordenados por identificador. */
    List<Empleado> findAll();

    /** Busca un empleado por su identificador. */
    Optional<Empleado> findById(long id);

    /** Registra un empleado y le asigna el id generado por la base de datos. */
    Empleado save(Empleado empleado);

    /** Actualiza los datos de un empleado existente. */
    boolean update(Empleado empleado);

    /** Elimina físicamente un empleado y sus citas asociadas. */
    boolean deleteById(long id);
}
