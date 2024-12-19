# React Hooks:
Here are the topics will be including:

---

## Table of Contents
- [What is Hook?](#what-is-hook)
- [Hooks vs Functions](#hooks-vs-functions)
- [Popular React Hooks with Examples](#popular-react-hooks-with-examples)
  - [1. `useState`](#1-usestate)
  - [2. `useEffect`](#2-useeffect)
  - [3. `useRef`](#3-useref-hook)
  - [4. `useCallback`](#4-useCallback-Hook)
  - [5. `useContext`](#5-useContext-hook)
  - [6. `useReducer`](#6-useReducer-hook)
  - [7. `useMemo`](#7-useMemo-hook)
  - [8. `useLayoutEffect`](#8-useLayoutEffect-hook)
  - [9. `useDebugValue`](#9-useDebugValue-hook)

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

---

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

### 3. useRef hook:

#### 3.1 What is useRef in React?
useRef is a React hook that provides a way to create and manage a "mutable reference" that persists across re-renders of a component. It returns an object with a single property: .current. This .current property can hold any value (e.g., DOM element, primitive, or object), and updating it does not trigger a re-render of the component.

#### 3.2 Why is useRef Important/Used?
- Accessing DOM Elements: It allows you to directly interact with DOM elements (e.g., focusing an input field, scrolling, or reading the value of a DOM node).

- Persisting Values: It can hold mutable data that doesn't trigger a re-render. For example, it can store the previous value of a variable or track a timer ID in a setInterval.

- Avoiding Re-renders: Unlike state, changing the value of .current doesn’t cause the component to re-render, which can optimize performance.

#### 3.3 Example: Using `useRef`:
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


#### 3.4 Key Takeaways:
- Use useRef for persistent, mutable values that don’t affect the UI directly.
- It’s great for DOM manipulation, performance optimizations, and tracking values across renders.
- Avoid using useRef as a substitute for state when the UI should react to changes. Use it as a complementary tool for managing non-render-affecting values.

---

### 4. useCallback Hook

The `useCallback` hook is used to memoize functions in React. It helps to avoid unnecessary re-creations of functions on each render, improving performance, especially in cases where the function is passed down to child components or used in expensive computations.

#### 4.1 Why Do We Need useCallback?

In React, functions are re-created each time a component re-renders. This may not be a problem for simple cases, but if the function is passed as a prop to child components or used in hooks like `useEffect`, it may trigger unnecessary re-renders or re-executions of the effect.

`useCallback` helps to memoize a function, so it is only re-created if its dependencies (such as props or state values) change. This can optimize performance in certain scenarios.


#### 4.2 When to Use useCallback

- **Passing functions to child components:** If you pass a function as a prop to a child component and want to avoid unnecessary re-creations on each render.
- **Using functions inside `useEffect` or `useMemo`:** When a function is used inside `useEffect` or `useMemo`, and you want to prevent the hook from being called repeatedly.


#### 4.3 Example of useCallback

Here’s an example where useCallback is used to avoid unnecessary re-renders of a child component.

**Without useCallback:**

```javascript
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // This function will be recreated every time Parent renders
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <Child handleClick={handleClick} />
    </div>
  );
}

function Child({ handleClick }) {
  console.log("Child component rendered");

  return <button onClick={handleClick}>Click me</button>;
}

export default App;
```


**With useCallback:**

```javascript
import React, { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Memoizing the handleClick function
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <Child handleClick={handleClick} />
    </div>
  );
}

function Child({ handleClick }) {
  console.log("Child component rendered");
  return <button onClick={handleClick}>Click me</button>;
}

export default App;
```

**Explanation of the Updated Example:**
- useCallback ensures that the handleClick function is only recreated when the count value changes.
- This prevents unnecessary re-creations of the function and avoids unnecessary re-renders of the Child component when the count state in the Parent component updates.

Now, the Child component will only re-render if the handleClick function changes (i.e., if count changes). If count doesn’t change, the function is the same across renders, and the Child component won't re-render unnecessarily.


#### 4.4 Purpose of `useCallback` vs `useEffect`

- **`useCallback`** is specifically designed to memoize functions and optimize the performance of your components by preventing unnecessary re-creations of functions, especially when they are passed to child components.
- **`useEffect`** is for handling side effects like fetching data or subscribing to events, and it doesn't memoize functions or prevent their re-creations(not optimized way).

Let's understand with example:

```javascript
import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  // Using useCallback
  const memoizedFunction = useCallback(() => {
    console.log("Memoized Function:", count);
  }, [count]);

  // Using useEffect
  useEffect(() => {
    const effectFunction = () => {
      console.log("Effect Function:", count);
    };

    effectFunction(); // Just demonstrating recreation

    // No cleanup required in this example, but generally you'd handle cleanup
  }, [count]);

  console.log("App rendered");

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={memoizedFunction}>Memoized Callback</button>
    </div>
  );
}

export default App
```

**Explanation of the Updated Example:**
- useCallback ensures that the handleClick function is only recreated when the count value changes.
- This prevents unnecessary re-creations of the function and avoids unnecessary re-renders of the Child component when the count state in the Parent component updates.

Now, the Child component will only re-render if the handleClick function changes (i.e., if count changes). If count doesn’t change, the function is the same across renders, and the Child component won't re-render unnecessarily.

##### Key Observations

1. **On Initial Render:**

useEffect runs immediately after the first render because that's its nature: it always runs after the component has been mounted.
useCallback does not "run" on its own; it's just a mechanism to memoize a function. It will only execute when explicitly invoked (like when the button calls memoizedFunction).

2. **On State Change (count changes):**

useEffect re-runs because its dependency array contains count. This causes effectFunction to log the updated value of count.
useCallback still does not "run" on its own, but the memoized function retains access to the latest count value because closures in JavaScript inherently have access to the latest state of variables.

3. **When Clicking Memoized Callback:**

- The `memoizedFunction` is explicitly invoked when the button is clicked. At this point, it logs the latest count value because the `useCallback` function always has access to the most recent state through its closure.
- The `useCallback` hook ensures that the function reference is stable between renders as long as its dependency array ([count]) doesn't change. However, the function itself still has access to the latest state of count through JavaScript's closure mechanism.

---

### 5. useContext hook

[Please refer this](https://github.com/Hardi185/ReactJS/blob/main/Context%20API.md)

---

### 6. useReducer hook

The `useReducer` hook is a more advanced alternative to `useState` for managing complex state logic in functional React components. It utilizes a reducer function to determine how the state should change based on dispatched actions.

#### When to Use `useState` vs. `useReducer`

**Use `useState`**

- **For simple state logic**: When managing a single piece of state or unrelated state variables.
- **When state updates are independent**: If updating one state doesn’t depend on others.
- **For UI-focused state**: Ideal for toggling visibility, managing form inputs, or counters.

**Use `useReducer`**

- **For complex state logic**: When your state has multiple sub-values or interdependent updates.
- **When state transitions are determined by actions**: Use it when state updates are handled via actions (similar to Redux).
- **For scalable patterns**: Ideal for scenarios like to-do lists, form wizards, or when the next state depends on the previous one.


#### Examples

#### Simple State with `useState`

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

#### Complex State with `useReducer`

```jsx
import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### Key Differences

| Feature          | `useState`               | `useReducer`                 |
|------------------|--------------------------|------------------------------|
| **Best for**     | Simple state             | Complex or interdependent state |
| **Update Logic** | Inline (`setState`)      | Centralized in a reducer     |
| **Scalability**  | Small-scale state        | Large-scale or structured state |
| **Ease of Use**  | Easier to use            | Requires understanding of reducers |

---

### 7. useMemo Hook:

The `useMemo` hook is a performance optimization tool in React functional components. It memoizes the result of a computation, ensuring it only re-computes when its dependencies change. This prevents unnecessary and expensive calculations during re-renders.

#### What is `useMemo`?

`useMemo` is a React hook that memoizes the result of an expensive function, ensuring that the function is only re-executed when one of its dependencies changes. This is particularly useful for optimizing components that perform costly computations or when avoiding unnecessary re-renders.

#### When to Use `useMemo`

- **Expensive calculations**: Use `useMemo` when a function performs complex calculations that don’t need to run on every render.
- **Preventing re-renders**: Avoid re-executing computations when the dependencies have not changed.
- **Optimization**: When optimizing performance in large applications with heavy computations.

#### Examples

#### Without `useMemo`

```jsx
import React, { useState } from "react";

const ExpensiveCalculation = ({ num }) => {
  const calculate = () => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result + num;
  };

  return <div>Result: {calculate()}</div>;
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ExpensiveCalculation num={10} />
      <button onClick={() => setCount(count + 1)}>Re-render</button>
    </div>
  );
};

export default App;
```

**Problem**
The expensive calculation runs every time the parent component (`App`) re-renders, even though the `num` prop hasn’t changed.

#### With `useMemo`

```jsx
import React, { useState, useMemo } from "react";

const ExpensiveCalculation = ({ num }) => {
  const memoizedResult = useMemo(() => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result + num;
  }, [num]);

  return <div>Result: {memoizedResult}</div>;
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ExpensiveCalculation num={10} />
      <button onClick={() => setCount(count + 1)}>Re-render</button>
    </div>
  );
};

export default App;
```

**Benefit**
The calculation runs only when the `num` prop changes, significantly improving performance by avoiding redundant computations.

## Benefits of `useMemo`

1. **Improved Performance**: Avoids re-execution of expensive calculations when inputs remain unchanged.
2. **Reduced Component Load**: Minimizes the burden on components during re-renders, especially in complex applications.
3. **Selective Memoization**: Provides fine-grained control over which computations are memoized based on dependencies.

---

### 8. useLayoutEffect hook

`useLayoutEffect` is a React Hook that runs synchronously after all DOM mutations and before the browser paints the screen. It is especially useful for tasks requiring DOM measurement or modification to avoid visual glitches.

#### Key Characteristics
- Runs synchronously after DOM updates.
- Prevents visual flickering by applying DOM changes before the browser paints.

#### Common Use Cases
1. **DOM Measurements:**
   - Measuring an element's dimensions (e.g., height or width) immediately after rendering.
2. **Avoiding Visual Glitches:**
   - Eliminating visible flicker caused by DOM changes applied after the browser paint.
3. **Animation Synchronization:**
   - Coordinating animations with DOM updates.

#### Example Usage

```jsx
import React, { useLayoutEffect, useRef, useState } from "react";

const LayoutEffectExample = () => {
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      // Measure the width of the box after rendering
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ width: "50%", backgroundColor: "lightblue" }}>
        Resize the window to measure me!
      </div>
      <p>Box width: {boxWidth}px</p>
    </div>
  );
};

export default LayoutEffectExample;
```

---

#### What Happens If You Use `useEffect` Instead?
Using `useEffect` in the above example might cause a visual glitch where the width is measured after the paint. With `useLayoutEffect`, the measurement occurs before the user sees the rendered output, ensuring smoother visuals.

#### When to Use
- Use `useLayoutEffect` when DOM manipulations or measurements must happen synchronously to prevent flickering or visual glitches.
- Prefer `useEffect` for side effects that don't impact the visual appearance of the UI directly.

---

### 9. useDebugValue hook

`useDebugValue` is a React Hook that adds custom labels for custom hooks in React DevTools. It is purely for debugging purposes and does not impact the runtime behavior of your application.

#### Why is it Important?
- Provides more **informative labels** in React DevTools for custom hooks.
- Helps developers quickly understand the **current state** or behavior of a custom hook.


#### When to Use `useDebugValue`
- **Building Custom Hooks:**
  Use it to improve debugging by adding descriptive labels for the hook’s state or behavior.
- **Debugging State:**
  Add debug information that describes the internal state or logic of the custom hook.

#### Without `useDebugValue`
```javascript
const useCustomHook = () => {
  const [count, setCount] = useState(0);

  return [count, setCount];
};
```
In React DevTools, the hook will appear as:
```
useCustomHook
```

### With `useDebugValue`
```javascript
import { useState, useDebugValue } from "react";

const useCustomHook = () => {
  const [count, setCount] = useState(0);

  // Add a debug value for better visualization in DevTools
  useDebugValue(count > 5 ? "High Count" : "Low Count");

  return [count, setCount];
};
```
In React DevTools, the hook will appear as:
```
useCustomHook: High Count
```

#### Key Points About `useDebugValue`

**Debugging Only**
- Does not affect the application’s behavior or performance.

**Conditional Debugging**
- Use a formatting function to compute a value only when DevTools is open, avoiding unnecessary performance costs.

Example:
```javascript
useDebugValue(value, (value) => (value ? "Debug Info" : "No Info"));
```
