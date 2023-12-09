'use client'

import Link from 'next/link'
import React from 'react'

const ItemsPage = () => {
  return (
    <div>
      <button className='p-2 bg-red-300 m-5 rounded-lg text-white font-semibold'><Link href='/items/new'>Add Items</Link></button>
    </div>
  )
}

export default ItemsPage