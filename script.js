const STORAGE_PRODUCTS_KEY = 'camaleonProductos';
const STORAGE_CONTENT_KEY = 'camaleonContenido';
const STORAGE_CART_KEY = 'camaleonCarrito';
const WHATSAPP_PHONE = '56962465634';

// Datos de productos
const productosBase = [
    {
        id: 1,
        nombre: "Prendedor Doble Corazón",
        categoria: "prendedores",
        precio: 22000,
        precioOriginal: null,
        imagen: "images/DobleCorazon.jpeg",
        descripcion: "Prendedor con diseño de doble corazón, ideal para regalar o lucir en cualquier ocasión.",
        rating: 4.5
    },
    {
        id: 2,
        nombre: "Collar Colibrí",
        categoria: "collares",
        precio: 18000,
        precioOriginal: null,
        imagen: "images/CollarColibri.jpeg",
        descripcion: "Collar con diseño de colibrí, ideal para agregar un toque de naturaleza a tu estilo.",
        rating: 5
    },
    {
        id: 3,
        nombre: "Collar corazón sagrado",
        categoria: "collares",
        precio: 18000,
        precioOriginal: null,
        imagen: "images/CorazonSagrado.jpeg",
        descripcion: "Collar con diseño de corazón sagrado, perfecto para expresar amor y devoción.",
        rating: 4
    },
    {
        id: 4,
        nombre: "Aros Vintage",
        categoria: "aretes",
        precio: 25000,
        precioOriginal: null,
        imagen: "images/ArosVintage.jpeg",
        descripcion: "Hermosos aros vintage con diseño retro y acabado antique.",
        rating: 4.5
    },
    {
        id: 5,
        nombre: "Collar Corazón Deluxe",
        categoria: "collares",
        precio: 38000,
        precioOriginal: null,
        imagen: "images/CorazonDeluxe.jpeg",
        descripcion: "Collar de lujo con diseño de corazón, ideal para ocasiones especiales.",
        rating: 5
    },
    {
        id: 6,
        nombre: "Collar Caballito de Mar",
        categoria: "collares",
        precio: 26000,
        precioOriginal: null,
        imagen: "images/CollarCaballitodeMar.jpeg",
        descripcion: "Collar con diseño de caballito de mar, perfecto para agregar un toque de naturaleza a tu estilo.",
        rating: 4.5
    },
    {
        id: 7,
        nombre: "Aros Mariposa Bordados",
        categoria: "aretes",
        precio: 12000,
        precioOriginal: null,
        imagen: "images/MariposaBordados.jpeg",
        descripcion: "Hermosos aros con diseño de mariposa bordada, perfectos para agregar un toque de elegancia a tu estilo.",
        rating: 4.5
    },
    {
        id: 8,
        nombre: "Aros Flor XL",
        categoria: "aretes",
        precio: 21990,
        precioOriginal: null,
        imagen: "images/ToposFlorXL.jpeg",
        descripcion: "Elegantes aros con diseño de flor XL, perfectos para agregar un toque de belleza a tu estilo.",
        rating: 4
    },
    {
        id: 9,
        nombre: "Aros Colibrí",
        categoria: "aretes",
        precio: 24000,
        precioOriginal: null,
        imagen: "images/Colibri.jpeg",
        descripcion: "Aros con diseño de colibrí, ideal para agregar un toque de naturaleza a tu estilo.",
        rating: 4.5
    },
    {
        id: 10,
        nombre: "Collar Estrella",
        categoria: "collares",
        precio: 20000,
        precioOriginal: null,
        imagen: "images/CollarEstrella.jpeg",
        descripcion: "Collar con diseño de estrella, perfecto para agregar un toque de brillo a tu estilo.",
        rating: 4
    },
    {
        id: 11,
        nombre: "Collar Estrella Deluxe",
        categoria: "collares",
        precio: 30000,
        precioOriginal: null,
        imagen: "images/EStrellaDeluxe.jpeg",
        descripcion: "Collar de lujo con diseño de estrella, ideal para ocasiones especiales.",
        rating: 4.5
    }
];

const contenidoBase = {
    hero1: './images/hero-1.png',
    hero2: './images/hero-2.png',
    hero3: './images/hero-3.png',
    categoriaAnillos: 'images/DobleCorazon.jpeg',
    categoriaCollares: 'images/FondoCollares.jpeg',
    categoriaPulseras: 'images/FondoPulseras.jpeg',
    categoriaAretes: 'images/FondoAros.jpeg',
    sobreMiImagen: 'images/sobre-mi.png',
    sobreMiTitulo: 'Camaleón',
    sobreMiTexto: 'Hola, soy Nanci.\n\nSoy mamá, esposa, soñadora y la creadora de Camaleón.\n\nEsta historia empezó de la forma más simple: mirando fotos de bordados. Me enamoré de los hilos, los colores y los detalles hechos a mano. De esas imágenes nació una idea que no me dejó dormir: ¿y si pudiera crear aros que se sintieran así de especiales?\n\nAsí, entre la vida de mamá, el trabajo y muchas ganas, nació Camaleón en mi casita de Rengo. Sin grandes máquinas, sin tienda física, solo yo, mis manos y el apoyo de mi familia.\n\nCamaleón no es solo bisutería. Es mi forma de recordarle a cada mujer que puede reinventarse, cambiar de colores y seguir siendo ella misma. Como un camaleón.'
};

let carrito = cargarCarrito();
let productos = cargarProductos();
let contenidoPagina = cargarContenido();
let productosFiltrados = [...productos];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    aplicarContenidoPagina();
    renderizarProductos(productos);
    configurarEventos();
    actualizarCarrito();
});

function cargarProductos() {
    const productosGuardados = localStorage.getItem(STORAGE_PRODUCTS_KEY);

    if (!productosGuardados) {
        return [...productosBase];
    }

    try {
        return JSON.parse(productosGuardados);
    } catch (error) {
        console.warn('No se pudieron cargar los productos guardados.', error);
        return [...productosBase];
    }
}

function cargarContenido() {
    const contenidoGuardado = localStorage.getItem(STORAGE_CONTENT_KEY);

    if (!contenidoGuardado) {
        return { ...contenidoBase };
    }

    try {
        return { ...contenidoBase, ...JSON.parse(contenidoGuardado) };
    } catch (error) {
        console.warn('No se pudo cargar el contenido guardado.', error);
        return { ...contenidoBase };
    }
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem(STORAGE_CART_KEY);

    if (!carritoGuardado) {
        return [];
    }

    try {
        return JSON.parse(carritoGuardado);
    } catch (error) {
        console.warn('No se pudo cargar el carrito guardado.', error);
        return [];
    }
}

function guardarCarrito() {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(carrito));
}

function aplicarContenidoPagina() {
    const imagenes = {
        hero1: document.querySelector('[data-content="hero1"]'),
        hero2: document.querySelector('[data-content="hero2"]'),
        hero3: document.querySelector('[data-content="hero3"]'),
        categoriaAnillos: document.querySelector('[data-content="categoria-anillos"]'),
        categoriaCollares: document.querySelector('[data-content="categoria-collares"]'),
        categoriaPulseras: document.querySelector('[data-content="categoria-pulseras"]'),
        categoriaAretes: document.querySelector('[data-content="categoria-aretes"]'),
        sobreMiImagen: document.querySelector('[data-content="sobreMiImagen"]')
    };

    Object.entries(imagenes).forEach(([key, element]) => {
        if (element && contenidoPagina[key]) {
            element.src = contenidoPagina[key];
        }
    });

    const sobreMiTitulo = document.querySelector('[data-content="sobreMiTitulo"]');
    const sobreMiTexto = document.querySelector('[data-content="sobreMiTexto"]');

    if (sobreMiTitulo) sobreMiTitulo.textContent = contenidoPagina.sobreMiTitulo;
    if (sobreMiTexto) sobreMiTexto.textContent = contenidoPagina.sobreMiTexto;
}

// Renderizar productos
function renderizarProductos(productsArray) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';

    if (!productsArray.length) {
        grid.innerHTML = `
            <article class="productos-empty" aria-live="polite">
                <div class="productos-empty-icons" aria-hidden="true">
                    <i class="fas fa-crown"></i>
                    <i class="fas fa-gem"></i>
                    <i class="fas fa-wand-sparkles"></i>
                </div>
                <h3>Un éxito total... ¡Temporalmente agotado! 👑</h3>
                <p>Nuestras clientas tienen un gusto increíble y se llevaron las últimas unidades. Esta joyita está pausada por un momento mientras preparamos más, pero volverá muy pronto para hacerte brillar.</p>
            </article>
        `;
        return;
    }

    productsArray.forEach(producto => {
        const card = crearTarjetaProducto(producto);
        grid.appendChild(card);
    });
}

// Crear tarjeta de producto
function crearTarjetaProducto(producto) {
    const tieneDescuento = Number(producto.precioOriginal) > producto.precio;
    const descuentoPorcentaje = tieneDescuento
        ? Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)
        : 0;
    
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
        <div class="producto-img">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            ${tieneDescuento ? `<span class="badge">-${descuentoPorcentaje}%</span>` : ''}
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <div class="estrellas">${generarEstrellas(producto.rating)}</div>
            <div class="producto-precio">
                <span class="precio-actual">$${producto.precio.toLocaleString('es-CL')}</span>
                ${tieneDescuento ? `<span class="precio-original">$${producto.precioOriginal.toLocaleString('es-CL')}</span>` : ''}
            </div>
            <button class="btn btn-secondary" onclick="abrirModal(${producto.id})">Ver Detalle</button>
        </div>
    `;
    
    return card;
}

// Generar estrellas de rating
function generarEstrellas(rating) {
    const estrellas = Math.round(rating);
    let html = '';
    for (let i = 0; i < 5; i++) {
        html += i < estrellas ? '⭐' : '☆';
    }
    return html;
}

// Configurar eventos
function configurarEventos() {
    const cartButton = document.getElementById('cartButton');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const whatsappCheckout = document.getElementById('whatsappCheckout');
    const clearCart = document.getElementById('clearCart');

    cartButton.addEventListener('click', abrirCarrito);
    closeCart.addEventListener('click', cerrarCarrito);
    cartOverlay.addEventListener('click', cerrarCarrito);
    whatsappCheckout.addEventListener('click', enviarPedidoWhatsApp);
    clearCart.addEventListener('click', vaciarCarrito);

    // Toggle menú móvil
    document.getElementById('menuToggle').addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    });

    // Filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.dataset.filtro;
            if (filtro === 'todos') {
                renderizarProductos(productos);
            } else {
                const filtrados = productos.filter(p => p.categoria === filtro);
                renderizarProductos(filtrados);
            }
        });
    });

    // Categorías
    document.querySelectorAll('.categoria-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoria = card.dataset.categoria;
            const filtrados = productos.filter(p => p.categoria === categoria);
            renderizarProductos(filtrados);
            
            // Activar el filtro correspondiente
            document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-filtro="${categoria}"]`).classList.add('active');
            
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Modal
    document.querySelector('.close-modal').addEventListener('click', cerrarModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modalProducto');
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            cerrarModal();
            cerrarCarrito();
        }
    });

    // Cantidad
    document.getElementById('incrementar').addEventListener('click', () => {
        const cantidad = document.getElementById('cantidad');
        cantidad.value = parseInt(cantidad.value) + 1;
    });

    document.getElementById('decrementar').addEventListener('click', () => {
        const cantidad = document.getElementById('cantidad');
        if (parseInt(cantidad.value) > 1) {
            cantidad.value = parseInt(cantidad.value) - 1;
        }
    });
}

// Abrir modal
function abrirModal(productoId) {
    const producto = productos.find(p => p.id === productoId);
    
    document.getElementById('modalImg').src = producto.imagen;
    document.getElementById('modalNombre').textContent = producto.nombre;
    document.getElementById('modalDescripcion').textContent = producto.descripcion;
    document.getElementById('modalPrecio').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    document.getElementById('cantidad').value = 1;
    
    document.getElementById('modalProducto').style.display = 'block';
    
    document.getElementById('agregarCarrito').onclick = () => agregarAlCarrito(productoId);
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalProducto').style.display = 'none';
}

// Agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    const existente = carrito.find(item => item.id === productoId);
    
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }
    
    actualizarCarrito();
    cerrarModal();
    abrirCarrito();
    
    // Animación de confirmación
    const btnAgregar = document.getElementById('agregarCarrito');
    const textoOriginal = btnAgregar.textContent;
    btnAgregar.textContent = '✓ Agregado al carrito';
    setTimeout(() => {
        btnAgregar.textContent = textoOriginal;
    }, 1500);
}

// Actualizar carrito
function actualizarCarrito() {
    guardarCarrito();
    renderizarCarrito();

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const total = calcularTotalCarrito();
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const whatsappCheckout = document.getElementById('whatsappCheckout');
    const clearCart = document.getElementById('clearCart');

    cartCount.textContent = totalItems;
    cartCount.classList.toggle('active', totalItems > 0);
    cartTotal.textContent = `$${total.toLocaleString('es-CL')}`;
    whatsappCheckout.disabled = carrito.length === 0;
    clearCart.disabled = carrito.length === 0;
}

function renderizarCarrito() {
    const cartItems = document.getElementById('cartItems');

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
        return;
    }

    cartItems.innerHTML = '';

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        const cartItem = document.createElement('article');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="cart-item-info">
                <h3>${item.nombre}</h3>
                <span>$${item.precio.toLocaleString('es-CL')} c/u</span>
                <strong>$${subtotal.toLocaleString('es-CL')}</strong>
                <div class="cart-quantity">
                    <button type="button" aria-label="Restar ${item.nombre}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.cantidad}</span>
                    <button type="button" aria-label="Sumar ${item.nombre}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="remove-cart-item" type="button" aria-label="Eliminar ${item.nombre}">
                <i class="fas fa-trash"></i>
            </button>
        `;

        const [minusButton, plusButton] = cartItem.querySelectorAll('.cart-quantity button');
        const removeButton = cartItem.querySelector('.remove-cart-item');

        minusButton.addEventListener('click', () => cambiarCantidadCarrito(item.id, -1));
        plusButton.addEventListener('click', () => cambiarCantidadCarrito(item.id, 1));
        removeButton.addEventListener('click', () => eliminarDelCarrito(item.id));

        cartItems.appendChild(cartItem);
    });
}

function abrirCarrito() {
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
    document.getElementById('cartButton').setAttribute('aria-expanded', 'true');
}

function cerrarCarrito() {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
    document.getElementById('cartButton').setAttribute('aria-expanded', 'false');
}

function cambiarCantidadCarrito(productoId, cambio) {
    const item = carrito.find((producto) => producto.id === productoId);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }

    actualizarCarrito();
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter((item) => item.id !== productoId);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function calcularTotalCarrito() {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return;

    const lineasProductos = carrito.map((item, index) => {
        const subtotal = item.precio * item.cantidad;
        return `${index + 1}. ${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString('es-CL')}`;
    });

    const mensaje = [
        'Hola, quiero realizar este pedido:',
        '',
        ...lineasProductos,
        '',
        `Total: $${calcularTotalCarrito().toLocaleString('es-CL')}`,
        '',
        'Quedo atenta/o para confirmar stock, despacho y forma de pago. Gracias.'
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
    });
});

// VARIABLES DEL CARRUSEL
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let autoPlayInterval;

// INICIAR AUTOPLAY
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 5000); // Cambiar imagen cada 5 segundos
}

// PAUSAR AUTOPLAY
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// MOSTRAR SLIDE ESPECÍFICO
function showSlide(index) {
    // Remover clase active de todas las imágenes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Agregar clase active a la imagen actual
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// SIGUIENTE SLIDE
function nextSlide() {
    stopAutoPlay();
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
    startAutoPlay();
}

// SLIDE ANTERIOR
function previousSlide() {
    stopAutoPlay();
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
    startAutoPlay();
}

// IR A SLIDE ESPECÍFICO
function currentSlide(index) {
    stopAutoPlay();
    currentIndex = index;
    showSlide(currentIndex);
    startAutoPlay();
}

// INICIAR EL CARRUSEL AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    startAutoPlay();
});

// PAUSAR AUTOPLAY CUANDO MOUSE ESTÁ SOBRE EL HERO
const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopAutoPlay);
    heroCarousel.addEventListener('mouseleave', startAutoPlay);
}
