import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import ProductCard from './ProductCard';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      queryInput: '',
      categorieId: '',
      searched: false,
      activeButton: true,
    };
    this.getAllCategories = this.getAllCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRadioButton = this.handleRadioButton.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      queryInput: value,
    }, this.verifyInput);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ searched: false }, () => {
      this.setState({
        searched: true,
      });
    });
  }

  handleRadioButton({ target }) {
    this.setState({ searched: false }, () => {
      const { id } = target;
      this.setState({
        categorieId: id,
        searched: true,
      });
    });
  }

  async getAllCategories() {
    const allCategories = await getCategories();
    this.setState({
      categories: allCategories,
    });
  }

  verifyInput() {
    const { queryInput } = this.state;
    if (queryInput.length > 0) {
      this.setState({
        activeButton: false,
      });
    } else {
      this.setState({
        activeButton: true,
      });
    }
  }

  render() {
    const { categories, categorieId, queryInput, activeButton, searched } = this.state;
    const { addToProducts } = this.props;
    return (
      <div>
        <form action="">
          <label htmlFor="input-search">
            <input
              id="input-search"
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
              value={ queryInput }
            />
          </label>
          <button
            disabled={ activeButton }
            type="submit"
            onClick={ this.handleClick }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </form>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          <button className="shopping-cart-button" type="button">
            Shopping Cart
          </button>
        </Link>
        <div className="products-and-categories">
          <aside className="categories">
            {categories.map((product) => (
              <label
                htmlFor={ product.id }
                key={ product.id }
              >
                <input
                  id={ product.id }
                  type="radio"
                  name="input-name"
                  data-testid="category"
                  value={ product.id }
                  onChange={ this.handleRadioButton }
                />
                {product.name}
              </label>
            ))}
          </aside>
          { searched && (
            <section className="products">
              <ProductCard
                data-testid="product"
                query={ queryInput }
                categorie={ categorieId }
                addToProducts={ addToProducts }
              />
            </section>
          )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addToProducts: PropTypes.func.isRequired,
};

export default Home;
