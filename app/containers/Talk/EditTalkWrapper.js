/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import { wrapperValidator } from 'utils/validators';
import { compose } from 'redux';
import { withFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';

const HeaderWrapper = styled.div`
  margin: -50px auto 0;
  overflow: hidden;
  max-width: 130px;
  max-height: 130px;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;
const HeaderImg = styled.img`
  width: 100%;
  height: auto;
  border: 0;
  min-width: 130px;
  min-height: 130px;
  vertical-align: middle;
  background-color: white;
`;

const styles = {
  paper: {
    overflowY: 'unset',
  },
};

const StyledText = styled(TextField)`
  && {
    margin-top: 10px;
  }
`;

export class EditTalkWrapper extends React.PureComponent {
  state = {
    confirmed: false,
    deleting: false,
  };

  handleDelete = () => {
    if (this.state.confirmed) {
      this.setState({ deleting: true });
      this.props.onDelete(this.props._id, this.props.handleClose);
    } else {
      this.setState({ confirmed: true });
    }
  };

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      open,
      handleClose,
      updating,
    } = this.props;
    const { confirmed, deleting } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          classes={{
            paper: classes.paper,
          }}
        >
          <HeaderWrapper>
            <HeaderImg src={values.avatar} />
          </HeaderWrapper>
          <DialogContent>
            <StyledText
              id="name"
              type="text"
              label="Node Group Name"
              error={touched.name && !!errors.name}
              value={values.name}
              onChange={handleChange}
              helperText={errors.name}
              onBlur={handleBlur}
              fullWidth
            />
            <StyledText
              id="avatar"
              type="text"
              label="Avatar"
              value={values.avatar}
              error={touched.avatar && !!errors.avatar}
              helperText={errors.avatar}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <StyledText
              id="subtitle"
              type="text"
              label="Subtitle"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              value={values.subtitle}
            />
            <StyledText
              id="description"
              type="text"
              label="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              value={values.description}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={updating || deleting}
              onClick={this.handleDelete}
              color="secondary"
              style={{ float: 'left' }}
            >
              {deleting ? (
                <CircularProgress />
              ) : confirmed ? (
                'Click to Confirm'
              ) : (
                'Delete'
              )}
            </Button>
            <Button disabled={updating} onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isEmpty(errors) || updating || deleting}
              color="primary"
              onClick={handleSubmit}
            >
              {updating ? <CircularProgress /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: wrapperValidator,
  mapPropsToValues: props => ({
    name: props.name ? props.name : '',
    avatar: props.avatar ? props.avatar : '',
    subtitle: props.subtitle ? props.subtitle : '',
    description: props.description ? props.description : '',
  }),
  handleSubmit: (payload, rest) => {
    const newPayload = payload;
    newPayload._id = rest.props._id;
    rest.props.onSubmit(newPayload, rest.props.handleClose);
  },
  displayName: 'TalkWrapper',
});

EditTalkWrapper.defaultProps = {
  open: false,
  updating: false,
};

EditTalkWrapper.propTypes = {
  open: PropTypes.bool,
  _id: PropTypes.string,
  updating: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  classes: PropTypes.object,
  handleBlur: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default compose(
  formikEnhancer,
  withStyles(styles),
)(EditTalkWrapper);
