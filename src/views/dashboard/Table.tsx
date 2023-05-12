// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'


// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

interface RowType {
  equipmentName: string
  issued: string
  issuer: string
  dateIssued: string
  status: string
  position: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const rows: RowType[] = [
  {
    status: 'urgent',
    issued: 'John Doe',
    equipmentName: 'Sony Xperia Z Tablet',
    dateIssued: '09/27/2018',
    issuer: 'Jane Doe',
    position: 'Human Resources Assistant'
  }
]

const statusObj: StatusObj = {
  // applied: { color: 'info' },
  // rejected: { color: 'error' },
  ongoing: { color: 'primary' },
  urgent: { color: 'warning' },
  finished: { color: 'success' }
}

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Equipment Name</TableCell>
              <TableCell>Issuer</TableCell>
              <TableCell>Issued</TableCell>
              <TableCell>Issued Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.equipmentName} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.equipmentName}</Typography>
                    {/*<Typography variant='caption'>{row.position}</Typography>*/}
                  </Box>
                </TableCell>
                <TableCell>{row.issuer}</TableCell>
                <TableCell>{row.issued}</TableCell>
                <TableCell>{row.dateIssued}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
