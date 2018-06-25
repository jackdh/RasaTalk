import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import statsCardStyle from '../variables/styles/statsCardStyle';

const StatsCard = ({ ...props }) => {
  const { classes, title, description, small, iconColor, statText } = props;
  return (
    <Card className={classes.card} style={{ overflow: 'inherit' }}>
      <CardHeader
        classes={{
          root: `${classes.cardHeader} ${classes[`${iconColor}CardHeader`]}`,
          avatar: classes.cardAvatar,
        }}
        avatar={<props.icon className={classes.cardIcon} />}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}{' '}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div
          className={classes.cardStats}
          style={{ display: 'flex', alignContent: 'center' }}
        >
          <props.statIcon style={{ height: '20px', marginTop: '5px' }} />
          {statText && <span style={{ marginTop: '4px' }}>{statText}</span>}
        </div>
      </CardActions>
    </Card>
  );
};

StatsCard.defaultProps = {
  iconColor: 'purple',
  statIconColor: 'gray',
};

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  iconColor: PropTypes.oneOf(['orange', 'green', 'red', 'blue', 'purple']),
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statIconColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  statLink: PropTypes.object,
  statText: PropTypes.node,
};

export default withStyles(statsCardStyle)(StatsCard);
