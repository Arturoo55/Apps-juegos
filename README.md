# Voltia Energy - Página Web Corporativa

Una página web moderna y responsiva para empresas de instalaciones fotovoltaicas y baterías para vehículos eléctricos.

## 🌟 Características

- **Diseño Ultra Premium**: Elegante, profesional y que inspira confianza desde el primer vistazo
- **Simulador Inteligente**: Calculadora avanzada que redirige a presupuesto personalizado por WhatsApp
- **Logo Interactivo**: Efectos brillantes y juego secreto con partículas animadas
- **Sistema Solar Animado**: Visualización 3D interactiva en el hero section
- **Sección "Quiénes Somos"**: Discurso profesional con misión, visión y certificaciones
- **Integración WhatsApp Premium**: Mensajes estructurados con emojis y formato profesional
- **Animaciones Cinematográficas**: Efectos visuales de alta calidad con partículas y brillos
- **Diseño Responsivo**: Perfecta adaptación a todos los dispositivos
- **Easter Eggs**: Funciones ocultas para engagement del usuario

## 📁 Estructura del Proyecto

```
voltia-energy/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript funcional
└── README.md           # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo! La página estará funcionando

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

## ⚙️ Personalización

### 1. Información de la Empresa

Edita el archivo `index.html` y modifica:

- **Nombre de la empresa**: Busca "Voltia Energy" y reemplaza
- **Información de contacto**: Actualiza teléfono, email y dirección
- **Redes sociales**: Modifica los enlaces en el footer

### 2. Número de WhatsApp

En `script.js`, busca y modifica:

```javascript
const phoneNumber = '34900123456'; // Cambiar por tu número de WhatsApp
```

**Formato**: Código de país + número (sin espacios ni símbolos)
- España: 34XXXXXXXXX
- México: 52XXXXXXXXXX
- Argentina: 54XXXXXXXXXX

### 3. Colores Corporativos

En `styles.css`, modifica las variables CSS:

```css
:root {
    --primary-color: #ff6b35;    /* Color principal */
    --secondary-color: #f7931e;  /* Color secundario */
    --accent-color: #2c5f2d;     /* Color de acento */
}
```

### 4. Precios del Simulador

En `script.js`, ajusta los precios base:

```javascript
// Precios por kWp según tipo de instalación
const precioBase = {
    'basica': 1000,    // €/kWp
    'premium': 1300,   // €/kWp
    'bateria': 1800    // €/kWp
};
```

## 📊 Simuladores Incluidos

### Simulador de Energía
Calcula la potencia necesaria basándose en:
- Consumo mensual (kWh)
- Tipo de vivienda
- Orientación del tejado

### Simulador de Instalación
Genera presupuesto según:
- Potencia deseada (kWp)
- Tipo de instalación
- Superficie disponible

## 🎨 Secciones de la Página

1. **Hero Section Premium**: Sistema solar animado con estadísticas impactantes
2. **Quiénes Somos**: Historia, misión, visión y certificaciones de la empresa
3. **Servicios**: Instalaciones fotovoltaicas, baterías y mantenimiento
4. **Beneficios**: Razones científicas para elegir energía solar
5. **Proyectos**: Casos de éxito con datos reales de ahorro
6. **Contacto**: Formulario inteligente con redirección a WhatsApp
7. **Footer**: Enlaces, redes sociales y información corporativa

## 🎮 Funciones Especiales

### Logo Interactivo
- **Efectos brillantes** al pasar el mouse
- **Juego secreto** al hacer click (partículas animadas)
- **Contador de clicks** con mensajes especiales
- **Sonidos** generados por Web Audio API
- **Easter eggs** para aumentar el engagement

### Sistema Solar Animado
- **Órbitas rotatorias** con diferentes velocidades
- **Planetas temáticos** (casa, coche, industria)
- **Sol pulsante** con efectos de brillo
- **Animación continua** e hipnotizante

## 📱 Funcionalidades Móviles

- Menú hamburguesa responsive
- Formularios optimizados para móvil
- Botones de tamaño adecuado para touch
- Carga optimizada en conexiones lentas

## 🔧 Personalización Avanzada

### Agregar Nuevos Servicios

1. En `index.html`, añade una nueva tarjeta en la sección servicios:

```html
<div class="servicio-card">
    <div class="servicio-icon">
        <i class="fas fa-nuevo-icono"></i>
    </div>
    <h3>Nuevo Servicio</h3>
    <p>Descripción del nuevo servicio...</p>
</div>
```

### Modificar Cálculos del Simulador

En `script.js`, ajusta los factores de cálculo:

```javascript
// Factores por tipo de vivienda
const factorVivienda = {
    'unifamiliar': 1.0,
    'apartamento': 0.8,
    'comercial': 1.3,
    'industrial': 1.5  // Nuevo tipo
};
```

### Agregar Animaciones

Usa las clases de animación existentes:

```css
.mi-elemento {
    animation: fadeInUp 1s ease;
}
```

## 🌐 SEO y Rendimiento

### Metadatos Incluidos
- Title y description optimizados
- Open Graph para redes sociales
- Viewport responsive
- Charset UTF-8

### Optimizaciones
- CSS y JS minificados en producción
- Lazy loading para imágenes
- Animaciones con transform y opacity
- Uso de variables CSS para consistencia

## 📞 Integración WhatsApp

El sistema envía automáticamente:
- Datos del simulador utilizado
- Información de contacto del usuario
- Cálculos realizados
- Mensaje personalizado

Formato del mensaje enviado:
```
¡Hola! Soy [NOMBRE] y estoy interesado en una instalación fotovoltaica.

📊 SIMULACIÓN DE ENERGÍA:
• Consumo mensual: XXX kWh
• Potencia recomendada: X.X kWp
• Ahorro anual estimado: XXX€

📞 DATOS DE CONTACTO:
• Teléfono: XXXXXXXXX
• Email: email@ejemplo.com

¿Podrían enviarme un presupuesto personalizado? ¡Gracias!
```

## 🎯 Mejores Prácticas Implementadas

- **Accesibilidad**: Navegación por teclado, contraste adecuado
- **Performance**: Lazy loading, animaciones optimizadas
- **UX**: Feedback visual, estados de carga, validación de formularios
- **Mobile First**: Diseño pensado primero para móviles
- **Cross-browser**: Compatible con todos los navegadores modernos

## 🔄 Actualizaciones Futuras

Para mantener la página actualizada:

1. **Precios**: Revisa y actualiza los precios del simulador
2. **Subvenciones**: Actualiza los cálculos de ayudas gubernamentales
3. **Proyectos**: Añade nuevos casos de éxito
4. **Tecnología**: Actualiza especificaciones técnicas

## 📧 Soporte

Para dudas o personalizaciones adicionales:
- Revisa este README
- Consulta los comentarios en el código
- Modifica los archivos según tus necesidades

## 📄 Licencia

Este proyecto es de uso libre para empresas del sector de energías renovables.

---

**¡Tu página web de energía solar está lista para generar leads y hacer crecer tu negocio!** 🌞⚡ 
