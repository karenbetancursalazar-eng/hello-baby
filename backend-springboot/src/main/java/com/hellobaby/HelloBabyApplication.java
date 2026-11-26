package com.hellobaby;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Punto de entrada de la aplicacion Hello Baby construida con Spring Boot.
 *
 * <p>Extiende {@link SpringBootServletInitializer} para que el WAR tambien
 * pueda desplegarse en un Tomcat externo, ademas de ejecutarse de forma
 * independiente con {@code mvn spring-boot:run}.</p>
 */
@SpringBootApplication
public class HelloBabyApplication extends SpringBootServletInitializer {

    /**
     * Configura la aplicacion cuando se despliega como WAR.
     *
     * @param builder constructor de la aplicacion Spring
     * @return el constructor con esta clase como fuente de configuracion
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(HelloBabyApplication.class);
    }

    /**
     * Inicia la aplicacion de forma independiente.
     *
     * @param args argumentos de la linea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(HelloBabyApplication.class, args);
    }
}
