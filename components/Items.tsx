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
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p className="">Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <img src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
