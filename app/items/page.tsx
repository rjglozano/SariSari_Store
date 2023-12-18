'use client'

import React, { useState } from 'react';
import Items from '@/components/Items';
const ItemsPage: React.FC = () => {

  return (
    <div className='min-h-screen bg-red-100'>
      <Items />
    </div>
  );
};

export default ItemsPage;
