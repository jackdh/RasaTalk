/**
 *
 * Asynchronously loads the component for ThirdParty
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
