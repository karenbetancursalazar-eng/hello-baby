package com.hellobaby.util;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

/** Utilidades para leer datos desde la consola. */
public final class InputUtil {

    private static final Scanner SCANNER = new Scanner(System.in);

    private InputUtil() {
        // Clase de utilidad: no se instancia.
    }

    public static String leerTexto(String mensaje) {
        System.out.print(mensaje);
        return SCANNER.nextLine().trim();
    }

    /** Lee un texto; si el usuario solo pulsa Enter, conserva el valor actual. */
    public static String leerTextoConValorActual(String etiqueta, String valorActual) {
        String valor = leerTexto(etiqueta + " [" + valorActual + "]: ");
        return valor.isEmpty() ? valorActual : valor;
    }

    public static int leerEntero(String mensaje) {
        while (true) {
            String valor = leerTexto(mensaje);
            try {
                return Integer.parseInt(valor);
            } catch (NumberFormatException excepcion) {
                System.out.println("Debe ingresar un número entero. Intente de nuevo.");
            }
        }
    }

    public static LocalDate leerFechaOpcional(String mensaje) {
        String valor = leerTexto(mensaje + " (AAAA-MM-DD, Enter para omitir): ");
        if (valor.isEmpty()) {
            return null;
        }
        try {
            return LocalDate.parse(valor);
        } catch (DateTimeParseException excepcion) {
            throw new IllegalArgumentException("La fecha debe tener el formato AAAA-MM-DD.");
        }
    }

    public static boolean leerBooleano(String mensaje) {
        String valor = leerTexto(mensaje + " (s/n): ");
        return "s".equalsIgnoreCase(valor) || "si".equalsIgnoreCase(valor) || "sí".equalsIgnoreCase(valor);
    }
}
