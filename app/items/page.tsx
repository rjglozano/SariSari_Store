'use client'

import { useState } from 'react';
import Modal from '@/components/Modal';
import Items from '@/components/Items';

const ItemsPage: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='h-screen bg-zinc-200'>
    <button
      onClick={handleOpenModal}
      className="bg-red-300 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-500 m-5"
    >
      Add Item
    </button>

    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    <Items />
  </div>
  )
}

export default ItemsPage

