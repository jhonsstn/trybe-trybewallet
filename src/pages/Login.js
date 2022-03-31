import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions/userLogin';

// Regex retirado de: https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.isSubmitDisabled(),
    );
  };

  isEmailValid = () => {
    const { email } = this.state;
    return EMAIL_REGEX.test(email);
  };

  isPasswordValid = () => {
    const { password } = this.state;
    const minPassLength = 6;
    return password.length >= minPassLength;
  };

  isSubmitDisabled = () => {
    this.setState({
      disabled: !(this.isEmailValid() && this.isPasswordValid()),
    });
  };

  handleSubmit = () => {
    const { login, history } = this.props;
    login(this.state);
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <input
          type="button"
          value="Entrar"
          onClick={ this.handleSubmit }
          disabled={ disabled }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(userLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);
