import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import _, { set } from 'lodash'
import { motion } from 'framer-motion'
import { SetStateAction, Dispatch } from 'react'
import { useTheme } from '@mui/material/styles'
interface ChildProps {
  drop: boolean
  setDrop: Dispatch<SetStateAction<boolean>>
  value: string
  setValue: Dispatch<SetStateAction<string>>
  county: any
}
export const Input = ({
  drop,
  setDrop,
  value,
  setValue,
  county,
}: ChildProps) => {
  const theme = useTheme()

  return (
    <Stack
      direction={'row'}
      sx={{
        position: 'relative',
        height: '60px',
        width: '100%',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
        p: '10px',
      }}
    >
      <input
        style={{
          width: 'calc(100% - 60px)',
          height: '100%',
          fontSize: '30px',
          padding: '0px 10px',
          border: 'none',
          outline: 'none',
          color: theme.palette.primary.dark,
          background: 'none',
        }}
        type='text'
        placeholder='Please select a county'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onFocus={(e) => {
          setDrop(true)
          if (county !== null) {
            county.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }}
        // onBlur={(e) => {
        //   setDrop(false)
        // }}
      />

      <motion.svg
        style={{
          cursor: 'pointer',
          originX: 0.5,
          originY: 0.5,
          outline: 'none',
          padding: '10px',
          marginRight: '10px',
        }}
        height='40'
        viewBox='0 0 100 100'
        width='40'
        stroke={theme.palette.primary.dark}
        strokeWidth='10'
        animate={{
          scale: value?.length > 0 ? 1 : 0,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setValue('')}
      >
        <motion.path d='M2,2 L98,98' style={{ originX: 0.5, originY: 0.5 }} />
        <motion.path d='M98,2 L2,98' style={{ originX: 0.5, originY: 0.5 }} />
      </motion.svg>
      <motion.svg
        style={{
          cursor: 'pointer',
          originX: 0.5,
          originY: 0.5,
          outline: 'none',
          padding: '10px',
          marginRight: '10px',
        }}
        height='40'
        viewBox='0 0 100 100'
        width='40'
        stroke='white'
        strokeWidth='10'
        animate={{ rotate: drop ? '180deg' : '0deg' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDrop(!drop)}
      >
        <motion.path
          fill={theme.palette.primary.dark}
          stroke={'none'}
          d='M10,30 L90,30 L 50,77Z'
          style={{ originX: 0.5, originY: 0.5 }}
        />
      </motion.svg>
    </Stack>
  )
}
