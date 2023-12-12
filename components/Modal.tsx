import { useState } from 'react';
import Spinner from './Spinner';
import { createIssueSchema } from '@/app/api/items/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type IssueForm = z.infer<typeof createIssueSchema>

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false);

  const {register, handleSubmit, formState: { errors, isValid  }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });


  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  });
  return (

    <div
      className={`fixed inset-0 ${
        isOpen ? 'visible' : 'hidden'
      } flex items-center justify-center bg-black bg-opacity-50`}
      onClick={onClose}
    >
      {error && <div>{error}</div>}
      {/* Modal content */}
      <div
        className="bg-white p-8 rounded-lg md:w-4/12 sm:w-10/12 w-full mx-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-2xl text-center font-bold mb-5 text-gray-600'>Add Item</h1>
        <form 
          onSubmit={onSubmit}
        >
    
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder='Name'
              {...register('name')}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              value={description}
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none h-30	"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="text"
              id="price"
              {...register('price')}
              value={price}
              placeholder='Price'
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Image Link
            </label>
            <input
              type="text"
              id="image"
              {...register('image')}
              value={imageLink}
              placeholder='Image Link'
              onChange={(e) => setImageLink(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          
      
          <div className="flex justify-end gap-2">
            <button className='bg-zinc-300 py-2 px-4 rounded-md font-semibold hover:bg-zinc-400' onClick={onClose}>Close</button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting} 
              className="bg-red-500 flex font-semibold text-white px-6 py-2 rounded-md disabled:bg-zinc-400 hover:bg-red-600"
       
            >
              Submit {isSubmitting && <Spinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
