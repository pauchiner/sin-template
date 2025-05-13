import m from "sin/mithril";

function Home() {
	return {
		view: () => [
			m(
				"main",
				{
					style: {
						display: "flex",
						width: "100%",
						height: "100%",
						alignItems: "center",
						justifyContent: "center",
					},
				},
				m("h1", { style: { fontFamily: "system-ui" } }, "Welcome to sin.js"),
			),
		],
	};
}

export { Home };
