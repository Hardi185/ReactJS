import { useState } from 'react'

function App() {
  let [count, setCount] = useState(5)

  const addValue = () => {
    count = count + 1;
    setCount(count)

    //what will be outcome after this code run
    //if you're at 15 you'll get 16
    //but why not 19
    //because useState send data in UI or state for update in batches
    //as we can see setCounter has been called 4 times
    //so all of this will be send in one batch
    // setCount(count)
    // console.log("count 1", count)
    // setCount(count)
    // console.log("count 2", count)
    // setCount(count)
    // console.log("count 3", count)
    // setCount(count)
    // console.log("count 4", count)

    // what if we really need such kinda functionally
    // we need to get access of prev and do the same thing
    // setCount(prev => prev + 1)
    // console.log("count 1", count)
    // setCount(prev => prev + 1)
    // console.log("count 2", count)
    // setCount(prev => prev + 1)
    // console.log("count 3", count)
    // setCount(prev => prev + 1)
    // console.log("count 4", count)
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
