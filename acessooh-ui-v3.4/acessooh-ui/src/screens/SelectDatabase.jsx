import { useState } from 'react'
import Footer from '../components/Footer.jsx'

export default function SelectDatabase({ onContinue, onBack }){
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('Target Group Index Brasil (Português) – Pessoas')
  const bases = ['Target Group Index Brasil (Português) – Pessoas','Target Group Index Brasil (Português) – Domicílios','Target Group Index Brasil (English) – Persons','Target Group Index Brasil (English) – Household']
  const filtered = bases.filter(b => b.toLowerCase().includes(query.toLowerCase()))
  return (<>
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="text-2xl font-bold">Base de dados</h2>
      <div className="flex gap-3"><input className="input flex-1" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar"/> <button className="btn btn-primary">Buscar</button></div>
      <div className="grid sm:grid-cols-2 gap-4">{filtered.map(base => (
        <button key={base} onClick={()=>setSelected(base)} className={`p-4 rounded-xl border ${selected===base ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-800 bg-gray-900 hover:bg-gray-800'}`}>
          <div className="font-medium">{base}</div><div className="text-xs text-gray-400">Atualizada: 2025</div>
        </button>
      ))}</div>
    </div>
    <Footer
      left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>}
      center={<span className="chip">{selected}</span>}
      right={<button onClick={onContinue} className="btn btn-primary">Continuar</button>}
    />
  </>)
}
