const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const products = require('../../../controllers/products');

describe('Testa products controllers', () => {
  const req = {};
  const res = {};
  let next = () => {};

  const allProducts = {
    code: 200,
    data: [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
      },
      {
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
      }
    ]]
  }

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();
    next = sinon.stub().returns();

    sinon.stub(connection, 'execute').resolves(allProducts.data);
  })

  after(() => {
    connection.execute.restore();
  })


  it('Testa se retorna status 200 na funçao getProducts', async () => {
    await products.getProducts(req, res, next);

    expect(res.status.calledWith(allProducts.code)).to.be.true;
  })
})

describe('Testa products controllers', () => {
  const req = {};
  const res = {};
  let next = () => {};

  const allProducts = {
    code: 200,
    data:     
    [[ {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    } ]]
  }

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.end = sinon.stub().returns();
    next = sinon.stub().returns();

    req.params = { id: 1 };
    sinon.stub(connection, 'execute').resolves(allProducts.data);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa se retorna status 200 na funçao getProducts', async () => {
    await products.getProductsById(req, res, next);

    expect(res.status.calledWith(allProducts.code)).to.be.true;
  })
})

