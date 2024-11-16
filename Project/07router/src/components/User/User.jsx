import React from 'react'
import {useParams} from 'react-router-dom'

function User() {
  const {userid} = useParams()
  return (
    <div className='bg-orange-700 text-black text-3xl p-4'>Users: {userid}</div>
  )
}

export default User