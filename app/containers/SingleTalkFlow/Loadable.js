/**
 *
 * Asynchronously loads the component for SingleTalkFlow
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
