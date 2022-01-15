import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      showButton: true,
      loading: false,
      redirect: false,
      userName: '',
    };
    this.inputCheck = this.inputCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      userName: target.value,
    }, this.inputCheck);
  }

  async handleClick(userName) {
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ redirect: true });
  }

  inputCheck() {
    const { userName } = this.state;
    const min = 3;
    // { target.value.length > min) ? showButton : !showButton; }
    if (userName.length >= min) {
      this.setState({
        showButton: false,
      });
    } else {
      this.setState({
        showButton: true,
      });
    }
  }

  render() {
    const { showButton, loading, redirect, userName } = this.state;

    if (loading) {
      return (
        <>
          <Loading />
          { redirect && <Redirect to="/search" /> }
        </>
      );
    }

    return (
      <div id="login-father">
        <div id="left-container">
          <h1>TrybeTunes</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384087.png" alt="itunes" />
        </div>

        <div id="right-container" data-testid="right-container">
          <label htmlFor="login-name-input">
            <input
              className="inputs"
              onChange={ this.handleInput }
              data-testid="login-name-input"
              type="text"
              placeholder="Name"
            />
          </label>
          <button
            data-testid="login-submit-button"
            className="btns"
            type="submit"
            disabled={ showButton }
            onClick={ () => this.handleClick(userName) }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
