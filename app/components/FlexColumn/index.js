/**
 *
 * FlexColumn
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function FlexColumn(props) {
  return <Flex>{props.children}</Flex>;
}

FlexColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FlexColumn;
