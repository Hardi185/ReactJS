# Redux Guide

This repository explains Redux concepts, installation, and key components with examples. It also compares Redux with Context API, highlighting performance improvements and use cases.

---

## Table of Contents

1. [What is Redux?](#what-is-redux)
2. [Key Concepts in Redux](#key-concepts-in-redux)
   - [Store](#store)
   - [Slice](#slice)
   - [Reducer](#reducer)
   - [Selector](#selector)
   - [Dispatch](#dispatch)
3. [Installation Steps](#installation-steps)
4. [Redux vs Context API](#redux-vs-context-api)
   - [Performance Issues in Context API](#example-of-performance-issues-with-context)
   - [Why Redux Solves These Issues](#why-redux-solves-these-issues)

---

## What is Redux?
Redux is a state management library commonly used with JavaScript applications (especially with React). It provides a predictable state container to manage the application’s global state. Redux helps manage complex state transitions in a consistent and testable manner, making it easier to scale applications.

---

## Key Concepts in Redux

1. **Store:**

- The single source of truth for the application's state.
- Created using the createStore or configureStore method.
- Example:

```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer, // Combines all slices
});
```
- Wrap Your App with the Provider


```javascript

ReactDOM.render(
  <Provider store={store}>
    <TODO />
  </Provider>,
  document.getElementById('root')
);

```

2. **Slice:**

- A slice is a collection of Redux logic for a single feature or state domain (e.g., a "todos" slice).
- Defined using the createSlice function in Redux Toolkit.
- Example:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

3. **Reducer:**

- A pure function that specifies how the state should change in response to an action.
- Each slice has its own reducer generated automatically by createSlice.

4. **Selector:**

- Functions used to extract specific pieces of data from the Redux store.
- Example:

```javascript
export const selectTodos = state => state.todos;
```

5. **Dispatch:**

- A method used to send actions to the Redux store, triggering the reducer to update the state.
- Example:

```javascript
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

const dispatch = useDispatch();
dispatch(addTodo({ id: 1, text: 'Learn Redux' }));
```

---

## Installation Steps:

- **React Redux:** Provides bindings for React and Redux, enabling components to access and interact with the Redux store easily.
- **@reduxjs/toolkit:** Simplifies Redux setup with utilities like configureStore, createSlice, and built-in best practices (e.g., immutability and middleware setup).

To install React Redux and @reduxjs/toolkit using npm, follow these steps:

```bash
npm install react-redux @reduxjs/toolkit

```

---

## Redux vs Context API

When using the React Context API, any change in the value of a context causes all components that consume that context to re-render, regardless of whether the change affects them directly. This is because React Context doesn't have a built-in mechanism to determine which specific consumers need updates.

### Example of Performance Issues with Context
Imagine a scenario where you have a simple app with two components:
- A **ThemeSwitcher** that toggles between light and dark themes.
- A **UserProfile** component that displays user details.

Both components consume the same context: `AppContext`.

1. **Create the Context:**

```javascript
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John Doe', age: 30 });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user }}>
      {children}
    </AppContext.Provider>
  );
}
```

2. **Consuming Context in Components:**
- **ThemeSwitcher Component:**

```javascript
import React, { useContext } from 'react';
import { AppContext } from './AppProvider';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(AppContext);

  console.log('ThemeSwitcher rendered');

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

export default ThemeSwitcher;

```

- **UserProfile Component:**

```javascript
import React, { useContext } from 'react';
import { AppContext } from './AppProvider';

function UserProfile() {
  const { user } = useContext(AppContext);

  console.log('UserProfile rendered');

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UserProfile;
```

3. **Wrapping the app:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './AppProvider';
import ThemeSwitcher from './ThemeSwitcher';
import UserProfile from './UserProfile';

function App() {
  return (
    <AppProvider>
      <ThemeSwitcher />
      <UserProfile />
    </AppProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

```

**Observing the Problem**

 1. Open the browser console.
 2. Click the "Switch to dark mode" button in the `ThemeSwitcher` component.

**Issue**

- Both ThemeSwitcher and UserProfile re-render, even though the user value remains unchanged.
- This happens because AppContext.Provider re-renders whenever its value prop changes (due to the theme state update), and all consuming components are notified.

```bash
ThemeSwitcher rendered
UserProfile rendered
```

**Why Does This Happen?**

The AppContext.Provider creates a new value object on every render:

```javascript
value={{ theme, toggleTheme, user }}
```
Since this object is re-created, React assumes the context has changed, causing all consumers to re-render.

Although, To avoid unnecessary re-renders, you can split the context or use memorization but redux is better.

### Why Redux Solves This Issue

Redux uses a selector pattern to optimize re-renders. With Redux, only components that rely on the specific piece of state being updated will re-render. Other components remain unaffected, which addresses the performance bottlenecks of React Context.

**Example in Redux:**
- **ThemeSwitcher** will subscribe to `theme` in the Redux store.
- **UserProfile** will subscribe to `user`.

State updates in Redux are more granular because subscriptions are scoped to the specific data pieces a component depends on.
