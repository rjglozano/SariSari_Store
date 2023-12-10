'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}


const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/items/");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
  }

    fetchData();
  }, []); 

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5 place-items-center	">
      {items.map((item) => (
          <div className="bg-red-400 rounded-md shadow-lg overflow-hidden sm:w-full cursor-pointer hover:scale-105 bg-gradient-to-t from-red-500 to-zinc-50 mb-5" key={item.id}>
            <img className="rounded-t-md" src={item.image} alt={item.name} />
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
  );
};

export default Items;
