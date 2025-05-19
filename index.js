import m from "sin/mithril";

// Here you can define your properties of the document.
const context = {
  document: {
    lang: "es",
    title: "sin.js",
    head: [
      m("script", { src: "https://cdn.jsdelivr.net/npm/marked/marked.min.js" }),
      m("meta", { charset: "UTF-8" }),
    ]
  }
}

m.css`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: monospace;
  }
`

const Layout = {
  view: (vnode) => {
    return m(
      "div",
      {
        style: {
          gap: "16px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontFamily: "monospace",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
      m("main", {
        style: {
          gap: "16px",
          display: "flex",
          maxWidth: "900px",
          alignItems: "center",
          flexDirection: "column",
        }
      }, vnode.children)
    )
  }
}

const Home = {
  view: () => [
    m(Layout,
      m("div", [
        m("h1", "Welcome to sin.js"),
        m("p", "here you have a list of examples:"),
      ]),
      m("nav", { style: { display: "flex", flexDirection: "column", gap: "16px", width: "100%" } }, [
        m(m.route.Link, { href: "timer" }, "Timer"),
        m(m.route.Link, { href: "counter" }, "Counter"),
        m(m.route.Link, { href: "todo" }, "Todo App"),
        m(m.route.Link, { href: "async" }, "Async Loading"),
        m(m.route.Link, { href: "posts/1" }, "Dynamic Posts"),
        m(m.route.Link, { href: "gallery" }, "Image Gallery"),
        m(m.route.Link, { href: "pagination" }, "Pagination"),
        m(m.route.Link, { href: "infinite" }, "Infinite Scroll"),
        m(m.route.Link, { href: "local-storage" }, "Local Storage"),
        m(m.route.Link, { href: "search" }, "Search & Filter"),
        m(m.route.Link, { href: "markdown" }, "Markdown Previewer"),
      ])
    ),
  ]
}

const Counter = {
  count: 0,
  view: () => (
    m(Layout, [
      m("h2", `Count: ${Counter.count}`),
      m("section", {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: "8px"
        }
      }, [
        m("button", { onclick: () => Counter.count++ }, "Add"),
        m("button", { onclick: () => Counter.count-- }, "Remove"),
      ]),
      m(m.route.Link, { href: "/" }, "go back"),
    ])
  )
}

const Post = {
  view: ({ attrs }) => [
    m(Layout,
      m("h1", `This is post ${attrs.id}`),
      m("div", { style: { display: "flex", gap: "32px" } }, [
        m(m.route.Link, { href: `posts/${Number(attrs.id) - 1}` }, 'previous post'),
        m(m.route.Link, { href: `posts/${Number(attrs.id) + 1}` }, 'next post'),
      ]),
      m(m.route.Link, { href: `/` }, 'go back'),
    ),
  ]
}

const Async = {
  oninit: ({ state }) => {
    state.loading = true;
    state.data = null;
    setTimeout(() => {
      state.data = "Loaded after 2s";
      state.loading = false;
      m.redraw();
    }, 2000);
  },
  view: ({ state }) => {
    return m(Layout, [
      m("p", state.loading ? "Loading..." : state.data),
      m(m.route.Link, { href: '/' }, "go back")
    ])
  }
};

const LocalStorage = {
  oninit: vnode => {
    vnode.state.theme = localStorage.getItem("theme") || "light";
  },
  toggleTheme: vnode => {
    vnode.state.theme = vnode.state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", vnode.state.theme);
  },
  view: vnode => {
    return m(Layout, { class: vnode.state.theme }, [
      m("p", `Current theme: ${vnode.state.theme}`),
      m("button", { onclick: () => LocalStorage.toggleTheme(vnode) }, "Toggle Theme"),
      m(m.route.Link, { href: '/' }, "go back")
    ])
  }
};

const Todo = {
  todos: [],
  text: "",
  view: () => m(Layout, [
    m("h2", "TO-DO"),
    m("div", { style: { display: "flex", gap: "8px" } }, [

      m("input[type=text]", {
        placeholder: "Add some task...",
        oninput: e => Todo.text = e.target.value,
        value: Todo.text
      }),
      m("button", {
        onclick: () => {
          if (Todo.text) {
            Todo.todos.push(Todo.text);
            Todo.text = "";
          }
        }
      }, "Add"),
    ]),
    m("ul", { style: "width: 100%" }, Todo.todos.map(todo => m("li", todo))),
    m(m.route.Link, { href: '/' }, "go back")
  ])
};

const Markdown = {
  input: "# Hello",
  view: () => m(Layout, [
    m("h2", "Markdown Previewer"),
    m("textarea", {
      style: "width: 100%;",
      value: Markdown.input,
      oninput: e => Markdown.input = e.target.value
    }),
    m("div", {
      style: "width: 100%; background-color: #fafafa;",
      innerHTML: marked.parse(Markdown.input)
    }),
    m(m.route.Link, { href: '/' }, "go back")
  ])
};

const Gallery = {
  images: Array.from({ length: 256 }, (_, i) => `https://picsum.photos/200?random=${i}`),
  view: () => m(Layout, [m("div.gallery", { style: "display: flex flex-wrap: wrap;" }, [Gallery.images.map(src =>
    m("img", { src, loading: "lazy", style: "width: 32px; height: 32px; margin: 5px;" }),
  ),
  m("div", { style: "width: 100%; display: flex; justify-content: center;" }, [
    m(m.route.Link, { href: '/' }, "go back")
  ])
  ])])
};

const Timer = {
  count: 0,
  stop: false,
  interval: null,
  oncreate: () => {
    Timer.interval = setInterval(() => {
      if (!Timer.stop) {
        Timer.count++;
      }
      m.redraw();
    }, 1000);
  },
  onremove: () => clearInterval(Timer.interval),
  view: () => m(Layout, [
    m("h2", `Seconds passed: ${Timer.count}`),
    m("section", {
      style: {
        display: "flex",
        flexDirection: "row",
        gap: "8px"
      }
    }, [
      m("button", { onclick: () => { Timer.count = 0; m.redraw() } }, "Reset"),
      m("button", { onclick: () => Timer.stop = !Timer.stop }, Timer.stop ? "Resume" : "Stop"),
    ]),
    m(m.route.Link, { href: '/' }, "go back")
  ])
};

const Search = {
  query: "",
  items: ["Apple", "Banana", "Orange", "Mango"],
  view: () => m(Layout, [
    m("input[type=text]", {
      placeholder: "Search...",
      oninput: e => Search.query = e.target.value
    }),
    m("ul", { style: "width: 100%;" }, Search.items
      .filter(item => item.toLowerCase().includes(Search.query.toLowerCase()))
      .map(item => m("li", item))
    ),
    m(m.route.Link, { href: '/' }, "go back")
  ])
};

const Infinite = {
  state: { list: Array.from({ length: 64 }, (_, i) => `Item ${i + 1}`) },
  onscroll: e => {
    const dom = e.target;
    if (dom.scrollTop + dom.clientHeight >= dom.scrollHeight - 10) {
      const next = Infinite.state.list.length;
      Infinite.state.list.push(...Array.from({ length: 32 }, (_, i) => `Item ${next + i + 1}`));
      m.redraw();
    }
  },
  view: () => m(Layout, [
    m("h2", "Infinite Scroll Example"),
    m("div", {
      style: { height: '300px', overflowY: 'auto', width: '100%' },
      onscroll: Infinite.onscroll
    },
      Infinite.state.list.map(item =>
        m("div", { style: { padding: '8px', borderBottom: '1px solid #eee' } }, item)
      )
    ),
    m("div", { style: { marginTop: '16px' } }, m(m.route.Link, { href: '/' }, 'go back'))
  ])
};

const Pagination = {
  state: { items: Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`), page: 1, perPage: 20 },
  view: () => {
    const start = (Pagination.state.page - 1) * Pagination.state.perPage;
    const pageItems = Pagination.state.items.slice(start, start + Pagination.state.perPage);
    return m(Layout, [
      m("h2", "Pagination Example"),
      m("ul", pageItems.map(i => m("li", i))),
      m("div", [
        m("button", { onclick: () => Pagination.state.page = Math.max(1, Pagination.state.page - 1) }, 'Prev'),
        m("span", ` Page ${Pagination.state.page} `),
        m("button", { onclick: () => Pagination.state.page++ }, 'Next'),
      ]),
      m(m.route.Link, { href: '/' }, 'go back')
    ]);
  }
};

const routes = {
  "/": Home,
  "/todo": Todo,
  "/async": Async,
  "/timer": Timer,
  "/search": Search,
  "/posts/:id": Post,
  "/gallery": Gallery,
  "/counter": Counter,
  "/markdown": Markdown,
  "/infinite": Infinite,
  "/pagination": Pagination,
  "/local-storage": LocalStorage,
};

export default m.route(context, "/", routes);
