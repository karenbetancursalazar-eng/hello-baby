package com.hellobaby.dto;

/**
 * Respuesta uniforme de los servicios de registro e inicio de sesión.
 *
 * <p>El campo {@code autenticado} permite al cliente distinguir una
 * autenticación satisfactoria de un error sin depender del código HTTP.</p>
 */
public class RespuestaAutenticacion {

    private final boolean autenticado;
    private final String mensaje;
    private final String usuario;

    /**
     * Crea la respuesta del servicio.
     *
     * @param autenticado {@code true} cuando la operación fue satisfactoria
     * @param mensaje mensaje para el usuario
     * @param usuario usuario relacionado con la operación
     */
    public RespuestaAutenticacion(boolean autenticado, String mensaje, String usuario) {
        this.autenticado = autenticado;
        this.mensaje = mensaje;
        this.usuario = usuario;
    }

    /** @return {@code true} si la operación fue satisfactoria */
    public boolean isAutenticado() {
        return autenticado;
    }

    /** @return mensaje descriptivo del resultado */
    public String getMensaje() {
        return mensaje;
    }

    /** @return nombre de usuario relacionado con la operación */
    public String getUsuario() {
        return usuario;
    }
}
