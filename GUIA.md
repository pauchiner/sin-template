<p align="center">
    <img width="196" src="https://sinjs.com/sin.svg?v2">
    <h3 align="center">Guia de Sin.js</h3>
    <h5 align="center">Como migrar paginas de mithril.js a sin.js</h6>
</p>
<br/>

## 📦 1. Instalar dependencias
En la raíz de nuestro proyecto añadimos el siguiente `package.json`:
```json
{
	"name": "nombre-de-proyecto",
	"type": "module",
	"scripts": {
		"build": "sin build",
		"dev": "sin development",
		"start": "sin build && sin start"
	},
	"dependencies": {
		"sin": "github:pauchiner/sinjs#519f4fcd57421d466f7c0e9930e71ffe65c676b9"
	}
}
```

Luego exportamos el token del repositorio en la terminal `export GITHUB_TOKEN=<el token>`

Después ejecturaremos el comando `npm install`.

## 🔄 2. El repositorio git
Si nuestro proyecto está usando `git`, deberemos añadir el `.gitignore` a la raíz del proyecto con el siguiente contenido:
```bash
# dependencies
node_modules/

# production
+build/

# debug
npm-debug.log*

# local env files
.env

# editors
.vscode
.idea

#macOS
.DS_Store
```

## 📁 3. La carpeta public
Por defecto, sin.js no sirve todos los archivos estaticos de nuestra pagina, deberemos añadirlos manualmente a la carpeta `+public`

1. Creamos la carpeta `+public/` en la raiz de nuestro proyecto y añadimos todos los estáticos dentro,
estos pueden ser imagenes, json, svg, videos y **archivos css que importemos usando la etiqueta `link`**.
```bash
  +public/
  │ assets/
  │ mock.json
  │ favicon.ico
  ╰ animations.css
  agenda.js
  areaCultural.js
  areas.js
  ...
```

2. Actualizar las rutas de nuestros imports
A partir de ahora, `+public` es la carpeta raiz de nuestros archivos, así que para no tener problemas de enrutamiento deberemos usar rutas absolutas en nuestros imports:

Ejemplo:
```bash
  +public/
  │ assets/
  │ │ video.mp4
  │ ╰ imagen.png
  │ mock.json
  │ favicon.ico
  ╰ animations.css
```
```js
m("img", {src: "/assets/imagen.png"});
m("link", {rel: "stylesheet", href: "/animations" });
```

## ↕️ 4. Importar la nueva libreria
Como ahora ya vamos a comenzar a usar la nueva adaptación de `m`, deberemos de importar la nueva libreria siguiendo estos pasos:
### 1. Actualizamos `index.html`
```diff
- <script src="https://components.digitalvalue.es/lib/mithril.min.js"></script>
```
Ya no vamos a necesitar `mithril.min.js`
### 2. Importamos mithril.js como module
Ahora, en cada archivo donde antes usabamos `m`, tendremos que importar en la primera linea `sin/mithril`:
```diff
+ import m from "sin/mithril";
```

## 🗺️ 5. El router de mithril
Al usar server side rendering (SSR), la logica de nuestro proyecto comienza a ser ligeramente distinta, por ejemplo, ya no necesitamos archivos `html`, ya que el servidor se encarga de generarlos por nosotros.
Debido a esto, necesitaremos hacer unos cambios en la funcion `m.route`.

### 1. Actualiza `m.route`

```diff
// Antes
- m.route(document.body, "/", routes);
// Después
+ const context = {}
+ export default m.route(context, "/", routes);
```

Aquí estamos diciendole dos cosas al router, primero el `export default`, que es el que va a activar el SSR por nosotros.

Y lo segundo es la falta de `document.body`, como ya no disponemos de un html, los atributos que necesitemos serán pasados a través del objecto `context`, como veremos en el siguiente paso:

### 2. El head de nuestro html
Como ya hemos estipulado previamente, ya no necesitaremos más nuestro `index.html`, lo podemos guardar como referencia, pero ya no será usado por el servidor.

Ahora toca migrar todas las etiquetas con el nuevo objecto `context`:

Si antes teniamos esto en la etiqueta `<head>`:
```html
<html lang="es"
  <head>
    <title>Mi Pagina</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://components.digitalvalue.es/lib/semantic.min.css">
  </head>
</html>
```
Ahora tendremos esto en `context`:
```js
const context = {
  document: {
    lang: "es",
    title: "Mi Pagina",
    head: [
      m("meta", {charset: "UTF-8"}),
      m("link", { rel: "stylesheet", href: "https://components.digitalvalue.es/lib/semantic.min.css"}),
    ]
  }
}
export default m.route(context, "/", routes);
```

### 3. Etiquetas `<style>`:
Si nuestro `index.html` contiene etiquetas de estilos globales como estas:
```html
<style>
  body: {
    background-color: red;
  }
</style>
```
Ahora tendremos que ponerlas de esta forma:
```js
m.css`
  body: {
    background-color: red;
  }
`
```

## ⚡ 6. Probar nuestra pagina con sin.js

### Desarrollo
Para probar nuestra pagina simplemente debemos ejecutar el siguiente comando en la raiz del proyecto:
```bash
npm run dev
```
Esto nos abrirá una instancia de desarrollo de Google Chrome con nuestra web abierta.

### Producción
Para probar el SSR así como la producción de nuestra web ejecutaremos:
```bash
npm start
```

## ⚠️ Errores frecuentes
Ya con esto tendría prácticamente nuestra web funcionando, aquí hay una sección con problemas frecuentes que pueden ocurrir:

### `localStorage is not defined`
Por defecto `localStorage` así como todas las API del objecto `window` no están disponibles en el servidor así que tendremos que usar el wrap que nos provee `m`:
```diff
// Antes
- localStorage.setItem("myCat", "Tom");

// Despues
+ m.window.localStorage.setItem("myCat", "Tom");
```

### [MODULE_TYPELESS_PACKAGE_JSON]
Tendrás un output parecido a este:
```bash
(node:54345) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///Users/digitalvalue/dival/index.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /Users/digitalvalue/dival/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
```

Esto ocurre porque nuestro proyecto no esta usando `ESM modules`, para usarlos añadimos esta linea a nuestro `package.json`:
```diff
{
	"name": "nombre-de-proyect",
+	"type": "module",
	"scripts": {
		"build": "sin build",
		"dev": "sin development",
		"start": "sin build && sin start"
	},
	"dependencies": {
		"sin": "github:digitalvalue/sin"
	}
...
}
```

### 📝 License

Digital Value 2025 - All rights reserved.
