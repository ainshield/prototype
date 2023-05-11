// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import InventoryTable from '../../views/tables/inventory'


const Inventory = () => {
  return (


    <Grid item xs={12}>
      <Card>
        <CardHeader title='Inventory' titleTypographyProps={{ variant: 'h6' }} />
        <InventoryTable />
      </Card>
    </Grid>

  )
}

export default Inventory
