import { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface SearchBarProps {
  onSearch: (query: string | Item[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Item[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setQuery(value);
      const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
      
    onSearch?.(filteredItems);
  };

  return (
    <div className='sm:w-1/2 md:w-1/4 mx-5'>
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something..."
          value={query}
          onChange={handleInputChange}
        />
      </div>

    </div>
  );
};

export default SearchBar;
