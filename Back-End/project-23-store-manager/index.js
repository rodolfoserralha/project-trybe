require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/products');
const sales = require('./controllers/sales');
const validateProducts = require('./middlewares/products');
const validateSales = require('./middlewares/sales');

const app = express();

app.use(bodyParser.json());

app.get('/products', products.getProducts);
app.get('/products/:id', products.getProductsById);
app.get('/sales', sales.getSales);
app.get('/sales/:id', sales.getSalesById);

app.post('/products', 
  validateProducts.validateNameProducts,
  validateProducts.validateQuantityProducts,
  products.createProducts);

app.post('/sales', validateSales.validateSales, sales.createSales);

app.put('/products/:id',
  validateProducts.validateNameProducts,
  validateProducts.validateQuantityProducts,
  products.updateProducts);

app.put('/sales/:id', 
  validateSales.validateSales,
  sales.updateSales);

app.delete('/products/:id', products.deleteProducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
