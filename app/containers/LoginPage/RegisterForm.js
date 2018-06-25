import * as React from 'react';

import { Field, reduxForm } from 'redux-form/immutable';
import {
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { TextField } from 'redux-form-material-ui';
import Alert from 'components/Snackbar/SnackbarContent';
import { compose } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  if (!values.get('name')) {
    errors.name = 'Required';
  }

  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.get('password')) {
    errors.password = 'Required';
  } else if (values.get('password').length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.get('repeatPassword')) {
    errors.repeatPassword = 'Required';
  } else if (values.get('password') !== values.get('repeatPassword')) {
    errors.repeatPassword = 'Passwords do not match';
  }
  return errors;
};

export class RegisterForm extends React.PureComponent {
  render() {
    const { handleSubmit, registerError, valid, loading } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Sub varient="subheading">Lets get you signed up</Sub>

          <StyledField
            name="name"
            component={TextField}
            fullWidth
            label="Nick Name"
            type="text"
          />

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

          <StyledField
            name="repeatPassword"
            component={TextField}
            fullWidth
            label="Confirm Password"
            type="password"
          />

          {registerError && (
            <div style={{ marginTop: '15px' }}>
              <Alert message={registerError} color="danger" />
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
              Register
            </Button>
          )}
          {loading && <CircularProgress />}
        </StyledActions>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  registerError: PropTypes.string,
  loading: PropTypes.bool,
};

const withForm = reduxForm({
  form: 'registerPage',
  validate,
});

export default compose(withForm)(RegisterForm);
