import Footer from '../components/Footer.jsx'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Preview({ onBack }){
  const pieData=[{name:'Outdoor',value:40},{name:'Abrigos',value:30},{name:'Elevadores',value:30}]
  const COLORS=['#facc15','#22d3ee','#f87171']
  const barData=[{region:'SP',valor:400},{region:'RJ',valor:300},{region:'BH',valor:200}]
  return (<>
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h2 className="text-2xl font-bold">Pré-visualização</h2>
      <div className="card p-6"><h3 className="font-semibold mb-4">Tabela de resultados</h3><table className="w-full text-sm"><thead><tr className="text-left text-gray-400"><th>Região</th><th>Outdoor</th><th>Abrigos</th><th>Elevadores</th></tr></thead><tbody><tr><td>SP</td><td>40%</td><td>30%</td><td>30%</td></tr><tr><td>RJ</td><td>35%</td><td>25%</td><td>40%</td></tr></tbody></table></div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} dataKey="value" label>{pieData.map((e,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]}/>))}</Pie></PieChart></ResponsiveContainer></div>
        <div className="card p-4"><ResponsiveContainer width="100%" height={250}><BarChart data={barData}><XAxis dataKey="region"/><YAxis/><Tooltip/><Bar dataKey="valor" fill="#facc15"/></BarChart></ResponsiveContainer></div>
      </div>
    </div>
    <Footer left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>} center={<span className="chip">Preview gerada</span>} right={<button className="btn btn-primary">Exportar CSV</button>}/>
  </>)
}
