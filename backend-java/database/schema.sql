-- ============================================================
-- Hello Baby - Esquema del módulo Empleados
-- Ejecutar en MySQL (XAMPP/phpMyAdmin) o en H2 (mvn test)
-- ============================================================

CREATE TABLE IF NOT EXISTS empleados (
    id_empleado BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL,
    whatsapp VARCHAR(30),
    rol VARCHAR(50) NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'peluqueria',
    fecha_nacimiento DATE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);
