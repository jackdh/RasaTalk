/**
 *
 * Agents
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import IIcon from 'images/iIcon.png';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'react-router-redux';
import defaultAvatar from 'images/agent.png';
import Wrapper from 'components/Grid/Wrapper';
import { createStructuredSelector } from 'reselect';
import ProfileCard from 'components/Cards/ProfileCard';

import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField } from 'redux-form-material-ui';
import {
  Field,
  reduxForm,
  initialize,
  formValueSelector,
} from 'redux-form/immutable';
import {
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Collapse,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import saga from './saga';
import reducer from './reducer';
import makeSelectAgents from './selectors';
import { changeTitle } from '../HomePage/actions';
import { saveAgent, toggleDialog, getAgents, updateAgent } from './actions';

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

const selector = formValueSelector('addAgent', null);

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
    this.props.dispatch(initialize('addAgent', agent)); // Add form
    this.props.dispatch(toggleDialog(true, true, agent.agent)); // Set Edit to true.
  };

  clear = () => {
    this.props.dispatch(initialize('addAgent', {})); // clear form
    this.props.dispatch(toggleDialog(false)); // Set Edit to false.
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
      agents: { agents, loading, edit, saving },
      dispatch,
      agentValue,
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
                    <Grid key={agent} item xs={12} sm={12} md={4}>
                      <ProfileCard
                        avatar={avatar}
                        subtitle={subtitle}
                        agent={agent}
                        description={description}
                        footer={
                          <React.Fragment>
                            <IconButton
                              onClick={() =>
                                this.load({
                                  agent,
                                  avatar,
                                  subtitle,
                                  description,
                                })
                              }
                              // variant="raised"
                              style={{
                                marginBottom: '15px',
                                marginRight: '5px',
                              }}
                            >
                              <Edit />
                            </IconButton>
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
                          </React.Fragment>
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
            <Card>
              <form onSubmit={handleSubmit(this.submit)}>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {edit ? 'Edit' : 'Add'} Agent
                  </Typography>
                  <Typography component="p">
                    Feel free to use any name you&#39;d like with or without
                    prefixes.
                  </Typography>
                  <StyledField
                    name="agent"
                    component={TextField}
                    fullWidth
                    label="Agent Name"
                    type="text"
                  />
                  <Collapse in={!!agentValue}>
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
                  </Collapse>
                </CardContent>
                <CardActions>
                  <Collapse in={!!agentValue}>
                    <Button type="submit" color="primary">
                      {edit && !saving && 'Edit'}
                      {!edit && !saving && 'Submit'}
                      {saving && <CircularProgress size={24} />}
                    </Button>
                    {edit && (
                      <React.Fragment>
                        <Button onClick={this.clear}>Clear</Button>
                      </React.Fragment>
                    )}
                  </Collapse>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

Agents.propTypes = {
  classes: PropTypes.object,
  agentValue: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  agents: PropTypes.shape({
    oldNode: PropTypes.string,
    edit: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    agents: PropTypes.array.isRequired,
    saveError: PropTypes.string.isRequired,
    loadingError: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  agents: makeSelectAgents(),
  agentValue: state => selector(state, 'agent'),
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
  enableReinitialize: true,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withForm,
)(Agents);
