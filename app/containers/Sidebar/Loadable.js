/**
 *
 * Asynchronously loads the component for Sidebar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
