# Important terms in React:

## what is re-render term:

A re-render in React occurs when a component's output (its JSX or DOM) needs to be recalculated and updated in the browser. React does this to ensure the UI stays in sync with the application's state or props.
re-render component, when state changes to update UI

---

## what is react dom

ReactDOM acts as the bridge between React components and the DOM (Document Object Model).

- React, by itself, is not directly manipulating the DOM. React creates a virtual DOM, a lightweight copy of the actual DOM. It compares the virtual DOM with the actual DOM (a process known as "reconciliation") to figure out which parts of the UI need to be updated.
- ReactDOM handles the rendering of React components into the actual DOM. When React components change (e.g., due to state or props updates), ReactDOM ensures that only the necessary changes are made to the DOM, optimizing performance and minimizing unnecessary updates.

**In short:**

- React manages and updates the state and UI components.
- ReactDOM is responsible for rendering the React components into the actual DOM and handling the updates efficiently.

---

## what is Fragement:

In React, each component must return a single root element. In many cases, however, you might want to return multiple elements from a component without wrapping them in a parent container like a `div`. If you use `div` just to group elements, it can unnecessarily add extra nodes to the DOM and make your HTML structure more complex.

**Why use a Fragment?**

- **No Extra DOM Elements:** Fragments allow you to return multiple elements from a component without adding an extra parent node to the DOM. This keeps the DOM cleaner.
- **Better Semantics:** You don't clutter the HTML structure with unnecessary wrapper elements like `div` or `span`.
- Example:

```javascript
import React from 'react';

function List() {
  return (
    <>
      <h2>Items List</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </>
  );
}

```

In this case, `<>` and `</>` (shorthand for `React.Fragment`) allow you to group elements without introducing extra elements in the DOM. The result will just be the h2 and ul tags.

---

## what is prop:

**Props** (short for properties) are how data is passed from one component to another in React. They are read-only and allow parent components to pass information to child components.

Example:
```javascript
import React from 'react';

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}

export default App;
```

**In this example:**
- The `App` component passes the `name` prop to the `Greeting` component.
- The `Greeting` component receives the `name` prop and displays it.
