'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import SpinnerTwo from "./SpinnerTwo";
import SearchBar from "./SearchBar";
import Modal from "./Modal";

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}



//GENERICS

// interface testMe<T extends object>{
//   id: string;
//   username: string;
//   extra: T[]
// }

// TYPE

// export type PostProps = {id: number, username: string};


const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); 


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearch = (searchQuery: string | Item[]) => {
    if (typeof searchQuery === 'string') {
      setFilteredItems(() =>
        items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(() => searchQuery); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/items/");
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      
      {loading ? (
        <div className="text-center"><SpinnerTwo /></div>
      ) : (
        <div className="bg-red-100">    
          <div className='flex justify-between items-center'>
            <button
              onClick={handleOpenModal}
              className="bg-red-400 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-500 m-5 md:w-1/6 w-1/"
            >
              Add Item
            </button>
            <SearchBar onSearch={handleSearch} />
          </div>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5 place-items-center">
          {(filteredItems.length > 0 ? filteredItems : items).map((item) => (
            <div
              className="rounded-md shadow-lg overflow-hidden sm:w-full cursor-pointer hover:scale-105 bg-gradient-to-t from-red-500 to-zinc-50 mb-5"
              key={item.id}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={400}
                className="rounded-t-md"
              />
              <div className="font-semibold text-center mt-2 text-sm sm:text-lg md:text-2xl text-white">{item.name}</div>
              <div className="text-sm sm:text-lg md:text-xl text-white text-center p-2 rounded-md mr-4">₱{parseFloat(item.price).toFixed(2)}</div>
              <button className="p-2 bg-white text-gray-500 w-full font-semibold hover:bg-gray-100">
                <Link href={`/items/${item.id}`}>
                  View Details
                </Link>
              </button>
            </div>
          ))}
        </div>
        </div>   
      )}
    </div>
  );
};

export default Items;