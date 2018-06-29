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
} from '@material-ui/core';

export const webhook = ({ fields }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell padding="none">Path</TableCell>
        <TableCell padding="none">As</TableCell>
        <TableCell padding="none" numeric>
          Delete
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {fields.map((variable, index) => (
        <TableRow key={variable}>
          <TableCell padding="none">
            <Field
              name={`${variable}.path`}
              type="text"
              component={TextField}
              placeholder="a[0].b.c"
              fullWidth
            />
          </TableCell>
          <TableCell padding="none">
            <Field
              name={`${variable}.as`}
              type="text"
              component={TextField}
              placeholder="[webhook]"
              fullWidth
            />
          </TableCell>
          <TableCell padding="none" numeric>
            <Delete onClick={() => fields.remove(index)} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

webhook.propTypes = {
  fields: PropTypes.object,
};

export default webhook;
