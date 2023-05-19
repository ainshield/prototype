// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import UserDataTable from '../../views/tables/userManagement'

const UserManagement = () => {
  return (

  <Grid item xs={12}>
    <Card>
      <CardHeader title='User Management' titleTypographyProps={{ variant: 'h6' }} />
      <UserDataTable />
    </Card>
  </Grid>

  )
}

export default UserManagement

