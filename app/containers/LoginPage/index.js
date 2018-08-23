/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import logo from 'images/logo.png';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import { Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import SwipeableViews from 'react-swipeable-views';
import { Card, Typography, AppBar, Tab, Tabs } from '@material-ui/core';

import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loginRequest, registerRequest } from './actions';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Wrapper = styled.div`
  height: 100%;
  flex: 1 1;
  padding: 50px 0 24px;
`;

const Image = styled.img`
  width: 200px;
`;

const Sub = styled(Typography)`
  && {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const Header = styled.div`
  text-align: center;
`;

const StyledCard = styled(Card)`
  width: 368px;
  margin: 0 auto;
`;

export class LoginPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      loginPage: { loginError, registerError, loading },
    } = this.props;
    const { value } = this.state;

    if (localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <Wrapper>
        <Header>
          <Image src={logo} alt="Rasa Talk Logo" />
          <Sub variant="subheading">
            Bringing dialog management and much more to the Rasa community
          </Sub>
        </Header>

        <StyledCard>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} fullWidth>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <LoginForm
              loading={loading}
              onSubmit={() => this.props.dispatch(loginRequest())}
              loginError={loginError}
            />

            <RegisterForm
              loading={loading}
              onSubmit={() => this.props.dispatch(registerRequest())}
              registerError={registerError}
            />
          </SwipeableViews>
        </StyledCard>
      </Wrapper>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
