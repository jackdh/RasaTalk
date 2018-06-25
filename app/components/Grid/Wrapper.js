import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridWrap = styled(Grid)`
  margin-top: 15px;
`;

function ItemGrid(props) {
  return (
    <GridWrap container spacing={24} {...props}>
      {props.children}
    </GridWrap>
  );
}

ItemGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ItemGrid;
