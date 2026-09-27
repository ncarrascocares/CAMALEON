const STORAGE_PRODUCTS_KEY = 'camaleonProductos';
const STORAGE_CONTENT_KEY = 'camaleonContenido';
const STORAGE_AUTH_KEY = 'camaleonAdminAuth';
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD_HASH = 'dba06daf0dbfd3d34a9741bca5d47c5f865749dffd122283e7043113c88a9f31';

const productosBase = [
    {
        id: 1,
        nombre: "Anillo Dorado Elegante",
        categoria: "anillos",
        precio: 24990,
        precioOriginal: null,
        imagen: "images/DobleCorazon.jpeg",
        descripcion: "Hermoso anillo dorado con detalles de cristal, perfecto para cualquier ocasión.",
        rating: 4.5
    },
    {
        id: 2,
        nombre: "Collar de Perlas",
        categoria: "collares",
        precio: 45990,
        precioOriginal: null,
        imagen: "images/CollarColibri.jpeg",
        descripcion: "Elegante collar con perlas naturales, ideal para eventos especiales.",
        rating: 5
    },
    {
        id: 3,
        nombre: "Pulsera Plateada",
        categoria: "pulseras",
        precio: 18990,
        precioOriginal: null,
        imagen: "images/CorazonSagrado.jpeg",
        descripcion: "Pulsera plateada con diseño moderno y acabado premium.",
        rating: 4
    },
    {
        id: 4,
        nombre: "Aretes de Cristal",
        categoria: "aretes",
        precio: 12990,
        precioOriginal: null,
        imagen: "images/ArosVintage.jpeg",
        descripcion: "Hermosos aretes con cristales brillantes, ¡brilla todo el día!",
        rating: 4.5
    },
    {
        id: 5,
        nombre: "Anillo con Diamante",
        categoria: "anillos",
        precio: 89990,
        precioOriginal: null,
        imagen: "images/CorazonDeluxe.jpeg",
        descripcion: "Anillo de lujo con diamante sintético de alta calidad.",
        rating: 5
    },
    {
        id: 6,
        nombre: "Collar Minimalista",
        categoria: "collares",
        precio: 22990,
        precioOriginal: null,
        imagen: "images/CollarCaballitodeMar.jpeg",
        descripcion: "Collar moderno y minimalista, versátil para cualquier estilo.",
        rating: 4.5
    },
    {
        id: 7,
        nombre: "Pulsera de Perlas",
        categoria: "pulseras",
        precio: 35990,
        precioOriginal: null,
        imagen: "images/MariposaBordados.jpeg",
        descripcion: "Exquisita pulsera de perlas blancas con cierre de plata.",
        rating: 4.5
    },
    {
        id: 8,
        nombre: "Aretes de Gota",
        categoria: "aretes",
        precio: 21990,
        precioOriginal: null,
        imagen: "images/ToposFlorXL.jpeg",
        descripcion: "Elegantes aretes en forma de gota, perfectos para cualquier look.",
        rating: 4
    },
    {
        id: 9,
        nombre: "Anillo Vintage",
        categoria: "anillos",
        precio: 34990,
        precioOriginal: null,
        imagen: "images/Colibri.jpeg",
        descripcion: "Anillo vintage con diseño retro y acabado antique.",
        rating: 4.5
    },
    {
        id: 10,
        nombre: "Collar Largo",
        categoria: "collares",
        precio: 28990,
        precioOriginal: null,
        imagen: "images/CollarEstrella.jpeg",
        descripcion: "Collar largo perfecto para capas, con cadena fina dorada.",
        rating: 4
    },
    {
        id: 11,
        nombre: "Pulsera de Cuero",
        categoria: "pulseras",
        precio: 16990,
        precioOriginal: null,
        imagen: "images/EStrellaDeluxe.jpeg",
        descripcion: "Pulsera de cuero genuino con detalles metálicos.",
        rating: 4.5
    },
    {
        id: 12,
        nombre: "Aretes de Perla",
        categoria: "aretes",
        precio: 29990,
        precioOriginal: null,
        imagen: "images/CollarCangrejo.jpeg",
        descripcion: "Clásicos aretes de perla con montaje en oro blanco.",
        rating: 5
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

let productos = cargarProductos();
let contenido = cargarContenido();
let productoSeleccionadoId = null;
let panelIniciado = false;

document.addEventListener('DOMContentLoaded', () => {
    configurarLogin();

    if (estaAutenticado()) {
        mostrarAdmin();
    } else {
        mostrarLogin();
    }
});

function configurarLogin() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const logoutButton = document.getElementById('logoutButton');

    loginForm.addEventListener('submit', validarAcceso);
    togglePassword.addEventListener('click', alternarPassword);
    logoutButton.addEventListener('click', cerrarSesion);
}

async function validarAcceso(event) {
    event.preventDefault();

    const user = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPassword').value;
    const loginError = document.getElementById('loginError');
    const passwordHash = await crearHash(password);

    if (user === ADMIN_USER && passwordHash === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
        loginError.textContent = '';
        document.getElementById('loginForm').reset();
        mostrarAdmin();
        return;
    }

    loginError.textContent = 'Usuario o contraseña incorrectos.';
}

function estaAutenticado() {
    return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
}

function mostrarAdmin() {
    document.getElementById('loginView').hidden = true;
    document.getElementById('adminView').hidden = false;
    document.getElementById('logoutButton').hidden = false;
    iniciarPanelAdmin();
}

function mostrarLogin() {
    document.getElementById('loginView').hidden = false;
    document.getElementById('adminView').hidden = true;
    document.getElementById('logoutButton').hidden = true;
    document.getElementById('adminUser').focus();
}

function iniciarPanelAdmin() {
    if (panelIniciado) {
        renderizarAdmin();
        return;
    }

    configurarTabs();
    cargarFormularios();
    renderizarAdmin();
    configurarFormularios();
    panelIniciado = true;
}

function cerrarSesion() {
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    mostrarLogin();
}

function alternarPassword() {
    const input = document.getElementById('adminPassword');
    const icon = document.querySelector('#togglePassword i');
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';
    icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
}

async function crearHash(text) {
    const bytes = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function cargarProductos() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || [...productosBase];
    } catch (error) {
        return [...productosBase];
    }
}

function cargarContenido() {
    try {
        return { ...contenidoBase, ...(JSON.parse(localStorage.getItem(STORAGE_CONTENT_KEY)) || {}) };
    } catch (error) {
        return { ...contenidoBase };
    }
}

function guardarProductos() {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(productos));
}

function guardarContenido() {
    localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(contenido));
}

function configurarTabs() {
    document.querySelectorAll('.admin-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach((item) => item.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach((section) => section.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });
}

function configurarFormularios() {
    document.getElementById('productForm').addEventListener('submit', guardarProducto);
    document.getElementById('clearProduct').addEventListener('click', limpiarFormularioProducto);
    document.getElementById('contentImagesForm').addEventListener('submit', guardarImagenes);
    document.getElementById('contentTextForm').addEventListener('submit', guardarTextos);
    document.getElementById('resetAll').addEventListener('click', restaurarTodo);
}

function cargarFormularios() {
    Object.keys(contenidoBase).forEach((key) => {
        const input = document.getElementById(key);
        if (input) input.value = contenido[key] || '';
    });
}

async function guardarProducto(event) {
    event.preventDefault();

    const id = document.getElementById('productId').value;
    const imagenArchivo = document.getElementById('productImageFile').files[0];
    const imagenUrl = document.getElementById('productImage').value.trim();
    const productoExistente = productos.find((producto) => String(producto.id) === id);
    const imagen = imagenArchivo ? await archivoADataUrl(imagenArchivo) : imagenUrl || productoExistente?.imagen || '';
    const precio = Number(document.getElementById('productPrice').value);
    const precioAnteriorValor = document.getElementById('productOldPrice').value.trim();
    const precioAnterior = precioAnteriorValor ? Number(precioAnteriorValor) : null;

    const producto = {
        id: id ? Number(id) : obtenerNuevoId(),
        nombre: document.getElementById('productName').value.trim(),
        categoria: document.getElementById('productCategory').value,
        precio,
        precioOriginal: precioAnterior && precioAnterior > precio ? precioAnterior : null,
        imagen,
        descripcion: document.getElementById('productDescription').value.trim(),
        rating: Number(document.getElementById('productRating').value)
    };

    if (id) {
        productos = productos.map((item) => item.id === producto.id ? producto : item);
        productoSeleccionadoId = producto.id;
    } else {
        productos.push(producto);
        productoSeleccionadoId = producto.id;
    }

    guardarProductos();
    renderizarAdmin();
    editarProducto(producto.id);
}

async function guardarImagenes(event) {
    event.preventDefault();

    const imageKeys = ['hero1', 'hero2', 'hero3', 'categoriaAnillos', 'categoriaCollares', 'categoriaPulseras', 'categoriaAretes', 'sobreMiImagen'];

    for (const key of imageKeys) {
        const input = document.getElementById(key);
        const fileInput = document.getElementById(`${key}File`);
        const file = fileInput?.files[0];
        const value = input.value.trim();

        contenido[key] = file ? await archivoADataUrl(file) : value || contenido[key] || contenidoBase[key];
        if (fileInput) fileInput.value = '';
    }

    guardarContenido();
    cargarFormularios();
}

function guardarTextos(event) {
    event.preventDefault();

    contenido.sobreMiTitulo = document.getElementById('sobreMiTitulo').value.trim();
    contenido.sobreMiTexto = document.getElementById('sobreMiTexto').value.trim();

    guardarContenido();
}

function renderizarAdmin() {
    const lista = document.getElementById('adminProductList');
    const preview = document.getElementById('adminPreviewGrid');

    lista.innerHTML = '';
    preview.innerHTML = '';

    productos.forEach((producto) => {
        const item = document.createElement('div');
        item.className = producto.id === productoSeleccionadoId ? 'admin-product selected' : 'admin-product';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <strong>${producto.nombre}</strong>
                <span>$${producto.precio.toLocaleString('es-CL')}</span>
            </div>
            <div class="admin-product-actions">
                <button class="icon-button" type="button" title="Editar producto" aria-label="Editar ${producto.nombre}">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="icon-button" type="button" title="Eliminar producto" aria-label="Eliminar ${producto.nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        const [editButton, deleteButton] = item.querySelectorAll('button');
        editButton.addEventListener('click', () => seleccionarProducto(producto.id));
        deleteButton.addEventListener('click', () => eliminarProducto(producto.id));
        lista.appendChild(item);

        const card = document.createElement('article');
        card.className = producto.id === productoSeleccionadoId ? 'admin-preview-card selected' : 'admin-preview-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', producto.id === productoSeleccionadoId ? 'true' : 'false');
        card.setAttribute('aria-label', `Editar ${producto.nombre}`);
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <strong>${producto.nombre}</strong>
                <span>$${producto.precio.toLocaleString('es-CL')}</span>
                <small>${nombreCategoria(producto.categoria)}</small>
            </div>
        `;
        card.addEventListener('click', () => seleccionarProducto(producto.id));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                seleccionarProducto(producto.id);
            }
        });
        preview.appendChild(card);
    });
}

function seleccionarProducto(id) {
    productoSeleccionadoId = id;
    editarProducto(id);
    renderizarAdmin();
}

function editarProducto(id) {
    const producto = productos.find((item) => item.id === id);
    if (!producto) return;

    document.getElementById('productId').value = producto.id;
    document.getElementById('productName').value = producto.nombre;
    document.getElementById('productCategory').value = producto.categoria;
    document.getElementById('productPrice').value = producto.precio;
    document.getElementById('productOldPrice').value = producto.precioOriginal || '';
    document.getElementById('productRating').value = producto.rating;
    document.getElementById('productImage').value = producto.imagen.startsWith('data:') ? '' : producto.imagen;
    document.getElementById('productImageFile').value = '';
    document.getElementById('productDescription').value = producto.descripcion;
    actualizarEstadoEdicion(producto);
}

function eliminarProducto(id) {
    productos = productos.filter((producto) => producto.id !== id);
    if (productoSeleccionadoId === id) {
        productoSeleccionadoId = null;
        limpiarFormularioProducto();
    }
    guardarProductos();
    renderizarAdmin();
}

function limpiarFormularioProducto() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productRating').value = '5';
    productoSeleccionadoId = null;
    actualizarEstadoEdicion();
    renderizarAdmin();
}

function restaurarTodo() {
    localStorage.removeItem(STORAGE_PRODUCTS_KEY);
    localStorage.removeItem(STORAGE_CONTENT_KEY);
    productos = [...productosBase];
    contenido = { ...contenidoBase };
    cargarFormularios();
    limpiarFormularioProducto();
    renderizarAdmin();
}

function actualizarEstadoEdicion(producto) {
    const status = document.getElementById('productEditStatus');
    if (!status) return;

    if (producto) {
        status.innerHTML = `
            <i class="fas fa-pen"></i>
            <span>Editando: ${producto.nombre}</span>
        `;
    } else {
        status.innerHTML = `
            <i class="fas fa-circle-plus"></i>
            <span>Nuevo producto</span>
        `;
    }
}

function nombreCategoria(categoria) {
    const categorias = {
        anillos: 'Prendedores',
        collares: 'Collares',
        pulseras: 'Pulseras',
        aretes: 'Aros'
    };

    return categorias[categoria] || categoria;
}

function obtenerNuevoId() {
    return productos.length ? Math.max(...productos.map((producto) => producto.id)) + 1 : 1;
}

function archivoADataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
