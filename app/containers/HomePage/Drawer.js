/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatDrawer from 'containers/RightSidebar/Loadable';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MyToolBar from './ToolBar';
import { topLists, mainList } from './tileData';

const drawerWidth = 240;
const chatWidth = 320;

const styles = theme => ({
  palette: {
    type: 'dark',
    action: {
      color: '#fff',
    },
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    action: {
      color: '#fff',
    },
  },
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.light,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingRight: '10px',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    backgroundColor: '#001529',
    height: '100%',
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  content: {
    maxWidth: 'calc(100% - 67px)',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

  'content-right': {
    marginRight: -chatWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-right': {
    marginRight: -chatWidth,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    chatOpen: false,
  };

  handleDrawerOpen = type => {
    this.setState({ [type]: true });
  };

  handleDrawerClose = type => {
    this.setState({ [type]: false });
  };

  toggleOpen = type => {
    this.setState({ [type]: !this.state[type] });
  };

  render() {
    const { classes, theme, title } = this.props;

    const StyledNavLink = styled(NavLink)`
      && {
        h3 {
          color: #a6adb4;
        }
        svg {
          fill: #a6adb4;
        }
        &.active {
          h3 {
            color: #ff0;
          }
          svg {
            fill: #ff0;
          }
        }
        &:hover {
          h3 {
            color: #ff0;
          }
          svg {
            fill: #ff0;
          }
        }
      }
    `;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift,
          )}
        >
          <MyToolBar
            open={this.state.open}
            handleDrawerOpen={() => this.handleDrawerOpen('open')}
            classes={classes}
            title={title}
            changeTheme={this.props.changeTheme}
            user={this.props.user}
            toggleChat={() => this.toggleOpen('chatOpen')}
          />
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose,
            ),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={() => this.handleDrawerClose('open')}
              style={{ color: 'white' }}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {topLists.map((value, index) => (
              <StyledNavLink
                exact
                key={`${index}-top`}
                to={value.link}
                style={{ textDecoration: 'none' }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <value.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ color: 'white' }}>{value.text}</span>
                    }
                    style={{ color: 'white' }}
                  />
                </ListItem>
              </StyledNavLink>
            ))}
          </List>
          <Divider />
          <List>
            {mainList.map((value, index) => (
              <StyledNavLink
                key={`${index}-bot`}
                to={value.link}
                style={{ textDecoration: 'none' }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <value.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ color: 'white' }}>{value.text}</span>
                    }
                    style={{ color: 'white' }}
                  />
                </ListItem>
              </StyledNavLink>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, classes.contentShift, {
            [classes['contentShift-right']]: !this.state.chatOpen,
          })}
        >
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
        <ChatDrawer width={chatWidth} open={this.state.chatOpen} />
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  changeTheme: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  user: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
