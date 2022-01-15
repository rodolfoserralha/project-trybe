import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// Adicionados
import { connect } from 'react-redux';
import { loginAction } from '../actions';
import trivia from '../trivia.png';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      // isDisable: true,
      inputEmail: '',
      inputName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.playButton = this.playButton.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleOnClick(event) {
    const { history } = this.props;
    event.preventDefault();
    history.push('/game');
  }

  isValidEmail(email) {
    return email.match(/^[\w.]+@[\w.]+\w+\.\w+$/);
  }

  validateLogin() {
    const { inputEmail, inputName } = this.state;
    return inputName.length > 0 && this.isValidEmail(inputEmail);
  }

  saveLogin(token) {
    const { login } = this.props;
    const { inputName, inputEmail } = this.state;
    login({
      name: inputName,
      gravatarEmail: inputEmail,
      token,
    });
  }

  playButton() {
    const { history } = this.props;
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => {
        res.json()
          .then((json) => {
            this.saveLogin(json.token); // Adicionado req 04.
            localStorage.setItem('token', json.token);
            history.push('/game');
          });
      });
  }

  render() {
    const { history } = this.props;
    return (
      <div className="father-login">
        <img className="login-trivia-img" src={ trivia } alt="Trivia" />
        <div>
          <form className="login-page">
            <label htmlFor="inputEmail">
              <input
                className="inputs"
                onChange={ this.handleChange }
                type="email"
                name="inputEmail"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email aqui"
              />
            </label>
            <label htmlFor="inputName">
              <input
                className="inputs"
                onChange={ this.handleChange }
                type="text"
                name="inputName"
                data-testid="input-player-name"
                placeholder="Digite seu nome aqui"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !this.validateLogin() }
              onClick={ this.playButton }
            >
              Jogar
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              config
            </button>
          </form>
        </div>
      </div>);
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  login: PropTypes.func.isRequired, // adicionado
};

const mapDispatchToProps = (dispatch) => ({
  login: (value) => dispatch(loginAction(value)),
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
