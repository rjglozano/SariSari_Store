'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import SpinnerTwo from '@/components/SpinnerTwo';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import ModalUpdate from '@/components/ModalUpdate';

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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/items/${itemID}`);

        if(response.ok){
          const result = await response.json();
          setData(result);
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (itemID) {
      fetchData();
    }
  }, [itemID]);

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/items');
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDelete = async () => {
    closeDeleteModal();   
    try {
      await deleteItem(itemID);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  return (
    
  <div className='min-h-full bg-zinc-200'>
      <ModalUpdate isOpen={isModalOpen} onClose={handleCloseModal} params={{ itemID: itemID }} />
      {isDeleteModalOpen && (
      <div className=' w-full flex items-center justify-center bg-black bg-opacity-50 z-50 h-full fixed'>
        <div className={`bg-white p-2 border-slate-100 rounded-lg `}>
          <div className="modal-overlay" onClick={closeDeleteModal}></div>
          <div className="modal-content">
            <div className="p-4">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</p>
              <div className="flex justify-end">
              <button onClick={closeDeleteModal} className="mr-2 hover:font-semibold">
                Cancel
                </button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {data && (
        <div className='flex justify-center items-center'>
          <div className='flex flex-col md:flex md:flex-row md:items-center bg-red-300 my-5 mx-4 rounded-lg relative'>
            <div>
              <Link 
                href='/items'>
                <IoMdArrowRoundBack size={30} className="text-white hover:scale-125 transition-all absolute top-4 left-3 p-1 bg-red-300 rounded-full" />
              </Link>
            </div>
            <img className="rounded-t-lg md:rounded-r-none md:rounded-l-lg" src={data.image} alt={data.name} width={400} height={400} />
            <div className='flex flex-col items-center mx-4 my-4 space-y-2 p-2'>
              <div className='PatuaFont pt-2 text-4xl font-semibold'>{data.name}</div>
              <div className='font-semibold bg-white rounded-full px-2'>Product Detail</div>
              <div className='text-xs w-64 sm:w-90 md:w-70 h-40 overflow-y-auto'>{data.description}</div>
              <div className='flex items-center justify-between w-full pt-5'>
                <div className='text-2xl font-semibold'>₱{parseFloat(data.price).toFixed(2)}</div>
                <div className='flex gap-1'>
                  <div onClick={openDeleteModal}>
                      <MdDelete size={30} className="hover:text-white transition-colors cursor-pointer" />
                  </div>
                  <div onClick={handleOpenModal}>
                    <FaEdit size={30} className="hover:text-white transition-colors" />
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
