# sin.js w/ mithri.js

This template allows to use mithril.js with SSR using sin.js

## 🔨 Development Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

## 🚀 Production Setup

### 1. Bundle the javascript modules
```bash
npm run build
```

This will create a folder named `+build` with two files in it:
- `index.js`: This contains all the modules and code of your proyect.
- `index.js.map`: This file maps the original code structure for debugging propurses.

### 2. Start the production server
```bash
npm start
```

You will see something like this:
```bash
> sin-template@1.0.0 start /Users/pauchiner/Developer/sin-template
> sin build && sin start

🔥 Built in 78.141166
HTTP Listening on 80
```

Now access to your `localhost:80` in the browser to see your page with SSR!

## ©️ License
Digital Value 2025 - All rights reserved.
