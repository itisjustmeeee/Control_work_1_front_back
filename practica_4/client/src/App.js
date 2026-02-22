import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

// получение продукта
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    setProducts(data);
  };

// создание продукта
  const createProduct = async (product) => {
    const res = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
  };

// изменение продукта
  const updateProduct = async (id, updatedProduct) => {
    const res = await fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    setProducts(products.map(p => (p.id === id ? data : p)));
    setEditingProduct(null);
  };

// удаление продукта
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const startEdit = (product) => {
    setEditingProduct(product);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1>
            <Link to="/">Electronics Store</Link>
          </h1>
          <nav>
            <Link to="/">Все товары</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm
                  onSubmit={editingProduct ? (data) => updateProduct(editingProduct.id, data) : createProduct}
                  initialData={editingProduct}
                  onCancel={cancelEdit}
                />
                <ProductList
                  products={products}
                  onEdit={startEdit}
                  onDelete={deleteProduct}
                />
              </>
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />

          <Route path="*" element={<h2>Страница не найдена (404)</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;