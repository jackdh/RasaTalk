import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Delete } from '@material-ui/icons';
import { Field } from 'redux-form/immutable';
import { Checkbox, TextField } from 'redux-form-material-ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const StyledTableCell = styled(TableCell)`
  padding: 0;
  width: 120px;
`;

export const RenderSlots = ({ fields }) => {
  if (fields.length === 0) {
    return <div />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Look For</StyledTableCell>
          <StyledTableCell>Save it as</StyledTableCell>
          <StyledTableCell>Prompt</StyledTableCell>
          <StyledTableCell>Is it Required?</StyledTableCell>
          <StyledTableCell>Default Value</StyledTableCell>
          <StyledTableCell>Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((slot, index) => (
          <TableRow key={slot}>
            <StyledTableCell>
              <Field
                name={`${slot}.entity`}
                component={TextField}
                placeholder="@typeOfPizza"
              />
            </StyledTableCell>
            <StyledTableCell>
              <Field
                name={`${slot}.slotID`}
                component={TextField}
                placeholder="[pizzaType]"
              />
            </StyledTableCell>
            <StyledTableCell>
              <Field
                name={`${slot}.prompt`}
                component={TextField}
                placeholder="Which pizza would you like?"
              />
            </StyledTableCell>
            <StyledTableCell>
              <Field name={`${slot}.required`} component={Checkbox} />
            </StyledTableCell>
            <StyledTableCell>
              <Field
                name={`${slot}.defaultValue`}
                component={TextField}
                placeholder="Hawaiian!"
              />
            </StyledTableCell>
            <StyledTableCell>
              <Delete onClick={() => fields.remove(index)} />
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

RenderSlots.propTypes = {
  fields: PropTypes.object,
};
