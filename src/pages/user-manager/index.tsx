// ** MUI Imports
import Grid from '@mui/material/Grid'

// import Link from '@mui/material/Link'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// import CardHeader from '@mui/material/CardHeader'/

// ** Demo Components Imports

//import TableBasic from 'src/views/tables/TableBasic'
// import TableDense from 'src/views/tables/TableDense'
// import TableSpanning from 'src/views/tables/TableSpanning'
// import TableCustomized from 'src/views/tables/TableCustomized'
// import TableCollapsible from 'src/views/tables/TableCollapsible'

import UserManagement from '../../views/tables/userManagement'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          User Management
        </Typography>

      </Grid>
      <Grid item xs={12}>
        <Card>
          <UserManagement />
        </Card>
      </Grid>

    </Grid>
  )
}

export default MUITable
