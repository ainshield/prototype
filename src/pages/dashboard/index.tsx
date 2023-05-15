// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
//
// // ** Custom Components Imports
// import CardStatisticsVerticalComponent from '../../@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from '../../@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from '../../views/dashboard/Table'
import SummaryCard from '../../views/dashboard/summaryCard'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'


const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/*<Grid item xs={12} md={4}>*/}
        {/*  <Trophy />*/}
        {/*</Grid>*/}
        <Grid item xs={8} md={6}>
          <SummaryCard />
        </Grid>
        <Grid item xs={8} md={6}>
          {/*<SummaryCard />*/}
        </Grid>
        <Grid item xs={12}>
          <WeeklyOverview />
        </Grid>

        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
