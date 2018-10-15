import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  renderPublicComponent() {
    const { publicComponent, route } = this.props;
    return publicComponent
      ? <Route exact route={route} component={publicComponent} />
      : <Redirect route="/" />;
  }

  render() {
    const { currentUser, route, privateComponent } = this.props;

    return currentUser
      ? <Route exact route={route} component={privateComponent} />
      : this.renderPublicComponent();
  }
}

export default connect(
  state => (
    {
      currentUser: state.currentUser.user,
    }
  ),
)(PrivateRoute);

PrivateRoute.propTypes = {
  currentUser: PropTypes.shape(),
  route: PropTypes.string.isRequired,
  privateComponent: PropTypes.element.isRequired,
  publicComponent: PropTypes.element,
};

PrivateRoute.defaultProps = {
  currentUser: null,
  publicComponent: null,
};
