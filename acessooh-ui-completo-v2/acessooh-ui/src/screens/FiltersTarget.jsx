import { useState } from 'react'
export default function FiltersTarget({ onBack }){
  const [sexo, setSexo] = useState('Ambos')
  const [idadeMin, setIdadeMin] = useState(20)
  const [idadeMax, setIdadeMax] = useState(44)
  const [classes, setClasses] = useState(['A','B1','B2'])
  const presets = [
    {label:'12–17', min:12, max:17},
    {label:'18–24', min:18, max:24},
    {label:'20–44', min:20, max:44},
    {label:'25–54', min:25, max:54},
    {label:'55+', min:55, max:80},
  ]
  const classOptions = ['A','B1','B2','C1','C2','DE']
  const toggleClass = (c)=> setClasses(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])
  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="content header"><div className="header-inner">
        <h1 className="text-xl font-bold">Novo Projeto · <span className="text-yellow-400">Etapa 2 de 4</span> — Filtros & Target</h1>
      </div></div>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold">Sexo</h3>
            <div className="flex gap-2 flex-wrap">
              {['Ambos','Feminino','Masculino'].map(s => (
                <button key={s} onClick={()=>setSexo(s)} className={`px-4 py-2 rounded-full border text-sm transition ${sexo===s ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold">Faixa etária</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">de</span>
              <input type="number" className="input w-20" value={idadeMin} min={10} max={idadeMax} onChange={e=>setIdadeMin(parseInt(e.target.value||'0'))} />
              <span className="text-sm text-gray-400">a</span>
              <input type="number" className="input w-20" value={idadeMax} min={idadeMin} max={99} onChange={e=>setIdadeMax(parseInt(e.target.value||'0'))} />
              <span className="text-sm text-gray-400">anos</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {presets.map(p => (
                <button key={p.label} onClick={()=>{setIdadeMin(p.min); setIdadeMax(p.max)}} className="px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-xs border border-gray-700">{p.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold">Classes (NSE)</h3>
          <div className="flex gap-2 flex-wrap">
            {classOptions.map(c => (
              <button key={c} onClick={()=>toggleClass(c)} className={`px-4 py-2 rounded-full border text-sm transition ${classes.includes(c) ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-950/90 backdrop-blur border-t border-gray-900 py-4 sticky bottom-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
          <button onClick={onBack} className="btn btn-secondary">Voltar</button>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Target atual:</span>
            <span className="chip">{sexo}, {idadeMin}-{idadeMax} anos, Classes {classes.join(', ')}</span>
          </div>
          <button className="btn btn-primary">Gerar Relatório</button>
        </div>
      </div>
    </div>
  )
}
