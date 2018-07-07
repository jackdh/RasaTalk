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
import { push } from 'react-router-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import Wrapper from 'components/Grid/Wrapper';
import ProfileCard from 'components/Cards/ProfileCard';
import Table from 'components/Table/GenericTable';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from '@material-ui/core';

import saga from './saga';
import reducer from './reducer';
// import Table from './TalkTable';
import { changeTitle } from '../HomePage/actions';
import { loadParents, addNode } from './actions';
import { selectParents, selectLoading } from './selectors';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export class Talk extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    newNode: '',
  };

  componentDidMount() {
    this.props.changeTitle('Talk');
    this.props.loadParents();
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.addNew(this.state.newNode);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { all, loading, goTo } = this.props;
    return (
      <div>
        <Helmet>
          <title>Talk</title>
          <meta name="description" content="Description of Talk" />
        </Helmet>

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
            <ProfileCard
              loading={loading}
              subtitle="Get connecting!"
              agent="Talk Flow"
              description="Currently you can just have one set of dialogs, however there will soon be multiple."
              avatar="https://s3.eu-west-2.amazonaws.com/rasatalk/i46krMC.png"
            />
            <Card style={{ marginTop: '30px' }}>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
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
  loadParents: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  all: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: selectParents(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
    loadParents: () => {
      dispatch(loadParents());
    },
    addNew: name => {
      dispatch(addNode(name));
    },
    goTo: uid => {
      dispatch(push(`/talk/${uid}`));
    },
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
