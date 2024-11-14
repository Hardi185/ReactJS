import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const testVar = "Hello Hardi"

//check which element of react is supported by yourself
const reactElement = {
  type: 'a',
  props: {
      href: 'https://google.com',
      target: '_blank'
  },
  children: 'Click me to visit google'
}

const reactElement2 = React.createElement(
  'a',
  {href: 'https://google.com', target: '_blank'},
  'Click me to visit google',
  testVar
)

const reactElement3 = (
  <a href="https://google.com" target='_blank'>Visit Google</a>
)

ReactDOM.createRoot(document.getElementById('root')).render(
    // <App />
    //reactElement
    // reactElement2
    reactElement3
)
