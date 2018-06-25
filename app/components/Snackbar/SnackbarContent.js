import React from 'react';
import {
  withStyles,
  SnackbarContent as Snack,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import cx from 'classnames';

import snackbarContentStyle from '../variables/styles/snackbarContentStyle';

function SnackbarContent({ ...props }) {
  const { classes, message, color, close, icon } = props;
  let action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
      >
        <Close className={classes.close} />
      </IconButton>,
    ];
  }

  classes.full = {
    maxWidth: '100%!important',
  };

  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: `${classes.root} ${classes[color]}`,
        message: classes.fullMessage,
      }}
      action={action}
      style={props.style}
    />
  );
}

SnackbarContent.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.func,
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
