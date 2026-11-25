package com.hellobaby.repository;

import com.hellobaby.config.DatabaseConnection;
import com.hellobaby.exception.DataAccessException;
import com.hellobaby.model.Empleado;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/** Implementación JDBC de {@link EmpleadoRepository}. */
public class EmpleadoRepositoryImpl implements EmpleadoRepository {

    private static final String SQL_FIND_ALL =
        "SELECT id_empleado AS id, nombres, apellidos, cedula, correo, whatsapp, rol, tipo, fecha_nacimiento, activo "
        + "FROM empleados ORDER BY id_empleado";

    private static final String SQL_FIND_BY_ID =
    "SELECT id_empleado AS id, nombres, apellidos, cedula, correo, whatsapp, rol, tipo, fecha_nacimiento, activo "
    + "FROM empleados WHERE id_empleado = ?";

    private static final String SQL_INSERT =
        "INSERT INTO empleados (nombres, apellidos, cedula, correo, whatsapp, rol, tipo, fecha_nacimiento, activo) "
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
        "UPDATE empleados SET nombres = ?, apellidos = ?, cedula = ?, correo = ?, whatsapp = ?, "
        + "rol = ?, tipo = ?, fecha_nacimiento = ?, activo = ? WHERE id_empleado = ?";

    private static final String SQL_DELETE = "DELETE FROM empleados WHERE id_empleado = ?";

    private static final String SQL_DELETE_CITAS = "DELETE FROM citas WHERE id_empleado = ?";

    @Override
    public List<Empleado> findAll() {
        List<Empleado> empleados = new ArrayList<>();
        try (Connection conexion = DatabaseConnection.getConnection();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_FIND_ALL);
             ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {
                empleados.add(mapearFila(resultado));
            }
        } catch (SQLException excepcion) {
            throw new DataAccessException("No fue posible listar los empleados.", excepcion);
        }
        return empleados;
    }

    @Override
    public Optional<Empleado> findById(long id) {
        try (Connection conexion = DatabaseConnection.getConnection();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_FIND_BY_ID)) {

            sentencia.setLong(1, id);
            try (ResultSet resultado = sentencia.executeQuery()) {
                if (resultado.next()) {
                    return Optional.of(mapearFila(resultado));
                }
            }
        } catch (SQLException excepcion) {
            throw new DataAccessException("No fue posible buscar el empleado con id " + id + ".", excepcion);
        }
        return Optional.empty();
    }

    @Override
    public Empleado save(Empleado empleado) {
        try (Connection conexion = DatabaseConnection.getConnection();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {

            asignarParametros(sentencia, empleado, 1);
            sentencia.executeUpdate();

            try (ResultSet claves = sentencia.getGeneratedKeys()) {
                if (claves.next()) {
                    empleado.setId(claves.getLong(1));
                }
            }
        } catch (SQLException excepcion) {
            throw new DataAccessException("No fue posible registrar el empleado. ¿La cédula ya existe?", excepcion);
        }
        return empleado;
    }

    @Override
    public boolean update(Empleado empleado) {
        try (Connection conexion = DatabaseConnection.getConnection();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_UPDATE)) {

            asignarParametros(sentencia, empleado, 1);
            sentencia.setLong(10, empleado.getId());
            return sentencia.executeUpdate() > 0;
        } catch (SQLException excepcion) {
            throw new DataAccessException("No fue posible actualizar el empleado con id " + empleado.getId() + ".", excepcion);
        }
    }

    @Override
    public boolean deleteById(long id) {
        try (Connection conexion = DatabaseConnection.getConnection()) {
            boolean autocommit = conexion.getAutoCommit();
            conexion.setAutoCommit(false);
            try {
                try (PreparedStatement sentenciaCitas = conexion.prepareStatement(SQL_DELETE_CITAS)) {
                    sentenciaCitas.setLong(1, id);
                    sentenciaCitas.executeUpdate();
                }

                int eliminados;
                try (PreparedStatement sentenciaEmpleado = conexion.prepareStatement(SQL_DELETE)) {
                    sentenciaEmpleado.setLong(1, id);
                    eliminados = sentenciaEmpleado.executeUpdate();
                }

                conexion.commit();
                return eliminados > 0;
            } catch (SQLException | RuntimeException excepcion) {
                conexion.rollback();
                throw excepcion;
            } finally {
                conexion.setAutoCommit(autocommit);
            }
        } catch (SQLException excepcion) {
            throw new DataAccessException("No fue posible eliminar el empleado con id " + id + ".", excepcion);
        }
    }

    private void asignarParametros(PreparedStatement sentencia, Empleado empleado, int indiceInicial)
            throws SQLException {
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

    private Empleado mapearFila(ResultSet resultado) throws SQLException {
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
