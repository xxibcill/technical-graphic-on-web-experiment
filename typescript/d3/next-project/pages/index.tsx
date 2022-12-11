import { useState } from 'react'
import { Container, Box, Button } from '@mui/material'
import Experiment from '../src/components/Experiment'
import { ScatterDataType } from '../src/types/types'

export default () => {
  const [data, setData] = useState<ScatterDataType[]>([])

  const randomData = (size: number, domainX: number[], domainY: number[]) => {
    const list: ScatterDataType[] = []

    for (let index = 0; index < size; index++) {
      list.push({
        x: Math.floor(Math.random() * domainX[1]) + domainX[0],
        y: Math.floor(Math.random() * domainY[1]) + domainY[0],
      })
    }
    return list
  }

  return (
    <Container>
      <Box>
        <Button onClick={(_) => setData(randomData(100, [0, 100], [0, 100]))}>Random</Button>
        <Experiment data={data} />
      </Box>
    </Container>
  )
}
