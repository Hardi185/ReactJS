import './App.css'
import conf from './conf/config'


function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  console.log(conf.appwriteBucketId)
  return (
    <>
      <div className='bg-green-500'>This is vlog</div>
    </>
  )
}

export default App
