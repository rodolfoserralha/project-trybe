const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const getProductsById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);

  return result;
};

const searchProductByName = async (name) => {
  const [result] = await connection
      .execute(
          'SELECT * FROM StoreManager.products WHERE name = ?;',
          [name],
      );

  return result[0];
};

const createProducts = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', 
    [name, quantity],
  );

  return { id: result.insertId, name, quantity };
};

const updateProducts = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?;', 
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const deleteProducts = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?;', [id],
  );

  return result.affectedRows;
};

module.exports = { 
  getProducts,
  getProductsById,
  searchProductByName,
  createProducts,
  updateProducts,
  deleteProducts,
};