/**
 *
 * FlexRow
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  div {
    margin-right: 5px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

function FlexRow(props) {
  return <Row {...props}>{props.children}</Row>;
}

FlexRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FlexRow;
