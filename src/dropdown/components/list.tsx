import { SetStateAction, Dispatch, useEffect, useState } from 'react'
import _, { set } from 'lodash'
import { motion } from 'framer-motion'
import raw from '../data/raw.json'
import * as d3 from 'd3'
import { useTheme } from '@mui/material/styles'
import { ListItem } from './listItem'
interface ChildProps {
  drop: boolean
  setDrop: Dispatch<SetStateAction<boolean>>
  value: string
  setValue: Dispatch<SetStateAction<string>>
  county: any
  setCounty: Dispatch<SetStateAction<any>>
}
interface Prepped {
  name: string
  parent: number | null
  id: number
  level?: string
}

export const List = ({
  drop,
  setDrop,
  value,
  setValue,
  county,
  setCounty,
}: ChildProps) => {
  const theme = useTheme()
  const [list, setList] = useState<any>([])

  const prep: Prepped[] = raw.map((a) => ({
    ...a,
    parent: a.parent ? a.parent : 0,
  }))
  prep.push({ name: 'root', parent: null, id: 0 })

  useEffect(() => {
    const prepFiltered = prep.filter(
      (a) =>
        a.name.toLowerCase().includes(value.toLowerCase()) ||
        a.level !== 'county'
    )
    const root = d3.stratify().parentId((d: any) => d.parent)(prepFiltered)
    const tree = root.children
      ?.filter((d) => d.height == 2)
      .map((d, i) => ({
        ...d,
        children: d.children?.filter((e) => e.height == 1),
      }))
    setList(tree)
  }, [value])

  useEffect(() => {
    setDrop(false)
    const root = d3.stratify().parentId((d: any) => d.parent)(prep)
    setList(root.children)
  }, [county])

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        borderWidth: '0px 2px 2px 2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
      }}
      initial={{ height: '0px', paddingTop: '0px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      animate={{
        height: drop ? '300px' : '0px',
        paddingTop: drop ? '5px' : '0px',
        opacity: drop ? 1 : 0,
      }}
    >
      {list.map((d: any) => (
        <>
          <div style={{ height: '20px', paddingLeft: '10px' }}>
            {d.data.name}
          </div>
          {d.children?.map((e: any) => (
            <>
              <div style={{ paddingLeft: '20px', height: '20px' }}>
                {e.data.name}
              </div>
              {e.children?.map((item: any, index: number) => (
                <ListItem
                  index={index}
                  item={item}
                  setCounty={setCounty}
                  setValue={setValue}
                />
              ))}
            </>
          ))}
        </>
      ))}
    </motion.div>
  )
}
