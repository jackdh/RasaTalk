/**
 *
 * Asynchronously loads the component for Feedback
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
