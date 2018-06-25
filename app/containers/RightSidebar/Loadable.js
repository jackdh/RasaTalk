/**
 *
 * Asynchronously loads the component for RightSidebar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
