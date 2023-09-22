import { Box, Stack } from '@mui/material'
import _, { set } from 'lodash'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import data from './data/nodes_edges.json'
import meta from './data/metadata.json'

import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { useWindowSize } from 'usehooks-ts'

type Node = {
  productId: string
  x: number
  y: number
}

type Meta = {
  productId: string
  productName: string
  productCode: string
  productSector: {
    productId: string
  }
}

const hs92ColorsMap = new Map([
  ['product-HS92-1', 'rgb(125, 218, 161)'],
  ['product-HS92-2', '#F5CF23'],
  ['product-HS92-3', 'rgb(218, 180, 125)'],
  ['product-HS92-4', 'rgb(187, 150, 138)'],
  ['product-HS92-5', 'rgb(217, 123, 123)'],
  ['product-HS92-6', 'rgb(197, 123, 217)'],
  ['product-HS92-7', 'rgb(141, 123, 216)'],
  ['product-HS92-8', 'rgb(123, 162, 217)'],
  ['product-HS92-9', 'rgb(125, 218, 218)'],
  ['product-HS92-10', '#2a607c'],
  ['product-HS92-14', 'rgb(178, 61, 109)'],
])

export const Network = () => {
  const [selected, setSelected] = useState<Node | null>(null)
  const [toolData, setToolData] = useState<any>(null)
  const { width, height } = useWindowSize()
  const nodes = data.nodes.filter((d) => d.x && d.y).map((d) => d as Node)

  const edges = data.edges

  const MARGIN = 100

  const X = scaleLinear(extent(nodes, (d) => d.x) as number[], [
    MARGIN,
    width - MARGIN,
  ])
  const Y = scaleLinear(extent(nodes, (d) => d.y) as number[], [
    height - MARGIN,
    MARGIN,
  ])

  let META = meta.productHs92 as Meta[]

  useEffect(() => {
    setToolData(META.find((m) => m.productId === selected?.productId))
  }, [selected])

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ width: '100vw', height: '100vh' }}
    >
      <motion.svg
        style={{ width: '100vw', height: '100vh', background: '#FFF' }}
      >
        {edges.map((d, i) => (
          <line
            strokeWidth={1}
            stroke={'#CCCCCC'}
            x1={X((nodes.find((n) => n.productId === d.source) as Node).x)}
            y1={Y((nodes.find((n) => n.productId === d.source) as Node).y)}
            x2={X((nodes.find((n) => n.productId === d.target) as Node).x)}
            y2={Y((nodes.find((n) => n.productId === d.target) as Node).y)}
          />
        ))}
        {edges
          .filter(
            (d) =>
              selected?.productId == d.source || selected?.productId == d.target
          )
          .map((d, i) => (
            <line
              strokeWidth={3}
              stroke={'red'}
              x1={X((nodes.find((n) => n.productId === d.source) as Node).x)}
              y1={Y((nodes.find((n) => n.productId === d.source) as Node).y)}
              x2={X((nodes.find((n) => n.productId === d.target) as Node).x)}
              y2={Y((nodes.find((n) => n.productId === d.target) as Node).y)}
            />
          ))}
        {nodes.map((d, i) => (
          <motion.circle
            r={4}
            cx={X(d.x)}
            cy={Y(d.y)}
            fill={hs92ColorsMap.get(
              META.find((m) => m.productId === d.productId)?.productSector
                .productId as string
            )}
            stroke={'#CCCCCC'}
            strokeWidth={1}
            style={{ cursor: 'pointer', padding: '10px' }}
            transition={{ duration: 1, ease: 'easeIn' }}
            whileHover={{ strokeWidth: 3, stroke: 'red' }}
            onMouseEnter={() => {
              setSelected(d)
            }}
            onMouseLeave={() => {
              setSelected(null)
            }}
          />
        ))}
        {selected &&
          nodes
            .filter((d) =>
              edges
                .filter(
                  (d) =>
                    selected.productId == d.source ||
                    selected.productId == d.target
                )
                .map((d) => [d.target, d.source])
                .flat()
                .includes(d.productId)
            )
            .map((d, i) => (
              <circle
                r={2}
                cx={X(d.x)}
                cy={Y(d.y)}
                strokeWidth={3}
                stroke={'red'}
                style={{ pointerEvents: 'none' }}
              />
            ))}
      </motion.svg>
      {toolData && <motion.div style={{ position: 'absolute' }}></motion.div>}
    </Stack>
  )
}
