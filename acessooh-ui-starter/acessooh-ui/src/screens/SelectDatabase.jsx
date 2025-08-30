import { useState } from 'react'
export default function SelectDatabase({ onContinue, onBack }){
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('Target Group Index Brasil (Português) – Pessoas')
  const bases = [
    'Target Group Index Brasil (Português) – Pessoas',
    'Target Group Index Brasil (Português) – Domicílios',
    'Target Group Index Brasil (English) – Persons',
    'Target Group Index Brasil (English) – Household',
  ]
  const filtered = bases.filter(b => b.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur">
        <h1 className="text-xl font-bold">Acesso<span className="text-yellow-400">OH</span></h1>
        <div className="text-sm text-gray-400">Novo Projeto · Etapa 1 de 4 — <span className="text-white font-medium">Selecionar Base</span></div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 space-y-3">
          {['Base de Dados','Filtros & Target','Pré-visualização','Salvar & Continuar'].map((label, i)=> (
            <div key={label} className={`flex items-center justify-between rounded-xl px-4 py-3 border ${i===0 ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-800 bg-gray-800/50'}`}>
              <span className={`${i===0 ? 'text-yellow-300' : 'text-gray-300'} text-sm`}>{i+1}. {label}</span>
            </div>
          ))}
          <div className="card p-4 mt-6 text-sm text-gray-300">
            Prefira sempre a base <span className="text-yellow-300 font-medium">mais recente</span>.
          </div>
        </aside>
        <section className="col-span-12 lg:col-span-9 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Base de dados</h2>
            <p className="text-gray-400 text-sm">Selecione uma base para começar seu projeto.</p>
          </div>
          <div className="flex items-center gap-3">
            <input className="input flex-1" placeholder="Buscar por base de dados" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button className="btn btn-primary">Buscar</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(base => (
              <button key={base} onClick={()=>setSelected(base)} className={`text-left rounded-xl p-4 border transition ${selected===base ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'}`}>
                <div className="font-medium">{base}</div>
                <div className="text-xs text-gray-400">Atualizada: 2025 · Fonte Kantar</div>
              </button>
            ))}
          </div>
          <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur pt-4">
            <div className="flex items-center justify-between border-t border-gray-800 pt-4">
              <button onClick={onBack} className="btn btn-secondary">Voltar</button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Selecionado:</span>
                <span className="chip">{selected}</span>
              </div>
              <button onClick={onContinue} className="btn btn-primary">Continuar</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
