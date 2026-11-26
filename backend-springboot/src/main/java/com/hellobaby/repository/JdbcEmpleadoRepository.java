package com.hellobaby.repository;

import com.hellobaby.model.Empleado;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

/** Implementación del repositorio con {@link JdbcTemplate} y consultas parametrizadas. */
@Repository
public class JdbcEmpleadoRepository implements EmpleadoRepository {

    private static final String SQL_FIND_ALL =
        "SELECT id_empleado AS id, nombres, apellidos, cedula, correo, whatsapp, rol, tipo, "
        + "fecha_nacimiento, activo FROM empleados ORDER BY id_empleado";

    private static final String SQL_FIND_BY_ID =
        "SELECT id_empleado AS id, nombres, apellidos, cedula, correo, whatsapp, rol, tipo, "
        + "fecha_nacimiento, activo FROM empleados WHERE id_empleado = ?";

    private static final String SQL_INSERT =
        "INSERT INTO empleados (nombres, apellidos, cedula, correo, whatsapp, rol, tipo, "
        + "fecha_nacimiento, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
        "UPDATE empleados SET nombres = ?, apellidos = ?, cedula = ?, correo = ?, whatsapp = ?, "
        + "rol = ?, tipo = ?, fecha_nacimiento = ?, activo = ? WHERE id_empleado = ?";

    private static final String SQL_DELETE = "DELETE FROM empleados WHERE id_empleado = ?";

    private static final String SQL_DELETE_CITAS = "DELETE FROM citas WHERE id_empleado = ?";

    /** Convierte cada fila de la consulta en una entidad {@link Empleado}. */
    private static final RowMapper<Empleado> MAPEADOR = (resultado, numeroFila) -> mapearFila(resultado);

    private final JdbcTemplate jdbcTemplate;

    /** Crea el repositorio con el {@code JdbcTemplate} inyectado. */
    public JdbcEmpleadoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Empleado> findAll() {
        return jdbcTemplate.query(SQL_FIND_ALL, MAPEADOR);
    }

    @Override
    public Optional<Empleado> findById(long id) {
        List<Empleado> resultados = jdbcTemplate.query(SQL_FIND_BY_ID, MAPEADOR, id);
        return resultados.stream().findFirst();
    }

    @Override
    public Empleado save(Empleado empleado) {
        KeyHolder clave = new GeneratedKeyHolder();
        jdbcTemplate.update(conexion -> {
            PreparedStatement sentencia = conexion.prepareStatement(
                SQL_INSERT, Statement.RETURN_GENERATED_KEYS);
            asignarParametros(sentencia, empleado, 1);
            return sentencia;
        }, clave);
        if (clave.getKey() != null) {
            empleado.setId(clave.getKey().longValue());
        }
        return empleado;
    }

    @Override
    public boolean update(Empleado empleado) {
        return jdbcTemplate.update(conexion -> {
            PreparedStatement sentencia = conexion.prepareStatement(SQL_UPDATE);
            asignarParametros(sentencia, empleado, 1);
            sentencia.setLong(10, empleado.getId());
            return sentencia;
        }) > 0;
    }

    @Override
    public boolean deleteById(long id) {
        // Las dos sentencias comparten la transacción declarativa del servicio.
        jdbcTemplate.update(SQL_DELETE_CITAS, id);
        return jdbcTemplate.update(SQL_DELETE, id) > 0;
    }

    /** Asigna los nueve parámetros comunes de INSERT y UPDATE. */
    private static void asignarParametros(PreparedStatement sentencia, Empleado empleado,
                                          int indiceInicial) throws SQLException {
        sentencia.setString(indiceInicial, empleado.getNombres());
        sentencia.setString(indiceInicial + 1, empleado.getApellidos());
        sentencia.setString(indiceInicial + 2, empleado.getCedula());
        sentencia.setString(indiceInicial + 3, empleado.getCorreo());
        sentencia.setString(indiceInicial + 4, empleado.getWhatsapp());
        sentencia.setString(indiceInicial + 5, empleado.getRol());
        sentencia.setString(indiceInicial + 6, empleado.getTipo());
        if (empleado.getFechaNacimiento() == null) {
            sentencia.setNull(indiceInicial + 7, Types.DATE);
        } else {
            sentencia.setDate(indiceInicial + 7, Date.valueOf(empleado.getFechaNacimiento()));
        }
        sentencia.setBoolean(indiceInicial + 8, empleado.isActivo());
    }

    /** Mapea una fila del ResultSet a la entidad de dominio. */
    private static Empleado mapearFila(ResultSet resultado) throws SQLException {
        Empleado empleado = new Empleado();
        empleado.setId(resultado.getLong("id"));
        empleado.setNombres(resultado.getString("nombres"));
        empleado.setApellidos(resultado.getString("apellidos"));
        empleado.setCedula(resultado.getString("cedula"));
        empleado.setCorreo(resultado.getString("correo"));
        empleado.setWhatsapp(resultado.getString("whatsapp"));
        empleado.setRol(resultado.getString("rol"));
        empleado.setTipo(resultado.getString("tipo"));
        Date fecha = resultado.getDate("fecha_nacimiento");
        empleado.setFechaNacimiento(fecha == null ? null : fecha.toLocalDate());
        empleado.setActivo(resultado.getBoolean("activo"));
        return empleado;
    }
}
