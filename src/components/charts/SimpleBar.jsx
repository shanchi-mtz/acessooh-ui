import { useEffect, useState } from 'react';

export default function SimpleBar({
  data,
  colors,
  width = '100%',
  height = 250,
  showValues = true,
  animate = true,
}) {
  const max = Math.max(...data.map((d) => d.valor), 1);
  const pad = 24, bw = 36, gap = 18;
  const svgWidth = pad * 2 + data.length * bw + (data.length - 1) * gap;
  const palette = colors?.length ? colors : ['#facc15', '#60a5fa', '#34d399', '#f87171', '#a78bfa'];

  const [t, setT] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) return;
    let start;
    const dur = 650;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setT(p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [data, animate]);

  const scale = (val) => (val / max) * (height - 40);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${svgWidth} ${height}`}>
      {data.map((d, i) => {
        const hFull = scale(d.valor);
        const h = hFull * t;
        const x = pad + i * (bw + gap);
        const y = height - h - 24;

        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} fill={palette[i % palette.length]} rx="8" />
            <text x={x + bw / 2} y={height - 6} textAnchor="middle" fontSize="12" fill="#9CA3AF">
              {d.region}
            </text>
            {showValues && (
              <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="12" fill="#e5e7eb">
                {d.valor}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
