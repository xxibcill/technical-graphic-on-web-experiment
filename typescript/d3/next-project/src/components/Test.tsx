import { Typography } from '@mui/material'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    console.log('gg')
  }, [])

  return <Typography>test</Typography>
}
