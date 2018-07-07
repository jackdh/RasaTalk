import React from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import defaultAvatar from './placeholder-male.png';

import profileCardStyle from '../variables/styles/profileCardStyle';

function ProfileCard({ ...props }) {
  const {
    loading,
    classes,
    subtitle,
    agent,
    description,
    footer,
    avatar,
    avatarClick,
  } = props;

  let subtitleArea;
  let agentArea;
  let descriptionArea;

  if (loading) {
    subtitleArea = (
      <ContentLoader
        height={35}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#959595"
      >
        <rect x="100" y="15" rx="4" ry="4" width="200" height="15" />
      </ContentLoader>
    );
    agentArea = (
      <ContentLoader
        height={35}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#959595"
        style={{ marginTop: '10px' }}
      >
        <rect x="150" y="15" rx="4" ry="4" width="100" height="20" />
      </ContentLoader>
    );
    descriptionArea = (
      <ContentLoader
        height={55}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#959595"
        style={{ marginTop: '20px' }}
      >
        <rect x="100" y="15" rx="4" ry="4" width="200" height="5" />
        <rect x="100" y="25" rx="4" ry="4" width="200" height="5" />
      </ContentLoader>
    );
  } else {
    if (subtitle !== undefined) {
      subtitleArea = (
        <Typography
          component="h6"
          className={classes.cardSubtitle}
          style={{ minHeight: '24px' }}
        >
          {subtitle}
        </Typography>
      );
    }
    if (agent !== undefined) {
      agentArea = (
        <Typography component="h4" className={classes.cardTitle}>
          {agent}
        </Typography>
      );
    }
    if (description !== undefined) {
      descriptionArea = (
        <Typography component="p" className={classes.cardDescription}>
          {description}
        </Typography>
      );
    }
  }

  return (
    <Card
      className={classes.card}
      style={{
        minHeight: footer ? '335px' : '',
        overflow: 'initial',
        marginTop: avatar !== 'none' ? '30px' : '',
      }}
    >
      {avatar !== 'none' && (
        <CardHeader
          classes={{
            root: classes.cardHeader,
            avatar: classes.cardAvatar,
          }}
          onClick={avatarClick}
          style={{ cursor: 'pointer' }}
          avatar={
            <img
              src={avatar !== '' && !loading ? avatar : defaultAvatar}
              alt="..."
              className={classes.img}
            />
          }
        />
      )}

      <CardContent
        className={classes.textAlign}
        style={{ minHeight: footer ? '200px' : '' }}
      >
        {subtitleArea}

        {agentArea}

        {descriptionArea}
      </CardContent>
      <CardActions className={`${classes.textAlign} ${classes.cardActions}`}>
        {footer}
      </CardActions>
    </Card>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  agent: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string,
  avatarClick: PropTypes.func,
};

export default withStyles(profileCardStyle)(ProfileCard);
