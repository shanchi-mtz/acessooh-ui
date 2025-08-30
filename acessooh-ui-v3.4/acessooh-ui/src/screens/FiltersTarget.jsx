import { useState } from 'react'
import Footer from '../components/Footer.jsx'

export default function FiltersTarget({ onBack, onContinue }){
  const [sexo,setSexo]=useState('Ambos')
  const [idadeMin,setIdadeMin]=useState(20)
  const [idadeMax,setIdadeMax]=useState(44)
  const [classes,setClasses]=useState(['A'])
  const toggleClass=c=>setClasses(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c])
  return (<>
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="text-2xl font-bold">Filtros & Target</h2>
      <div className="card p-5"><h3>Sexo</h3><div className="flex gap-2">{['Ambos','Feminino','Masculino'].map(s=>(<button key={s} onClick={()=>setSexo(s)} className={`px-4 py-2 rounded-full border ${sexo===s?'bg-yellow-400 text-black':'bg-gray-800 border-gray-700'}`}>{s}</button>))}</div></div>
    </div>
    <Footer
      left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>}
      center={<span className="chip">{sexo}, {idadeMin}-{idadeMax} anos, {classes.join(', ')}</span>}
      right={<button onClick={onContinue} className="btn btn-primary">Gerar Relatório</button>}
    />
  </>)
}
