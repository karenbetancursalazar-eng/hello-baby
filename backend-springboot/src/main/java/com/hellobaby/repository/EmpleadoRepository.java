package com.hellobaby.repository;

import com.hellobaby.model.Empleado;
import java.util.List;
import java.util.Optional;

/**
 * Contrato de persistencia del modulo Empleados.
 *
 * <p>Los nombres siguen la convencion CRUD usada en la capa de datos
 * ({@code findAll}, {@code findById}, {@code save}, {@code update},
 * {@code deleteById}), de acuerdo con los estandares del proyecto.</p>
 */
public interface EmpleadoRepository {

    /**
     * Lista todos los empleados ordenados por identificador.
     *
     * @return lista de empleados; nunca {@code null}
     */
    List<Empleado> findAll();

    /**
     * Busca un empleado por su identificador.
     *
     * @param id identificador del empleado
     * @return el empleado encontrado o {@link Optional#empty()}
     */
    Optional<Empleado> findById(long id);

    /**
     * Registra un empleado y le asigna el id generado por la base de datos.
     *
     * @param empleado datos a registrar
     * @return el mismo empleado con su id asignado
     */
    Empleado save(Empleado empleado);

    /**
     * Actualiza los datos de un empleado existente.
     *
     * @param empleado empleado con el id y los nuevos datos
     * @return {@code true} si se actualizo al menos un registro
     */
    boolean update(Empleado empleado);

    /**
     * Elimina fisicamente un empleado y sus citas asociadas.
     *
     * @param id identificador del empleado
     * @return {@code true} si se elimino el empleado
     */
    boolean deleteById(long id);
}
