import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Image from 'next/image'

// @ts-ignore
import irriIcon from '../../../resources/irrilogo.svg'

const InfoTab = () => {
  return (
    <Grid display='flex' justifyContent='left'>
      <CardContent>
        <Image priority src={irriIcon} width={200} height={200} alt='irri logo' />

        <Typography variant='h6'>IRRI Inventory System v.0.1</Typography>
        {/*<Typography>Made by Timothy Garcia</Typography>*/}
      </CardContent>
    </Grid>
  )
}
export default InfoTab
