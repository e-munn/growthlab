import { SetStateAction, Dispatch, useEffect, useRef } from 'react'
import _, { set } from 'lodash'
import { motion } from 'framer-motion'
import raw from '../data/raw.json'
import * as d3 from 'd3'
import { useTheme } from '@mui/material/styles'
interface ChildProps {
  setValue: Dispatch<SetStateAction<string>>
  setCounty: any
  index: number
  item: any
}
export const ListItem = ({ setValue, setCounty, index, item }: ChildProps) => {
  const theme = useTheme()
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      key={index}
      style={{
        paddingLeft: '40px',
        height: '20px',
        cursor: 'pointer',
        pointerEvents: 'all',
      }}
      transition={{ duration: 0.01 }}
      whileHover={{ backgroundColor: '#eaf1f6' }}
      onClick={(e: any) => {
        setCounty(ref)
        setValue(item.data.name)
      }}
    >
      {item.data.name}
    </motion.div>
  )
}
