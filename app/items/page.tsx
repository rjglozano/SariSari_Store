'use client'

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Items from '@/components/Items';
import SearchBar from '@/components/SearchBar';

const ItemsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

 

  return (
    <div className='min-h-screen bg-zinc-200'>
      <div className='flex justify-between items-center'>
        <button
          onClick={handleOpenModal}
          className="bg-red-400 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-500 m-5 md:w-1/6 w-1/"
        >
          Add Item
        </button>
        <SearchBar />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Items />
     
    </div>
  );
};

export default ItemsPage;
