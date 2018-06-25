import * as React from 'react';

import { compose } from 'redux';
import Alert from 'components/Snackbar/SnackbarContent';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form/immutable';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sub = styled(Typography)`
  && {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const StyledActions = styled(CardActions)`
  justify-content: center;
`;

const StyledField = styled(Field)`
  && {
    margin-bottom: 10px;
  }
`;

const validate = values => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.get('password')) {
    errors.password = 'Required';
  }

  return errors;
};

export class LoginForm extends React.PureComponent {
  render() {
    const { handleSubmit, loginError, valid, loading } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Sub varient="subheading">Lets get it started</Sub>

          <StyledField
            name="email"
            component={TextField}
            fullWidth
            label="Email"
            type="text"
          />

          <StyledField
            name="password"
            component={TextField}
            fullWidth
            label="Password"
            type="password"
          />

          {loginError && (
            <div style={{ marginTop: '15px' }}>
              <Alert message={loginError} color="danger" />
            </div>
          )}
        </CardContent>
        <StyledActions>
          {!loading && (
            <Button
              size="small"
              color="primary"
              type="submit"
              disabled={!valid}
            >
              Login
            </Button>
          )}
          {loading && <CircularProgress />}
        </StyledActions>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  loginError: PropTypes.string,
  valid: PropTypes.bool,
  loading: PropTypes.bool,
};

const withForm = reduxForm({
  form: 'loginPage',
  validate,
});

export default compose(withForm)(LoginForm);
