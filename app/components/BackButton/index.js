/**
 *
 * BackButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Back from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  && {
    position: fixed;
    left: 99px;
    bottom: 15px;
  }
`;

function BackButton(props) {
  return (
    <Link
      href={props.link}
      to={props.link}
      style={{ zIndex: 1200, position: 'fixed' }}
    >
      <Tooltip title={props.tooltip}>
        <StyledButton variant="fab" color="primary" aria-label="add">
          <Back />
        </StyledButton>
      </Tooltip>
    </Link>
  );
}

BackButton.propTypes = {
  link: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default BackButton;
