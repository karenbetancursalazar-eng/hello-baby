package com.hellobaby.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.hellobaby.model.Empleado;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

/**
 * Pruebas del repositorio JDBC con Spring y una base H2 en memoria.
 *
 * <p>{@code @JdbcTest} crea el {@link JdbcTemplate}, ejecuta
 * {@code schema-h2.sql} y gestiona la transaccion de cada prueba.</p>
 */
@JdbcTest
@ActiveProfiles("test")
@Import(JdbcEmpleadoRepository.class)
class EmpleadoRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EmpleadoRepository repositorio;

    /** Verifica el ciclo completo de registro, busqueda, edicion y borrado. */
    @Test
    @DisplayName("CRUD completo de un empleado")
    void crudCompleto() {
        Empleado empleado = new Empleado("Prueba", "Spring", "8888888801",
            "prueba.spring@hellobaby.com", "3000000001", "Estilista", "peluqueria",
            LocalDate.of(2000, 1, 1));

        Empleado guardado = repositorio.save(empleado);
        assertThat(guardado.getId()).isPositive();
        assertThat(repositorio.findById(guardado.getId())).isPresent();

        guardado.setNombres("Prueba Editada");
        assertThat(repositorio.update(guardado)).isTrue();
        assertThat(repositorio.findById(guardado.getId()).orElseThrow().getNombres())
            .isEqualTo("Prueba Editada");

        assertThat(repositorio.deleteById(guardado.getId())).isTrue();
        assertThat(repositorio.findById(guardado.getId())).isEmpty();
    }

    /** Verifica que al eliminar un empleado tambien se borren sus citas. */
    @Test
    @DisplayName("La eliminacion en cascada borra las citas del empleado")
    void eliminacionEnCascada() {
        Empleado guardado = repositorio.save(new Empleado("Cascada", "Spring", "8888888802",
            "cascada.spring@hellobaby.com", "3000000002", "Barbero", "barberia",
            LocalDate.of(1995, 5, 20)));
        jdbcTemplate.update("INSERT INTO citas (id_empleado, descripcion) VALUES (?, ?)",
            guardado.getId(), "Cita de prueba");

        assertThat(repositorio.deleteById(guardado.getId())).isTrue();

        Integer citas = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM citas WHERE id_empleado = ?", Integer.class, guardado.getId());
        assertThat(citas).isZero();
        assertThat(repositorio.findAll()).isEmpty();
    }
}
