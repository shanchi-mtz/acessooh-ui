export default function SimplePie({ data, size=250, strokeWidth=32 }){
  const total = data.reduce((s,d)=>s+d.value,0)
  const radius = (size/2) - strokeWidth/2
  let angleStart = -90
  const colors = ['#facc15','#22d3ee','#f87171','#34d399','#a78bfa']
  return (
    <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        {data.map((d,i)=>{
          const angle = (d.value/total)*360
          const angleEnd = angleStart + angle
          const large = angle > 180 ? 1 : 0
          const x1 = radius * Math.cos(angleStart*Math.PI/180)
          const y1 = radius * Math.sin(angleStart*Math.PI/180)
          const x2 = radius * Math.cos(angleEnd*Math.PI/180)
          const y2 = radius * Math.sin(angleEnd*Math.PI/180)
          const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`
          const midAngle = (angleStart + angle/2) * Math.PI/180
          angleStart += angle
          return (
            <g key={i}>
              <path d={path} stroke={colors[i%colors.length]} strokeWidth={strokeWidth} fill="none" />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
