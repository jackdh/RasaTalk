import * as React from 'react';
import PropTypes from 'prop-types';
import { Add, Delete } from '@material-ui/icons';
import { Field, FieldArray } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import Col from 'components/FlexColumn';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@material-ui/core';

const Variation = ({ response, fields }) => (
  <React.Fragment>
    <TableBody>
      {fields.map((variation, index) => (
        <TableRow key={variation}>
          <TableCell padding="none">
            <Field
              name={variation}
              type="text"
              multiline
              component={TextField}
              placeholder="Okay I've put the order in for your [pizzaType]!"
              fullWidth
            />
          </TableCell>
          <TableCell padding="none" numeric>
            {index !== 0 && (
              <IconButton
                aria-haspopup="true"
                onClick={() => fields.remove(index)}
                color="inherit"
              >
                <Delete />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell padding="none">
          {fields.length > 0 && (
            <Field
              name={response}
              component={TextField}
              label="Condition"
              placeholder="Date.now() < 12:00:00"
              fullWidth
            />
          )}
        </TableCell>
        <TableCell padding="none" numeric>
          <IconButton
            aria-haspopup="true"
            onClick={() => fields.push()}
            color="inherit"
          >
            <Add />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableFooter>
  </React.Fragment>
);

Variation.propTypes = {
  response: PropTypes.string,
  fields: PropTypes.object,
};

export const Responses = ({ fields }) => {
  if (fields.length === 0) {
    return <div />;
  }

  const remove = index => {
    fields.remove(index);
  };

  return (
    <Col>
      {fields.map((response, index) => (
        <Table key={response}>
          <TableHead padding="none">
            <TableRow>
              <TableCell padding="none">Response {index + 1}</TableCell>
              <TableCell padding="none" numeric>
                <IconButton
                  aria-haspopup="true"
                  onClick={() => remove(index)}
                  color="inherit"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <FieldArray
            name={`${response}.output`}
            response={`${response}.condition`}
            component={Variation}
          />
        </Table>
      ))}
    </Col>
  );
};

Responses.propTypes = {
  fields: PropTypes.object,
};

export default Responses;
