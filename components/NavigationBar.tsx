'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { NavigationLinks } from '@/constants';
import Link from 'next/link';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { LuMenu } from "react-icons/lu";



const NavigationBar = () => {

  const currentPath = usePathname()
  const [toggleDropdown, setToggleDropdown] = useState(false);


  return (
    <nav className='flex space-x-3 border-b-2 px-5 h-14 items-center justify-between sticky top-0 w-full shadow-md bg-white z-10 '>
      <Link href='/' className='flex items-center mx-4'>
        <Image 
          src="/images/logo_sarisari.png" 
          alt='Sari-Sari Logo'
          width={120}
          height={120}
          className='object-contain' 
        />
      </Link>
   
      {/* Desktop Navigation */}
      <ul className='sm:flex space-x-6 hidden' >
        {NavigationLinks.map(link =>(
          <li key={link.href}>
            <Link 
              href={link.href}
              className={classnames({
                'text-white rounded-lg bg-red-400 font-semibold': link.href === currentPath,
                'text-zinc-500 rounded-lg': link.href !== currentPath,
                'hover:text-red-300 hover:bg-red-50 hover:rounded-lg p-2 transition-colors': true
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}

      </ul>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative z-20'>
        <LuMenu size={40} className={`${toggleDropdown ? 'text-red-400 cursor-pointer': "text-black-400"}`}  onClick={()=> setToggleDropdown((prev) => !prev)}/>
        {toggleDropdown && (
        <div className='absolute right-0 top-full mt-4 w-sm p-5 rounded-lg bg-red-50 min-w-[200px] flex flex-col gap-2 justify-end items-end opacity-90 z-20'>
          {NavigationLinks.map(link => (
            <Link
              href={link.href}
              className={classnames({
                'text-white rounded-lg bg-red-400 font-semibold': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-red-300 hover:bg-red-50 hover:rounded-lg p-2 transition-color': true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      </div>
       
       
          
          
        

     
    </nav>
  )
}

export default NavigationBar