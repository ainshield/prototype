import React, { useCallback, useMemo, useState } from 'react'
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row
} from 'material-react-table'
import {
  AppBar, Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton, ListItemText,

  // MenuItem,
  Stack,
  TextField, Toolbar,
  Tooltip
} from '@mui/material'

import { Delete, Edit } from '@mui/icons-material'
import { data } from './data/userData'
import {Info} from "@material-ui/icons";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

// import ListItem from "@mui/material/ListItem";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";


export type Person = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  programId: string
  roleId: string
  permissionId: string
  contactNo: string
  mobileNo: string
  email: string
  position: string
  username: string
  password: string
  is_void: string
  createdBy: string
  modifiedBy: string
  notes: string
}

const UserManagementTable = () => {

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Person[]>(() => data)
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string
  }>({})



  const handleCreateNewRow = (values: Person) => {
    tableData.push(values)
    setTableData([...tableData])
  }

  const handleSaveRowEdits: MaterialReactTableProps<Person>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values
  }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values

      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData])
      exitEditingMode() //required to exit editing mode and close modal
    }
  }

  const handleCancelRowEdits = () => {
    setValidationErrors({})
  }

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Person>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('id')}`)) {
        return
      }

      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1)
      setTableData([...tableData])
    },
    [tableData]
  )

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Person>): MRT_ColumnDef<Person>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: event => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value)
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`
            })
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id]
            setValidationErrors({
              ...validationErrors
            })
          }
        }
      }
    },
    [validationErrors]
  )

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'ID',
      //   enableColumnOrdering: false,
      //   enableEditing: false, //disable editing on this column
      //   enableSorting: false,
      //   size: 80
      // },
      {
        accessorKey: 'username',
        header: 'Username',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'password',
        header: 'Password',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),

        })
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableColumnOrdering: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email'
        })
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },

      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },

      {
        accessorKey: 'programId',
        header: 'ProgramID',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'roleId',
        header: 'RoleID',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'permissionId',
        header: 'PermissionID',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'contactNo',
        header: 'Contact No.',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'mobileNo',
        header: 'Mobile No.',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'position',
        header: 'Position',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'is_void',
        header: 'Void',
        enableColumnOrdering: false,
        enableSorting: false,
        Edit: ({ cell, column, table }) => <Autocomplete
            disablePortal
            id='isvoid'
            options={['true','false']}
            renderInput={(params) => <TextField {...params}
                                                InputLabelProps={{ shrink: true }} fullWidth label="Is void" variant='standard' />}
        />,
        size: 80
      },
      {
        accessorKey: 'createdBy',
        header: 'Created by',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'modifiedBy',
        header: 'Modified',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        enableColumnOrdering: false,
        enableSorting: false,
        size: 80
      }
    ],
    [getCommonEditTextFieldProps]
  )

  return (
    <>
      <MaterialReactTable
        muiTableContainerProps={{ sx: { height: '600px' } }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'left'
            },
            size: 120
          }
        }}
        columns={columns}
        data={tableData}
        initialState={{ columnVisibility: {
            firstName: false,
            lastName: false,
            middleName: false,
            programId: false,
            roleId: false,
            permissionId: false,
            contactNo: false,
            mobileNo: false,
            position: false,
            is_void: false,
            createdBy: false,
            modifiedBy: false,
            notes: false
        } }}
        editingMode='modal' //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement='left' title='Info'>
              <IconButton onClick={() => setViewModalOpen(true)}>
                <Info />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color='primary' onClick={() => setCreateModalOpen(true)} variant='outlined'>
            Create New Account
          </Button>
        )}
      />
      <ViewAccountModal
        columns={columns}
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  )
}

interface ViewModalProps {
  columns: MRT_ColumnDef<Person>[]
  onClose: () => void
  open: boolean
}

export const ViewAccountModal = ({ open, columns, onClose}: ViewModalProps) => {

  return (

    <Dialog
      fullScreen
      open={open}
      onClose={onClose}

      PaperProps={{
          sx: {
            width: "80%",
            maxHeight: 800,
            borderRadius: '12px'
          }
      }}

    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: '#ffffff' }} variant="h6" component="div">
            View Account
          </Typography>
        </Toolbar>
      </AppBar>
        <Grid container p={5} spacing={3} style={{overflow:'auto'}}>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem'
              }}
            >
              {/*{columns.map(column => (*/}
              {/*  <div key = {column.accessorKey}>*/}
              {/*    <Typography>{column.header}</Typography>*/}
              {/*  </div>*/}
              {/*))}*/}
              <div>
                {/*<Typography>ID</Typography>*/}
                <Typography>Username</Typography>
                <Typography>Password</Typography>
                <Typography>Email</Typography>
                <Typography>First Name</Typography>
                <Typography>Last Name</Typography>
                <Typography>Middle Name</Typography>
                <Typography>Program</Typography>
                <Typography>Role</Typography>
                <Typography>Permission</Typography>
                <Typography>Contact Number</Typography>
                <Typography>Mobile Number</Typography>
                <Typography>Position</Typography>
                <Typography>Is void</Typography>
                <Typography>Created by</Typography>
                <Typography>Modified by</Typography>
                <Typography>Notes</Typography>
              </div>

            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem'
              }}
            >
              {data.map((row: Person) => (

                <div>
                  {/*<Typography>{row.id}</Typography>*/}
                  <Typography>{row.username}</Typography>
                  <Typography>{row.password}</Typography>
                  <Typography>{row.email}</Typography>
                  <Typography>{row.firstName}</Typography>
                  <Typography>{row.lastName}</Typography>
                  <Typography>{row.middleName}</Typography>
                  <Typography>{row.programId}</Typography>
                  <Typography>{row.roleId}</Typography>
                  <Typography>{row.permissionId}</Typography>
                  <Typography>{row.contactNo}</Typography>
                  <Typography>{row.mobileNo}</Typography>
                  <Typography>{row.position}</Typography>
                  <Typography>{row.is_void}</Typography>
                  <Typography>{row.createdBy}</Typography>
                  <Typography>{row.modifiedBy}</Typography>
                  <Typography>{row.notes}</Typography>
                </div>


              ))}

            </Stack>
          </Grid>

          <Grid item xs={4}>

          </Grid>

        </Grid>


    </Dialog>
  )
}

interface CreateModalProps {
  columns: MRT_ColumnDef<Person>[]
  onClose: () => void
  onSubmit: (values: Person) => void
  open: boolean
}



//example of creating a mui dialog modal for creating new rows

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = ''

      return acc
    }, {} as any)
  )

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >


            {columns
              .filter(column => column.accessorKey !== 'id')
              .map(column => (



                (column.accessorKey !== 'id' &&

                    < TextField
                      variant='standard'
                      key={column.accessorKey}
                      label={column.header}
                      name={column.accessorKey}
                      onChange={e => setValues({...values, [e.target.name]: e.target.value})}
                    />
                )

              ))}


          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color='primary' onClick={handleSubmit} variant='contained'>
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const validateRequired = (value: string) => !!value.length
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
const validateAge = (age: number) => age >= 18 && age <= 50

export default UserManagementTable
