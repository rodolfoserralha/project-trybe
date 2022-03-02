const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const sales = require('../../../models/sales');

describe('Testa se retorna array com todas as vendas', () => {
  const salesConnectionSuccess = 
    [ [
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 5,
        "date": "2022-03-02T14:37:36.000Z"
      },
      {
        "saleId": 1,
        "productId": 2,
        "quantity": 10,
        "date": "2022-03-02T14:37:36.000Z"
      },
      {
        "saleId": 2,
        "productId": 3,
        "quantity": 15,
        "date": "2022-03-02T14:37:36.000Z"
      }
    ] ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(salesConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna o array com todas as vendas', async () => {
    const modelSales = await sales.getSales();

    expect(modelSales).to.be.deep.equal(salesConnectionSuccess[0]);
  });
});

describe('Testa se retorna a venda by id', () => {
  const salesConnectionSuccess = 
    [ [
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 5,
        "date": "2022-03-02T14:37:36.000Z"
      }
    ] ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(salesConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna o array com a venda by id', async () => {
    const modelSales = await sales.getSalesById(1);

    expect(modelSales).to.be.deep.equal(salesConnectionSuccess[0]);
  });
});

describe('Testa se cria uma nova venda', () => {
  const salesConnectionSuccess = [ { insertId: 5 } ]

  const returnCreate = {
    "id": salesConnectionSuccess[0].insertId,
    "itemsSold":  [{   
      "productId": 5,
      "quantity": 25
    }]
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves(salesConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Retorna o array com a nova venda', async () => {
    const modelSales = await sales.createSales([{ 
      productId: 5, quantity: 25 }]);

    expect(modelSales).to.be.deep.equal(returnCreate);
  });
});