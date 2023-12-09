'use client'

import { useState } from 'react';
import Modal from '@/components/Modal';

const ItemsPage: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='h-screen'>
    <button
      onClick={handleOpenModal}
      className="bg-red-300 text-white px-4 py-2 rounded-md hover:bg-red-400 m-5"
    >
      Add Item
    </button>

    <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
  </div>
  )
}

export default ItemsPage

