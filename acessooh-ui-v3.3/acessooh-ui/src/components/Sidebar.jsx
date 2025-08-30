import { Home, Database, SlidersHorizontal, LineChart, BookOpen, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar({ current, setCurrent }){
  const [open, setOpen] = useState(false)
  const Item = ({id, icon:Icon, label}) => (
    <a onClick={()=>{ setCurrent(id); setOpen(false) }} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${current===id ? 'bg-gray-900 text-yellow-300 border border-gray-800' : 'text-gray-300 hover:bg-gray-900'}`}>
      <Icon size={18}/> <span>{label}</span>
    </a>
  )
  return (<>
    <div className="md:hidden sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-900">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-bold">Acesso<span className="text-yellow-400">OH</span></div>
        <button onClick={()=>setOpen(!open)} className="btn btn-secondary"><Menu size={16}/></button>
      </div>
      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-gray-900">
          <div className="flex flex-col">
            <Item id="home" icon={Home} label="Home"/>
            <Item id="base" icon={Database} label="Base de Dados"/>
            <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target"/>
            <Item id="preview" icon={LineChart} label="Pré-visualização"/>
            <Item id="docs" icon={BookOpen} label="Tutoriais"/>
          </div>
        </div>
      )}
    </div>
    <aside className="sidebar">
      <div className="logo">Acesso<span className="text-yellow-400">OH</span></div>
      <nav className="nav">
        <Item id="home" icon={Home} label="Home"/>
        <Item id="base" icon={Database} label="Base de Dados"/>
        <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target"/>
        <Item id="preview" icon={LineChart} label="Pré-visualização"/>
        <Item id="docs" icon={BookOpen} label="Tutoriais"/>
      </nav>
      <div className="mt-auto p-4 text-xs text-gray-500">v0.0.9 • protótipo</div>
    </aside>
  </>)
}
