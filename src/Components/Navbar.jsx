import React from 'react'
import Button from '@mui/material/Button';
const Navbar = ({search, setsearch}) => {
  return (
    <div className='bg-red-500 text-white px-8 py-8 flex justify-between items-center'>
        <div>
            <h1 className='font-bold tracking-widest'>PokiDex</h1>
        </div>
        <div className='flex gap-8 '>
            <input
            type = "text"
            placeholder="Search Pokemon"
            className='px-20 py-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Navbar