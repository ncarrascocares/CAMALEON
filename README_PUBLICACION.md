# Publicacion de Camaleon

Este proyecto esta listo para publicarse como sitio estatico. La tienda usa `index.html`, `style.css`, `script.js` y la carpeta `images/`.

## Recomendacion

La opcion mas simple sin contratar hosting es GitHub Pages:

1. Crea una cuenta en GitHub si no tienes una.
2. Crea un repositorio nuevo, por ejemplo `CAMALEON`.
3. Sube todos los archivos del proyecto.
4. En GitHub entra a `Settings > Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Elige la rama `main` y carpeta `/root`.
7. Guarda. GitHub entregara una URL tipo `https://usuario.github.io/CAMALEON/`.

El archivo `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.

## Cambios de contenido

Los cambios se hacen directamente por codigo:

- Productos, precios, categorias y textos base: `script.js`.
- Estructura visible de la pagina: `index.html`.
- Estilos visuales y responsive: `style.css`.
- Imagenes: carpeta `images/`.

Luego se debe crear un commit y subirlo a GitHub para que GitHub Pages publique la nueva version.

## Probar antes de publicar

Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Luego abre:

- Tienda: `http://localhost:8000/`

## Alternativa gratuita

Cloudflare Pages tambien permite publicar sitios estaticos gratis y conectar repositorios Git. Es una buena alternativa si despues quieres usar funciones serverless, pero para empezar GitHub Pages es mas directo.
