import { useState } from 'react'
import { Container, Stack, Button } from '@mui/material'
import BasicScatter from '../src/components/BasicScatter'
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
      <Stack>
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={(_) => setData(randomData(100, [0, 100], [0, 100]))}
        >
          Random
        </Button>
        <BasicScatter data={data} />
      </Stack>
    </Container>
  )
}
