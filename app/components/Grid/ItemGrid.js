import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const style = {
  grid: {
    padding: '0 15px !important',
  },
};

function ItemGrid({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

ItemGrid.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default withStyles(style)(ItemGrid);
