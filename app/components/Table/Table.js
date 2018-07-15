import React from 'react';
import classnames from 'classnames';
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import tableStyle from '../variables/styles/tableStyle';

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  const { length } = tableData;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
            <TableRow>
              {tableHead.map(prop => (
                <TableCell
                  className={`${classes.tableCell} ${classes.tableHeadCell}`}
                  key={prop}
                >
                  {prop}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, propKey) => (
            <TableRow key={prop}>
              {prop.map(iProp => (
                <TableCell
                  className={classnames(classes.tableCell, {
                    [classes.smallCell]: propKey === length,
                  })}
                  key={iProp}
                >
                  {iProp}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array,
};

export default withStyles(tableStyle)(CustomTable);
