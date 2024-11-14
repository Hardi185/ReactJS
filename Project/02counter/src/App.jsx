import { useState } from 'react'

function App() {
  let [count, setCount] = useState(5)

  const addValue = () => {
    count = count + 1;
    setCount(count)
    console.log("count", count)
  }

  const removeValue = () => {
    count = count - 1;
    setCount(count)
    console.log("count", count)
  }

  return (
    <>
     <h1>Counter project</h1>
     <h2>Counter value: {count}</h2>

     <button
     onClick={addValue}
     >Add Value</button>
      <br/>
     <button
     onClick={removeValue}
     >Remove Value</button>
    </>
  )
}

export default App
