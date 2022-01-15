import React from 'react';
import PropTypes from 'prop-types';

class ProductsOnCart extends React.Component {
  render() {
    const { product, quantity, handleButton } = this.props;
    const productDiv = (
      <div key={ product.id } className="cart">
        <h2 data-testid="shopping-cart-product-name">{ product.title }</h2>
        <img src={ product.thumbnail } width="200px" alt={ product.title } />
        <p>{ `R$${product.price}` }</p>
        <button
          onClick={ handleButton }
          type="button"
          id={ product.id }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{ quantity[product.id] }</span>
        <button
          onClick={ handleButton }
          type="button"
          id={ product.id }
          data-testid="product-increase-quantity"
        >
          +
        </button>
      </div>
    );

    return (
      productDiv
    );
  }
}

ProductsOnCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.objectOf(PropTypes.any).isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default ProductsOnCart;
