/**
 *
 * Talk
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router/immutable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import Wrapper from 'components/Grid/Wrapper';
import ProfileCard from 'components/Cards/ProfileCard';
import Table from 'components/Table/GenericTable';
import BackButton from 'components/BackButton';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from '@material-ui/core';

import { selectTalkWrapper } from '../../containers/HomePage/selectors';
import saga from './saga';
import reducer from './reducer';
import { changeTitle } from '../HomePage/actions';
import { loadParents, addNode } from './actions';
import { selectParents, selectLoading } from './selectors';

export class Talk extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    newNode: '',
  };

  componentDidMount() {
    this.props.changeTitle('Talk');
    this.props.loadParents(this.props.match.params.groupid);
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.dispatch(
        addNode(this.props.match.params.groupid, this.state.newNode),
      );
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { all, loading, goTo, sideInfo } = this.props;
    return (
      <div>
        <Helmet>
          <title>Talk</title>
          <meta name="description" content="Description of Talk" />
        </Helmet>
        <BackButton tooltip="Back to groups" link="/talkGroups/" />
        <Wrapper>
          <Grid item xs={8}>
            <Table
              title="Nodes"
              rowClick={{
                data: 'uid',
                func: data => goTo(data),
              }}
              items={all}
              style={{ cursor: 'pointer' }}
              headers={[
                {
                  id: 'name',
                  numeric: false,
                  disablePadding: false,
                  label: 'Intents',
                },
                {
                  id: 'group',
                  numeric: true,
                  label: 'Groups',
                },
                {
                  id: 'uid',
                  numeric: true,
                  label: 'UID',
                  cellClick: uid => {
                    const textField = document.createElement('textarea');
                    textField.innerText = uid;
                    document.body.appendChild(textField);
                    textField.select();
                    document.execCommand('copy');
                    textField.remove();
                  },
                  style: { cursor: 'copy' },
                },
              ]}
            />
          </Grid>

          <Grid item xs={4}>
            {!sideInfo && <ProfileCard loading />}
            {sideInfo && (
              <ProfileCard
                loading={loading}
                subtitle={sideInfo.subtitle}
                agent={sideInfo.name}
                description={sideInfo.description}
                avatar={sideInfo.avatar}
              />
            )}
            <Card style={{ marginTop: '30px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Add new node
                </Typography>
                <Typography component="p">
                  Feel free to use any name you&#39;d like with or without
                  prefixes.
                </Typography>

                <TextField
                  id="newNode"
                  label="New Node"
                  value={this.state.newNode}
                  onChange={this.handleChange('newNode')}
                  onKeyPress={this.handleKeyPress}
                  disabled={loading}
                  inputRef={input => {
                    this.textInput = input;
                  }}
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

Talk.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadParents: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  all: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  sideInfo: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return createStructuredSelector({
    all: selectParents(),
    loading: selectLoading(),
    sideInfo: selectTalkWrapper(ownProps.match.params.groupid),
  });
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
    loadParents: s => {
      dispatch(loadParents(s));
    },
    goTo: uid => {
      dispatch(push(`${ownProps.match.params.groupid}/${uid}`));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'talk', reducer });
const withSaga = injectSaga({ key: 'talk', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Talk);
