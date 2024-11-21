# React Hooks:
Here are the topics will be including:

---

## Table of Contents
- [What is Hook?](#what-is-hook)
- [Hooks vs Functions](#hooks-vs-functions)
- [Popular React Hooks with Examples](#popular-react-hooks-with-examples)
  - [1. `useState`](#1-usestate)
  - [2. `useEffect`](#2-useeffect)
  - [3. `useRef`](#3-useref)

---

## What is Hook?

React hooks provide a way to manage state and side effects in functional components. You can think of React hooks as a more efficient and declarative way to connect the UI and state.

### How do hooks help?
- **State Management**: With `useState`, you can manage state in a function component, which would otherwise require a class component in React.
- **UI Update**: When state changes (via `setState`), React automatically re-renders the component and updates the UI to reflect the new state.

---

## Hooks vs Functions

Now, Question is if we can do same thing using fuction then why hook?
Let's understand with simple example:

Imagine you are hosting a birthday party. You have a guest counter at the entrance, and each time someone enters the party, you press the counter to keep track of how many people are there.


### Without Hooks (No State Management)

```javascript
function PartyCounter() {
  let guests = 0;  // This is just a local variable, not state

  const addGuest = () => {
    guests += 1;  // Incrementing the counter
    console.log(guests);  // This will work, but won't update the UI automatically
  };

  return (
    <div>
      <h1>Party Counter</h1>
      <p>Number of guests: {guests}</p>
      <button onClick={addGuest}>Add Guest</button>
    </div>
  );
}
````
**Why This Doesn’t Work Well:**

- **No State Management:** The count guests is just a regular variable. When the component re-renders, the value of guests will reset back to 0. It can’t keep track of the previous count.
- **No Re-render:** React will not know to update the UI when the value of guests changes, because it's not connected to React’s rendering system.

### With Hooks: useState

```javascript
import React, { useState } from "react";

function PartyCounter() {
  const [guests, setGuests] = useState(0); // Initializing state

  const addGuest = () => setGuests(guests + 1); // Using setState function to update state

  return (
    <div>
      <h1>Party Counter</h1>
      <p>Number of guests: {guests}</p>
      <button onClick={addGuest}>Add Guest</button>
    </div>
  );
}

export default PartyCounter;
````

**Why This Works:**

- **State Persistence:** guests is now part of React's state. When the component re-renders (e.g., when a new guest is added), the state is preserved.
- **Reactivity:** When you call setGuests, React automatically triggers a re-render, updating the UI to reflect the new state.
- **No Boilerplate:** You don’t need to manually set up a class-based component or worry about lifecycle methods to handle updates. Hooks simplify the code.

---

## Popular React Hooks with Examples

### 1. useState:
Already discussed in the [Hooks vs Functions](#hooks-vs-functions) section.

### 2. useEffect:
The useEffect hook is one of the most powerful and commonly used hooks in React. It is used to handle side effects in function components. Side effects can be operations like:

- Fetching data from an API.
- Directly modifying the DOM (e.g., focus an input field).
- Setting up subscriptions or event listeners.
- Performing cleanup (e.g., removing an event listener when a component is removed).

#### 2.1 Key Points:
- useEffect runs after the render (after the DOM has been updated).
- It can be used to perform operations that do not directly affect the component's render cycle.
- It can run on every render, once on mount, or only when certain variables change.

#### 2.2 Basic Syntax of useEffect:
```javascript
useEffect(() => {
  // Your code here (side effects)
}, [dependencies]);
```

#### 2.3 Example of What Can Go Wrong Without useEffect:
Imagine we are trying to update the document title every time the count state changes:

##### Without useEffect (Incorrect):

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // This would run on every render, leading to unnecessary document.title updates
  document.title = `Count: ${count}`;  

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```
**Problem:**
- **Inefficient:** document.title = Count: ${count}` is executed on every render. This means every time the component re-renders (which can happen frequently), the document title is updated again. This is inefficient and unnecessary.

##### Corrected version with useEffect:
```javascript
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // The effect only runs when the count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);  // Dependency on count, so it runs only when count changes

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Why useEffect is Important:**
- **Efficiency:** The document title will now only be updated when the count changes, avoiding unnecessary updates on every render.
- **Cleanup:** useEffect can also handle cleanup for things like subscriptions or event listeners, ensuring that you don't run into memory leaks.

---

## 3.useRef hook:

### 3.1 What is useRef in React?
useRef is a React hook that provides a way to create and manage a "mutable reference" that persists across re-renders of a component. It returns an object with a single property: .current. This .current property can hold any value (e.g., DOM element, primitive, or object), and updating it does not trigger a re-render of the component.

### 3.2 Why is useRef Important/Used?
- Accessing DOM Elements: It allows you to directly interact with DOM elements (e.g., focusing an input field, scrolling, or reading the value of a DOM node).

- Persisting Values: It can hold mutable data that doesn't trigger a re-render. For example, it can store the previous value of a variable or track a timer ID in a setInterval.

- Avoiding Re-renders: Unlike state, changing the value of .current doesn’t cause the component to re-render, which can optimize performance.

### 3.3 Example: Using `useRef`:
Scenario: A form with an input field that should automatically focus when the page loads.

```javascript
import React, { useRef, useEffect } from "react";

function AutoFocusInput() {
  const inputRef = useRef(null); // Initialize a ref to store the input element

  useEffect(() => {
    inputRef.current.focus(); // Automatically focus the input when the component mounts
  }, []);

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" ref={inputRef} type="text" placeholder="Enter your name" />
    </div>
  );
}

export default AutoFocusInput;
```

**How it Works:**
- The inputRef is initialized using useRef and assigned to the ref attribute of the <input> element.
- When the component mounts, useEffect runs and accesses the actual DOM node via inputRef.current, calling the .focus() method.
- The ref persists even if the component re-renders.


### 3.4 Key Takeaways:
- Use useRef for persistent, mutable values that don’t affect the UI directly.
- It’s great for DOM manipulation, performance optimizations, and tracking values across renders.
- Avoid using useRef as a substitute for state when the UI should react to changes. Use it as a complementary tool for managing non-render-affecting values.









