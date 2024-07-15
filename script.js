const content = [
  React.createElement("h1", { class: "intro" }, "Hello from React!"),
  [
    React.createElement("div", { class: "grandParent" }, [
      React.createElement("div", { class: "parent" }, [
        React.createElement("div", { class: "child" }, [
          React.createElement("button", {}, "Click Me"),
          React.createElement("p", {}, "DOM Manipulation using React"),
        ]),
      ]),
    ]),

    React.createElement("div", { class: "thank" }, [
      React.createElement("h3", {}, [
        React.createElement("i", {}, "Thank You!"),
      ]),
    ]),
  ],
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(content);
