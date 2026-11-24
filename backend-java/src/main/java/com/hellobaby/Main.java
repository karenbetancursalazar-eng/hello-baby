package com.hellobaby;

import com.hellobaby.exception.DataAccessException;
import com.hellobaby.model.Empleado;
import com.hellobaby.repository.EmpleadoRepositoryImpl;
import com.hellobaby.service.EmpleadoService;
import com.hellobaby.util.InputUtil;
import java.util.List;
import java.util.Optional;

/** Aplicación de consola que demuestra el CRUD JDBC del módulo Empleados. */
public class Main {

    private static final EmpleadoService EMPLEADO_SERVICE = new EmpleadoService(new EmpleadoRepositoryImpl());

    public static void main(String[] args) {
        System.out.println("==============================================");
        System.out.println(" HELLO BABY - MÓDULO EMPLEADOS (JDBC)");
        System.out.println("==============================================");

        boolean salir = false;
        while (!salir) {
            imprimirMenu();
            int opcion = InputUtil.leerEntero("Seleccione una opción: ");
            try {
                switch (opcion) {
                    case 1:
                        listarEmpleados();
                        break;
                    case 2:
                        registrarEmpleado();
                        break;
                    case 3:
                        actualizarEmpleado();
                        break;
                    case 4:
                        eliminarEmpleado();
                        break;
                    case 5:
                        buscarEmpleado();
                        break;
                    case 0:
                        salir = true;
                        break;
                    default:
                        System.out.println("Opción no válida. Intente de nuevo.");
                }
            } catch (DataAccessException | IllegalArgumentException excepcion) {
                System.out.println("Error: " + excepcion.getMessage());
            }
        }
        System.out.println("Fin del programa. ¡Hasta pronto!");
    }

    private static void imprimirMenu() {
        System.out.println();
        System.out.println("1. Consultar todos los empleados");
        System.out.println("2. Registrar empleado");
        System.out.println("3. Actualizar empleado");
        System.out.println("4. Eliminar empleado");
        System.out.println("5. Buscar empleado por id");
        System.out.println("0. Salir");
    }

    private static void listarEmpleados() {
        List<Empleado> empleados = EMPLEADO_SERVICE.listarEmpleados();
        if (empleados.isEmpty()) {
            System.out.println("No hay empleados registrados.");
            return;
        }
        System.out.println("---- Empleados registrados ----");
        empleados.forEach(System.out::println);
        System.out.println("Total: " + empleados.size());
    }

    private static void registrarEmpleado() {
        Empleado empleado = new Empleado(
            InputUtil.leerTexto("Nombres: "),
            InputUtil.leerTexto("Apellidos: "),
            InputUtil.leerTexto("Cédula: "),
            InputUtil.leerTexto("Correo electrónico: "),
            InputUtil.leerTexto("WhatsApp: "),
            InputUtil.leerTexto("Rol (Estilista/Barbero/Recepcionista): "),
            InputUtil.leerTexto("Tipo (peluqueria/barberia): "),
            InputUtil.leerFechaOpcional("Fecha de nacimiento")
        );
        Empleado guardado = EMPLEADO_SERVICE.registrarEmpleado(empleado);
        System.out.println("Empleado registrado con id: " + guardado.getId());
    }

    private static void actualizarEmpleado() {
        long id = InputUtil.leerEntero("Id del empleado a actualizar: ");
        Optional<Empleado> existente = EMPLEADO_SERVICE.buscarEmpleado(id);
        if (existente.isEmpty()) {
            System.out.println("No existe un empleado con ese id.");
            return;
        }
        Empleado empleado = existente.get();
        System.out.println("Pulse Enter para conservar el valor actual.");
        empleado.setNombres(InputUtil.leerTextoConValorActual("Nombres", empleado.getNombres()));
        empleado.setApellidos(InputUtil.leerTextoConValorActual("Apellidos", empleado.getApellidos()));
        empleado.setCorreo(InputUtil.leerTextoConValorActual("Correo electrónico", empleado.getCorreo()));
        empleado.setWhatsapp(InputUtil.leerTextoConValorActual("WhatsApp", empleado.getWhatsapp() == null ? "" : empleado.getWhatsapp()));
        empleado.setRol(InputUtil.leerTextoConValorActual("Rol", empleado.getRol()));
        System.out.println(EMPLEADO_SERVICE.actualizarEmpleado(empleado)
            ? "Empleado actualizado correctamente."
            : "No se pudo actualizar el empleado.");
    }

    private static void eliminarEmpleado() {
        long id = InputUtil.leerEntero("Id del empleado a eliminar: ");
        System.out.println(EMPLEADO_SERVICE.eliminarEmpleado(id)
            ? "Empleado eliminado correctamente."
            : "No existe un empleado con ese id.");
    }

    private static void buscarEmpleado() {
        long id = InputUtil.leerEntero("Id del empleado: ");
        Optional<Empleado> empleado = EMPLEADO_SERVICE.buscarEmpleado(id);
        System.out.println(empleado.map(Object::toString).orElse("No existe un empleado con ese id."));
    }
}
