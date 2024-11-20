# React Hooks: A Comprehensive Guide

---

## Table of Contents
- [What is Hook?](#what-is-hook)
- [Hooks/Functions](#hooks/functions)
- [Popular React Hooks with Examples](#popular-react-hooks-with-examples)
  - [1. `useState`](#1-usestate)
  - [2. `useEffect`](#2-useffect)

---

## What is Hook?

React hooks provide a way to manage state and side effects in functional components. You can think of React hooks as a more efficient and declarative way to connect the UI and state.

### How do hooks help?
- **State Management**: With `useState`, you can manage state in a function component, which would otherwise require a class component in React.
- **UI Update**: When state changes (via `setState`), React automatically re-renders the component and updates the UI to reflect the new state.

---

## Hooks/Functions

Now, Question is if we can same thing using fuction then why hook?
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

**No State Management:** The count guests is just a regular variable. When the component re-renders, the value of guests will reset back to 0. It can’t keep track of the previous count.
**No Re-render:** React will not know to update the UI when the value of guests changes, because it's not connected to React’s rendering system.

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

**State Persistence:** guests is now part of React's state. When the component re-renders (e.g., when a new guest is added), the state is preserved.
**Reactivity:** When you call setGuests, React automatically triggers a re-render, updating the UI to reflect the new state.
**No Boilerplate:** You don’t need to manually set up a class-based component or worry about lifecycle methods to handle updates. Hooks simplify the code.

---


