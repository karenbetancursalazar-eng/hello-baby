package com.hellobaby;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Arranque de la aplicación Hello Baby con Spring Boot.
 *
 * <p>Extiende {@link SpringBootServletInitializer} para que el WAR también
 * pueda desplegarse en un Tomcat externo.</p>
 */
@SpringBootApplication
public class HelloBabyApplication extends SpringBootServletInitializer {

    /**
     * Configura la aplicación cuando se despliega como WAR.
     *
     * @param builder constructor de la aplicación Spring
     * @return el constructor con esta clase como fuente de configuración
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(HelloBabyApplication.class);
    }

    /**
     * Inicia la aplicación de forma independiente.
     *
     * @param args argumentos de la línea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(HelloBabyApplication.class, args);
    }
}
