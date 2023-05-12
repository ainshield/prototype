// ** Icon imports
// import Login from 'mdi-material-ui/Login'
// import Table from 'mdi-material-ui/Table'
// import CubeOutline from 'mdi-material-ui/CubeOutline'
// import Home from 'mdi-material-ui/Home'
// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
// import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactsIcon from '@mui/icons-material/Contacts';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [

    {
      sectionTitle: 'User Panel'
    },

    {
      title: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard'
    },

    {
      title:'Inventory',
      icon: WarehouseIcon,
      path: '/inventory'
    },

    {
      title:'Supplier List',
      icon: ContactsIcon,
      path: '/supplier-list'
    },

    {
      title: 'Profile Management',
      icon: PersonIcon,
      path: '/profile-manager'
    },

    {
      sectionTitle: 'Administrator Panel'
    },

    // {
    //   title:'Inventory',
    //
    //   path:'/'
    // },

    {
      title: 'User Management',
      icon: ManageAccountsIcon,
      path: '/user-manager'
    },
    {
      title: 'System Configuration',
      icon: SettingsIcon,
      path: '/system-config'
    }
  ]
}

export default navigation
