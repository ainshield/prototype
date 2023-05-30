// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'


// ** Demo Tabs Imports
import ProgramSettingsTab from '../../views/settings/program'
import InfoTab from '../../views/settings/about'
import EquipmentTab from '../../views/settings/equipment'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import CardHeader from "@mui/material/CardHeader";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('system')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <CardHeader title='Settings' titleTypographyProps={{ variant: 'h6' }} />
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='system'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Program</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Equipment Category</TabName>
              </Box>
            }
          />
          <Tab
            value='about'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>About</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='system'>
          <ProgramSettingsTab />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <EquipmentTab />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='about'>
          <InfoTab />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
