import { Container, Box, Typography, styled } from '@mui/material'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'

const RootBox = styled(Box)({
  width: '100vw',
  height: '100vh',
  displat: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

function App() {
  return (
    <RootBox>
      <Container maxWidth="sm">
        <Typography variant="h1">Header</Typography>
        <BarChart />
        <LineChart />
      </Container>
    </RootBox>
  )
}

export default App
