/**
 *
 * Asynchronously loads the component for Chatbot
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
