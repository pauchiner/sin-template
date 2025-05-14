import m from "sin/mithril";

import { Home } from "./components.js";

const routes = {
	"/": { view: () => m(Home) },
};

// Here you can define your properties of the document.
const context = {
  document: {
    lang: "es",
    title: "sin.js",
    head: [
      m("meta", {charset: "UTF-8"})
    ]
  }
}

m.css`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
  }
`

export default m.route(context, "/", routes);
