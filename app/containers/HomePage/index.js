/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Talk from 'containers/Talk/Loadable';
import Agents from 'containers/Agents/Loadable';
import History from 'containers/History/Loadable';
import Entities from 'containers/Entities/Loadable';
import Synonyms from 'containers/Synonyms/Loadable';
import Feedback from 'containers/Feedback/Loadable';
import Training from 'containers/Training/Loadable';
import Intents from 'containers/NodePage/Loadable';
import SmallTalk from 'containers/SmallTalk/Loadable';
import Expressions from 'containers/Expression/Loadable';
import Dashboard from 'containers/DashboardPage/Loadable';
import Permissions from 'containers/Permissions/Loadable';
import TalkFlow from 'containers/SingleTalkFlow/Loadable';
import ThirdParty from 'containers/ThirdParty/Loadable';
import axios from 'axios';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Snackbar from './Snackbar';
import reducer from './reducer';
import Drawer from './Drawer';
import saga from './saga';

import { makeSelectTitle, selectUser } from './selectors';
import { changeTitle, setUser } from './actions';

axios.defaults.headers.common.Authorization = localStorage.getItem('token');

export class HomePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    theme: localStorage.getItem('darkTheme')
      ? localStorage.getItem('darkTheme')
      : 'light',
  };

  componentDidMount() {
    if (!localStorage.getItem('user')) {
      localStorage.removeItem('token');
    } else {
      const parse = JSON.parse(localStorage.getItem('user'));
      this.props.addUser(parse);
    }
  }

  getTheme = theme =>
    createMuiTheme({
      palette: {
        type: theme,
        primary: {
          light: '#757ce8',
          main: theme === 'light' ? '#3f50b5' : '#ff0',
          dark: theme === 'light' ? '#002884' : '#b8b800',
          contrastText: theme === 'light' ? '#fff' : '#000',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
      typography: {
        useNextVariants: true,
      },
    });

  changeTheme = () => {
    this.setState(
      { theme: this.state.theme === 'light' ? 'dark' : 'light' },
      () => {
        localStorage.setItem('darkTheme', this.state.theme);
      },
    );
  };

  render() {
    const theme = this.getTheme(this.state.theme);

    return (
      <MuiThemeProvider theme={theme}>
        <Drawer
          title={this.props.title}
          changeTheme={this.changeTheme}
          user={this.props.user}
        >
          <Switch>
            <Route
              path="/permissions"
              name="Permissions"
              component={Permissions}
            />
            <Route path="/history" name="History" component={History} />

            <Route path="/feedback" name="Feedback" component={Feedback} />
            <Route path="/talk" exact name="Talk" component={Talk} />
            <Route
              path="/talk/:nodeuid"
              name="Talk Flow"
              component={TalkFlow}
            />
            <Route path="/smalltalk" name="Small Talk" component={SmallTalk} />

            <Route exact path="/agents" name="Agents" component={Agents} />
            <Route
              exact
              path="/agents/:agentName"
              name="Intents"
              component={Intents}
            />
            <Route
              path="/agents/:agentName/intent/:intent"
              name="Expressions"
              component={Expressions}
            />

            <Route
              exact
              path="/entities/"
              name="Entities"
              component={Entities}
            />
            <Route
              path="/entities/:entity"
              name="Synonyms"
              component={Synonyms}
            />
            <Route
              path="/thirdParty"
              name="Third Parties"
              component={ThirdParty}
            />

            <Route path="/training" name="Training" component={Training} />
            <Route path="/" name="Dashboard" component={Dashboard} />
          </Switch>
        </Drawer>
        <Snackbar />
      </MuiThemeProvider>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  title: PropTypes.string.isRequired,
  addUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  title: makeSelectTitle(),
  user: selectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
    addUser: user => {
      dispatch(setUser(user));
    },
  };
}

const withSaga = injectSaga({ key: 'home', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(HomePage);
