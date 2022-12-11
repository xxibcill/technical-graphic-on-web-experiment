import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ScatterDataType } from '../types/types'

type Props = {
  data: ScatterDataType[]
}

export default ({ data }: Props) => {
  const rootRef = useRef<SVGSVGElement>(null)
  const axixXRef = useRef<SVGSVGElement | null>(null)
  const axixYRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    console.log(data.length)

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
      .select(rootRef.current)
      .style('background-color', '#edf4ff')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .style('background-color', '#00ff00')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // const data = data.map((d) => ({ date: d3.timeParse('%Y-%m-%d')(d.date), y: d.y }))

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

    // svg.select(axixXRef.current).attr('transform', 'translate(0,' + height + ')')
    // .call(d3.axisBottom(walkX))

    // Add Y axis
    // const walkY = d3.scaleLinear().domain([0, 200]).range([height, 0])
    // svg.append('g').call(d3.axisLeft(walkY))

    // // Add the line
    // svg
    //   .append('path')
    //   .datum(data)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'steelblue')
    //   .attr('stroke-width', 1.5)
    //   .attr(
    //     'd',
    //     d3
    //       .line<DataType>()
    //       .x((d) => walkX(d.x))
    //       .y((d) => walkY(d.y))
    //   )
  }, [data])

  return (
    <svg>
      <g ref={rootRef}>
        <g ref={axixXRef} id="axis-bottom"></g>
        <g ref={axixYRef} id="axis-left"></g>
      </g>
    </svg>
  )
}
