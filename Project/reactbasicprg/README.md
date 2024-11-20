# React Bundler Overview

This document provides a step-by-step guide to setting up a React project using `create-react-app` and an explanation of key concepts and commands.

---

## Table of Contents
1. [Steps to Implement a React Bundler](#steps-to-implement-a-react-bundler)  
2. [How It Works](#how-it-works)  
3. [What is `npm run build` and `npm run start`](#what-is-npm-run-build-and-npm-run-start)  
4. [What is React.StrictMode](#what-is-reactstrictmode)  

---

## Steps to Implement a React Bundler

1. **Install Node.js and npm**  
   Ensure [Node.js](https://nodejs.org/) and npm (Node Package Manager) are installed. They provide the environment and tools for managing packages and running scripts.

2. **Create a React App**  
   Use the `create-react-app` command to set up a new React project with a pre-configured bundler (Webpack).  

   ```bash
   npx create-react-app my-app
   cd my-app

3. **Understand the Structure**
- src/index.js: The entry point of the application where React starts rendering.
- public/index.html: The HTML file where your React app is injected.
- src/App.js: The main component of the application.

4. **Run the Development Server**

```bash
npm start
or
npm run start
```

NOTE: **Build for Production:**

```bash
npm run build
```
This command optimizes and bundles the code for production, generating a build folder.

---

## How It Works
Entry Point: The src/index.js file serves as the entry point. It renders the root component (App.js) into the div with the ID root in public/index.html. Webpack, the bundler used by create-react-app, identifies this entry point automatically.

Example: src/index.js:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
it's not mandatory to name the file index.js, but it's conventionally named so in most React projects because:

Webpack Default Behavior: Webpack (used by create-react-app) considers index.js as the default entry point in the src folder if not explicitly specified in its configuration.
Simplifies Imports: If a folder contains an index.js file, you can import from the folder directly without specifying the file name.

---

## What is npm run build and npm run start?

**npm run start:**
- Starts the development server.
- Runs on localhost:3000 by default.
- Watches for file changes and reloads the browser.

**npm run build:**
- Creates an optimized production-ready build.
- Outputs minified files in the build folder for deployment.

---

## What is React.StrictMode?

- A development tool that highlights potential problems in an application.
- Wraps components in React.StrictMode to check for:
-    Unsafe lifecycle methods.
-    Deprecated APIs.
-    Side effects during rendering.





   
