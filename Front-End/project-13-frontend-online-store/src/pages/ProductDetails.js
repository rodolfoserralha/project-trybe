import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.getProductsDetails = this.getProductsDetails.bind(this);
  }

  componentDidMount() {
    this.getProductsDetails();
  }

  async getProductsDetails() {
    const { match } = this.props;
    const { id, title } = match.params;
    const products = await getProductsFromCategoryAndQuery(id, title);
    this.setState({
      product: products.results[0],
      loading: false,
    });
  }

  render() {
    const { product, loading } = this.state;
    const { addToProducts } = this.props;
    return (
      !loading && (
        <section className="product-details">
          <h2 data-testid="product-detail-name">{ product.title }</h2>
          <img src={ product.thumbnail } width="150px" alt={ product.title } />
          <p>{ `R$${product.price}` }</p>

          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addToProducts(product) }
          >
            Adicionar ao carrinho
          </button>
          <Link data-testid="shopping-cart-button" to="/shopping-cart">Carrinho</Link>
          <div>
            <form>
              Avaliações
              <label htmlFor="email">
                <input type="email" id="email" name="user_name" placeholder="email" />
              </label>
              <label htmlFor="note">
                <input type="radio" name="note" id="1" />
                <input type="radio" name="note" id="2" />
                <input type="radio" name="note" id="3" />
                <input type="radio" name="note" id="4" />
                <input type="radio" name="note" id="5" />
              </label>
              <label htmlFor="comments">
                <input
                  data-testid="product-detail-evaluation"
                  type="textarea"
                  id="comments"
                  name="user_comments"
                  placeholder="Comentários"
                />
              </label>
            </form>
          </div>
        </section>
      )
    );
  }
}

ProductDetails.propTypes = {
  addToProducts: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
