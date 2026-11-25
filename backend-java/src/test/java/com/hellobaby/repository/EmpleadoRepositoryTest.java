package com.hellobaby.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.hellobaby.config.DatabaseConnection;
import com.hellobaby.model.Empleado;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

/** Prueba del ciclo CRUD completo usando H2 en memoria (mismo código JDBC). */
class EmpleadoRepositoryTest {

    private final EmpleadoRepository repositorio = new EmpleadoRepositoryImpl();

    @BeforeAll
    static void crearEsquema() throws Exception {
        String sql = Files.readString(Path.of("database", "schema.sql"));
        try (Connection conexion = DatabaseConnection.getConnection();
             Statement sentencia = conexion.createStatement()) {
            sentencia.execute(sql);
        }
    }

    @Test
    void crudCompleto() {
        Empleado empleado = new Empleado(
            "Ana", "Prueba", "9999999999", "ana@hellobaby.com",
            "+57 300 000 0000", "Estilista", "peluqueria", LocalDate.of(1995, 1, 1));

        // CREATE
        Empleado guardado = repositorio.save(empleado);
        assertTrue(guardado.getId() > 0, "El id generado debe ser mayor que cero");

        // READ
        Empleado encontrado = repositorio.findById(guardado.getId()).orElseThrow();
        assertEquals("Ana", encontrado.getNombres());

        // UPDATE
        guardado.setRol("Recepcionista");
        assertTrue(repositorio.update(guardado));
        assertEquals("Recepcionista", repositorio.findById(guardado.getId()).orElseThrow().getRol());

        // LIST
        List<Empleado> todos = repositorio.findAll();
        assertTrue(todos.stream().anyMatch(item -> item.getId() == guardado.getId()));

        // DELETE
        assertTrue(repositorio.deleteById(guardado.getId()));
        assertTrue(repositorio.findById(guardado.getId()).isEmpty());
    }

    @Test
    void bajaLogicaConservaElRegistro() {
        Empleado empleado = repositorio.save(new Empleado(
            "Baja", "Logica", "8888888888", "baja@hellobaby.com",
            "+57 300 000 0001", "Barbero", "barberia", LocalDate.of(1990, 2, 2)));

        assertTrue(repositorio.desactivarEmpleado(empleado.getId()));
        Empleado dadoDeBaja = repositorio.findById(empleado.getId()).orElseThrow();
        assertTrue(!dadoDeBaja.isActivo(), "El empleado debe quedar inactivo");

        assertTrue(repositorio.deleteById(empleado.getId()));
    }
}
