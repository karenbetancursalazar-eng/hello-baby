package com.hellobaby.config;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Fábrica de conexiones JDBC.
 * Lee los parámetros de src/main/resources/db.properties.
 */
public final class DatabaseConnection {

    private static final String ARCHIVO_CONFIGURACION = "/db.properties";
    private static String url;
    private static String usuario;
    private static String contrasena;

    private DatabaseConnection() {
        // Clase de utilidad: no se instancia.
    }

    static {
        try (InputStream entrada = DatabaseConnection.class.getResourceAsStream(ARCHIVO_CONFIGURACION)) {
            if (entrada == null) {
                throw new IllegalStateException(
                    "No se encontró db.properties. Copia db.properties.example a src/main/resources/db.properties.");
            }
            Properties propiedades = new Properties();
            propiedades.load(entrada);
            url = propiedades.getProperty("db.url");
            usuario = propiedades.getProperty("db.user");
            contrasena = propiedades.getProperty("db.password", "");
            Class.forName(propiedades.getProperty("db.driver", "com.mysql.cj.jdbc.Driver"));
        } catch (IOException | ClassNotFoundException excepcion) {
            throw new ExceptionInInitializerError(excepcion);
        }
    }

    /** Devuelve una conexión nueva; quien la usa debe cerrarla (try-with-resources). */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, usuario, contrasena);
    }
}
