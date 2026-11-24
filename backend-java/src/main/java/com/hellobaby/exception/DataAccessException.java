package com.hellobaby.exception;

/** Excepción propia para errores de acceso a datos (capea SQLException). */
public class DataAccessException extends RuntimeException {

    public DataAccessException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}
