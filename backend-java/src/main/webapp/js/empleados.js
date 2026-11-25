/*
 * Hello Baby — JS de la versión integrada (empleados.jsp)
 * Reutiliza el diseño y las validaciones de js/app.js, pero NO usa
 * localStorage para empleados: los datos vienen de MySQL por el Servlet.
 */
(function () {
  'use strict';

  var THEME_KEY = 'hello-baby-theme';
  var ROLES_POR_TEMA = { peluqueria: 'Estilista', barberia: 'Barbero' };

  function $(selector) { return document.querySelector(selector); }
  function $$(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  /* ------------------------------------------------------------------ *
   * Modal (mismas clases CSS del prototipo original)
   * ------------------------------------------------------------------ */
  function openModal(opciones) {
    var resolver;
    var promesa = new Promise(function (resolve) { resolver = resolve; });

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'hb-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'hb-modal-title');

    var icono = opciones.icon || 'info';
    var iconosValidos = { check: true, alert: true, danger: true, info: true };
    if (!iconosValidos[icono]) { icono = 'info'; }

    modal.innerHTML =
      '<div class="modal-card" role="document">' +
        '<div class="modal-icon ' + (icono === 'danger' ? 'icon-danger' : '') + '">' +
          '<svg class="icon icon-lg" aria-hidden="true"><use href="#i-' + icono + '"/></svg>' +
        '</div>' +
        '<h3 class="modal-title" id="hb-modal-title"></h3>' +
        '<p class="modal-msg"></p>' +
        '<div class="modal-actions"></div>' +
      '</div>';

    modal.querySelector('.modal-title').textContent = opciones.title || '';
    modal.querySelector('.modal-msg').innerHTML = opciones.message || '';

    var contenedorBotones = modal.querySelector('.modal-actions');
    var botones = opciones.buttons || [
      { label: 'Aceptar', id: 'ok', variant: 'primary' }
    ];

    function cerrar(valor) {
      document.removeEventListener('keydown', alPresionarTecla);
      if (modal.parentNode) { modal.parentNode.removeChild(modal); }
      document.body.classList.remove('no-scroll');
      resolver(valor);
    }

    function alPresionarTecla(evento) {
      if (evento.key === 'Escape' && opciones.dismissable !== false) {
        cerrar('close');
      }
    }

    botones.forEach(function (definicion) {
      var boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'btn btn-' + (definicion.variant || 'primary');
      boton.setAttribute('data-bid', definicion.id || 'ok');
      boton.textContent = definicion.label || 'Aceptar';
      boton.addEventListener('click', function () {
        cerrar(definicion.id || 'ok');
      });
      contenedorBotones.appendChild(boton);
    });

    modal.addEventListener('click', function (evento) {
      if (evento.target === modal && opciones.dismissable !== false) {
        cerrar('close');
      }
    });

    document.addEventListener('keydown', alPresionarTecla);
    document.body.classList.add('no-scroll');
    document.body.appendChild(modal);

    var primerBoton = contenedorBotones.querySelector('button');
    if (primerBoton) { primerBoton.focus(); }

    return promesa;
  }

  var modal = {
    success: function (titulo, mensaje) {
      return openModal({
        icon: 'check',
        title: titulo,
        message: mensaje,
        buttons: [{ label: 'Aceptar', id: 'ok', variant: 'primary' }]
      });
    },
    info: function (titulo, mensaje) {
      return openModal({
        icon: 'info',
        title: titulo,
        message: mensaje,
        buttons: [{ label: 'Cerrar', id: 'close', variant: 'primary' }]
      });
    },
    error: function (titulo, mensaje) {
      return openModal({
        icon: 'alert',
        title: titulo,
        message: mensaje,
        buttons: [{ label: 'Entendido', id: 'ok', variant: 'primary' }]
      });
    },
    camposObligatorios: function (campos) {
      var lista = campos.length === 1 ? campos[0] : campos.join(', ');
      return openModal({
        icon: 'alert',
        title: 'Campos Obligatorios',
        message: 'Por favor completa los siguientes campos obligatorios: <strong>' +
                 lista + '</strong>.',
        buttons: [{ label: 'Entendido', id: 'ok', variant: 'primary' }]
      });
    },
    revisarFormulario: function () {
      return openModal({
        icon: 'info',
        title: 'Revisa el formulario',
        message: 'Corrige los campos marcados en rojo para poder continuar.',
        buttons: [{ label: 'Cerrar', id: 'close', variant: 'primary' }]
      });
    },
    confirmarEliminacion: function (nombre) {
      return openModal({
        icon: 'danger',
        title: 'Confirmar eliminación',
        message: '¿Deseas dar de baja al empleado <strong>' + nombre +
                 '</strong>? Quedará marcado como Inactivo y conservará sus citas en MySQL.',
        buttons: [
          { label: 'Cancelar', id: 'cancelar', variant: 'outline' },
          { label: 'Dar de baja', id: 'eliminar', variant: 'danger' }
        ]
      });
    }
  };

  /* ------------------------------------------------------------------ *
   * Tema visual (idéntico al prototipo: hello-baby-theme)
   * ------------------------------------------------------------------ */
  var temaActual = 'peluqueria';
  try {
    temaActual = localStorage.getItem(THEME_KEY) || 'peluqueria';
  } catch (error) {
    temaActual = 'peluqueria';
  }
  if (temaActual !== 'barberia') { temaActual = 'peluqueria'; }

  function aplicarTema(tema) {
    temaActual = tema === 'barberia' ? 'barberia' : 'peluqueria';
    document.documentElement.setAttribute('data-theme', temaActual);

    $$('[data-theme-btn]').forEach(function (boton) {
      var activo = boton.getAttribute('data-theme-btn') === temaActual;
      boton.classList.toggle('active', activo);
      boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    var rol = $('#emp-rol');
    var tipo = $('#emp-tipo');
    if (rol) { rol.value = ROLES_POR_TEMA[temaActual]; }
    if (tipo) { tipo.value = temaActual; }
  }

  function cambiarTema(tema, guardar) {
    aplicarTema(tema);
    if (guardar) {
      try { localStorage.setItem(THEME_KEY, temaActual); } catch (error) { /* sin almacenamiento */ }
    }
  }

  cambiarTema(temaActual, false);

  $$('[data-theme-btn]').forEach(function (boton) {
    boton.addEventListener('click', function () {
      cambiarTema(boton.getAttribute('data-theme-btn'), true);
    });
  });

  /* ------------------------------------------------------------------ *
   * Menú lateral responsive (idéntico al prototipo)
   * ------------------------------------------------------------------ */
  function inicializarMenu() {
    var boton = $('#menu-btn');
    var overlay = $('.sidebar-overlay');

    function cerrar() {
      document.body.classList.remove('sidebar-open');
      if (boton) {
        boton.setAttribute('aria-expanded', 'false');
        boton.setAttribute('aria-label', 'Abrir menú');
      }
    }

    if (boton) {
      boton.addEventListener('click', function () {
        var abierto = document.body.classList.toggle('sidebar-open');
        boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      });
    }

    if (overlay) { overlay.addEventListener('click', cerrar); }

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') { cerrar(); }
    });

    $$('.nav-link').forEach(function (enlace) {
      enlace.addEventListener('click', cerrar);
    });
  }

  /* ------------------------------------------------------------------ *
   * Validaciones originales del formulario de empleados
   * ------------------------------------------------------------------ */
  var CAMPOS = [
    { input: '#emp-nombres', error: '#err-nombres', etiqueta: 'Nombres' },
    { input: '#emp-apellidos', error: '#err-apellidos', etiqueta: 'Apellidos' },
    { input: '#emp-cedula', error: '#err-cedula', etiqueta: 'Cédula de ciudadanía' },
    { input: '#emp-fecha', error: '#err-fecha', etiqueta: 'Fecha de nacimiento' },
    { input: '#emp-correo', error: '#err-correo', etiqueta: 'Correo electrónico' },
    { input: '#emp-whatsapp', error: '#err-whatsapp', etiqueta: 'Contacto WhatsApp' }
  ];

  function marcarError(input, elementoError, mensaje) {
    var campo = input.closest('.field');
    if (campo) { campo.classList.toggle('is-invalid', Boolean(mensaje)); }

    if (mensaje) {
      input.setAttribute('aria-invalid', 'true');
      elementoError.textContent = mensaje;
      elementoError.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      elementoError.textContent = '';
      elementoError.hidden = true;
    }
  }

  function validarFormulario() {
    var faltantes = [];
    var primerError = null;

    CAMPOS.forEach(function (configuracion) {
      var input = $(configuracion.input);
      var elementoError = $(configuracion.error);
      if (!input || !elementoError) { return; }

      var valor = input.value.trim();
      var mensaje = '';

      if (!valor) {
        mensaje = 'Este campo es obligatorio.';
        faltantes.push(configuracion.etiqueta);
      } else if (configuracion.input === '#emp-cedula' && !/^\d{8,10}$/.test(valor)) {
        mensaje = 'La cédula debe contener solo números (8 a 10 dígitos).';
      } else if (configuracion.input === '#emp-correo' &&
                 !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        mensaje = 'Ingresa un correo electrónico válido, por ejemplo nombre@correo.com.';
      } else if (configuracion.input === '#emp-whatsapp' &&
                 !/^\+?[0-9\s()-]{7,15}$/.test(valor)) {
        mensaje = 'Ingresa un número de WhatsApp válido.';
      } else if (configuracion.input === '#emp-fecha') {
        var fecha = new Date(valor);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
          mensaje = 'Ingresa una fecha de nacimiento válida.';
        }
      }

      marcarError(input, elementoError, mensaje);
      if (mensaje && !primerError) { primerError = input; }
    });

    if (faltantes.length > 0) {
      modal.camposObligatorios(faltantes);
      return false;
    }

    if (primerError) {
      modal.revisarFormulario();
      primerError.focus();
      return false;
    }

    return true;
  }

  CAMPOS.forEach(function (configuracion) {
    var input = $(configuracion.input);
    var elementoError = $(configuracion.error);
    if (input && elementoError) {
      input.addEventListener('input', function () {
        marcarError(input, elementoError, '');
      });
    }
  });

  /* ------------------------------------------------------------------ *
   * Formulario: alta, edición y borrado reales contra el Servlet
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    inicializarMenu();

    var form = $('#empleado-form');
    var fecha = $('#emp-fecha');
    if (fecha) {
      var hoy = new Date();
      var mes = String(hoy.getMonth() + 1).padStart(2, '0');
      var dia = String(hoy.getDate()).padStart(2, '0');
      fecha.max = hoy.getFullYear() + '-' + mes + '-' + dia;
    }

    if (form) {
      form.addEventListener('submit', function (evento) {
        if (!validarFormulario()) {
          evento.preventDefault();
          return;
        }

        var id = $('#emp-id');
        $('#emp-accion').value = (id && id.value !== '0') ? 'actualizar' : 'crear';
        aplicarTema(temaActual);
      });
    }

    var limpiar = $('#btn-clear-empleado');
    if (limpiar && form) {
      limpiar.addEventListener('click', function () {
        form.reset();
        var id = $('#emp-id');
        var accion = $('#emp-accion');
        var activo = $('#emp-activo');
        var textoBoton = $('#btn-guardar-texto');
        if (id) { id.value = '0'; }
        if (accion) { accion.value = 'crear'; }
        if (activo) { activo.value = 'true'; }
        if (textoBoton) { textoBoton.textContent = 'Guardar Empleado'; }
        CAMPOS.forEach(function (configuracion) {
          var input = $(configuracion.input);
          var elementoError = $(configuracion.error);
          if (input && elementoError) { marcarError(input, elementoError, ''); }
        });
        aplicarTema(temaActual);
      });
    }

    $$('[data-editar]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var fila = boton.closest('tr');
        if (!fila || !form) { return; }

        $('#emp-id').value = fila.getAttribute('data-id');
        $('#emp-accion').value = 'actualizar';
        $('#emp-activo').value = fila.getAttribute('data-activo');
        $('#emp-nombres').value = fila.getAttribute('data-nombres') || '';
        $('#emp-apellidos').value = fila.getAttribute('data-apellidos') || '';
        $('#emp-cedula').value = fila.getAttribute('data-cedula') || '';
        $('#emp-fecha').value = fila.getAttribute('data-fecha') || '';
        $('#emp-correo').value = fila.getAttribute('data-correo') || '';
        $('#emp-whatsapp').value = fila.getAttribute('data-whatsapp') || '';

        cambiarTema(fila.getAttribute('data-tipo') === 'barberia'
          ? 'barberia' : 'peluqueria', true);

        CAMPOS.forEach(function (configuracion) {
          var input = $(configuracion.input);
          var elementoError = $(configuracion.error);
          if (input && elementoError) { marcarError(input, elementoError, ''); }
        });

        var textoBoton = $('#btn-guardar-texto');
        if (textoBoton) { textoBoton.textContent = 'Actualizar Empleado'; }
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    $$('[data-eliminar]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var fila = boton.closest('tr');
        if (!fila) { return; }
        var nombre = (fila.getAttribute('data-nombres') || '') + ' ' +
                     (fila.getAttribute('data-apellidos') || '');

        modal.confirmarEliminacion(nombre).then(function (respuesta) {
          if (respuesta !== 'eliminar') { return; }
          $('#eliminar-id').value = fila.getAttribute('data-id');
          $('#form-eliminar').submit();
        });
      });
    });

    var buscador = $('#emp-buscar');
    if (buscador) {
      buscador.addEventListener('input', function () {
        var texto = buscador.value.trim().toLowerCase();
        var visibles = 0;
        $$('#tabla-empleados tbody tr[data-search]').forEach(function (fila) {
          var coincide = fila.getAttribute('data-search').indexOf(texto) !== -1;
          fila.style.display = coincide ? '' : 'none';
          if (coincide) { visibles++; }
        });
        var contador = $('#emp-count');
        var vacio = $('#emp-empty');
        if (contador) { contador.textContent = String(visibles); }
        if (vacio) { vacio.style.display = visibles === 0 ? 'block' : 'none'; }
      });
    }

    var aviso = $('#hb-mensaje');
    if (aviso && aviso.getAttribute('data-mensaje')) {
      var tipo = aviso.getAttribute('data-tipo');
      var titulo = aviso.getAttribute('data-titulo');
      var mensaje = aviso.getAttribute('data-mensaje');
      if (tipo === 'error') {
        modal.error(titulo, mensaje);
      } else {
        modal.success(titulo, mensaje);
      }
    }
  });
})();
