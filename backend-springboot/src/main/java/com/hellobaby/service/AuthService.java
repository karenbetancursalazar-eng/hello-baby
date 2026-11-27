package com.hellobaby.service;

import com.hellobaby.dto.RespuestaAutenticacion;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 * Servicio de registro e inicio de sesión del proyecto Hello Baby.
 *
 * <p>Los usuarios se conservan en memoria mientras la aplicación está activa.
 * Las contraseñas no se guardan en texto plano: se almacena una firma SHA-256
 * con sal aleatoria. En un entorno productivo se recomienda usar BCrypt y
 * una tabla de usuarios en MySQL.</p>
 */
@Service
public class AuthService {

    private static final int LONGITUD_SAL = 16;
    private static final String SEPARADOR = ":";
    private static final int USUARIO_MINIMO = 3;
    private static final int CONTRASENA_MINIMA = 4;

    private final Map<String, String> usuarios = new ConcurrentHashMap<>();
    private final SecureRandom generadorSal = new SecureRandom();

    /**
     * Registra un usuario nuevo.
     *
     * @param usuario nombre de usuario
     * @param contrasena contraseña elegida
     * @return respuesta con el mensaje de registro satisfactorio
     */
    public RespuestaAutenticacion registrar(String usuario, String contrasena) {
        String nombre = validarCredenciales(usuario, contrasena);

        if (usuarios.containsKey(nombre)) {
            throw new IllegalArgumentException("El usuario ya está registrado.");
        }

        usuarios.put(nombre, construirFirma(contrasena));
        return new RespuestaAutenticacion(true, "Registro satisfactorio.", nombre);
    }

    /**
     * Autentica a un usuario previamente registrado.
     *
     * @param usuario nombre de usuario
     * @param contrasena contraseña digitada
     * @return respuesta satisfactoria o con el error de autenticación
     */
    public RespuestaAutenticacion iniciarSesion(String usuario, String contrasena) {
        String nombre = validarCredenciales(usuario, contrasena);
        String guardado = usuarios.get(nombre);

        if (guardado == null || !verificarFirma(contrasena, guardado)) {
            // El mismo mensaje evita revelar si el usuario existe o no.
            return new RespuestaAutenticacion(
                false,
                "Error en la autenticación: usuario o contraseña incorrectos.",
                nombre);
        }

        return new RespuestaAutenticacion(true, "Autenticación satisfactoria.", nombre);
    }

    /**
     * Valida los datos comunes de registro e inicio de sesión.
     *
     * @param usuario nombre de usuario
     * @param contrasena contraseña digitada
     * @return usuario recortado, listo para buscarse en el registro
     */
    private String validarCredenciales(String usuario, String contrasena) {
        if (usuario == null || usuario.isBlank()) {
            throw new IllegalArgumentException("El usuario es obligatorio.");
        }
        if (contrasena == null || contrasena.isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria.");
        }

        String nombre = usuario.trim();
        if (nombre.length() < USUARIO_MINIMO) {
            throw new IllegalArgumentException(
                "El usuario debe tener al menos " + USUARIO_MINIMO + " caracteres.");
        }
        if (contrasena.length() < CONTRASENA_MINIMA) {
            throw new IllegalArgumentException(
                "La contraseña debe tener al menos " + CONTRASENA_MINIMA + " caracteres.");
        }
        return nombre;
    }

    /**
     * Genera la firma guardada: sal aleatoria + resumen SHA-256.
     *
     * @param contrasena contraseña en texto plano recibida por el servicio
     * @return cadena codificada en Base64 con el formato {@code sal:firma}
     */
    private String construirFirma(String contrasena) {
        byte[] sal = new byte[LONGITUD_SAL];
        generadorSal.nextBytes(sal);

        MessageDigest digest = crearDigest();
        digest.update(sal);
        byte[] firma = digest.digest(contrasena.getBytes(StandardCharsets.UTF_8));

        return Base64.getEncoder().encodeToString(sal) + SEPARADOR
            + Base64.getEncoder().encodeToString(firma);
    }

    /**
     * Compara la contraseña recibida con la firma almacenada.
     *
     * @param contrasena contraseña digitada
     * @param guardado firma con formato {@code sal:firma}
     * @return {@code true} cuando coinciden
     */
    private boolean verificarFirma(String contrasena, String guardado) {
        String[] partes = guardado.split(SEPARADOR, -1);
        if (partes.length != 2) {
            return false;
        }

        try {
            byte[] sal = Base64.getDecoder().decode(partes[0]);
            byte[] firmaGuardada = Base64.getDecoder().decode(partes[1]);

            MessageDigest digest = crearDigest();
            digest.update(sal);
            byte[] firmaActual = digest.digest(contrasena.getBytes(StandardCharsets.UTF_8));
            return MessageDigest.isEqual(firmaGuardada, firmaActual);
        } catch (IllegalArgumentException excepcion) {
            // Si el valor guardado está mal formado, se trata como credencial inválida.
            return false;
        }
    }

    /**
     * Obtiene un resumen SHA-256 disponible en la JVM.
     *
     * @return instancia de MessageDigest
     */
    private MessageDigest crearDigest() {
        try {
            return MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException excepcion) {
            throw new IllegalStateException(
                "SHA-256 no está disponible en esta JVM.", excepcion);
        }
    }
}
