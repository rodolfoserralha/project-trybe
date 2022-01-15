import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLog } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleInputName({ target }) {
    this.setState({
      email: target.value,
    });
  }

  handleInputPassword({ target }) {
    this.setState({
      password: target.value,
    });
  }

  handleOnClick(event, userData) {
    const { history, dispatchUser } = this.props;
    event.preventDefault();
    dispatchUser(userData);
    history.push('/carteira');
  }

  isValidEmail(email) {
    return email.match(/^[\w.]+@[\w.]+\w+\.\w+$/);
  }

  validateLogin() {
    const PASSWORD_LENGTH = 6;
    const { email, password } = this.state;
    return password.length >= PASSWORD_LENGTH && this.isValidEmail(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div id="login-father">
        <div id="login">
          <h2>TrybeWallet</h2>
          <form onSubmit={ (event) => this.handleOnClick(event, { email, password }) }>
            <label htmlFor="email-input">
              <input
                id="name"
                name="email"
                type="text"
                data-testid="email-input"
                placeholder="Nome"
                onChange={ this.handleInputName }
              />
            </label>
            <label htmlFor="password-input">
              <input
                id="password"
                name="password"
                type="password"
                data-testid="password-input"
                placeholder="Senha"
                onChange={ this.handleInputPassword }
              />
            </label>
            <button
              type="submit"
              disabled={ !this.validateLogin() }
              id="btn-login"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (user) => dispatch(userLog(user)),
});

Login.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
