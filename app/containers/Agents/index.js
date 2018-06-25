/**
 *
 * Agents
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'react-router-redux';
import defaultAvatar from 'images/agent.png';
import { createStructuredSelector } from 'reselect';
import ProfileCard from 'components/Cards/ProfileCard';
import Wrapper from 'components/Grid/Wrapper';
import SnackBarContext from 'components/Snackbar/SnackbarContent';
import IIcon from 'images/iIcon.png';

import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm, initialize } from 'redux-form/immutable';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';

import saga from './saga';
import reducer from './reducer';
import makeSelectAgents from './selectors';
import { changeTitle } from '../HomePage/actions';
import {
  saveAgent,
  toggleDialog,
  getAgents,
  updateAgent,
  deleteAgent,
} from './actions';

const StyledFab = styled(Button)`
  right: 64px !important;
  bottom: 64px !important;
  position: absolute !important;
`;

const StyledField = styled(Field)`
  && {
    margin-top: 10px;
  }
`;

const validate = values => {
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required';
  }
  return errors;
};

export class Agents extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.dispatch(changeTitle('Agents'));
    this.props.dispatch(getAgents());
  }

  submit = values => {
    const agent = values.toJS();
    if (this.props.agents.edit) {
      this.props.dispatch(updateAgent(agent, this.props.agents.oldNode));
    } else {
      this.props.dispatch(saveAgent(agent));
    }
  };

  load = agent => {
    this.props.dispatch(initialize('addAgent', agent));
    this.props.dispatch(toggleDialog(true, true, agent.agent));
  };

  addNew = () => {
    this.props.dispatch(
      initialize('addAgent', {
        agent: '',
        avatar: '',
        title: '',
        subtitle: '',
        description: '',
      }),
    );
    this.props.dispatch(toggleDialog(true));
  };

  render() {
    const {
      handleSubmit,
      agents: { agents, open, loading, edit, saving, saveError, oldNode },
      dispatch,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Agents</title>
          <meta name="description" content="Description of Agents" />
        </Helmet>

        <Wrapper>
          <Grid item xs={8}>
            <Grid container spacing={40}>
              {loading && (
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileCard loading />
                </Grid>
              )}
              {!loading &&
                agents.map(
                  ({
                    agent = '',
                    avatar = defaultAvatar,
                    subtitle = '',
                    description = '',
                  }) => (
                    <Grid key={agent} item md={4}>
                      <ProfileCard
                        avatar={avatar}
                        avatarClick={() =>
                          this.load({ agent, avatar, subtitle, description })
                        }
                        subtitle={subtitle}
                        agent={agent}
                        description={description}
                        footer={
                          <Button
                            onClick={() =>
                              dispatch(
                                push(`/agents/${encodeURIComponent(agent)}`),
                              )
                            }
                            variant="raised"
                            color="primary"
                            style={{ marginBottom: '15px' }}
                          >
                            View
                          </Button>
                        }
                        classes={this.props.classes}
                      />
                    </Grid>
                  ),
                )}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <ProfileCard
              avatar={IIcon}
              subtitle="Agents group expressions"
              agent="Agents"
              description="Agents help to classify or split up different chatbots."
            />
          </Grid>
        </Wrapper>

        <StyledFab variant="fab" color="primary" onClick={this.addNew}>
          +
        </StyledFab>

        <Dialog
          open={open}
          onClose={() => dispatch(toggleDialog())}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(this.submit)}>
            <DialogTitle id="form-dialog-title">
              {edit && 'Edit this Agent'}
              {!edit && 'Add new Agent'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Agents are used to separate intents into different sections or
                APIs. Currently Talk Flow does not differentiate between agents
                so you will need to prefix them if you are going to mix and
                mash.
              </DialogContentText>

              <StyledField
                name="agent"
                component={TextField}
                fullWidth
                label="Agent Name"
                type="text"
              />
              <StyledField
                name="avatar"
                component={TextField}
                fullWidth
                label="Avatar"
                type="text"
              />
              <StyledField
                name="subtitle"
                component={TextField}
                fullWidth
                label="Subtitle"
                type="text"
              />
              <StyledField
                name="description"
                component={TextField}
                fullWidth
                label="Description"
                type="text"
              />
              {saveError && (
                <SnackBarContext
                  message={saveError}
                  color="warning"
                  style={{ marginTop: '30px' }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => dispatch(deleteAgent(oldNode))}
                color="secondary"
              >
                Delete
              </Button>
              <Button onClick={() => dispatch(toggleDialog())} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {edit && !saving && 'Edit'}
                {!edit && !saving && 'Submit'}
                {saving && <CircularProgress size={24} />}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

Agents.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  agents: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    agents: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    saveError: PropTypes.string.isRequired,
    loadingError: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    oldNode: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  agents: makeSelectAgents(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'agents', reducer });
const withSaga = injectSaga({ key: 'agents', saga });
const withForm = reduxForm({
  form: 'addAgent',
  validate,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withForm,
)(Agents);
