import m from "sin/mithril";

import { Home } from "./components.js";

const routes = {
	"/": { view: () => m(Home) },
};

export default m.route(null, "/", routes);
