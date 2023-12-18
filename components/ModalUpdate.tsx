import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { createIssueSchema } from '@/app/api/items/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: {
    itemID: string;
  };
}

type IssueForm = z.infer<typeof createIssueSchema>;

const ModalUpdate: React.FC<ModalProps> = ({ isOpen, onClose, params }) => {
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<IssueForm>({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const { itemID } = params;
  
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`/api/items/${itemID}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const itemData = await response.json();
        
        setFormData({
          name: itemData.name,
          description: itemData.description,
          price: itemData.price,
          image: itemData.image,
        });

      } catch (error) {
        console.log('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [itemID]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/items/${itemID}`, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
    } else{
      const updatedData = await response.json();
      setFormData(updatedData)
    }
  
      onClose()
      setSubmitting(false);
      reset();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      setSubmitting(false);
    }
  });
  
  

  return (

    <div
      className={`fixed inset-0 ${
        isOpen ? 'visible' : 'hidden'
      } flex items-center justify-center bg-black bg-opacity-50 z-50`}
      onClick={onClose}
    >
      {error && <div>{error}</div>}

      <div
        className="bg-white p-8 rounded-lg md:w-4/12 sm:w-10/12 w-full mx-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-2xl text-center font-bold mb-5 text-gray-600'>Update Item</h1>
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
              value={formData.name}
              placeholder='Name'
              {...register('name')}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              value={formData.description}
              placeholder='Description'
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none h-30	"
              required
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
              value={formData.price}
              placeholder='Price'
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
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
              value={formData.image}
              placeholder='Image Link'
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          
      
          <div className="flex justify-end gap-2">
            <button className='bg-zinc-300 py-2 px-4 rounded-md font-semibold hover:bg-zinc-400' onClick={onClose}>Close</button>
            <button
              type="submit"
              className="bg-red-500 flex font-semibold text-white px-6 py-2 rounded-md disabled:bg-zinc-400 hover:bg-red-600"
              disabled={isSubmitting} 
            >
              Submit {isSubmitting && <Spinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
