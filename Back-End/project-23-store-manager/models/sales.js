const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sp.sale_id as saleId,
      sp.product_id as productId,
      sp.quantity,
      s.date
    FROM 
      StoreManager.sales_products as sp
    JOIN 
      StoreManager.sales as s
    ON
      sp.sale_id = s.id
    ORDER BY
      sp.sale_id, sp.product_id;
    `,
  );

  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      sp.product_id as productId,
      sp.quantity,
      s.date
    FROM 
      StoreManager.sales_products as sp
    JOIN 
      StoreManager.sales as s
    ON
      sp.sale_id = s.id
    WHERE
      sp.sale_id = ?;`,
    [id],
  );

  return result;
};

const createSales = async (body) => {
  const [createSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE(now());',
  );

  body.map(async (e) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);', 
      [createSale.insertId, e.productId, e.quantity],
    );
  });

  return {
    id: createSale.insertId,
    itemsSold: body,
  };
};

const updateSales = async ([{ productId, quantity }], id) => {
  await connection
      .execute(
          `UPDATE
            StoreManager.sales_products
          SET 
              sale_id = ?, product_id = ?, quantity= ?
          WHERE 
              sale_id = ?;`, 
          [id, productId, quantity, id],
      );

  return { saleId: id, itemUpdated: [{ productId, quantity }] };
};

module.exports = { getSales, getSalesById, createSales, updateSales };