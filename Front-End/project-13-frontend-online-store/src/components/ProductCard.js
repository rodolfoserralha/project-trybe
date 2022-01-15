import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import './ProductCard.css';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      notFound: true,
    };
    this.getProductsDetails = this.getProductsDetails.bind(this);
  }

  componentDidMount() {
    this.getProductsDetails();
  }

  async getProductsDetails() {
    const { categorie, query } = this.props;
    const productsDetails = await getProductsFromCategoryAndQuery(categorie, query);
    if (productsDetails.results.length === 0) {
      this.setState({
        notFound: true,
      });
    }
    this.setState({
      products: productsDetails.results,
      notFound: false,
    });
  }

  render() {
    const { notFound, products } = this.state;
    const { addToProducts } = this.props;
    return (
      <div className="list-product">
        {notFound ? <h3>Nenhum produto foi encontrado</h3> : (
          products.map((product) => (
            <div key={ product.id } className="card-product">
              <Link
                data-testid="product-detail-link"
                to={ `/product/${product.id}/${product.title.replace('%', '%25')}` }
              >
                <div data-testid="product">
                  <h4>{ product.title }</h4>
                  <img src={ product.thumbnail } width="100px" alt={ product.title } />
                  <p>{ product.price }</p>
                </div>
              </Link>
              <button
                className="button-list-product"
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => addToProducts(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
}

ProductCard.propTypes = {
  addToProducts: PropTypes.func.isRequired,
  categorie: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default ProductCard;
