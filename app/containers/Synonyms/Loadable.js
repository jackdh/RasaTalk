/**
 *
 * Asynchronously loads the component for Synonyms
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
