import DashboardIcon from '@material-ui/icons/Dashboard';
import Refresh from '@material-ui/icons/Refresh';
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/icons/Forum';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Entities from '@material-ui/icons/Link';
import Training from '@material-ui/icons/Train';
import Public from '@material-ui/icons/Public';

export const topLists = [
  {
    icon: DashboardIcon,
    text: 'Dashboard',
    link: '/',
  },
  {
    icon: Refresh,
    text: 'WipeCache',
    link: '/',
  },
];

export const mainList = [
  {
    icon: LockIcon,
    text: 'Permissions',
    link: '/permissions',
  },
  {
    icon: Dialog,
    text: 'Talk',
    link: '/talk',
  },
  {
    icon: SupervisorAccount,
    text: 'Agents',
    link: '/agents',
  },
  {
    icon: Entities,
    text: 'Entities',
    link: '/entities',
  },
  {
    icon: Training,
    text: 'Training',
    link: '/training',
  },
  {
    icon: Public,
    text: 'Third Parties',
    link: '/thirdParty',
  },
];
