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
import injectSaga from 'utils/injectSaga';
import { Edit } from '@material-ui/icons';
import Wrapper from 'components/Grid/Wrapper';
import BackButton from 'components/BackButton';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table/GenericTable';
import { createStructuredSelector } from 'reselect';
import ProfileCard from 'components/Cards/ProfileCard';
import { push } from 'connected-react-router/immutable';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core';

import EditTalkWrapper from './EditTalkWrapper';
import saga from './saga';
import reducer from './reducer';
import { loadParents, addNode } from './actions';
import { changeTitle } from '../HomePage/actions';
import { selectTalkWrapper } from '../../containers/HomePage/selectors';
import {
  updateTalkWrappers,
  deleteTalkWrappers,
} from '../../containers/TalkWrapper/actions';
import { selectParents, selectLoading, selectUpdating } from './selectors';

export class Talk extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    newNode: '',
    open: false,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

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
    const { all, loading, goTo, sideInfo, updating, dispatch } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Helmet>
          <title>Talk</title>
          <meta name="description" content="Description of Talk" />
        </Helmet>

        <BackButton tooltip="Back to groups" link="/talkGroups/" />

        <EditTalkWrapper
          {...sideInfo}
          open={open}
          handleClose={this.handleClose}
          updating={updating}
          onSubmit={(x, y) => dispatch(updateTalkWrappers(x, y))}
          onDelete={x => dispatch(deleteTalkWrappers(x))}
        />

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
                footer={
                  <IconButton onClick={this.handleOpen}>
                    <Edit />
                  </IconButton>
                }
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
  goTo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  sideInfo: PropTypes.object.isRequired,
  loadParents: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  all: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

function mapStateToProps(state, ownProps) {
  return createStructuredSelector({
    all: selectParents(),
    loading: selectLoading(),
    sideInfo: selectTalkWrapper(ownProps.match.params.groupid),
    updating: selectUpdating(),
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
