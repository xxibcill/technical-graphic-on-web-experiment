import { Container, Box, styled } from '@mui/material'
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
      <Container maxWidth="lg">
        <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
          <LineChart />
        </Box>
      </Container>
    </RootBox>
  )
}

export default App
