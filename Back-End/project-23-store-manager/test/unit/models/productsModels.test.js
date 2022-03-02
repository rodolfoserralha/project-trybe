const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const products = require('../../../models/products');

describe('Testa se retorna lista de produtos', () => {
  const productConnectionSuccess = 
  [  [
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
  ] ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);

    // mock do execute
  })

  after(() => {
    connection.execute.restore();
    // restore do connection
  })

  it('Retorna o array com os produtos', async () => {
    const modelProducts = await products.getProducts();

    expect(modelProducts).to.be.deep.equal(productConnectionSuccess[0]);
  });
});

describe('Testa produto pelo id', () => {
  const productConnectionSuccess = 
    [ {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
    } ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);

  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa produto pelo id', async () => {
    const modelProducts = await products.getProductsById(1);

    expect(modelProducts).to.be.deep.equal(productConnectionSuccess[0]);
  });
});

describe('Testa produto pelo name', () => {
  const productConnectionSuccess = 
    [ [ {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
    } ] ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa produto pelo name', async () => {
    const modelProducts = await products.searchProductByName('Martelo de Thor');

    expect(modelProducts).to.be.deep.equal(productConnectionSuccess[0][0]);
  });
});

describe('Testa se é possível criar um produto', () => {
  const productConnectionSuccess = [ { insertId: 6 } ]

  const returnCreate = {
    "id": productConnectionSuccess[0].insertId,
    "name": "Zeze e matta",
    "quantity": 20
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa se é possível criar um produto', async () => {
    const modelProducts = await products.createProducts('Zeze e matta', 20);

    expect(modelProducts).to.be.deep.equal(returnCreate);
  });
});

describe('Testa se é possível editar um produto', () => {
  const productConnectionSuccess = 
  [ 
    {
      "id": "1",
      "name": "Martelo de Thorrr",
      "quantity": 20
    }
   ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa se é possível editar um produto', async () => {
    const modelProducts = await products.updateProducts("1", 'Martelo de Thorrr', 20);

    expect(modelProducts).to.be.deep.equal(productConnectionSuccess[0]);
  });
});

describe('Testa se é possível deletar um produto', () => {
  const productConnectionSuccess = [ { affectedRows: 1 } ]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productConnectionSuccess);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Testa se é possível deletar um produto', async () => {
    const modelProducts = await products.deleteProducts(1);

    expect(modelProducts).to.be.equal(1);
  });
});