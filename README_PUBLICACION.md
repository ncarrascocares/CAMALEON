# Publicacion de Camaleon

Este proyecto esta listo para publicarse como sitio estatico: solo necesita servir los archivos `index.html`, `style.css`, `script.js` y la carpeta `images/`.

## Recomendacion

La opcion mas simple sin contratar hosting es GitHub Pages:

1. Crea una cuenta en GitHub si no tienes una.
2. Crea un repositorio nuevo, por ejemplo `dulce_tejido`.
3. Sube todos los archivos del proyecto.
4. En GitHub entra a `Settings > Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Elige la rama `main` y carpeta `/root`.
7. Guarda. GitHub entregara una URL tipo `https://usuario.github.io/dulce_tejido/`.

El archivo `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll. Para esta pagina, lo correcto es publicar los archivos tal como estan.

## Importante sobre el panel administrador

El panel `admin.html` funciona para editar localmente en tu navegador, pero no es un administrador seguro para internet porque todo sitio estatico envia su HTML, CSS y JS al visitante.

Eso significa:

- La contrasena del admin no protege datos en un servidor.
- Los cambios hechos en el panel se guardan en el navegador de quien edita, no en todos los visitantes.
- Para publicar cambios reales, debes editar los archivos del proyecto y volver a subirlos al repositorio.

Por eso se agrego:

- `robots.txt` para pedir a buscadores que no indexen `admin.html`.
- `<meta name="robots" content="noindex, nofollow">` dentro de `admin.html`.

Esto no reemplaza seguridad real, pero evita exponer el panel como una pagina pensada para buscadores.

## Flujo recomendado sin contratar servicios

1. Usa `admin.html` localmente para preparar productos y textos.
2. Cuando tengas el contenido final, actualiza los datos definitivos en `script.js` e imagenes en `images/`.
3. Sube los cambios a GitHub.
4. GitHub Pages publicara la nueva version.

## Probar antes de publicar

Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Luego abre:

- Tienda: `http://localhost:8000/`
- Admin local: `http://localhost:8000/admin.html`

## Alternativa gratuita

Cloudflare Pages tambien permite publicar sitios estaticos gratis y conectar repositorios Git. Es una buena alternativa si despues quieres usar funciones serverless, pero para empezar GitHub Pages es mas directo.
