// Variables globales
let simuladorData = {
    energia: {},
    instalacion: {},
    contacto: {}
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSimulador();
    initContactForm();
    initScrollAnimations();
});

// Navegación
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll suave para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Simulador
function initSimulador() {
    const modal = document.getElementById('simulador-modal');
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleSimulador();
        }
    });

    // Prevenir propagación del click dentro del modal
    document.querySelector('.simulador-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Inicializar formulario de contacto del simulador
    const formContacto = document.getElementById('form-contacto-simulador');
    formContacto.addEventListener('submit', handleSimuladorSubmit);
}

function toggleSimulador() {
    const modal = document.getElementById('simulador-modal');
    modal.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
        // Reset simulador
        resetSimulador();
    }
}

function switchTab(tabName) {
    // Remover clase active de todos los tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Activar tab seleccionado
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // Ocultar formulario de contacto
    document.getElementById('contacto-simulador').style.display = 'none';
}

function calcularEnergia() {
    const consumo = parseFloat(document.getElementById('consumo').value);
    const tipoVivienda = document.getElementById('tipo-vivienda').value;
    const orientacion = document.getElementById('orientacion').value;

    if (!consumo || !tipoVivienda || !orientacion) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Factores de cálculo
    const factorVivienda = {
        'unifamiliar': 1.0,
        'apartamento': 0.8,
        'comercial': 1.3
    };

    const factorOrientacion = {
        'sur': 1.0,
        'sureste': 0.95,
        'suroeste': 0.95,
        'este': 0.85,
        'oeste': 0.85
    };

    // Cálculos
    const consumoAnual = consumo * 12;
    const potenciaNecesaria = (consumoAnual / 1200) * factorVivienda[tipoVivienda];
    const potenciaReal = potenciaNecesaria / factorOrientacion[orientacion];
    const numeroPanel = Math.ceil(potenciaReal / 0.4); // Paneles de 400W
    const superficieNecesaria = numeroPanel * 2; // 2m² por panel
    const produccionAnual = potenciaReal * 1200 * factorOrientacion[orientacion];
    const ahorroAnual = (produccionAnual * 0.25).toFixed(0); // 0.25€/kWh
    const costoInstalacion = (potenciaReal * 1200).toFixed(0);
    const amortizacion = Math.ceil(costoInstalacion / ahorroAnual);

    // Guardar datos
    simuladorData.energia = {
        consumoMensual: consumo,
        consumoAnual: consumoAnual,
        potenciaNecesaria: potenciaReal.toFixed(1),
        numeroPanel: numeroPanel,
        superficieNecesaria: superficieNecesaria,
        produccionAnual: produccionAnual.toFixed(0),
        ahorroAnual: ahorroAnual,
        costoInstalacion: costoInstalacion,
        amortizacion: amortizacion,
        tipoVivienda: tipoVivienda,
        orientacion: orientacion
    };

    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado-energia');
    resultadoDiv.innerHTML = `
        <h4>Resultados de tu Simulación</h4>
        <div class="resultado-item">
            <span>Potencia recomendada:</span>
            <span><strong>${potenciaReal.toFixed(1)} kWp</strong></span>
        </div>
        <div class="resultado-item">
            <span>Número de paneles:</span>
            <span><strong>${numeroPanel} paneles</strong></span>
        </div>
        <div class="resultado-item">
            <span>Superficie necesaria:</span>
            <span><strong>${superficieNecesaria} m²</strong></span>
        </div>
        <div class="resultado-item">
            <span>Producción anual:</span>
            <span><strong>${produccionAnual.toFixed(0)} kWh</strong></span>
        </div>
        <div class="resultado-item">
            <span>Ahorro anual estimado:</span>
            <span><strong>${ahorroAnual}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Inversión estimada:</span>
            <span><strong>${costoInstalacion}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Periodo de amortización:</span>
            <span><strong>${amortizacion} años</strong></span>
        </div>
    `;
    
    resultadoDiv.classList.add('show');
    
    // Mostrar formulario de contacto
    setTimeout(() => {
        document.getElementById('contacto-simulador').style.display = 'block';
        document.getElementById('contacto-simulador').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function calcularInstalacion() {
    const potencia = parseFloat(document.getElementById('potencia').value);
    const tipoInstalacion = document.getElementById('tipo-instalacion').value;
    const superficie = parseFloat(document.getElementById('superficie').value);

    if (!potencia || !tipoInstalacion || !superficie) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Verificar si la superficie es suficiente
    const superficieNecesaria = potencia * 5; // 5m² por kWp aproximadamente
    if (superficie < superficieNecesaria) {
        alert(`La superficie disponible es insuficiente. Necesitas al menos ${superficieNecesaria.toFixed(0)} m² para ${potencia} kWp`);
        return;
    }

    // Factores de precio por tipo
    const precioBase = {
        'basica': 1000,
        'premium': 1300,
        'bateria': 1800
    };

    // Cálculos
    const numeroPanel = Math.ceil(potencia / 0.4); // Paneles de 400W
    const costoInstalacion = (potencia * precioBase[tipoInstalacion]).toFixed(0);
    const produccionAnual = potencia * 1200;
    const ahorroAnual = (produccionAnual * 0.25).toFixed(0);
    const amortizacion = Math.ceil(costoInstalacion / ahorroAnual);
    const subvencion = Math.min(potencia * 600, 1500 * potencia).toFixed(0); // Subvención estimada
    const costoFinal = (costoInstalacion - subvencion).toFixed(0);

    // Características por tipo
    const caracteristicas = {
        'basica': 'Instalación estándar con garantía de 10 años',
        'premium': 'Instalación premium con monitorización y garantía extendida',
        'bateria': 'Instalación con sistema de almacenamiento en baterías'
    };

    // Guardar datos
    simuladorData.instalacion = {
        potencia: potencia,
        tipoInstalacion: tipoInstalacion,
        superficie: superficie,
        numeroPanel: numeroPanel,
        costoInstalacion: costoInstalacion,
        produccionAnual: produccionAnual.toFixed(0),
        ahorroAnual: ahorroAnual,
        amortizacion: amortizacion,
        subvencion: subvencion,
        costoFinal: costoFinal,
        caracteristicas: caracteristicas[tipoInstalacion]
    };

    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado-instalacion');
    resultadoDiv.innerHTML = `
        <h4>Presupuesto de Instalación</h4>
        <div class="resultado-item">
            <span>Tipo de instalación:</span>
            <span><strong>${tipoInstalacion.charAt(0).toUpperCase() + tipoInstalacion.slice(1)}</strong></span>
        </div>
        <div class="resultado-item">
            <span>Número de paneles:</span>
            <span><strong>${numeroPanel} paneles</strong></span>
        </div>
        <div class="resultado-item">
            <span>Producción anual:</span>
            <span><strong>${produccionAnual.toFixed(0)} kWh</strong></span>
        </div>
        <div class="resultado-item">
            <span>Ahorro anual:</span>
            <span><strong>${ahorroAnual}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Precio sin subvenciones:</span>
            <span><strong>${costoInstalacion}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Subvención estimada:</span>
            <span><strong>-${subvencion}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Precio final estimado:</span>
            <span><strong>${costoFinal}€</strong></span>
        </div>
        <div class="resultado-item">
            <span>Amortización:</span>
            <span><strong>${amortizacion} años</strong></span>
        </div>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
            <strong>Incluye:</strong> ${caracteristicas[tipoInstalacion]}
        </p>
    `;
    
    resultadoDiv.classList.add('show');
    
    // Mostrar formulario de contacto
    setTimeout(() => {
        document.getElementById('contacto-simulador').style.display = 'block';
        document.getElementById('contacto-simulador').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function handleSimuladorSubmit(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre-sim').value;
    const telefono = document.getElementById('telefono-sim').value;
    const email = document.getElementById('email-sim').value;
    const mensaje = document.getElementById('mensaje-sim').value;

    // Guardar datos de contacto
    simuladorData.contacto = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        mensaje: mensaje
    };

    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Soy ${nombre} y estoy interesado en una instalación fotovoltaica.\n\n`;
    
    // Agregar datos del simulador de energía si existe
    if (Object.keys(simuladorData.energia).length > 0) {
        whatsappMessage += `📊 *SIMULACIÓN DE ENERGÍA:*\n`;
        whatsappMessage += `• Consumo mensual: ${simuladorData.energia.consumoMensual} kWh\n`;
        whatsappMessage += `• Tipo de vivienda: ${simuladorData.energia.tipoVivienda}\n`;
        whatsappMessage += `• Orientación: ${simuladorData.energia.orientacion}\n`;
        whatsappMessage += `• Potencia recomendada: ${simuladorData.energia.potenciaNecesaria} kWp\n`;
        whatsappMessage += `• Ahorro anual estimado: ${simuladorData.energia.ahorroAnual}€\n`;
        whatsappMessage += `• Inversión estimada: ${simuladorData.energia.costoInstalacion}€\n\n`;
    }

    // Agregar datos del simulador de instalación si existe
    if (Object.keys(simuladorData.instalacion).length > 0) {
        whatsappMessage += `🔧 *PRESUPUESTO DE INSTALACIÓN:*\n`;
        whatsappMessage += `• Potencia: ${simuladorData.instalacion.potencia} kWp\n`;
        whatsappMessage += `• Tipo: ${simuladorData.instalacion.tipoInstalacion}\n`;
        whatsappMessage += `• Superficie disponible: ${simuladorData.instalacion.superficie} m²\n`;
        whatsappMessage += `• Precio final estimado: ${simuladorData.instalacion.costoFinal}€\n`;
        whatsappMessage += `• Amortización: ${simuladorData.instalacion.amortizacion} años\n\n`;
    }

    whatsappMessage += `📞 *DATOS DE CONTACTO:*\n`;
    whatsappMessage += `• Teléfono: ${telefono}\n`;
    whatsappMessage += `• Email: ${email}\n`;
    
    if (mensaje) {
        whatsappMessage += `• Mensaje: ${mensaje}\n`;
    }

    whatsappMessage += `\n¿Podrían enviarme un presupuesto personalizado? ¡Gracias!`;

    // Número de teléfono de la empresa (cambiar por el número real)
    const phoneNumber = '34900123456'; // Cambiar por tu número de WhatsApp
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Cerrar simulador
    toggleSimulador();
    
    // Mostrar mensaje de confirmación
    showNotification('¡Perfecto! Te estamos redirigiendo a WhatsApp con tu presupuesto.');
}

function resetSimulador() {
    // Limpiar formularios
    document.getElementById('form-energia').reset();
    document.getElementById('form-instalacion').reset();
    document.getElementById('form-contacto-simulador').reset();
    
    // Ocultar resultados
    document.querySelectorAll('.resultado-simulacion').forEach(div => {
        div.classList.remove('show');
    });
    
    // Ocultar formulario de contacto
    document.getElementById('contacto-simulador').style.display = 'none';
    
    // Activar primera tab
    switchTab('energia');
    
    // Limpiar datos
    simuladorData = { energia: {}, instalacion: {}, contacto: {} };
}

// Formulario de contacto principal
function initContactForm() {
    const contactForm = document.querySelector('.contacto-form form');
    contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const telefono = formData.get('telefono') || e.target.querySelector('input[type="tel"]').value;
    const mensaje = formData.get('mensaje') || e.target.querySelector('textarea').value;

    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Soy ${nombre} y me gustaría obtener más información sobre sus servicios de energía solar.\n\n`;
    whatsappMessage += `📞 *DATOS DE CONTACTO:*\n`;
    whatsappMessage += `• Teléfono: ${telefono}\n`;
    whatsappMessage += `• Email: ${email}\n\n`;
    whatsappMessage += `💬 *MENSAJE:*\n${mensaje}\n\n`;
    whatsappMessage += `¡Espero su respuesta! Gracias.`;

    // Número de teléfono de la empresa
    const phoneNumber = '34900123456'; // Cambiar por tu número de WhatsApp
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpiar formulario
    e.target.reset();
    
    // Mostrar mensaje de confirmación
    showNotification('¡Mensaje enviado! Te estamos redirigiendo a WhatsApp.');
}

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que deben animarse
    const animateElements = document.querySelectorAll('.servicio-card, .beneficio-item, .proyecto-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        font-weight: 600;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar notificación después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Funciones adicionales para mejorar la experiencia
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Lazy loading para mejorar el rendimiento
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading cuando se carga la página
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    // Cerrar menú móvil si está abierto al cambiar a desktop
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
});

// Prevenir zoom en iOS en inputs
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

// Mejorar la accesibilidad
document.addEventListener('keydown', (e) => {
    // Cerrar modal con Escape
    if (e.key === 'Escape') {
        const modal = document.getElementById('simulador-modal');
        if (modal.classList.contains('active')) {
            toggleSimulador();
        }
    }
});

// Función para validar formularios
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b35';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    return isValid;
}

// Función para formatear números
function formatNumber(num) {
    return new Intl.NumberFormat('es-ES').format(num);
}

// Función para detectar dispositivos móviles
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimización para dispositivos móviles
if (isMobile()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}