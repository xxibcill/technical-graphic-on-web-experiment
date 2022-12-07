import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default () => {
  const rootRef = useRef<SVGSVGElement>(null)
  const data = [1, 1, 2, 3, 5, 8, 13, 21]

  useEffect(() => {
    const width = 200,
      scaleFactor = 10,
      barHeight = 20

    const graph = d3
      .select(rootRef.current)
      .attr('width', width)
      .attr('height', barHeight * data.length)

    const bar = graph
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * barHeight + ')'
      })

    bar
      .append('rect')
      .attr('width', function (d) {
        return d * scaleFactor
      })
      .attr('height', barHeight - 1)

    bar
      .append('text')
      .attr('x', function (d) {
        return d * scaleFactor
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(function (d) {
        return d
      })
  }, [])

  return (
    <svg
      ref={rootRef}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )
}
