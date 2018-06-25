import * as React from 'react';
import PropTypes from 'prop-types';
import { Delete } from '@material-ui/icons';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';

export const qr = props => {
  const { fields } = props;

  if (fields.length === 0) {
    return <div />;
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="none">Text</TableCell>
          <TableCell padding="none" colSpan={2}>
            Url
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((slot, index) => (
          <TableRow key={slot}>
            <TableCell padding="none">
              <Field
                name={`${slot}.title`}
                component={TextField}
                placeholder="Pepperoni"
                style={{ width: '170px' }}
              />
            </TableCell>
            <TableCell padding="none">
              <Field
                name={`${slot}.url`}
                component={TextField}
                placeholder="Margarita"
                style={{ width: '170px' }}
              />
            </TableCell>
            <TableCell padding="none" numeric>
              <IconButton
                aria-haspopup="true"
                onClick={() => fields.remove(index)}
                color="inherit"
              >
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

qr.propTypes = {
  fields: PropTypes.object,
};

export default qr;
