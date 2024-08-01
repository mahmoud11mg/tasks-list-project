import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <section className='text-2xl'>
      <h1 className='text-4xl font-semibold'> HomePage </h1>
      <div className='flex items-center justify-end mb-20'> <Link href={"/task/add"} className='bg-cyan-300 hover:bg-cyan-500 text-black font-semibold text-xl rounded-md p-2 transition-colors'>Add Task</Link></div>
      
    
    </section>
  )
}

export default HomePage