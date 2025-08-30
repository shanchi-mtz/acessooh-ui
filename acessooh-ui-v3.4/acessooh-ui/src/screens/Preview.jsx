import Footer from '../components/Footer.jsx'
import SimplePie from '../components/charts/SimplePie.jsx'
import SimpleBar from '../components/charts/SimpleBar.jsx'

export default function Preview({ onBack }){
  const pieData=[{name:'Outdoor',value:40},{name:'Abrigos',value:30},{name:'Elevadores',value:30}]
  const barData=[{region:'SP',valor:400},{region:'RJ',valor:300},{region:'BH',valor:200}]
  return (<>
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h2 className="text-2xl font-bold">Pré-visualização</h2>
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Tabela de resultados</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-400"><th>Região</th><th>Outdoor</th><th>Abrigos</th><th>Elevadores</th></tr></thead>
          <tbody><tr><td>SP</td><td>40%</td><td>30%</td><td>30%</td></tr><tr><td>RJ</td><td>35%</td><td>25%</td><td>40%</td></tr></tbody>
        </table>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4"><SimplePie data={pieData} /></div>
        <div className="card p-4"><SimpleBar data={barData} /></div>
      </div>
    </div>
    <Footer left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>} center={<span className="chip">Preview gerada</span>} right={<button className="btn btn-primary">Exportar CSV</button>}/>
  </>)
}
