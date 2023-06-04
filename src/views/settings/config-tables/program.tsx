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
  DialogTitle, Grid,
  IconButton,

  // MenuItem,
  Stack,
  TextField, Toolbar,
  Tooltip
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { data } from 'src/views/settings/config-tables/data/programdata'
import {Info} from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export type Program = {

  id: string
  name: string
  is_void: string
  created_by: string
  modified_by: string
  notes: string

}

const ProgramSettingsTable = () => {

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Program[]>(() => data)
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string
  }>({})

  const handleCreateNewRow = (values: Program) => {
    tableData.push(values)
    setTableData([...tableData])
  }

  const handleSaveRowEdits: MaterialReactTableProps<Program>['onEditingRowSave'] = async ({
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
    (row: MRT_Row<Program>) => {
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
    (cell: MRT_Cell<Program>): MRT_ColumnDef<Program>['muiTableBodyCellEditTextFieldProps'] => {
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

  const boolean = [
    {label: 'true'},
    {label: 'false'}
  ]

  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },{
        accessorKey: 'is_void',
        header: 'Is void',
        enableColumnOrdering: false,
        Edit: ({ cell, column, table }) => <Autocomplete
          disablePortal
          id='isvoid'
          options={boolean}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params}
                                              InputLabelProps={{ shrink: true }} fullWidth label="Is void" variant='standard' />}
        />,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'created_by',
        header: 'Created by',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'modified_by',
        header: 'Modified by',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        enableColumnOrdering: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      }
    ],
    [getCommonEditTextFieldProps]
  )

  return (
    <>
      <MaterialReactTable
        muiTableContainerProps={{ sx: { height: '350px' } }}
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
            Create Program
          </Button>
        )}
      />
      <ViewAccountModal
        columns={columns}
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <CreateCategoryModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  )
}
interface ViewModalProps {
  columns: MRT_ColumnDef<Program>[]
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
              <Typography>ID</Typography>
              <Typography>Name</Typography>
              <Typography>Is void</Typography>
              <Typography>Created By</Typography>
              <Typography>Modified By</Typography>
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
            {data.map((row: Program) => (

              <div>
                <Typography>{row.id}</Typography>
                <Typography>{row.name}</Typography>
                <Typography>{row.is_void}</Typography>
                <Typography>{row.created_by}</Typography>
                <Typography>{row.modified_by}</Typography>
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
  columns: MRT_ColumnDef<Program>[]
  onClose: () => void
  onSubmit: (values: Program) => void
  open: boolean
}

//example of creating a mui dialog modal for creating new rows
export const CreateCategoryModal = ({ open, columns, onClose, onSubmit }: CreateModalProps) => {
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
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            {columns.map(column => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={e => setValues({ ...values, [e.target.name]: e.target.value })}
              />
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

export default ProgramSettingsTable
