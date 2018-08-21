/* eslint-disable no-underscore-dangle */
/**
 *
 * Training
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import Timer from 'components/Timer/Timer';
import Tooltip from '@material-ui/core/Tooltip';
import injectReducer from 'utils/injectReducer';
import Collapse from '@material-ui/core/Collapse';
import { createStructuredSelector } from 'reselect';
import { withTheme } from '@material-ui/core/styles';
import ProfileCard from 'components/Cards/ProfileCard';
import Download from '@material-ui/icons/CloudDownload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  CardHeader,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ReactJson from 'react-json-view';

import Status from './Status';
import reducer from './reducer';
import Table from './TrainingTable';
import saga, { watcher } from './saga';

import { changeTitle, getAgents } from '../HomePage/actions';
import { selectAgents } from '../HomePage/selectors';
import { getJSON, getAll, train, viewJSON, startWatch } from './actions';
import {
  selectLoading,
  selectGetting,
  selectJSON,
  selectTraining,
  selectInTraining,
} from './selectors';

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  flex-direction: column;
  text-align: center;
  .timer {
    font-size: 2em;
  }
`;

const StyledCP = styled(CircularProgress)`
  && {
    position: absolute;
    top: 20%;
    left: 50%;
  }
`;

export class Training extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      agent: '',
    };
  }

  componentDidMount() {
    this.props.changeTitle('Training');
    this.props.getAgents();
    this.props.getAll();
    this.props.startWatch();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  download = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(this.props.json.data),
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute(
      'download',
      `${this.props.json.agent}-${this.props.json.date}.json`,
    );
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  render() {
    const {
      agents,
      handleGetJSON,
      training,
      json,
      view,
      handleTrain,
      inTraining,
      loading,
      theme: { palette },
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Training</title>
          <meta name="description" content="Description of Training" />
        </Helmet>

        <Grid container spacing={24} style={{ marginTop: '10px' }}>
          <Grid item xs={8}>
            <Collapse
              in={Object.keys(json).length !== 0 && json.constructor === Object}
            >
              <div>
                <ExpansionPanel style={{ margin: '30px 2px 2px 1px' }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      variant="title"
                      style={{ alignSelf: 'center', flexGrow: 1 }}
                    >
                      Generated JSON
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ReactJson
                      src={json.data}
                      theme={
                        palette.type === 'dark' ? 'eighties' : 'rjv-default'
                      }
                      style={{
                        backgroundColor:
                          palette.type === 'dark' ? 'rgb(66, 66, 66)' : '#fff',
                      }}
                      indentWidth={1}
                      displayDataTypes={false}
                      displayObjectSize={false}
                    />
                    <Button
                      variant="fab"
                      color="primary"
                      onClick={this.download}
                      style={{ position: 'absolute', right: '60px' }}
                    >
                      <Download />
                    </Button>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </Collapse>
            <Table trainings={training} view={id => view(id)} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard
              loading={false}
              subtitle="Will take some time"
              agent="Training"
              description="You will need to retrain each time you update your chosen agent."
              avatar="https://s3.eu-west-2.amazonaws.com/rasatalk/813861_man_512x512.png"
            />
            <Card style={{ marginTop: '30px' }}>
              <CardHeader
                title="Generate"
                subheader="Use this tool to generate the training data."
              />
              <CardContent>
                <TextField
                  select
                  helperText="Please select an agent"
                  fullWidth
                  value={this.state.agent}
                  onChange={this.handleChange('agent')}
                >
                  {agents.map(agent => (
                    <MenuItem key={agent.agent} value={agent.agent}>
                      {agent.agent}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
              <CardActions>
                <div style={{ position: 'relative' }}>
                  <Button
                    onClick={() => handleGetJSON(this.state.agent)}
                    disabled={!this.state.agent || loading}
                    variant="raised"
                    color="primary"
                  >
                    Generate Training Data
                  </Button>
                  {loading && <StyledCP size={24} />}
                </div>
                {json.model !== undefined && (
                  <Tooltip id="tooltip-fab" title={`Agent: ${json.agent}`}>
                    <Button
                      onClick={() => handleTrain(json._id)}
                      variant="raised"
                      color="primary"
                    >
                      Train
                    </Button>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
            <Card style={{ marginTop: '30px' }}>
              <CardHeader
                title="Rasa"
                subheader="White = Ready, Blue = currently training"
              />
              <CardContent>
                {inTraining && (
                  <TimerWrapper>
                    <span
                      style={{
                        color: palette.type === 'dark' ? '#fff' : '#000',
                      }}
                    >
                      Currently Training
                    </span>
                    <Timer palette={palette} />
                  </TimerWrapper>
                )}
                <Status />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Training.propTypes = {
  agents: PropTypes.oneOfType([
    // The Agents
    PropTypes.array,
    PropTypes.object,
  ]),
  training: PropTypes.oneOfType([
    // The previous Trainings
    PropTypes.array,
    PropTypes.object,
  ]),
  theme: PropTypes.object, // The Theme
  json: PropTypes.object, // The current singular JSON
  loading: PropTypes.bool, // If we are loading something
  inTraining: PropTypes.bool, // If we are currently training the bot
  view: PropTypes.func.isRequired, // Method to get JSON from DB and display
  getAll: PropTypes.func.isRequired, // Called to get all previous trainings.
  getAgents: PropTypes.func.isRequired, // Method to get the agents to display in possible training options
  startWatch: PropTypes.func.isRequired, // Start polling for updates.
  handleTrain: PropTypes.func.isRequired, // Method to train the NLU with the data
  changeTitle: PropTypes.func.isRequired, // Used to update the title in the app bar
  handleGetJSON: PropTypes.func.isRequired, // Method to get the create JSON for agent
};

const mapStateToProps = createStructuredSelector({
  json: selectJSON(),
  agents: selectAgents(),
  loading: selectLoading(),
  getting: selectGetting(),
  training: selectTraining(),
  inTraining: selectInTraining(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(getAll()),
    view: id => dispatch(viewJSON(id)),
    getAgents: () => dispatch(getAgents()),
    startWatch: () => dispatch(startWatch()),
    handleGetJSON: agent => dispatch(getJSON(agent)),
    changeTitle: title => dispatch(changeTitle(title)),
    handleTrain: (id, agent) => dispatch(train(id, agent)),
  };
}

const withSaga = injectSaga({ key: 'training', saga });
const withReducer = injectReducer({ key: 'training', reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withPollSaga = injectSaga({ key: 'trainingPoll', saga: watcher });

export default compose(
  withReducer,
  withSaga,
  withPollSaga,
  withConnect,
  withTheme(),
)(Training);
