<%@ page contentType="text/html; charset=UTF-8" language="java"
         import="java.util.*, com.hellobaby.model.Empleado" %>
<%!
    private String escapar(String texto) {
        if (texto == null) {
            return "";
        }
        return texto.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#39;");
    }

    private String valor(Map<String, String> datos, String clave) {
        if (datos == null) {
            return "";
        }
        return escapar(datos.get(clave));
    }
%>
<%
    List<Empleado> empleados = (List<Empleado>) request.getAttribute("empleados");
    if (empleados == null) {
        empleados = Collections.emptyList();
    }

    Map<String, String> form = (Map<String, String>) request.getAttribute("form");
    if (form == null) {
        form = Collections.emptyMap();
    }

    String mensaje = (String) request.getAttribute("mensaje");
    String error = (String) request.getAttribute("error");
    String ctx = request.getContextPath();

    int totalEmpleados = empleados.size();
    int totalPeluqueria = 0;
    int totalBarberia = 0;
    for (Empleado empleado : empleados) {
        if ("barberia".equalsIgnoreCase(empleado.getTipo())) {
            totalBarberia++;
        } else {
            totalPeluqueria++;
        }
    }
%>
<!DOCTYPE html>
<html lang="es" data-theme="peluqueria">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Hello Baby — Gestión de empleados. Registro de nuevo empleado.">
  <title>Empleados · Hello Baby</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23E91E63' d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/></svg>">
  <link rel="stylesheet" href="<%= ctx %>/css/styles.css?v=6">
  <style>html { scroll-behavior: auto; }</style>
</head>
<body data-page="empleados">

  <a class="skip-link" href="#main">Saltar al contenido</a>

  <% if (mensaje != null || error != null) { %>
  <div id="hb-mensaje" hidden
       data-tipo="<%= error != null ? "error" : "success" %>"
       data-titulo="<%= error != null ? "No se pudo completar la operación" : "Operación exitosa" %>"
       data-mensaje="<%= escapar(error != null ? error : mensaje) %>"></div>
  <% } %>

  <!-- Header -->
  <header class="topbar">
    <div class="topbar-left">
      <button type="button" class="hamburger" id="menu-btn" aria-label="Abrir menú" aria-controls="sidebar" aria-expanded="false">
        <svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>
      </button>
      <a class="brand" href="<%= ctx %>/empleados" aria-label="Hello Baby, ir al Dashboard">
        <svg class="icon icon-lg icon-heart" aria-hidden="true"><use href="#i-logo"/></svg>
        <span class="brand-text">hello <b>baby</b></span>
      </a>
    </div>

    <div class="theme-switch" role="group" aria-label="Cambiar tema visual">
      <button type="button" class="theme-btn" data-theme-btn="peluqueria" aria-pressed="true">Peluquería</button>
      <button type="button" class="theme-btn" data-theme-btn="barberia" aria-pressed="false">Barbería</button>
    </div>

    <div class="topbar-right">
      <span class="user-chip" aria-label="Perfil no disponible en esta integración" style="cursor:default">
        <span class="avatar" data-user-initials aria-hidden="true">CR</span>
        <span class="user-meta">
          <span class="user-name" data-user-name>Carlos Rodríguez</span>
          <span class="user-role" data-user-role>Administrador</span>
        </span>
      </span>
      <span class="btn btn-logout" aria-disabled="true" title="Cierre de sesión no disponible" style="opacity:.65;cursor:not-allowed">
        <svg class="icon" aria-hidden="true"><use href="#i-logout"/></svg>
        <span class="logout-label">Cerrar sesión</span>
      </span>
    </div>
  </header>

  <div class="layout">
    <!-- Menú lateral -->
    <aside class="sidebar" id="sidebar" aria-label="Menú principal">
      <nav>
        <ul class="nav-list">
          <li>
            <span class="nav-link" data-module="dashboard" aria-disabled="true" title="Módulo no disponible" style="opacity:.55;cursor:not-allowed">
              <svg class="icon" aria-hidden="true"><use href="#i-grid"/></svg>
              <span>Dashboard</span>
            </span>
          </li>
          <li>
            <a class="nav-link active" data-module="empleados" href="<%= ctx %>/empleados" aria-current="page">
              <svg class="icon" aria-hidden="true"><use href="#i-users"/></svg>
              <span>Empleados</span>
            </a>
          </li>
          <li>
            <span class="nav-link" data-module="citas" aria-disabled="true" title="Módulo no disponible" style="opacity:.55;cursor:not-allowed">
              <svg class="icon" aria-hidden="true"><use href="#i-calendar-check"/></svg>
              <span>Citas</span>
            </span>
          </li>
          <li>
            <span class="nav-link" data-module="servicios" aria-disabled="true" title="Módulo no disponible" style="opacity:.55;cursor:not-allowed">
              <svg class="icon" aria-hidden="true"><use href="#i-scissors"/></svg>
              <span>Servicios</span>
            </span>
          </li>
          <li>
            <span class="nav-link" data-module="ganancias" aria-disabled="true" title="Módulo no disponible" style="opacity:.55;cursor:not-allowed">
              <svg class="icon" aria-hidden="true"><use href="#i-wallet"/></svg>
              <span>Ganancias</span>
            </span>
          </li>
        </ul>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-divider"></div>
        <span class="nav-link" data-module="perfil" aria-disabled="true" title="Módulo no disponible" style="opacity:.55;cursor:not-allowed">
          <svg class="icon" aria-hidden="true"><use href="#i-user"/></svg>
          <span>Perfil</span>
        </span>
      </div>
    </aside>

    <div class="main-wrap">
      <main class="main" id="main">
        <section class="page-head">
          <div>
            <h1 class="page-title">Empleados</h1>
            <p class="page-desc">Registra un nuevo empleado en el sistema Hello Baby.</p>
          </div>
        </section>

        <section class="card">
          <div class="card-head">
            <h2>Nuevo Empleado</h2>
          </div>

          <form id="empleado-form" action="<%= ctx %>/empleados" method="post" novalidate>
            <input type="hidden" id="emp-id" name="id" value="0">
            <input type="hidden" id="emp-accion" name="accion" value="crear">
            <input type="hidden" id="emp-activo" name="activo" value="true">

            <div class="form-grid">
              <div class="field">
                <label for="emp-nombres">Nombres <span class="req" aria-hidden="true">*</span></label>
                <input type="text" id="emp-nombres" name="nombres" autocomplete="given-name"
                       placeholder="Ej: María Fernanda" aria-describedby="err-nombres"
                       value="<%= valor(form, "nombres") %>">
                <p class="field-error" id="err-nombres" hidden></p>
              </div>

              <div class="field">
                <label for="emp-apellidos">Apellidos <span class="req" aria-hidden="true">*</span></label>
                <input type="text" id="emp-apellidos" name="apellidos" autocomplete="family-name"
                       placeholder="Ej: Torres Gómez" aria-describedby="err-apellidos"
                       value="<%= valor(form, "apellidos") %>">
                <p class="field-error" id="err-apellidos" hidden></p>
              </div>

              <div class="field">
                <label for="emp-cedula">Cédula de ciudadanía <span class="req" aria-hidden="true">*</span></label>
                <input type="text" id="emp-cedula" name="cedula" inputmode="numeric"
                       placeholder="Ej: 1002456789" maxlength="10" aria-describedby="err-cedula"
                       value="<%= valor(form, "cedula") %>">
                <p class="field-error" id="err-cedula" hidden></p>
              </div>

              <div class="field">
                <label for="emp-fecha">Fecha de nacimiento <span class="req" aria-hidden="true">*</span></label>
                <input type="date" id="emp-fecha" name="fechaNacimiento" aria-describedby="err-fecha"
                       value="<%= valor(form, "fechaNacimiento") %>">
                <p class="field-error" id="err-fecha" hidden></p>
              </div>

              <div class="field">
                <label for="emp-correo">Correo electrónico <span class="req" aria-hidden="true">*</span></label>
                <input type="email" id="emp-correo" name="correo" autocomplete="email"
                       placeholder="Ej: correo@ejemplo.com" aria-describedby="err-correo"
                       value="<%= valor(form, "correo") %>">
                <p class="field-error" id="err-correo" hidden></p>
              </div>

              <div class="field">
                <label for="emp-whatsapp">Contacto WhatsApp <span class="req" aria-hidden="true">*</span></label>
                <input type="tel" id="emp-whatsapp" name="whatsapp" autocomplete="tel"
                       placeholder="Ej: +57 300 123 4567" aria-describedby="err-whatsapp"
                       value="<%= valor(form, "whatsapp") %>">
                <p class="field-error" id="err-whatsapp" hidden></p>
              </div>

              <div class="field">
                <label for="emp-tipo">Área <span class="req" aria-hidden="true">*</span></label>
                <select id="emp-tipo" name="tipo">
                  <option value="peluqueria">Peluquería</option>
                  <option value="barberia">Barbería</option>
                </select>
              </div>

              <div class="field">
                <label for="emp-rol">Rol <span class="req" aria-hidden="true">*</span></label>
                <select id="emp-rol" name="rol">
                  <option value="Estilista">Estilista</option>
                  <option value="Barbero">Barbero</option>
                </select>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                <svg class="icon" aria-hidden="true"><use href="#i-user-check"/></svg>
                <span id="btn-guardar-texto">Guardar Empleado</span>
              </button>
              <button type="button" class="btn btn-outline" id="btn-clear-empleado">Limpiar Campos</button>
              <button type="button" class="btn btn-ghost" onclick="if (history.length > 1) { history.back(); }">
                <svg class="icon" aria-hidden="true"><use href="#i-arrow-left"/></svg>
                Volver
              </button>
            </div>
          </form>
        </section>

        <section class="card" style="margin-top:20px">
          <div class="card-head">
            <h2>Empleados Registrados</h2>
            <span class="badge badge-accent" id="emp-count"><%= totalEmpleados %></span>
            <div class="input-icon" style="margin-left:auto;width:260px;max-width:100%">
              <svg class="icon" aria-hidden="true"><use href="#i-filter"/></svg>
              <input type="search" id="emp-buscar" placeholder="Buscar empleado..." aria-label="Buscar empleado">
            </div>
          </div>
          <p id="emp-contexto" style="color:var(--text-muted);font-size:13px;margin:-4px 0 12px">
            Registros en MySQL · Peluquería: <%= totalPeluqueria %> · Barbería: <%= totalBarberia %>
          </p>
          <div class="table-wrap">
            <table id="tabla-empleados">
              <caption class="visually-hidden">Lista de empleados registrados</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Cédula</th>
                  <th scope="col">Correo</th>
                  <th scope="col">WhatsApp</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Área</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <% for (Empleado empleado : empleados) {
                    String nombreCompleto = empleado.getNombres() + " " + empleado.getApellidos();
                    String busqueda = nombreCompleto + " " + empleado.getCedula() + " "
                                    + empleado.getCorreo() + " " + empleado.getWhatsapp() + " "
                                    + empleado.getRol() + " " + empleado.getTipo();
                    String fecha = empleado.getFechaNacimiento() == null
                                 ? "" : empleado.getFechaNacimiento().toString();
                    String area = "barberia".equalsIgnoreCase(empleado.getTipo())
                                ? "Barbería" : "Peluquería";
                %>
                <tr data-search="<%= escapar(busqueda.toLowerCase()) %>"
                    data-id="<%= empleado.getId() %>"
                    data-nombres="<%= escapar(empleado.getNombres()) %>"
                    data-apellidos="<%= escapar(empleado.getApellidos()) %>"
                    data-cedula="<%= escapar(empleado.getCedula()) %>"
                    data-correo="<%= escapar(empleado.getCorreo()) %>"
                    data-whatsapp="<%= escapar(empleado.getWhatsapp()) %>"
                    data-fecha="<%= escapar(fecha) %>"
                    data-rol="<%= escapar(empleado.getRol()) %>"
                    data-tipo="<%= escapar(empleado.getTipo()) %>"
                    data-activo="<%= empleado.isActivo() ? "true" : "false" %>">
                  <td class="td-strong">#<%= empleado.getId() %></td>
                  <td class="td-strong"><%= escapar(nombreCompleto) %></td>
                  <td><%= escapar(empleado.getCedula()) %></td>
                  <td><%= escapar(empleado.getCorreo()) %></td>
                  <td><%= escapar(empleado.getWhatsapp()) %></td>
                  <td><span class="badge badge-accent"><%= escapar(empleado.getRol()) %></span></td>
                  <td>
                    <span class="badge <%= "barberia".equalsIgnoreCase(empleado.getTipo()) ? "badge-warn" : "badge-accent" %>">
                      <%= area %>
                    </span>
                  </td>
                  <td>
                    <span class="badge <%= empleado.isActivo() ? "badge-ok" : "badge-danger" %>">
                      <%= empleado.isActivo() ? "Activo" : "Inactivo" %>
                    </span>
                  </td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" data-editar="<%= empleado.getId() %>"
                            aria-label="Editar <%= escapar(nombreCompleto) %>">
                      <svg class="icon icon-sm" aria-hidden="true"><use href="#i-edit"/></svg>
                      Editar
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" data-eliminar="<%= empleado.getId() %>"
                            aria-label="Eliminar <%= escapar(nombreCompleto) %>">
                      <svg class="icon icon-sm" aria-hidden="true"><use href="#i-off"/></svg>
                      Eliminar
                    </button>
                  </td>
                </tr>
                <% } %>
              </tbody>
            </table>
            <p class="table-empty-msg" id="emp-empty" style="text-align:center;color:var(--text-muted);padding:24px;font-style:italic;display:<%= totalEmpleados == 0 ? "block" : "none" %>;">No hay empleados registrados aún.</p>
          </div>
        </section>

        <form id="form-eliminar" action="<%= ctx %>/empleados" method="post" style="display:none">
          <input type="hidden" name="accion" value="eliminar">
          <input type="hidden" id="eliminar-id" name="id" value="0">
        </form>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <span class="footer-brand">
          <svg class="icon icon-heart" aria-hidden="true"><use href="#i-logo"/></svg>
          Hello Baby
        </span>
        <span>© 2026 Hello Baby · Todos los derechos reservados.</span>
      </footer>
    </div>
  </div>

  <div class="sidebar-overlay" data-close-sidebar></div>

  <!-- Sprite de iconos original -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="i-logo" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></symbol>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
    <symbol id="i-calendar-check" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></symbol>
    <symbol id="i-scissors" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></symbol>
    <symbol id="i-wallet" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></symbol>
    <symbol id="i-logout" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></symbol>
    <symbol id="i-arrow-left" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
    <symbol id="i-danger" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.07 10.07 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></symbol>
    <symbol id="i-edit" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></symbol>
    <symbol id="i-off" viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>
    <symbol id="i-filter" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></symbol>
    <symbol id="i-trend-up" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></symbol>
    <symbol id="i-card" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></symbol>
    <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></symbol>
    <symbol id="i-user-check" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></symbol>
    <symbol id="i-x-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></symbol>
    <symbol id="i-sparkles" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
    <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2H17a5 5 0 0 0 5-5c0-4.4-4.5-8-10-8z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/></symbol>
    <symbol id="i-brush" viewBox="0 0 24 24"><path d="M21.4 2.6a2.4 2.4 0 0 0-3.4 0L8 12.6 11.4 16l10-10a2.4 2.4 0 0 0 0-3.4z"/><path d="M11.4 16L8 12.6 3 22l9.4-5z"/></symbol>
    <symbol id="i-hand" viewBox="0 0 24 24"><path d="M18 11.5a1.5 1.5 0 0 0-1.5 1.5V7a1.5 1.5 0 0 0-3 0v3.5a1.5 1.5 0 0 0-3 0V4a1.5 1.5 0 0 0-3 0v8.5a1.5 1.5 0 0 0-3 0V15a7 7 0 0 0 14 0v-3.5a1.5 1.5 0 0 0-1.5-1.5z"/></symbol>
    <symbol id="i-razor" viewBox="0 0 24 24"><path d="M9 3l6 6-8 8L3 13l6-10z"/><path d="M15 9l3.5-3.5"/><path d="M18.5 5.5l2 2"/></symbol>
    <symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></symbol>
    <symbol id="i-baby" viewBox="0 0 24 24"><circle cx="12" cy="9" r="4.5"/><path d="M7.5 14.5a5 5 0 0 0 9 0"/><path d="M12 14.5V18"/></symbol>
  </svg>

  <script src="<%= ctx %>/js/empleados.js?v=6"></script>
  <script>
    /* Eliminación directa si el script principal no está disponible. */
    if (!window.hbEliminarConfigurado) {
      document.querySelectorAll('[data-eliminar]').forEach(function (boton) {
        boton.addEventListener('click', function () {
          var fila = boton.closest('tr');
          if (!fila) { return; }
          var nombre = (fila.getAttribute('data-nombres') || '') + ' ' +
                       (fila.getAttribute('data-apellidos') || '');
          if (!window.confirm('¿Eliminar a ' + nombre +
              '? Esta operación no se puede deshacer.')) { return; }
          var form = document.getElementById('form-eliminar');
          document.getElementById('eliminar-id').value = fila.getAttribute('data-id');
          form.submit();
        });
      });
    }
  </script>
</body>
</html>
