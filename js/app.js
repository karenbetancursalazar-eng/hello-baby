/* ==========================================================================
   HELLO BABY — Lógica de frontend (maquetación)
   Solo HTML/CSS/JS. Sin backend, sin autenticación real, sin base de datos.
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Utilidades
     ---------------------------------------------------------------------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var page = document.body.getAttribute('data-page') || '';

  /* ----------------------------------------------------------------------
     Datos demostrativos (serán reemplazados por PHP/MySQL en el futuro)
     ---------------------------------------------------------------------- */
  var HB_KEY = 'hello-baby-data';

  var MOCK_DEFAULTS = {
    usuarioActual: {
      nombre: 'Carlos Rodríguez',
      iniciales: 'CR',
      rol: 'Administrador'
    },

    empleados: [
      { nombre: 'Camila Torres', rol: 'Estilista', tipo: 'peluqueria', cedula: '1012345678', correo: 'camila@hellobaby.com', whatsapp: '+57 300 111 2233' },
      { nombre: 'Laura Gómez', rol: 'Estilista', tipo: 'peluqueria', cedula: '1023456789', correo: 'laura@hellobaby.com', whatsapp: '+57 300 222 3344' },
      { nombre: 'Mariana López', rol: 'Recepcionista', tipo: 'peluqueria', cedula: '1034567890', correo: 'mariana@hellobaby.com', whatsapp: '+57 300 333 4455' },
      { nombre: 'Juan Pérez', rol: 'Barbero', tipo: 'barberia', cedula: '1045678901', correo: 'juan@hellobaby.com', whatsapp: '+57 300 444 5566' },
      { nombre: 'Andrés Ramírez', rol: 'Barbero', tipo: 'barberia', cedula: '1056789012', correo: 'andres@hellobaby.com', whatsapp: '+57 300 555 6677' }
    ],

    serviciosPeluqueria: [
      { id: 'p1', nombre: 'Alisado', descripcion: 'Alisado permanente para un cabello lacio y manejable.', area: 'Cabello', duracion: '120 min', precio: '$120.000', icono: 'sparkles' },
      { id: 'p2', nombre: 'Balayage', descripcion: 'Técnica de coloración con degradado natural.', area: 'Color', duracion: '150 min', precio: '$180.000', icono: 'palette' },
      { id: 'p3', nombre: 'Ceja', descripcion: 'Diseño y arreglo profesional de cejas.', area: 'Rostro', duracion: '30 min', precio: '$25.000', icono: 'eye' },
      { id: 'p4', nombre: 'Copilado', descripcion: 'Peinado y acabado profesional para ocasiones especiales.', area: 'Cabello', duracion: '45 min', precio: '$40.000', icono: 'brush' },
      { id: 'p5', nombre: 'Corte dama sencillo', descripcion: 'Corte de cabello clásico para dama.', area: 'Cabello', duracion: '60 min', precio: '$45.000', icono: 'scissors' },
      { id: 'p6', nombre: 'Corte de cabello caballero', descripcion: 'Corte clásico de cabello para caballero.', area: 'Cabello', duracion: '40 min', precio: '$35.000', icono: 'scissors' },
      { id: 'p7', nombre: 'Manicure', descripcion: 'Cuidado, limado y decoración de uñas de manos.', area: 'Uñas', duracion: '60 min', precio: '$30.000', icono: 'hand' },
      { id: 'p8', nombre: 'Pedicure', descripcion: 'Cuidado y decoración de uñas de pies.', area: 'Uñas', duracion: '60 min', precio: '$35.000', icono: 'hand' }
    ],

    serviciosBarberia: [
      { id: 'b1', nombre: 'Corte Clásico', descripcion: 'Corte tradicional con tijera y máquina.', area: 'Cabello', duracion: '40 min', precio: '$30.000', icono: 'scissors' },
      { id: 'b2', nombre: 'Degradado', descripcion: 'Fade moderno con difuminado perfecto.', area: 'Cabello', duracion: '45 min', precio: '$38.000', icono: 'razor' },
      { id: 'b3', nombre: 'Arreglo de Barba', descripcion: 'Perfilado y delineado preciso de barba.', area: 'Barba', duracion: '30 min', precio: '$20.000', icono: 'razor' },
      { id: 'b4', nombre: 'Afeitado Clásico', descripcion: 'Afeitado con toalla caliente y navaja.', area: 'Barba', duracion: '40 min', precio: '$25.000', icono: 'razor' },
      { id: 'b5', nombre: 'Corte + Barba', descripcion: 'Paquete completo de corte de cabello y barba.', area: 'Cabello', duracion: '70 min', precio: '$45.000', icono: 'scissors' },
      { id: 'b6', nombre: 'Lavado Capilar', descripcion: 'Lavado, masaje y cuidado del cabello.', area: 'Cabello', duracion: '20 min', precio: '$15.000', icono: 'drop' },
      { id: 'b7', nombre: 'Aplicación de Producto', descripcion: 'Aplicación de pomada o cera con acabado.', area: 'Cabello', duracion: '15 min', precio: '$10.000', icono: 'sparkles' },
      { id: 'b8', nombre: 'Corte Niño', descripcion: 'Corte de cabello para niños hasta 10 años.', area: 'Cabello', duracion: '30 min', precio: '$20.000', icono: 'baby' }
    ],

    ganancias: []
  };

  /* Cargar datos guardados o usar defaults */
  var MOCK = JSON.parse(JSON.stringify(MOCK_DEFAULTS));
  var saved = localStorage.getItem(HB_KEY);
  if (saved) {
    try {
      var parsed = JSON.parse(saved);
      if (parsed.usuarioActual) MOCK.usuarioActual = parsed.usuarioActual;
      if (parsed.empleados) MOCK.empleados = parsed.empleados;
      if (parsed.serviciosPeluqueria) MOCK.serviciosPeluqueria = parsed.serviciosPeluqueria;
      if (parsed.serviciosBarberia) MOCK.serviciosBarberia = parsed.serviciosBarberia;
    } catch (e) { /* si hay error, se usan los defaults */ }
  }

  function saveData() {
    localStorage.setItem(HB_KEY, JSON.stringify({
      usuarioActual: MOCK.usuarioActual,
      empleados: MOCK.empleados,
      serviciosPeluqueria: MOCK.serviciosPeluqueria,
      serviciosBarberia: MOCK.serviciosBarberia
    }));
  }

  /* Permisos por rol (solo configuración frontend).
     Para simular otro rol, cambia 'rol' en usuarioActual o la variable ROLE_DEMO. */
  var ROLE_DEMO = MOCK.usuarioActual.rol.toLowerCase();
  var MODULES_BY_ROLE = {
    administrador: ['dashboard', 'empleados', 'citas', 'servicios', 'ganancias'],
    recepcionista: ['citas', 'servicios'],
    barbero: ['citas', 'servicios'],
    estilista: ['citas', 'servicios']
  };

  /* ----------------------------------------------------------------------
     Formateo de fechas y números
     ---------------------------------------------------------------------- */
  function toDateStr(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function addDays(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function fmtMoney(n) {
    return '$' + Number(n).toLocaleString('es-CO');
  }

  function fmtShort(n) {
    if (n >= 1000) {
      var k = (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace('.', ',');
      return '$' + k + 'k';
    }
    return '$' + n;
  }

  function formatDateLong(d) {
    return new Date(d).toLocaleDateString('es-CO', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  /* Citas con fechas relativas a hoy para que la demo funcione cualquier día */
  function buildCitas() {
    var hoy = toDateStr(new Date());
    var manana = toDateStr(addDays(new Date(), 1));
    return [
      { id: 1, cliente: 'María González', servicio: 'Corte dama sencillo', empleado: 'Camila Torres', fecha: hoy, hora: '09:00', estado: 'Completada' },
      { id: 2, cliente: 'Juan Pablo Ríos', servicio: 'Corte Clásico', empleado: 'Juan Pérez', fecha: hoy, hora: '10:00', estado: 'Confirmada' },
      { id: 3, cliente: 'Laura Ruiz', servicio: 'Balayage', empleado: 'Laura Gómez', fecha: hoy, hora: '11:30', estado: 'Pendiente' },
      { id: 4, cliente: 'Andrés Mejía', servicio: 'Degradado', empleado: 'Andrés Ramírez', fecha: hoy, hora: '15:00', estado: 'Confirmada' },
      { id: 5, cliente: 'Sofía Duarte', servicio: 'Manicure', empleado: 'Camila Torres', fecha: hoy, hora: '17:00', estado: 'Pendiente' },
      { id: 6, cliente: 'Pedro Salazar', servicio: 'Arreglo de Barba', empleado: 'Juan Pérez', fecha: manana, hora: '09:30', estado: 'Confirmada' },
      { id: 7, cliente: 'Valentina Mora', servicio: 'Alisado', empleado: 'Laura Gómez', fecha: manana, hora: '10:30', estado: 'Pendiente' }
    ];
  }

  /* ----------------------------------------------------------------------
     Sistema de modales reutilizables
     ---------------------------------------------------------------------- */
  var modalEl = null;

  function iconUse(id, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }

  function openModal(opts) {
    opts = opts || {};
    var icon = opts.icon || 'info';
    var iconClass = icon === 'danger' ? 'icon-danger' : '';

    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'hb-modal';
      modalEl.className = 'modal';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      document.body.appendChild(modalEl);
    }
    modalEl.setAttribute('aria-labelledby', 'hb-modal-title');

    var buttons = (opts.buttons || [{ label: 'Cerrar', variant: 'primary', id: 'close' }]);
    var formHtml = '';
    if (opts.formHtml) {
      formHtml = '<form class="modal-form" id="hb-modal-form" novalidate>' + opts.formHtml + '</form>';
    }

    modalEl.innerHTML =
      '<div class="modal-card" role="document">' +
      '<div class="modal-icon ' + iconClass + '">' + iconUse(icon) + '</div>' +
      '<h3 class="modal-title" id="hb-modal-title">' + opts.title + '</h3>' +
      '<div class="modal-msg">' + (opts.message || '') + '</div>' +
      formHtml +
      '<div class="modal-actions">' +
      buttons.map(function (b) {
        return '<button type="button" class="btn btn-' + (b.variant || 'primary') + '" data-bid="' + b.id + '">' + b.label + '</button>';
      }).join('') +
      '</div>' +
      '</div>';

    modalEl.classList.add('open');
    document.body.classList.add('no-scroll');

    /* Enter dentro del formulario del modal dispara la acción principal */
    var modalForm = modalEl.querySelector('#hb-modal-form');
    if (modalForm) {
      modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var primary = modalEl.querySelector('.modal-actions button.btn-primary');
        if (primary) primary.click();
      });
    }

    var firstBtn = $('.modal-actions button', modalEl);
    if (firstBtn) firstBtn.focus();

    return new Promise(function (resolve) {
      function close() {
        modalEl.classList.remove('open');
        document.body.classList.remove('no-scroll');
        document.removeEventListener('keydown', onKey);
      }

      function onKey(e) {
        if (e.key === 'Escape') {
          close();
          resolve('close');
        }
      }

      modalEl.addEventListener('click', function (e) {
        if (e.target === modalEl && opts.dismissable !== false) {
          close();
          resolve('close');
        }
      }, { once: true });

      $$('.modal-actions button', modalEl).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var def = null;
          buttons.forEach(function (b) { if (b.id === btn.getAttribute('data-bid')) def = b; });
          var keepOpen = false;
          if (def && typeof def.onClick === 'function') {
            var form = $('#hb-modal-form');
            var data = {};
            if (form) {
              $$('input, select, textarea', form).forEach(function (f) {
                if (f.name) data[f.name] = f.value;
              });
            }
            keepOpen = def.onClick(data, form) === false;
          }
          if (keepOpen) return;
          close();
          resolve(def ? def.id : 'close');
        });
      });
    });
  }

  /* Modales predefinidos según la documentación del proyecto */
  var modal = {
    authError: function () {
      return openModal({
        title: 'Error de Autenticación',
        message: 'Las credenciales ingresadas no son correctas.',
        icon: 'danger',
        buttons: [{ label: 'Reintentar', variant: 'primary', id: 'retry' }]
      });
    },
    conflictoHorario: function () {
      return openModal({
        title: 'Conflicto de Horario',
        message: 'El horario seleccionado ya se encuentra ocupado.',
        icon: 'danger',
        buttons: [{ label: 'Cerrar', variant: 'primary', id: 'close' }]
      });
    },
    camposObligatorios: function (campos) {
      var lista = campos.length === 1 ? campos[0] : campos.join(', ');
      return openModal({
        title: 'Campos Obligatorios',
        message: 'Por favor completa los siguientes campos obligatorios: <strong>' + lista + '</strong>.',
        icon: 'alert',
        buttons: [{ label: 'Entendido', variant: 'primary', id: 'ok' }]
      });
    },
    success: function (titulo, mensaje) {
      return openModal({
        title: titulo,
        message: mensaje,
        icon: 'check',
        buttons: [{ label: 'Aceptar', variant: 'primary', id: 'ok' }]
      });
    },
    info: function (titulo, mensaje) {
      return openModal({
        title: titulo,
        message: mensaje,
        icon: 'info',
        buttons: [{ label: 'Cerrar', variant: 'primary', id: 'close' }]
      });
    }
  };

  /* ----------------------------------------------------------------------
     Tema visual (Peluquería / Barbería)
     ---------------------------------------------------------------------- */
var THEME_KEY = 'hello-baby-theme';
var currentTheme = localStorage.getItem(THEME_KEY) || 'peluqueria';

var NOMBRE_TEMA = { peluqueria: 'Peluquería', barberia: 'Barbería' };

  if (page === 'login') {
    /* El login siempre usa el tema claro de peluquería */
    currentTheme = 'peluqueria';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    $$('[data-theme-btn]').forEach(function (b) {
      var active = b.getAttribute('data-theme-btn') === theme;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
    onThemeChange();
  }

  $$('[data-theme-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme-btn'));
    });
  });

  applyTheme(currentTheme);

  function onThemeChange() {
    if (page === 'servicios') renderServicios();
    if (page === 'dashboard') renderDashboard();
    if (page === 'ganancias') renderGanancias();
    if (page === 'empleados') renderEmpleados();
  }

  /* ----------------------------------------------------------------------
     Usuario actual + permisos de rol (frontend)
     ---------------------------------------------------------------------- */
  function applyUser() {
    var u = MOCK.usuarioActual;
    $$('[data-user-name]').forEach(function (el) { el.textContent = u.nombre; });
    $$('[data-user-role]').forEach(function (el) { el.textContent = u.rol; });
    $$('[data-user-initials]').forEach(function (el) { el.textContent = u.iniciales; });

    var allowed = MODULES_BY_ROLE[ROLE_DEMO] || MODULES_BY_ROLE.administrador;
    $$('.nav-link[data-module]').forEach(function (link) {
      var mod = link.getAttribute('data-module');
      if (allowed.indexOf(mod) === -1) {
        link.parentElement.style.display = 'none';
      }
    });
  }

  /* ----------------------------------------------------------------------
     Menú lateral móvil
     ---------------------------------------------------------------------- */
  var sidebar = $('#sidebar');
  var menuBtn = $('#menu-btn');
  var overlay = $('.sidebar-overlay');

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    }
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('sidebar-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  $$('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  /* ----------------------------------------------------------------------
     Navegación "Volver"
     ---------------------------------------------------------------------- */
  window.goBack = function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'dashboard.html';
    }
  };

  $$('[data-go-back]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.goBack();
    });
  });

  /* ----------------------------------------------------------------------
     Estado de una cita → insignia
     ---------------------------------------------------------------------- */
  function estadoBadge(estado) {
    var cls = 'badge-accent';
    var e = estado.toLowerCase();
    if (e === 'completada') cls = 'badge-ok';
    if (e === 'pendiente') cls = 'badge-warn';
    if (e === 'cancelada') cls = 'badge-danger';
    return '<span class="badge ' + cls + '">' + estado + '</span>';
  }

  /* ----------------------------------------------------------------------
     Gráficos (sin librerías, solo CSS/JS)
     ---------------------------------------------------------------------- */
  function renderBarChart(container, labels, values) {
    var max = Math.max.apply(null, values);
    container.innerHTML = labels.map(function (l, i) {
      var h = max ? Math.round((values[i] / max) * 100) : 0;
      return '<div class="bar-col" role="img" aria-label="' + l + ': ' + fmtShort(values[i]) + '">' +
        '<span class="bar-value">' + fmtShort(values[i]) + '</span>' +
        '<div class="bar" data-h="' + h + '" style="height:0"></div>' +
        '<span class="bar-label">' + l + '</span>' +
        '</div>';
    }).join('');
    requestAnimationFrame(function () {
      $$('.bar', container).forEach(function (b) {
        b.style.height = b.dataset.h + '%';
      });
    });
  }

  function renderDonut(container, legendEl, segments) {
    var total = segments.reduce(function (s, x) { return s + x.value; }, 0);

    if (total > 0) {
      var acc = 0;
      var stops = segments.map(function (s) {
        var p = (s.value / total) * 100;
        var stop = s.color + ' ' + acc.toFixed(1) + '% ' + (acc + p).toFixed(1) + '%';
        acc += p;
        return stop;
      });
      container.style.background = 'conic-gradient(' + stops.join(', ') + ')';
    } else {
      container.style.background = 'none';
    }

    container.innerHTML = '<span class="donut-center">' + total + '<small>total</small></span>';

    if (legendEl) {
      legendEl.innerHTML = segments.map(function (s) {
        return '<li><span class="legend-dot" style="background:' + s.color + '"></span>' +
          s.label + '<strong>' + s.value + '%</strong></li>';
      }).join('');
    }
  }

  function renderProgress(container, items) {
    container.innerHTML = items.map(function (it) {
      return '<div class="progress-row">' +
        '<div class="progress-head"><span class="progress-name">' + it.name + '</span>' +
        '<span class="progress-pct">' + it.value + '%</span></div>' +
        '<div class="progress-track" role="progressbar" aria-valuenow="' + it.value + '" aria-valuemin="0" aria-valuemax="100">' +
        '<div class="progress-fill"></div></div>' +
        '</div>';
    }).join('');
    requestAnimationFrame(function () {
      $$('.progress-fill', container).forEach(function (f) {
        var track = f.closest('.progress-track');
        f.style.width = track.getAttribute('aria-valuenow') + '%';
      });
    });
  }

  /* ----------------------------------------------------------------------
     Dashboard
     ---------------------------------------------------------------------- */
  function renderDashboard() {
    var citas = [];
    var hoy = toDateStr(new Date());

    var todayLabel = $('#today-label');
    if (todayLabel) todayLabel.textContent = formatDateLong(new Date());

    /* Tarjetas de resumen */
    var stats = [
      { icono: 'wallet', etiqueta: 'Ingresos totales', valor: '$0', tendencia: 'Sin movimientos este mes' },
      { icono: 'users', etiqueta: 'Empleados', valor: '0', tendencia: 'Sin empleados registrados' },
      { icono: 'card', etiqueta: 'Clientes', valor: '0', tendencia: '0 nuevos hoy' },
      { icono: 'calendar', etiqueta: 'Citas', valor: '0', tendencia: '0 para hoy' },
      { icono: 'scissors', etiqueta: 'Servicios realizados', valor: '0', tendencia: 'Sin movimientos' }
    ];
    var statsGrid = $('#stats-grid');
    if (statsGrid) {
      statsGrid.innerHTML = stats.map(function (s) {
        return '<article class="card stat-card card-hover">' +
          '<span class="stat-icon">' + iconUse(s.icono) + '</span>' +
          '<div class="stat-info">' +
          '<p class="stat-label">' + s.etiqueta + '</p>' +
          '<p class="stat-value">' + s.valor + '</p>' +
          '<span class="stat-trend">' + iconUse('trend-up', 'icon-sm') + s.tendencia + '</span>' +
          '</div></article>';
      }).join('');
    }

    /* Gráfico de ingresos de la semana */
    var chartIngresos = $('#chart-ingresos');
    if (chartIngresos) {
      renderBarChart(chartIngresos,
        ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        [0, 0, 0, 0, 0, 0, 0]);
    }

    /* Citas por estado (dona) */
    var donut = $('#donut-estados');
    var legend = $('#legend-estados');
    if (donut) {
      renderDonut(donut, legend, [
        { label: 'Completadas', value: 0, color: 'var(--ok)' },
        { label: 'Pendientes', value: 0, color: 'var(--warn)' },
        { label: 'Confirmadas', value: 0, color: 'var(--accent)' },
        { label: 'Canceladas', value: 0, color: 'var(--danger)' }
      ]);
    }

    /* Servicios más solicitados */
    var topServ = $('#servicios-top');
    if (topServ) {
      renderProgress(topServ, [
        { name: 'Corte de cabello caballero', value: 0 },
        { name: 'Alisado', value: 0 },
        { name: 'Balayage', value: 0 },
        { name: 'Manicure', value: 0 }
      ]);
    }

    /* Próximas citas de hoy */
    var citasHoy = $('#citas-hoy');
    if (citasHoy) {
      var lista = citas.filter(function (c) { return c.fecha === hoy; })
        .sort(function (a, b) { return a.hora.localeCompare(b.hora); });

      if (lista.length === 0) {
        citasHoy.innerHTML = '<li class="agenda-empty">No hay citas registradas para hoy.</li>';
      } else {
        citasHoy.innerHTML = lista.map(function (c) {
          return '<li>' +
            '<span class="agenda-time">' + c.hora + '</span>' +
            '<div class="agenda-info">' +
            '<p class="agenda-name">' + c.cliente + '</p>' +
            '<p class="agenda-sub">' + c.servicio + ' · ' + c.empleado + '</p>' +
            '</div>' + estadoBadge(c.estado) +
            '</li>';
        }).join('');
      }
    }

    /* Resumen rápido */
    var resumen = $('#resumen-rapido');
    if (resumen) {
      var items = [
        { icono: 'wallet', etiqueta: 'Ingresos del día', valor: '$0' },
        { icono: 'award', etiqueta: 'Promedio por cita', valor: '$0' },
        { icono: 'user-check', etiqueta: 'Clientes nuevos', valor: '0' },
        { icono: 'x-circle', etiqueta: 'Citas canceladas', valor: '0' }
      ];
      resumen.innerHTML = items.map(function (it) {
        return '<div class="quick-item">' + iconUse(it.icono) +
          '<div><p class="quick-label">' + it.etiqueta + '</p>' +
          '<p class="quick-value">' + it.valor + '</p></div></div>';
      }).join('');
    }
  }

  /* ----------------------------------------------------------------------
     Login
     ---------------------------------------------------------------------- */
  function initLogin() {
    var form = $('#login-form');
    if (!form) return;

    var userInput = $('#login-user');
    var passInput = $('#login-pass');
    var passBtn = $('#toggle-pass');

    /* Mostrar / ocultar contraseña */
    if (passBtn && passInput) {
      passBtn.addEventListener('click', function () {
        var show = passInput.type === 'password';
        passInput.type = show ? 'text' : 'password';
        passBtn.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
        $('#eye-on').style.display = show ? 'block' : 'none';
        $('#eye-off').style.display = show ? 'none' : 'block';
      });
    }

    function setFieldError(input, msg) {
      var field = input.closest('.field');
      var err = field.querySelector('.field-error');
      if (msg) {
        field.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        if (err) { err.textContent = msg; err.hidden = false; }
      } else {
        field.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        if (err) { err.textContent = ''; err.hidden = true; }
      }
    }

    [userInput, passInput].forEach(function (input) {
      if (input) {
        input.addEventListener('input', function () { setFieldError(input, null); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var user = userInput.value.trim();
      var pass = passInput.value;

      var missing = [];
      if (!user) missing.push('Usuario');
      if (!pass) missing.push('Contraseña');

      if (missing.length) {
        if (!user) setFieldError(userInput, 'Este campo es obligatorio.');
        if (!pass) setFieldError(passInput, 'Este campo es obligatorio.');
        modal.camposObligatorios(missing);
        return;
      }

      /* Credenciales de demostración. La autenticación real llegará con backend. */
      if (user === 'admin' && pass === '123456') {
        modal.success('Bienvenido', 'Has iniciado sesión correctamente en Hello Baby.').then(function () {
          window.location.href = 'dashboard.html';
        });
      } else {
        setFieldError(passInput, 'Credenciales incorrectas.');
        modal.authError().then(function () {
          passInput.value = '';
          passInput.focus();
        });
      }
    });

    var forgot = $('#forgot-link');
    if (forgot) {
      forgot.addEventListener('click', function (e) {
        e.preventDefault();
        paso1Recuperar();
      });
    }

    function paso1Recuperar() {
      var formHtml =
        '<div class="field">' +
        '<label for="rec-email">Correo electrónico</label>' +
        '<input id="rec-email" name="email" type="email" placeholder="Ingresa tu correo registrado">' +
        '<p class="field-error" id="err-rec-email" hidden></p>' +
        '</div>';

      openModal({
        title: 'Recuperar contraseña',
        message: 'Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos un código de verificación.',
        icon: 'mail',
        formHtml: formHtml,
        buttons: [
          { label: 'Cancelar', variant: 'ghost', id: 'cancel' },
          { label: 'Enviar código', variant: 'primary', id: 'send', onClick: function (data, form) {
            var email = data.email ? data.email.trim() : '';
            var errEl = form.querySelector('#err-rec-email');
            var field = errEl.closest('.field');

            if (!email) {
              field.classList.add('is-invalid');
              errEl.textContent = 'Ingresa tu correo electrónico.';
              errEl.hidden = false;
              return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              field.classList.add('is-invalid');
              errEl.textContent = 'Ingresa un correo válido.';
              errEl.hidden = false;
              return false;
            }
            if (email !== 'carlos@hellobaby.com') {
              field.classList.add('is-invalid');
              errEl.textContent = 'No se encontró una cuenta con ese correo.';
              errEl.hidden = false;
              return false;
            }
            return true;
          } }
        ]
      }).then(function (idBtn) {
        if (idBtn === 'send') {
          modal.success('Código enviado', 'Se ha enviado un código de verificación a tu correo electrónico. Revisa tu bandeja de entrada.').then(function () {
            paso2Recuperar();
          });
        }
      });
    }

    function paso2Recuperar() {
      var formHtml =
        '<div class="field">' +
        '<label for="rec-code">Código de verificación</label>' +
        '<input id="rec-code" name="code" type="text" placeholder="Ej: 123456" maxlength="6">' +
        '<p class="field-error" id="err-rec-code" hidden></p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="rec-new-pass">Nueva contraseña</label>' +
        '<input id="rec-new-pass" name="newpass" type="password" placeholder="Mínimo 6 caracteres">' +
        '<p class="field-error" id="err-rec-newpass" hidden></p>' +
        '</div>' +
        '<div class="field">' +
        '<label for="rec-confirm-pass">Confirmar contraseña</label>' +
        '<input id="rec-confirm-pass" name="confirmpass" type="password" placeholder="Repite la nueva contraseña">' +
        '<p class="field-error" id="err-rec-confirmpass" hidden></p>' +
        '</div>';

      openModal({
        title: 'Restablecer contraseña',
        message: 'Ingresa el código que recibiste y tu nueva contraseña.',
        icon: 'lock',
        formHtml: formHtml,
        buttons: [
          { label: 'Cancelar', variant: 'ghost', id: 'cancel' },
          { label: 'Restablecer', variant: 'primary', id: 'reset', onClick: function (data, form) {
            var code = data.code ? data.code.trim() : '';
            var newPass = data.newpass || '';
            var confirmPass = data.confirmpass || '';
            var ok = true;

            function showErr(name, msg) {
              var el = form.querySelector('[name="' + name + '"]');
              var errEl = el.closest('.field').querySelector('.field-error');
              el.closest('.field').classList.add('is-invalid');
              errEl.textContent = msg;
              errEl.hidden = false;
              ok = false;
            }

            if (!code) showErr('code', 'Ingresa el código de verificación.');
            else if (code !== '123456') showErr('code', 'El código es incorrecto. Usa: 123456');

            if (!newPass) showErr('newpass', 'Ingresa tu nueva contraseña.');
            else if (newPass.length < 6) showErr('newpass', 'La contraseña debe tener al menos 6 caracteres.');

            if (!confirmPass) showErr('confirmpass', 'Confirma tu nueva contraseña.');
            else if (newPass !== confirmPass) showErr('confirmpass', 'Las contraseñas no coinciden.');

            return ok;
          } }
        ]
      }).then(function (idBtn) {
        if (idBtn === 'reset') {
          modal.success('Contraseña actualizada', 'Tu contraseña ha sido cambiada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.');
        }
      });
    }

  }

  /* ----------------------------------------------------------------------
     Empleados — formulario y validaciones
     ---------------------------------------------------------------------- */
  /* Campos del formulario de empleados */
  var CAMPOS_EMPLEADO = [
    { input: '#emp-nombres', err: '#err-nombres', label: 'Nombres' },
    { input: '#emp-apellidos', err: '#err-apellidos', label: 'Apellidos' },
    { input: '#emp-cedula', err: '#err-cedula', label: 'Cédula de ciudadanía' },
    { input: '#emp-fecha', err: '#err-fecha', label: 'Fecha de nacimiento' },
    { input: '#emp-correo', err: '#err-correo', label: 'Correo electrónico' },
    { input: '#emp-whatsapp', err: '#err-whatsapp', label: 'Contacto WhatsApp' }
  ];

  function renderEmpleados() {
    var tbody = $('#tabla-empleados tbody');
    var empty = $('#emp-empty');
    var count = $('#emp-count');
    var contexto = $('#emp-contexto');
    if (!tbody) return;

    var lista = MOCK.empleados.filter(function (e) {
      return e.tipo === currentTheme;
    });

    contexto.textContent = 'Empleados de ' + NOMBRE_TEMA[currentTheme] + '.';
    count.textContent = lista.length;

    if (!lista.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    tbody.innerHTML = lista.map(function (e) {
      return '<tr>' +
        '<td class="td-strong">' + e.nombre + '</td>' +
        '<td>' + e.cedula + '</td>' +
        '<td>' + e.correo + '</td>' +
        '<td>' + e.whatsapp + '</td>' +
        '<td><span class="badge badge-accent">' + e.rol + '</span></td>' +
        '<td><button type="button" class="btn btn-danger btn-sm" data-idx="' +
          MOCK.empleados.indexOf(e) + '" aria-label="Eliminar ' + e.nombre + '">' +
          iconUse('off', 'icon-sm') + ' Eliminar</button></td>' +
        '</tr>';
    }).join('');

    $$('#tabla-empleados [data-idx]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        MOCK.empleados.splice(parseInt(btn.getAttribute('data-idx'), 10), 1);
        saveData();
        renderEmpleados();
      });
    });
  }

  function initEmpleados() {
    var form = $('#empleado-form');
    if (!form) return;

    var campos = CAMPOS_EMPLEADO;

    /* Resalta o limpia el error de un campo */
    function marcarError(elInput, elErr, msg) {
      var field = elInput.closest('.field');
      field.classList.toggle('is-invalid', Boolean(msg));
      if (msg) {
        elInput.setAttribute('aria-invalid', 'true');
        elErr.textContent = msg;
        elErr.hidden = false;
      } else {
        elInput.removeAttribute('aria-invalid');
        elErr.textContent = '';
        elErr.hidden = true;
      }
    }

    campos.forEach(function (c) {
      $(c.input).addEventListener('input', function () {
        marcarError($(c.input), $(c.err), null);
      });
    });

    renderEmpleados();

    /* Valida cada campo y devuelve el primero con error, si lo hay */
    function validar() {
      var faltantes = [];
      var primerError = null;

      campos.forEach(function (c) {
        var el = $(c.input);
        var val = el.value.trim();
        var msj = null;

        if (!val) {
          faltantes.push(c.label);
          msj = 'Este campo es obligatorio.';
        } else if (c.input === '#emp-cedula' && !/^\d{8,10}$/.test(val)) {
          msj = 'La cédula debe contener solo números (8 a 10 dígitos).';
        } else if (c.input === '#emp-correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          msj = 'Ingresa un correo electrónico válido, por ejemplo nombre@correo.com.';
        } else if (c.input === '#emp-whatsapp' && !/^\+?[0-9\s()-]{7,15}$/.test(val)) {
          msj = 'Ingresa un número de WhatsApp válido.';
        } else if (c.input === '#emp-fecha') {
          var f = new Date(val);
          if (isNaN(f.getTime()) || f > new Date()) {
            msj = 'Ingresa una fecha de nacimiento válida.';
          }
        }

        marcarError(el, $(c.err), msj);
        if (msj && !primerError) primerError = el;
      });

      if (faltantes.length) {
        modal.camposObligatorios(faltantes);
        return false;
      }
      if (primerError) {
        modal.info('Revisa el formulario', 'Corrige los campos marcados en rojo para poder continuar.');
        primerError.focus();
        return false;
      }
      return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validar()) return;

      var nombre = $('#emp-nombres').value.trim();
      var apellido = $('#emp-apellidos').value.trim();

      MOCK.empleados.push({
        nombre: nombre + ' ' + apellido,
        cedula: $('#emp-cedula').value.trim(),
        fecha: $('#emp-fecha').value,
        correo: $('#emp-correo').value.trim(),
        whatsapp: $('#emp-whatsapp').value.trim(),
        rol: currentTheme === 'peluqueria' ? 'Estilista' : 'Barbero',
        tipo: currentTheme
      });
      saveData();

      modal.success('Registro Exitoso', 'El empleado <strong>' + nombre + ' ' + apellido +
        '</strong> ha sido registrado correctamente.').then(function () {
        form.reset();
        campos.forEach(function (c) { marcarError($(c.input), $(c.err), null); });
        renderEmpleados();
      });
    });

    $('#btn-clear-empleado').addEventListener('click', function () {
      form.reset();
      campos.forEach(function (c) { marcarError($(c.input), $(c.err), null); });
    });
  }

/* ----------------------------------------------------------------------
     Campos de formulario - marca o limpia el error
     ---------------------------------------------------------------------- */
  function campoError(input, msg) {
    var field = input.closest('.field');
    var err = field ? field.querySelector('.field-error') : null;

    if (!field) return;

    field.classList.toggle('is-invalid', Boolean(msg));
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }

    if (err) {
      err.textContent = msg || '';
      err.hidden = !msg;
    }
  }

  /* ----------------------------------------------------------------------
     Citas - formulario, validación y conflicto de horario
     ---------------------------------------------------------------------- */
  function initCitas() {
    var form = $('#cita-form');
    if (!form) return;

    var selEmpleado = $('#cita-empleado');
    var selServicio = $('#cita-servicio');
    var durInput = $('#cita-duracion');

    /* Llenar selectores con datos demostrativos */
    if (selEmpleado) {
      selEmpleado.innerHTML = '<option value="">Selecciona un empleado</option>' +
        MOCK.empleados.map(function (e) {
          return '<option value="' + e.nombre + '">' + e.nombre + ' — ' + e.rol + '</option>';
        }).join('');
    }

    var todosServicios = MOCK.serviciosPeluqueria.concat(MOCK.serviciosBarberia);
    if (selServicio) {
      selServicio.innerHTML = '<option value="">Selecciona un servicio</option>' +
        todosServicios.map(function (s) {
          return '<option value="' + s.nombre + '" data-duracion="' + s.duracion + '">' + s.nombre + ' — ' + s.precio + '</option>';
        }).join('');
    }

    if (selServicio) {
      selServicio.addEventListener('change', function () {
        var opt = selServicio.options[selServicio.selectedIndex];
        if (opt && opt.dataset.duracion && durInput) {
          durInput.value = opt.dataset.duracion;
        }
      });
    }

    var requiredInputs = ['#cita-cliente', '#cita-empleado', '#cita-servicio', '#cita-fecha', '#cita-hora', '#cita-estado'];
    requiredInputs.forEach(function (sel) {
      var el = $(sel);
      if (el) el.addEventListener('input', function () { campoError(el, null); });
    });

    function hayConflicto(fecha, hora) {
      return buildCitas().some(function (c) {
        return c.fecha === fecha && c.hora === hora && c.estado.toLowerCase() !== 'cancelada';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        cliente: $('#cita-cliente').value.trim(),
        empleado: $('#cita-empleado').value,
        servicio: $('#cita-servicio').value,
        fecha: $('#cita-fecha').value,
        hora: $('#cita-hora').value,
        notas: $('#cita-notas').value.trim(),
        estado: $('#cita-estado').value
      };

      var etiquetas = {
        cliente: 'Cliente', empleado: 'Empleado', servicio: 'Servicio',
        fecha: 'Fecha', hora: 'Hora', estado: 'Estado'
      };
      var faltantes = [];
      var mapSel = {
        cliente: '#cita-cliente', empleado: '#cita-empleado', servicio: '#cita-servicio',
        fecha: '#cita-fecha', hora: '#cita-hora', estado: '#cita-estado'
      };

      Object.keys(etiquetas).forEach(function (key) {
        var el = $(mapSel[key]);
        if (!data[key]) {
          faltantes.push(etiquetas[key]);
          campoError(el, 'Este campo es obligatorio.');
        }
      });

      if (faltantes.length) {
        modal.camposObligatorios(faltantes);
        return;
      }

      if (hayConflicto(data.fecha, data.hora)) {
        modal.conflictoHorario();
        return;
      }

      modal.success('Cita Registrada', 'La cita para <strong>' + data.cliente + '</strong> ha sido guardada correctamente.').then(function () {
        form.reset();
        if (durInput) durInput.value = '';
        requiredInputs.forEach(function (sel) { campoError($(sel), null); });
      });
    });

    var clearBtn = $('#btn-clear-cita');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        form.reset();
        if (durInput) durInput.value = '';
        requiredInputs.forEach(function (sel) { campoError($(sel), null); });
      });
    }
  }

  /* ----------------------------------------------------------------------
     Servicios — tarjetas según tema + agregar/editar/desactivar
     ---------------------------------------------------------------------- */
  var ICONOS = {
    scissors: 'scissors', sparkles: 'sparkles', palette: 'palette', eye: 'eye',
    brush: 'brush', hand: 'hand', razor: 'razor', drop: 'drop', baby: 'baby'
  };

  function renderServicios() {
    var grid = $('#services-grid');
    if (!grid) return;

    var esPeluqueria = currentTheme === 'peluqueria';
    var lista = esPeluqueria ? MOCK.serviciosPeluqueria : MOCK.serviciosBarberia;
    var contexto = $('#services-context');
    if (contexto) {
      contexto.textContent = 'Mostrando servicios de ' + (esPeluqueria ? 'Peluquería' : 'Barbería') + '.';
    }

    grid.innerHTML = lista.map(function (s) {
      var disabled = s.estado === 'inactivo';
      return '<article class="card service-card' + (disabled ? ' is-disabled' : '') + '" data-id="' + s.id + '">' +
        '<div class="service-top">' +
        '<span class="service-icon" aria-hidden="true">' + iconUse(ICONOS[s.icono] || 'sparkles') + '</span>' +
        '<span class="badge badge-accent">' + s.area + '</span>' +
        '</div>' +
        '<h3 class="service-name">' + s.nombre + '</h3>' +
        '<p class="service-desc">' + s.descripcion + '</p>' +
        '<ul class="service-meta">' +
        '<li>' + iconUse('clock', 'icon-sm') + s.duracion + '</li>' +
        '<li class="service-price">' + s.precio + '</li>' +
        '</ul>' +
        '<div class="service-actions">' +
        '<button type="button" class="btn btn-outline btn-sm" data-action="edit" aria-label="Editar ' + s.nombre + '">' + iconUse('edit', 'icon-sm') + ' Editar</button>' +
        '<button type="button" class="btn btn-danger btn-sm" data-action="toggle" aria-pressed="' + disabled + '">' + iconUse('off', 'icon-sm') + ' ' + (disabled ? 'Activar' : 'Desactivar') + '</button>' +
        '</div>' +
        '</article>';
    }).join('');

    $$('.service-card [data-action]', grid).forEach(function (btn) {
      btn.addEventListener('click', function () { handleServiceAction(btn); });
    });
  }

  function handleServiceAction(btn) {
    var card = btn.closest('.service-card');
    var id = card.getAttribute('data-id');
    var action = btn.getAttribute('data-action');

    if (action === 'edit') {
      editarServicio(id);
    } else if (action === 'toggle') {
      desactivarServicio(btn, card);
    }
  }

  function desactivarServicio(btn, card) {
    var disabled = card.classList.toggle('is-disabled');
    btn.setAttribute('aria-pressed', disabled ? 'true' : 'false');
    btn.innerHTML = iconUse('off', 'icon-sm') + ' ' + (disabled ? 'Activar' : 'Desactivar');
    /* Solo para la maqueta: se marca el estado en memoria */
    var id = card.getAttribute('data-id');
    buscarServicio(id).estado = disabled ? 'inactivo' : 'activo';
    saveData();
  }

  function listaServiciosActiva() {
    return currentTheme === 'peluqueria' ? MOCK.serviciosPeluqueria : MOCK.serviciosBarberia;
  }

  function buscarServicio(id) {
    var lista = MOCK.serviciosPeluqueria.concat(MOCK.serviciosBarberia);
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) return lista[i];
    }
    return null;
  }

  function formularioServicio(s) {
    return '' +
      '<div class="field"><label for="sv-nombre">Nombre</label>' +
      '<input id="sv-nombre" name="nombre" type="text" value="' + (s ? s.nombre : '') + '" placeholder="Nombre del servicio"></div>' +
      '<div class="field"><label for="sv-descripcion">Descripción</label>' +
      '<textarea id="sv-descripcion" name="descripcion" placeholder="Breve descripción del servicio">' + (s ? s.descripcion : '') + '</textarea></div>' +
      '<div class="field"><label for="sv-area">Área</label>' +
      '<select id="sv-area" name="area">' +
      '<option value="Cabello"' + (s && s.area === 'Cabello' ? ' selected' : '') + '>Cabello</option>' +
      '<option value="Barba"' + (s && s.area === 'Barba' ? ' selected' : '') + '>Barba</option>' +
      '<option value="Color"' + (s && s.area === 'Color' ? ' selected' : '') + '>Color</option>' +
      '<option value="Rostro"' + (s && s.area === 'Rostro' ? ' selected' : '') + '>Rostro</option>' +
      '<option value="Uñas"' + (s && s.area === 'Uñas' ? ' selected' : '') + '>Uñas</option>' +
      '</select></div>' +
      '<div class="field"><label for="sv-duracion">Duración</label>' +
      '<input id="sv-duracion" name="duracion" type="text" value="' + (s ? s.duracion : '') + '" placeholder="Ej: 45 min"></div>' +
      '<div class="field"><label for="sv-precio">Precio</label>' +
      '<input id="sv-precio" name="precio" type="text" value="' + (s ? s.precio : '') + '" placeholder="Ej: $35.000"></div>';
  }

  function marcarCampoModal(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return;
    var field = el.closest('.field');
    field.classList.add('is-invalid');
    if (!field.querySelector('.field-error')) {
      var p = document.createElement('p');
      p.className = 'field-error';
      p.textContent = 'Este campo es obligatorio.';
      field.appendChild(p);
    }
    el.focus();
  }

  function editarServicio(id) {
    var s = buscarServicio(id);
    if (!s) return;

    openModal({
      title: 'Editar servicio',
      message: 'Actualiza la información del servicio.',
      icon: 'edit',
      formHtml: formularioServicio(s),
      buttons: [
        { label: 'Cancelar', variant: 'ghost', id: 'cancel' },
        { label: 'Guardar cambios', variant: 'primary', id: 'save', onClick: function (data, form) {
          var faltantes = [];
          if (!data.nombre) faltantes.push('nombre');
          if (!data.descripcion) faltantes.push('descripcion');
          if (!data.duracion) faltantes.push('duracion');
          if (!data.precio) faltantes.push('precio');
          if (faltantes.length) {
            faltantes.forEach(function (name) { marcarCampoModal(form, name); });
            return false;
          }
          s.nombre = data.nombre;
          s.descripcion = data.descripcion;
          s.area = data.area;
          s.duracion = data.duracion;
          s.precio = data.precio;
          return true;
        } }
      ]
    }).then(function (idBtn) {
      if (idBtn === 'save') {
        modal.success('Servicio Actualizado', 'El servicio <strong>' + s.nombre + '</strong> se ha actualizado correctamente.');
        saveData();
        renderServicios();
      }
    });
  }

  function initServicios() {
    var addBtn = $('#btn-add-servicio');
    if (!addBtn) return;

    addBtn.addEventListener('click', function () {
      var esPeluqueria = currentTheme === 'peluqueria';
      var lista = listaServiciosActiva();
      var pref = esPeluqueria ? 'p' : 'b';

      openModal({
        title: 'Agregar Servicio',
        message: 'Completa la información del nuevo servicio.',
        icon: 'plus',
        formHtml: formularioServicio(null),
        buttons: [
          { label: 'Cancelar', variant: 'ghost', id: 'cancel' },
          { label: 'Guardar Servicio', variant: 'primary', id: 'save', onClick: function (data, form) {
            var faltantes = [];
            if (!data.nombre) faltantes.push('nombre');
            if (!data.descripcion) faltantes.push('descripcion');
            if (!data.duracion) faltantes.push('duracion');
            if (!data.precio) faltantes.push('precio');
            if (faltantes.length) {
              faltantes.forEach(function (name) { marcarCampoModal(form, name); });
              return false;
            }
            lista.push({
              id: pref + '-' + Date.now(),
              nombre: data.nombre,
              descripcion: data.descripcion,
              area: data.area,
              duracion: data.duracion,
              precio: data.precio,
              icono: esPeluqueria ? 'sparkles' : 'scissors',
              estado: 'activo'
            });
            return true;
          } }
        ]
      }).then(function (idBtn) {
        if (idBtn === 'save') {
          modal.success('Servicio Agregado', 'El servicio se ha agregado correctamente.');
          saveData();
          renderServicios();
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Ganancias — filtros, resumen, gráficos y tabla
     ---------------------------------------------------------------------- */
  function renderGanancias() {
    /* Gráfico: ganancias por día */
    var chart = $('#chart-ganancias-dia');
    if (chart) {
      renderBarChart(chart,
        ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        [0, 0, 0, 0, 0, 0, 0]);
    }

    /* Gráfico: ganancias por categoría */
    var donut = $('#donut-categorias');
    var legend = $('#legend-categorias');
    if (donut) {
      renderDonut(donut, legend, [
        { label: 'Cabello', value: 0, color: 'var(--accent)' },
        { label: 'Barba', value: 0, color: 'var(--ok)' },
        { label: 'Uñas', value: 0, color: 'var(--warn)' },
        { label: 'Color', value: 0, color: 'var(--danger)' }
      ]);
    }

    /* Tabla de últimas ganancias */
    var tbody = $('#tabla-ganancias tbody');
    if (tbody) {
      if (MOCK.ganancias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No hay ganancias registradas en este periodo.</td></tr>';
      } else {
        tbody.innerHTML = MOCK.ganancias.map(function (g) {
          return '<tr>' +
            '<td class="td-strong">' + new Date(g.fecha + 'T00:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }) + '</td>' +
            '<td>' + g.servicio + '</td>' +
            '<td>' + g.cliente + '</td>' +
            '<td>' + g.empleado + '</td>' +
            '<td class="td-amount">' + fmtMoney(g.monto) + '</td>' +
            '</tr>';
        }).join('');
      }
    }

    /* Filtros: fechas por defecto (últimos 30 días) */
    var desde = $('#fecha-desde');
    var hasta = $('#fecha-hasta');
    if (desde) desde.value = toDateStr(addDays(new Date(), -30));
    if (hasta) hasta.value = toDateStr(new Date());
  }

  function initGanancias() {
    var btnFiltrar = $('#btn-filtrar');
    if (btnFiltrar) {
      btnFiltrar.addEventListener('click', function () {
        var desde = $('#fecha-desde').value;
        var hasta = $('#fecha-hasta').value;

        if (desde && hasta && desde > hasta) {
          modal.info('Rango de fechas inválido', 'La fecha de inicio debe ser anterior o igual a la fecha final.');
          return;
        }
        modal.success('Filtro aplicado', 'Los reportes se actualizaron según el periodo seleccionado.');
      });
    }

    var verTodas = $('#btn-ver-todas');
    if (verTodas) {
      verTodas.addEventListener('click', function () {
        modal.info('Todas las ganancias', 'El reporte completo de ganancias se integrará con el backend y la base de datos.');
      });
    }
  }

  /* ----------------------------------------------------------------------
     Perfil
     ---------------------------------------------------------------------- */
  function initPerfil() {
    var form = $('#perfil-form');
    if (!form) return;

    var u = MOCK.usuarioActual;

    function cargarPerfil() {
      var partes = u.nombre.split(' ');
      $('#perfil-nombres').value = partes[0] || '';
      $('#perfil-apellidos').value = partes.slice(1).join(' ') || '';
      $('#perfil-correo').value = 'carlos@hellobaby.com';
      $('#perfil-rol').value = u.rol;
      $('#perfil-contacto').value = '+57 300 123 4567';
    }

    cargarPerfil();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var correo = $('#perfil-correo').value.trim();
      var actual = $('#perfil-pass-actual').value;
      var nueva = $('#perfil-pass-nueva').value;
      var confirma = $('#perfil-pass-confirma').value;

      var ok = true;
      if (!correo) { campoError($('#perfil-correo'), 'Este campo es obligatorio.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { campoError($('#perfil-correo'), 'Ingresa un correo electrónico válido.'); ok = false; }

      if (nueva || actual || confirma) {
        if (!actual) { campoError($('#perfil-pass-actual'), 'Ingresa tu contraseña actual.'); ok = false; }
        if (nueva.length < 6) { campoError($('#perfil-pass-nueva'), 'La contraseña debe tener al menos 6 caracteres.'); ok = false; }
        if (nueva !== confirma) { campoError($('#perfil-pass-confirma'), 'Las contraseñas no coinciden.'); ok = false; }
      }

      if (!ok) return;
      var nombres = $('#perfil-nombres').value.trim();
      var apellidos = $('#perfil-apellidos').value.trim();
      u.nombre = (nombres + ' ' + apellidos).trim();
      var partes = u.nombre.split(' ');
      u.iniciales = partes.map(function (p) { return p.charAt(0); }).join('').toUpperCase().slice(0, 2);
      saveData();
      modal.success('Cambios Guardados', 'Tu perfil se ha actualizado correctamente.').then(function () {
        applyUser();
      });
    });
  }

  /* ----------------------------------------------------------------------
     Inicialización por página
     ---------------------------------------------------------------------- */
  function init() {
    applyUser();
    renderServicios();

    if (page === 'dashboard') renderDashboard();
    if (page === 'login') initLogin();
    if (page === 'empleados') initEmpleados();
    if (page === 'citas') initCitas();
    if (page === 'servicios') initServicios();
    if (page === 'ganancias') {
      initGanancias();
      renderGanancias();
    }
    if (page === 'perfil') initPerfil();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
