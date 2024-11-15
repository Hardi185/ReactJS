import './App.css'
import Card from './components/Card'

function App() {
  let myObj = {
    username: "hardi",
    age: 23
  }
  let newArr = [1, 2, 3]

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Tailwind understanding</h1>
      <Card username="card1" btnText="click me" />
      <Card username="card2" />
    </>
  )
}

export default App
