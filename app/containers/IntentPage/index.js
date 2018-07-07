/**
 *
 * IntentPage
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'react-router-redux';
import Wrapper from 'components/Grid/Wrapper';
import BackButton from 'components/BackButton';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ProfileCard from 'components/Cards/ProfileCard';
import SnackBarContent from 'components/Snackbar/SnackbarContent';
import GenericTable from 'components/Table/GenericTable';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  LinearProgress,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@material-ui/core';

import saga from './saga';
import reducer from './reducer';
import { changeTitle } from '../HomePage/actions';
import { getAgent, addIntent, removeIntents } from './actions';
import makeSelectIntentPage from './selectors';

export class IntentPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    agent: this.props.match.params.agentName,
    newIntent: '',
    addMultiple: false,
  };

  componentDidMount() {
    this.props.dispatch(changeTitle(`Agent: ${this.state.agent}`));
    this.props.dispatch(getAgent(this.state.agent));
  }

  addIntent = () =>
    new Promise((resolve, reject) => {
      this.props.dispatch(
        addIntent(
          this.state.agent,
          this.state.newIntent,
          this.state.addMultiple,
          resolve,
          reject,
        ),
      );
    });

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addIntent(this.state.newIntent).then(() => {
        this.setState(
          {
            newIntent: '',
          },
          () => this.textInput.focus(),
        );
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      dispatch,
      intentPage: {
        loadingAgent,
        agent,
        subtitle,
        description,
        avatar,
        intents,
        addingIntent,
        removingIntents,
        error,
      },
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>IntentPage</title>
          <meta name="description" content="Description of IntentPage" />
        </Helmet>
        <Wrapper>
          <BackButton tooltip="Back to agents" link="/agents" />

          <Grid item xs={8}>
            {removingIntents && <LinearProgress color="primary" />}
            <GenericTable
              title="Intents"
              items={intents}
              handleDelete={deleteIntents =>
                dispatch(removeIntents(this.state.agent, deleteIntents))
              }
              headers={[
                {
                  id: 'name',
                  label: 'Intent',
                  cellClick: route =>
                    dispatch(
                      push(
                        `/agents/${encodeURIComponent(
                          this.state.agent,
                        )}/intent/${encodeURIComponent(route)}`,
                      ),
                    ),
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard
              loading={loadingAgent}
              subtitle={subtitle}
              agent={agent}
              description={description}
              avatar={avatar}
            />
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Add Intent
                </Typography>
                <Typography component="p">
                  Feel free to use any name you&#39;d like with or without
                  prefixes.
                </Typography>

                <TextField
                  id="newIntent"
                  label="New Intent"
                  value={this.state.newIntent}
                  onChange={this.handleChange('newIntent')}
                  onKeyPress={this.handleKeyPress}
                  disabled={addingIntent}
                  inputRef={input => {
                    this.textInput = input;
                  }}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.addMultiple}
                      onChange={this.handleChangeCheckbox('addMultiple')}
                      value="addMultiple"
                      color="primary"
                    />
                  }
                  label="Add Multiple"
                />
              </CardContent>
            </Card>

            {error && (
              <div style={{ marginTop: '15px' }}>
                <SnackBarContent message={error} color="danger" />
              </div>
            )}
          </Grid>
        </Wrapper>
      </React.Fragment>
    );
  }
}

IntentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intentPage: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  intentPage: makeSelectIntentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'intentPage', reducer });
const withSaga = injectSaga({ key: 'intentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IntentPage);
