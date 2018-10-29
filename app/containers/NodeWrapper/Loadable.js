/**
 *
 * Asynchronously loads the component for NodeWrapper
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
