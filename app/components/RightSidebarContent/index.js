/**
 *
 * RightSidebarContent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const StyledGrid = styled(Grid)`
  && {
    padding: 12px;
  }
`;

function RightSidebarContent(props) {
  return (
    <Grid container>
      <StyledGrid item xs={12}>
        {props.children}
      </StyledGrid>
    </Grid>
  );
}

RightSidebarContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RightSidebarContent;
