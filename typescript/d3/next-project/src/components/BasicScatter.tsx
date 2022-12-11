import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ScatterDataType } from '../types/types'

type Props = {
  data: ScatterDataType[]
}

export default ({ data }: Props) => {
  const containerRef = useRef<SVGSVGElement>(null)
  const rootRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    console.log(data.length)

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom

    // append the svg object to the body of the page
    d3.select(containerRef.current)
      .style('background-color', '#edf4ff')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    const svg = d3
      .select(rootRef.current)
      .style('background-color', '#00ff00')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const mapFuncX = (d: ScatterDataType) => d.x
    const mapArrayX = data.map(mapFuncX)
    const extentX = d3.extent(mapArrayX) as number[]

    const mapFuncY = (d: ScatterDataType) => d.y
    const mapArrayY = data.map(mapFuncY)
    const extentY = d3.extent(mapArrayY) as number[]

    const walkX = d3.scaleLinear().domain(extentX).range([0, width])
    const walkY = d3.scaleLinear().domain(extentY).range([0, height])

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => walkX(mapFuncX(d)))
      .attr('cy', (d) => walkY(mapFuncY(d)))
      .attr('r', 2)
      .style('fill', '#000000')
  }, [data])

  return (
    <svg ref={containerRef}>
      <g ref={rootRef}></g>
    </svg>
  )
}
