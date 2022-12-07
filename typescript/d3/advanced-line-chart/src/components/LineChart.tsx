import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const rawData = [
  { x: 1, y: 135.98 },
  { x: 2, y: 147.49 },
  { x: 3, y: 146.93 },
  { x: 4, y: 139.89 },
  { x: 5, y: 125.6 },
  { x: 6, y: 108.13 },
  { x: 7, y: 115 },
]

type DataType = {
  x: number
  y: number
}

export default () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    console.log('useEffect')

    const handleResize = () => {
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 30, left: 60 }
      const width =
        (containerRef.current != undefined ? containerRef.current.offsetWidth : 400) -
        margin.left -
        margin.right
      const height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // const data = rawData.map((d) => ({ date: d3.timeParse('%Y-%m-%d')(d.date), y: d.y }))

      const walkX = d3.scaleTime().domain([1, 7]).range([0, width])

      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(walkX))

      // Add Y axis
      const walkY = d3.scaleLinear().domain([0, 200]).range([height, 0])
      svg.append('g').call(d3.axisLeft(walkY))

      // Add the line
      svg
        .append('path')
        .datum(rawData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line<DataType>()
            .x((d) => walkX(d.x))
            .y((d) => walkY(d.y))
        )
    }

    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <Box ref={containerRef} width="100%">
      <svg ref={svgRef}></svg>
    </Box>
  )
}
