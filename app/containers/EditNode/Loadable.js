/**
 *
 * Asynchronously loads the component for EditNode
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
