/**
 *
 * RightSideBarDrawer
 *
 */

import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function RightSideBarDrawer(props) {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={props.open}
      PaperProps={{
        style: {
          position: 'inherit',
          height: 'calc(100% - 64px)',
          marginTop: '64px',
        },
      }}
    >
      {props.children}
    </Drawer>
  );
}

RightSideBarDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool.isRequired,
};

export default RightSideBarDrawer;
