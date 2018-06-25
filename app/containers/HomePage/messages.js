/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 *
 * So I guess this is the internationalisation shit to change text and stuff. Cool.
 *
 * I wonder if it can be generated otherwise this is going to be a massive pain to make each id. TODO.
 *
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.HomePage.start_project.header',
    defaultMessage: 'asdasdStart your next react project in seconds',
  },
  startProjectMessage: {
    id: 'boilerplate.containers.HomePage.start_project.message',
    defaultMessage:
      'Werid why dont you work! asdasdsadA highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },
  trymeHeader: {
    id: 'boilerplate.containers.HomePage.tryme.header',
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: 'boilerplate.containers.HomePage.tryme.message',
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: 'boilerplate.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },
});
