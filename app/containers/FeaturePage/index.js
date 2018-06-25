/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <Typography>
            <FormattedMessage {...messages.header} />
          </Typography>
        </H1>
        <List>
          <ListItem>
            <ListItemTitle>
              <Typography>
                <FormattedMessage {...messages.scaffoldingHeader} />
              </Typography>
            </ListItemTitle>

            <Typography>
              <FormattedMessage {...messages.scaffoldingMessage} />
            </Typography>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <Typography>
                <FormattedMessage {...messages.feedbackHeader} />
              </Typography>
            </ListItemTitle>

            <Typography>
              <FormattedMessage {...messages.feedbackMessage} />
            </Typography>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <Typography>
                <FormattedMessage {...messages.routingHeader} />
              </Typography>
            </ListItemTitle>

            <Typography>
              <FormattedMessage {...messages.routingMessage} />
            </Typography>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <Typography>
                <FormattedMessage {...messages.networkHeader} />
              </Typography>
            </ListItemTitle>

            <Typography>
              <FormattedMessage {...messages.networkMessage} />
            </Typography>
          </ListItem>

          <ListItem>
            <Typography>
              <ListItemTitle>
                <FormattedMessage {...messages.intlHeader} />
              </ListItemTitle>
            </Typography>

            <Typography>
              <FormattedMessage {...messages.intlMessage} />
            </Typography>
          </ListItem>
        </List>
      </div>
    );
  }
}
