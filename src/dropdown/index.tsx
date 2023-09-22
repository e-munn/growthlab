import { Box, Stack } from '@mui/material'
import _, { set } from 'lodash'
import { Input } from './components/input'
import { List } from './components/list'
import { useState, useEffect } from 'react'

export const Dropdown = () => {
  const [drop, setDrop] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [county, setCounty] = useState<any>(null)

  return (
    <Stack
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={{ width: '100vw', height: '100vh', pt: '100px' }}
    >
      <Stack
        sx={{
          width: '500px',
        }}
      >
        <Input
          drop={drop}
          setDrop={setDrop}
          value={value}
          setValue={setValue}
          county={county}
        />
        <List
          drop={drop}
          setDrop={setDrop}
          value={value}
          setValue={setValue}
          county={county}
          setCounty={setCounty}
        />
      </Stack>
    </Stack>
  )
}
