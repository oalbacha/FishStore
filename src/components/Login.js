import React from 'react';
import PropTypes from 'prop-types'

class Login extends React.Component {
  render() {
    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage store inventory</p>
        <button
          className='google'
          onClick={() => this.props.authenticate('Google')}
        >
          Login with Google
        </button>
        <button
          className='facebook'
          onClick={() => this.props.authenticate('Facebook')}
        >
          Login with Facebook
        </button>
      </nav>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;
