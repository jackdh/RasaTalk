/**
 *
 * NewAgent
 *
 */

import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Typography,
  TextField,
} from '@material-ui/core';
// import { TextField } from 'redux-form-material-ui';
import styled from 'styled-components';
// import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { deleteAgent } from './actions';

const StyledText = styled(TextField)`
  && {
    margin-top: 10px;
  }
`;

function NewAgent(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    saving,
  } = props;
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Add Agent
          </Typography>
          <Typography component="p">
            Feel free to use any name you&#39;d like with or without prefixes.
          </Typography>
          <StyledText
            id="agent"
            type="text"
            label="Agent Name"
            error={touched.agent && !!errors.agent}
            value={values.agent}
            onChange={handleChange}
            helperText={errors.agent}
            onBlur={handleBlur}
            fullWidth
          />
          <Collapse in={!!values.agent}>
            <StyledText
              id="avatar"
              type="text"
              label="Avatar"
              value={values.avatar}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <StyledText
              id="subtitle"
              type="text"
              label="Subtitle"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <StyledText
              id="description"
              type="text"
              label="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </Collapse>
        </CardContent>
        <CardActions>
          <Collapse in={!!values.agent}>
            <Button type="submit" color="primary">
              {!saving && 'Submit'}
              {saving && <CircularProgress size={24} />}
            </Button>
          </Collapse>
        </CardActions>
      </form>
    </Card>
  );
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    agent: Yup.string()
      .min(2, 'Please enter a longer agent name')
      .required('Agent name is required.'),
  }),

  mapPropsToValues: () => ({
    agent: '',
    avatar: '',
    title: '',
    subtitle: '',
    description: '',
  }),
  handleSubmit: (payload, { props }) => {
    props.submit(payload);
  },
  displayName: 'MyForm',
});

NewAgent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  saving: PropTypes.bool,
};

export default formikEnhancer(NewAgent);
