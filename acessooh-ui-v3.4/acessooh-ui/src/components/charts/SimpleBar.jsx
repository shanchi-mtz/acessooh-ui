export default function SimpleBar({ data, width='100%', height=250 }){
  const max = Math.max(...data.map(d=>d.valor))
  const pad = 24
  const bw = 40
  const gap = 24
  const svgWidth = pad*2 + data.length*bw + (data.length-1)*gap
  const scale = (val)=> (val/max) * (height-40)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${svgWidth} ${height}`}>
      {data.map((d,i)=>{
        const h = scale(d.valor)
        const x = pad + i*(bw+gap)
        const y = height - h - 20
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} fill="#facc15" rx="8"/>
            <text x={x+bw/2} y={height-4} textAnchor="middle" fontSize="12" fill="#9CA3AF">{d.region}</text>
          </g>
        )
      })}
    </svg>
  )
}
