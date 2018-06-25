/**
 * Asynchronously loads the component for HomePage
 *
 * https://github.com/jamiebuilds/react-loadable
 *
 * It basically just wraps compnents so that can be loaded in with async this means shit loads faster aparently. As
 * webpack can get big and slow as it loads everything at onece.
 *
 */
import Loadable from 'react-loadable';

import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
