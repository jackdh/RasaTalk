/**
 *
 * StyledTextField
 *
 */

import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const StyledTextField = ({ input, label, meta: { error }, ...custom }) => (
  <TextField
    label={label}
    {...input}
    {...custom}
    error={error}
    helperText={error && <span>{error}</span>}
  />
);

StyledTextField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
};

export default StyledTextField;
