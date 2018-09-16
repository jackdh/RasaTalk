/* eslint-disable */
/**
 *
 * Expression
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  CardActions,
  Button,
} from '@material-ui/core';
import BackButton from 'components/BackButton';
import ProfileCard from 'components/Cards/ProfileCard';
import Wrapper from 'components/Grid/Wrapper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from './ExpressionTable';

import makeSelectExpression, { selectEntities } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeTitle } from '../HomePage/actions';
import Add from './Add/Add';
import {
  addExpression,
  getEntities,
  getExpressions,
  removeExpression,
  addParameter,
  removeParameter,
  updateIntentName,
  saveUpdatedIntentName,
  setIntentName,
} from './actions';
import { getAgent } from '../IntentPage/actions';

export class Expression extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  agent = this.props.match.params.agentName;
  intent = this.props.match.params.intent;

  componentDidMount() {
    this.props.dispatch(
      changeTitle(`Agent: ${this.agent} / Intent: ${this.intent}`),
    );
    this.props.dispatch(getExpressions(this.agent, this.intent));
    this.props.dispatch(setIntentName(this.intent));
    this.props.dispatch(getAgent(this.agent));
    this.props.dispatch(getEntities());
  }

  handleAddExpression = expressions =>
    new Promise((resolve, reject) => {
      this.props.dispatch(
        addExpression(this.agent, this.intent, expressions, resolve, reject),
      );
    });

  handleDelete = expressions => {
    this.props.dispatch(removeExpression(this.agent, this.intent, expressions));
  };

  handleAddEntity = entity => {
    this.props.addEntity(this.agent, this.intent, entity);
  };

  handleIntentNameSave = () => {
    this.props.dispatch(saveUpdatedIntentName(this.agent));
  };

  handleIntentNameChange = event => {
    if (
      event.key === 'Enter' &&
      this.props.expression.originalIntentName !==
        this.props.expression.updatingIntentName
    ) {
      this.handleIntentNameSave();
    }
  };

  render() {
    const {
      expression: {
        expressions,
        loading,
        error,
        intentName,
        originalIntentName,
        updatingIntentName,
      },
      entities,
      dispatch,
    } = this.props;
    const diff = intentName !== originalIntentName;
    return (
      <div>
        <Helmet>
          <title>Expression</title>
          <meta name="description" content="Description of Expression" />
        </Helmet>

        <Wrapper>
          <BackButton
            tooltip={`Back to ${this.agent}`}
            link={`/agents/${this.agent}`}
          />

          <Grid item xs={8}>
            <Add addExpression={this.handleAddExpression} />
            <Table
              expressions={expressions}
              handleDelete={this.handleDelete}
              entities={entities}
              addEntity={this.handleAddEntity}
              removeEntity={this.props.removeEntity}
            />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard
              subtitle="Agents group expressions"
              agent="Agents"
              description="Agents help to classify or split up different chatbots."
              avatar="none"
            />
            <Card style={{ marginTop: '30px' }}>
              <CardHeader
                title="Update intent name"
                subheader="You will need to retrain the chatbot when updating the intent name"
              />
              <CardContent>
                <TextField
                  id="intentRename"
                  label="Intent Name"
                  value={intentName}
                  onKeyPress={this.handleIntentNameChange}
                  onChange={e => dispatch(updateIntentName(e.target.value))}
                  fullWidth
                  disabled={updatingIntentName}
                />
              </CardContent>
              <CardActions>
                {diff && (
                  <Button
                    onClick={() => this.handleIntentNameSave()}
                    size="small"
                    disabled={updatingIntentName}
                  >
                    Save
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

Expression.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  addEntity: PropTypes.func.isRequired,
  removeEntity: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expression: makeSelectExpression(),
  entities: selectEntities(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addEntity: (agent, intent, entity) =>
      dispatch(addParameter(agent, intent, entity)),
    removeEntity: entity => dispatch(removeParameter(entity)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'expression', reducer });
const withSaga = injectSaga({ key: 'expression', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Expression);
