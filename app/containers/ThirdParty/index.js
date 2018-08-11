/**
 *
 * ThirdParty
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, CardContent, CardMedia } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';

import { selectFacebook, selectSlack } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getAll, updateForm } from './actions';

import { changeTitle, getAgents } from '../HomePage/actions';
import { selectAgents } from '../HomePage/selectors';

import Facebook from './Facebook';
import Slack from './Slack';

const TPCard = styled(Card)`
  && {
    width: 300px;
    display: inline-block;
    margin-right: 15px;
  }
`;

const StyledHeader = styled(CardMedia)`
  && {
    height: 0;
    padding-top: 56.25%; // 16:9
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class ThirdParty extends React.PureComponent {
  componentDidMount() {
    this.props.getAgents();
    this.props.getAll();
    this.props.changeTitle('Third Party Setup');
  }

  render() {
    const { facebook, slack, handleUpdateForm, agents, dispatch } = this.props;
    return (
      <div>
        <Helmet>
          <title>ThirdParty</title>
          <meta name="description" content="Description of ThirdParty" />
        </Helmet>
        <div style={{ display: 'flex' }}>
          <Facebook
            stats={facebook}
            handleUpdateForm={handleUpdateForm}
            agents={agents}
            dispatch={dispatch}
          />
          <Slack
            stats={slack}
            handleUpdateForm={handleUpdateForm}
            agents={agents}
            dispatch={dispatch}
          />
          <TPCard>
            <StyledHeader
              image="https://i.imgur.com/mvXdfqu.jpg"
              title="Microsoft Teams Logo"
            />
            <CardContent />
          </TPCard>
        </div>
      </div>
    );
  }
}

ThirdParty.propTypes = {
  getAll: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getAgents: PropTypes.func.isRequired,
  facebook: PropTypes.object.isRequired,
  slack: PropTypes.object.isRequired,
  changeTitle: PropTypes.func.isRequired,
  handleUpdateForm: PropTypes.func.isRequired,
  agents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  facebook: selectFacebook(),
  slack: selectSlack(),
  agents: selectAgents(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAll: () => dispatch(getAll()),
    getAgents: () => dispatch(getAgents()),
    changeTitle: title => dispatch(changeTitle(title)),
    handleUpdateForm: event =>
      dispatch(
        updateForm(
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
          event.target.name,
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'thirdParty', reducer });
const withSaga = injectSaga({ key: 'thirdParty', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ThirdParty);
