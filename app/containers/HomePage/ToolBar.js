import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import Exit from '@material-ui/icons/ExitToApp';
import { withTheme } from '@material-ui/core/styles';
import Light from '@material-ui/icons/LightbulbOutline';
import { Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';

export class MyToolBar extends React.PureComponent {
  state = {
    redirect: false,
  };

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({ redirect: true });
  };

  render() {
    const {
      open,
      toggleChat,
      handleDrawerOpen,
      classes,
      title,
      changeTheme,
      user,
      theme: {
        palette: { type },
      },
    } = this.props;

    const Name = styled(Typography)`
      && {
        color: ${type === 'light' ? 'rgba(0,0,0,.65)' : '#ffffffba'};
        line-height: 4em;
        margin-left: 15px;
      }
    `;

    const StyledAvatar = styled(Avatar)`
      height: 30px;
      width: 30px;
      line-height: 64px;
    `;

    const Settings = styled.div`
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      &:hover {
        background: ${type === 'light'
          ? '#e6f7ff'
          : 'rgba(255, 255, 255, 0.1)'};
      }
    `;

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <Toolbar disableGutters={!open}>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" noWrap className={classes.flex}>
          {title}
        </Typography>

        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={toggleChat}
          color="inherit"
        >
          <ChatIcon />
        </IconButton>

        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={changeTheme}
          color="inherit"
        >
          <Light />
        </IconButton>

        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.logout}
          color="inherit"
        >
          <Exit />
        </IconButton>

        <Settings>
          <StyledAvatar alt="User Avatar from Gravatar" src={user.gravatar} />
          <Name variant="subheading">{user.name}</Name>
        </Settings>
      </Toolbar>
    );
  }
}

MyToolBar.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  toggleChat: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default withTheme()(MyToolBar);
