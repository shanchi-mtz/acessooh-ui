import { useEffect, useState } from 'react';

export default function SimplePie({
  data,
  colors,
  size = 240,
  strokeWidth = 28,
  showValues = true,
  animate = true,
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2 - strokeWidth / 2;
  const palette = colors?.length ? colors : ['#facc15', '#22d3ee', '#f87171', '#34d399', '#a78bfa'];

  const [t, setT] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) return;
    let start;
    const dur = 700;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setT(p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [data, animate]);

  let angleStart = -90;

  return (
    <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {data.map((d, i) => {
          const angle = ((d.value / total) * 360) * t;
          const angleEnd = angleStart + angle;
          const large = angle > 180 ? 1 : 0;

          const x1 = radius * Math.cos((angleStart * Math.PI) / 180);
          const y1 = radius * Math.sin((angleStart * Math.PI) / 180);
          const x2 = radius * Math.cos((angleEnd * Math.PI) / 180);
          const y2 = radius * Math.sin((angleEnd * Math.PI) / 180);
          const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;

          // label no meio do arco
          const mid = (angleStart + angle / 2) * (Math.PI / 180);
          const lx = (radius) * Math.cos(mid);
          const ly = (radius) * Math.sin(mid);

          angleStart += angle;
          const percent = Math.round((d.value / total) * 100);

          return (
            <g key={i}>
              <path d={path} stroke={palette[i % palette.length]} strokeWidth={strokeWidth} fill="none" />
              {showValues && angle > 14 && (
                <text
                  x={lx * 0.78}
                  y={ly * 0.78}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="12"
                  fill="#e5e7eb"
                >
                  {percent}%
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
