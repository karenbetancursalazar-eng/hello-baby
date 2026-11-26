package com.hellobaby.model;

import java.time.LocalDate;
import java.util.Objects;

/**
 * Entidad que representa un empleado del establecimiento.
 *
 * <p>Corresponde a la tabla {@code empleados} y al objeto del diseño original.</p>
 */
public class Empleado {

    private long id;
    private String nombres;
    private String apellidos;
    private String cedula;
    private String correo;
    private String whatsapp;
    private String rol;
    private String tipo;
    private LocalDate fechaNacimiento;
    private boolean activo;

    /** Crea un empleado activo sin datos. */
    public Empleado() {
        this.activo = true;
    }

    /** Crea un empleado activo con sus datos principales. */
    public Empleado(String nombres, String apellidos, String cedula, String correo,
                    String whatsapp, String rol, String tipo, LocalDate fechaNacimiento) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correo = correo;
        this.whatsapp = whatsapp;
        this.rol = rol;
        this.tipo = tipo;
        this.fechaNacimiento = fechaNacimiento;
        this.activo = true;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    /** Representación legible del empleado para depuración. */
    @Override
    public String toString() {
        return String.format("%d | %s %s | %s | %s | %s | %s",
            id, nombres, apellidos, cedula, correo, rol, tipo);
    }

    @Override
    public boolean equals(Object objeto) {
        if (this == objeto) {
            return true;
        }
        if (!(objeto instanceof Empleado)) {
            return false;
        }
        Empleado otro = (Empleado) objeto;
        return id == otro.id && Objects.equals(cedula, otro.cedula);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cedula);
    }
}
