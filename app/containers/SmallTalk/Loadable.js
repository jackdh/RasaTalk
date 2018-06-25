/**
 *
 * Asynchronously loads the component for SmallTalk
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
