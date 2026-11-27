package com.hellobaby.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

/**
 * Datos que reciben los servicios de registro e inicio de sesión.
 *
 * <p>Se acepta {@code contrasena} y también el alias {@code password}
 * para que el servicio pueda probarse con clientes JSON habituales.</p>
 */
public class Credenciales {

    private String usuario;

    @JsonAlias("password")
    private String contrasena;

    /** Constructor vacío requerido por Jackson al deserializar JSON. */
    public Credenciales() {
    }

    /**
     * Crea un par de credenciales.
     *
     * @param usuario nombre de usuario
     * @param contrasena contraseña del usuario
     */
    public Credenciales(String usuario, String contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

    /** @return nombre de usuario recibido */
    public String getUsuario() {
        return usuario;
    }

    /** @param usuario nombre de usuario recibido */
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    /** @return contraseña recibida */
    public String getContrasena() {
        return contrasena;
    }

    /** @param contrasena contraseña recibida */
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
