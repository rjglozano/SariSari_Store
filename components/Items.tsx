'use client'

import { useEffect, useState } from "react";

interface Item {
  id: number;
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
        const response = await fetch("http://localhost:3000/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 m-5 ">
        {items.map((item) => (
          <div className="bg-red-400 rounded-md shadow-lg" key={item.id}>
            <img className="rounded-t-md" src={item.image} alt={item.name} />
              <div className="flex items-center justify-between">
                <div className="font-semibold text-start p-4 text-2xl text-white">{item.name}</div>
                <div className="font-semibold text-xl text-black p-2 rounded-md bg-white mr-4">₱{parseFloat(item.price).toFixed(2)}</div>
              </div>
              <button className="p-2 bg-white text-gray-500 w-full">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
