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
    <div className="min-h-screen">
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur">
        <h1 className="text-xl font-bold">Acesso<span className="text-yellow-400">OH</span></h1>
        <div className="text-sm text-gray-400">Novo Projeto · Etapa 2 de 4 — <span className="text-white font-medium">Filtros & Target</span></div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 space-y-3">
          {['Base de Dados','Filtros & Target','Pré-visualização','Salvar & Continuar'].map((label, i)=> (
            <div key={label} className={`flex items-center justify-between rounded-xl px-4 py-3 border ${i<=1 ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-800 bg-gray-800/50'}`}>
              <span className={`${i<=1 ? 'text-yellow-300' : 'text-gray-300'} text-sm`}>{i+1}. {label}</span>
            </div>
          ))}
          <div className="card p-4 mt-6 text-sm text-gray-300">
            Use <span className="text-yellow-300 font-medium">presets</span> para garantir consistência entre projetos.
          </div>
        </aside>
        <section className="col-span-12 lg:col-span-9 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Monte o seu Target</h2>
            <p className="text-sm text-gray-400 -mt-1">Defina sexo, faixa etária e classes (NSE).</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold">Sexo</h3>
              <div className="flex gap-2 flex-wrap">
                {['Ambos','Feminino','Masculino'].map(s => (
                  <button key={s} onClick={()=>setSexo(s)} className={`px-4 py-2 rounded-full border text-sm transition ${sexo===s ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}>{s}</button>
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
                  <button key={p.label} onClick={()=>{setIdadeMin(p.min); setIdadeMax(p.max)}} className="px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-xs border border-gray-600">{p.label}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold">Classes (NSE)</h3>
            <div className="flex gap-2 flex-wrap">
              {classOptions.map(c => (
                <button key={c} onClick={()=>toggleClass(c)} className={`px-4 py-2 rounded-full border text-sm transition ${classes.includes(c) ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur pt-4">
            <div className="flex items-center justify-between border-t border-gray-800 pt-4">
              <button onClick={onBack} className="btn btn-secondary">Voltar</button>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Target atual:</span>
                <span className="chip">{sexo}, {idadeMin}-{idadeMax} anos, Classes {classes.join(', ')}</span>
              </div>
              <button className="btn btn-primary">Gerar Relatório</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
