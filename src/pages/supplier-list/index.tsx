// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import UserManagementTable from '../../views/tables/userManagement'


const UserManagement = () => {
  return (


    <Grid item xs={12}>
      <Card>
        <CardHeader title='Suppliers' titleTypographyProps={{ variant: 'h6' }} />
        <UserManagementTable />
      </Card>
    </Grid>

  )
}

export default UserManagement
