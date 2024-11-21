# React Context API Example

This project demonstrates how to use React's Context API to share global data (like userData) across components without passing props through each component layer.

## Table of Contents
1. [Introduction](#introduction)
2. [Why is Context Used?](#why-is-context-used)
   - [1. Avoid Prop Drilling](#avoid-prop-drilling)
   - [2. Global State Management](#global-state-management)
   - [3. Efficient Re-rendering](#efficient-re-rendering)
3. [How Does Context Work in React?](#how-does-context-work-in-react)
   - [1. Creating Context](#creating-context)
   - [2. Provider](#provider)
   - [3. Consumer](#consumer)
4. [Example of Context in React](#example-of-context-in-react)
   - [1. Step 1: Create a Context](#step-1-create-a-context)
   - [2. Step 2: Use the Context in Components](#step-2-use-the-context-in-components)
   - [3. Step 3: Wrap the App with ThemeProvider](#step-3-wrap-the-app-with-themeprovider)

---

## 1. Introduction

In React, Context provides a way to share values (such as data or functions) across components, without having to pass props manually at every level of the component tree. It's particularly useful when you need to share global data (such as user authentication status, themes, language settings, or other app-wide settings) across many components.

---

## 2. Why is Context Used?

### 2.1. Avoid Prop Drilling

When you need to pass data through many layers of components (also called prop drilling), it can be tedious and lead to repetitive code. Context allows you to avoid this by providing a way to share data globally without passing props through every intermediate component.

### 2.2. Global State Management

Context is commonly used for state that needs to be accessed by many components, such as user authentication state, theme preferences (dark mode or light mode), language settings, etc.

### 2.3. Efficient Re-rendering

When context values change, only the components that consume the context will re-render, which makes it more efficient than passing props down through many layers.

---

## 3. How Does Context Work in React?

### 3.1. Creating Context

You first create a context object using `React.createContext()`. This object has two main components: a Provider and a Consumer.

### 3.2. Provider

The Provider component allows you to set a value that will be shared across the tree of components. Any component that is wrapped in the Provider will have access to this value.

### 3.3. Consumer

Components that need to access the value provided by the Provider use the Consumer or, in modern React (with hooks), the `useContext` hook to access the context value.

---

## 4. Example of Context in React
Here’s an example to illustrate how Context is used:

### Step 1: Create a Context

```javascript
import React, { createContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // The value we want to share (state in this case)
  const [theme, setTheme] = useState('light');

  // A method to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // Provide the context value to child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };

```

### Step 2: Use the Context in Components
Now, inside any component that is a child of `ThemeProvider`, you can access the `theme` and `toggleTheme` values.

```javascript
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>The current theme is {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemedComponent;

```

### Step 3: Wrap the App with ThemeProvider
In your App.jsx or main entry component, wrap your app with the ThemeProvider so that all components within the app can access the theme context.


```javascript
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import ThemedComponent from './ThemedComponent';

function App() {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
}

export default App;

```
