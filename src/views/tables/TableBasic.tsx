// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (id: number, programid: number, roleid: number,
                    permissionid: number, username: string, password: string,
                    firstname: string, middlename: string, lastname: string,
                    contactnumber: number, mobilenumber: string, email: string,
                    position: string, notes: string) => {

  return { id, programid, roleid, permissionid, username, password,
           firstname, middlename, lastname, contactnumber, mobilenumber,
           email, position, notes
  }
}

const rows = [
  createData(1, 13662724, 215161, 6246136, 'johndoe', 'foobar1234',
    'John', ' ', 'Doe',0, '09123456789', 'johndoe@example.com',
    'employee', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),

]



const TableBasic = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align='right'>program id</TableCell>
            <TableCell align='right'>role id</TableCell>
            <TableCell align='right'>permission id</TableCell>
            <TableCell align='right'>username</TableCell>
            <TableCell align='right'>password</TableCell>
            <TableCell align='right'>first name</TableCell>
            <TableCell align='right'>middle name</TableCell>
            <TableCell align='right'>last name</TableCell>
            <TableCell align='right'>contact number</TableCell>
            <TableCell align='right'>mobile number</TableCell>
            <TableCell align='right'>email</TableCell>
            <TableCell align='right'>position</TableCell>
            <TableCell align='right'>notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.programid}</TableCell>
              <TableCell align='right'>{row.roleid}</TableCell>
              <TableCell align='right'>{row.permissionid}</TableCell>
              <TableCell align='right'>{row.username}</TableCell>
              <TableCell align='right'>{row.password}</TableCell>
              <TableCell align='right'>{row.firstname}</TableCell>
              <TableCell align='right'>{row.middlename}</TableCell>
              <TableCell align='right'>{row.lastname}</TableCell>
              <TableCell align='right'>{row.contactnumber}</TableCell>
              <TableCell align='right'>{row.mobilenumber}</TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.position}</TableCell>
              <TableCell align='right'>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
