/* eslint-disable indent */
/**
 *
 * SingleTalkFlow
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import Wrapper from 'components/Grid/Wrapper';
import BackButton from 'components/BackButton';
import { Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import Node from 'components/Node';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import EditNode from 'containers/EditNode/Loadable';

import saga from './saga';
import reducer from './reducer';
import { changeTitle } from '../HomePage/actions';
import { makeSelectFamily, selectEditNode } from './selectors';
import {
  setCurrentNode,
  addNode,
  removeNode,
  moveNode,
  setEditNode,
} from './actions';

const slideIn = keyframes`100% { transform: translateX(0%); }`;
const slideOut = keyframes`0% { transform: translateX(0%); }`;
const opacityIn = keyframes`0%   { opacity: 0; }100% { opacity: 1; }`;
const opacityOut = keyframes`0%   { opacity: 1; }100% { opacity: 0; }`;

const width = 500;

const Nodes = styled.div`
  flex-grow: 1;
  transition: margin 0.5s;
  ${props =>
    !props.open ? `margin-right: -${width}px;` : 'margin-right: 25px;'};
`;

const Edit = styled.div`
  flex: 0 0 auto;
  width: ${width}px;

  transform: translateX(110%);
  opacity: ${props => (props.open ? '1' : '0')};
  ${props =>
    props.open &&
    `animation: ${opacityIn} 0.5s forwards, ${slideIn} 0.5s forwards;`} ${props =>
    !props.open &&
    `animation: ${opacityOut} 0.2s forwards, ${slideOut} 0.5s forwards;`};
`;

export class SingleTalkFlow extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle(`Flow: ${this.props.match.params.nodeuid}`);
    this.props.setCurrentNode(this.props.match.params.nodeuid);
    if (this.props.node) {
      this.props.setNode(this.props.match.params.nodeuid);
    }
  }

  render() {
    const { node } = this.props;
    return (
      <div>
        <Helmet>
          <title>TalkFlow</title>
          <meta name="description" content="Description of TalkFlow" />
        </Helmet>
        <BackButton tooltip="Back to nodes" link="/talk" />

        <Wrapper>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <Nodes open={!!node.trim()}>
              <Node
                family={this.props.family}
                add={this.props.addNode}
                remove={this.props.removeNode}
                move={this.props.moveNode}
                setNode={this.props.setNode}
                isParent
              />
            </Nodes>
            <Edit open={!!node.trim()}>
              <EditNode node={node} />
            </Edit>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

SingleTalkFlow.propTypes = {
  node: PropTypes.string,
  changeTitle: PropTypes.func.isRequired,
  setCurrentNode: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      nodeuid: PropTypes.string,
    }),
  }),
  family: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
    enabled: PropTypes.bool,
  }),
  addNode: PropTypes.func,
  removeNode: PropTypes.func,
  moveNode: PropTypes.func,
  setNode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  family: makeSelectFamily(),
  node: selectEditNode(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title => dispatch(changeTitle(title)),
    setCurrentNode: node => dispatch(setCurrentNode(node)),
    addNode: uid => dispatch(addNode(uid)),
    removeNode: uid => dispatch(removeNode(uid)),
    moveNode: (uid, direction) => dispatch(moveNode(uid, direction)),
    setNode: uid => {
      dispatch(setEditNode(uid));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'talkFlow', reducer });

const withSaga = injectSaga({ key: 'talkFlow', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SingleTalkFlow);
