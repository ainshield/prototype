// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const createData = (
  id: number,
  programid: number,
  roleid: number,
  permissionid: number,
  username: string,
  password: string,
  firstname: string,
  middlename: string,
  lastname: string,
  contactnumber: number,
  mobilenumber: string,
  email: string,
  position: string,
  notes: string
) => {
  return {
    id,
    programid,
    roleid,
    permissionid,
    username,
    password,
    firstname,
    middlename,
    lastname,
    contactnumber,
    mobilenumber,
    email,
    position,
    notes
  }
}


const Row = (props: { row: ReturnType<typeof createData> }) => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.id}
        </TableCell>
      {/*  <TableCell align='right'>{row.calories}</TableCell>*/}
      {/*  <TableCell align='right'>{row.fat}</TableCell>*/}
      {/*  <TableCell align='right'>{row.carbs}</TableCell>*/}
      {/*  <TableCell align='right'>{row.protein}</TableCell>*/}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/*<TableBody>*/}
                {/*  {row.history.map(historyRow => (*/}
                {/*    <TableRow key={historyRow.date}>*/}
                {/*      <TableCell component='th' scope='row'>*/}
                {/*        {historyRow.date}*/}
                {/*      </TableCell>*/}
                {/*      <TableCell>{historyRow.customerId}</TableCell>*/}
                {/*      <TableCell align='right'>{historyRow.amount}</TableCell>*/}
                {/*      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>*/}
                {/*    </TableRow>*/}
                {/*  ))}*/}
                {/*</TableBody>*/}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const rows = [
  createData(
    1,
    13662724,
    215161,
    6246136,
    'johndoe',
    'foobar1234',
    'John',
    ' ',
    'Doe',
    0,
    '09123456789',
    'johndoe@example.com',
    'employee',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ),
  createData(
    2,
    13662724,
    215161,
    6246136,
    'johndoe',
    'foobar1234',
    'John',
    ' ',
    'Doe',
    0,
    '09123456789',
    'johndoe@example.com',
    'employee',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ),
  createData(
    3,
    13662724,
    215161,
    6246136,
    'johndoe',
    'foobar1234',
    'John',
    ' ',
    'Doe',
    0,
    '09123456789',
    'johndoe@example.com',
    'employee',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  )
]

const TableCollapsible = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat (g)</TableCell>
            <TableCell align='right'>Carbs (g)</TableCell>
            <TableCell align='right'>Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
