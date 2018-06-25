/**
 *
 * FlexCheckbox
 *
 */

import React from 'react';
import FlexRow from 'components/FlexRow';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Text = styled(Typography)`
  display: inline-flex;
  align-self: flex-end;
  margin-bottom: 10px;
`;

function FlexCheckbox(props) {
  return (
    <FlexRow style={{ flexGrow: '0' }}>
      <Text variant="body2">{props.name}</Text>
      {props.children}
    </FlexRow>
  );
}

FlexCheckbox.propTypes = {
  name: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FlexCheckbox;
