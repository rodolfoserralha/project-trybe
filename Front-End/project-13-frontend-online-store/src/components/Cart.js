import React from 'react';
import PropTypes from 'prop-types';
import ProductsOnCart from './ProductsOnCart';

class Cart extends React.Component {
  render() {
    const { products, quantity, handleButton } = this.props;
    return (
      products.length === 0 ? (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      ) : (
        products.map((product) => (
          <ProductsOnCart
            key={ product.id }
            product={ product }
            quantity={ quantity }
            handleButton={ handleButton }
          />
        ))
      )
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  quantity: PropTypes.objectOf(PropTypes.any).isRequired,
  handleButton: PropTypes.func.isRequired,
};
export default Cart;
