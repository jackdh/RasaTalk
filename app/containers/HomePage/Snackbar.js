import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { createStructuredSelector } from 'reselect';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { CheckCircle, Warning, Error, Info } from '@material-ui/icons';
import { hideSnackbar } from './actions';
import { selectMessage, selectOpen } from './selectors';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
  none: Info,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export class SimpleSnackbar extends React.PureComponent {
  render() {
    const {
      snackbar: { open, props },
      message,
      close,
      className,
      classes,
    } = this.props;

    let variant = 'info';
    if (props && props.variant !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      variant = props.variant;
    }

    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={close}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        {...props}
      >
        <SnackbarContent
          className={classNames(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={close}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

SimpleSnackbar.defaultProps = {};

SimpleSnackbar.propTypes = {
  snackbar: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  snackbar: selectOpen(),
  message: selectMessage(),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideSnackbar()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles1),
  withConnect,
)(SimpleSnackbar);
