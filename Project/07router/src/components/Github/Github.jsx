import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export function Github() {
    //data is coming using loader we adde on main.jsx
    //so no longer useEffect is needed, which fetches data after component is rendered
    const data = useLoaderData()
    // const [data, setData] = useState([])
    useEffect(() => {
     fetch('https://api.github.com/users/Hardi185')
     .then(response => response.json())
     .then(data => {
        console.log(data);
        setData(data)
     })
    }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Hardi185')
    return response.json()
}
