'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import SpinnerTwo from '@/components/SpinnerTwo';

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}


const Page = ({ params }: { params: { itemID: string } }) => {
  const [data, setData] = useState<Item | null>(null);
  const { itemID } = params;

  console.log(itemID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/items/${itemID}`);
        const result = await response.json();
  
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (itemID) {
      fetchData();
    }
  }, [itemID]);

  return (
  <div className='min-h-full bg-zinc-200'>
      {data && (
        <div className='flex justify-center items-center'>
          <div className='flex flex-col md:flex md:flex-row md:items-center bg-red-300 my-5 mx-4 rounded-lg'>
            <img className="rounded-t-lg md:rounded-r-none md:rounded-l-lg" src={data.image} alt={data.name} width={400} height={400} />
            <div className='flex flex-col items-start justify-stretch mx-4 space-y-2 p-2'>
              <div className='PatuaFont pt-2 text-4xl font-semibold'>{data.name}</div>
              <div className='font-semibold bg-white rounded-full px-2'>Product Detail</div>
              <div className='text-xs w-60 sm:w-90 md:w-70'>{data.description}</div>
              <div className='flex items-center justify-between w-full pt-5'>
                <div className='text-2xl font-semibold'>₱{parseFloat(data.price).toFixed(2)}</div>
                <div className='flex gap-2'>
                  <div>
                    <Link 
                      href='/'>
                        <MdDelete size={30} className="hover:text-white transition-colors" />
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href='/'>
                        <FaEdit size={30} className="hover:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      )}

      
      {!data && 
        <div className='h-screen'>
          <SpinnerTwo />
        </div>
      
      }
  </div>

  );
};

export default Page;
