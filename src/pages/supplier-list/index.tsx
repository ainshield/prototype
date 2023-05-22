// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import SupplierTable from '../../views/tables/supplierTable'


const Supplier = () => {
  return (


    <Grid item xs={12}>
      <Card>
        <CardHeader title='Suppliers' titleTypographyProps={{ variant: 'h6' }} />
        <SupplierTable />
      </Card>
    </Grid>

  )
}

export default Supplier
