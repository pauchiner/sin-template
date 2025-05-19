# Plantilla de mithril con sin.js

## 🔧 Requisitos
- [Google Chrome](https://www.google.com/chrome)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## ⚡ Comienzo rapido

1. Descarga la plantilla
```bash
git clone https://github.com/pauchiner/sin-template.git
```
2. Instala las dependencias
```bash
npm install
```
3. Levanta el servidor de desarrollo
```bash
npm run dev
```

## 📏 Reglas
Una serie de reglas para poder usar sin.js

### Siempre que usemos `m.route()`, usaremos export default:
```js
// ❌
m.route({}, "/", paginas);
// ✅ 
export default m.route({}, "/", paginas);
```

### Para declarar estilos globales
```html
<!--❌-->
<style>
  body {
    margin: 0;
  }
</style>
```
```js
// ✅ 
m.css`
  body {
    margin: 0;
  }
`
```

### Para usar archivos staticos (imagenes, json...)
Debereis de tener todo metido dentro de la carpeta `+public`
```bash
+public
  │ mi_imagen.png
  │ pruebas.json
  │ estilo.css
  ╰ favicon.ico
index.js
```

### Para declarar scripts, styles y metadata lo haremos en el context
```html
<!--❌-->
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi pagina</title>
        <script src="https://components.digitalvalue.es/lib/mithril.min.js"></script>
    </head>
</html>
```
```js
// ✅ 
const context = {
    document: {
        title: "Mi pagina",
        lang: "es",
        head: [
          m("script", { src: "https://cdn.jsdelivr.net/npm/marked/marked.min.js" }),
          m("meta", { charset: "UTF-8" }),
        ]
    }
}
 
export default m.route(context, "/", paginas);
```
