import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Dish/Product';
import EditProduct from './pages/Dish/EditProduct';
import { useState } from 'react';

function App() {
  const [id, setId] = useState();

  const handleGetId = (value) => {
    setId(value);
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home getId={handleGetId}/>} />
      <Route path='/products/:id' element={<Product ProductId={id} />} />
      <Route path='/editproduct/:id' element={<EditProduct/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
