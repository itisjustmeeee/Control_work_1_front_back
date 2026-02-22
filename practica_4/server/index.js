const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Создание базовых 11 продуктов
let products = [
  { id: 1, name: 'iPhone 14', category: 'Smartphones', description: 'Latest Apple smartphone with A15 chip.', price: 999, stock: 50 },
  { id: 2, name: 'Samsung Galaxy S23', category: 'Smartphones', description: 'High-end Android phone with Snapdragon processor.', price: 899, stock: 30 },
  { id: 3, name: 'MacBook Pro', category: 'Laptops', description: 'Powerful laptop for professionals.', price: 1999, stock: 20 },
  { id: 4, name: 'Dell XPS 13', category: 'Laptops', description: 'Compact ultrabook with InfinityEdge display.', price: 1299, stock: 15 },
  { id: 5, name: 'Sony WH-1000XM5', category: 'Headphones', description: 'Noise-cancelling over-ear headphones.', price: 399, stock: 100 },
  { id: 6, name: 'AirPods Pro', category: 'Headphones', description: 'Wireless earbuds with active noise cancellation.', price: 249, stock: 80 },
  { id: 7, name: 'Google Pixel Watch', category: 'Smartwatches', description: 'Wear OS smartwatch with Fitbit integration.', price: 349, stock: 40 },
  { id: 8, name: 'Apple Watch Series 8', category: 'Smartwatches', description: 'Advanced health tracking smartwatch.', price: 399, stock: 60 },
  { id: 9, name: 'Kindle Paperwhite', category: 'E-readers', description: 'Waterproof e-reader with high-resolution display.', price: 129, stock: 200 },
  { id: 10, name: 'Nintendo Switch', category: 'Gaming Consoles', description: 'Hybrid gaming console for home and portable play.', price: 299, stock: 25 },
  { id: 11, name: 'PlayStation 5', category: 'Gaming Consoles', description: 'Next-gen console with ray tracing.', price: 499, stock: 10 }
];

let nextId = 12;

// получение всех продуктов
app.get('/products', (req, res) => {
  res.json(products);
});

// создание нового продукта
app.post('/products', (req, res) => {
  const newProduct = { id: nextId++, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// поиск продукта
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

// удаление продукта
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});