import { Home, Database, SlidersHorizontal, LineChart, BookOpen, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar({ current, setCurrent }) {
  const [open, setOpen] = useState(false)

  const Item = ({ id, icon: Icon, label }) => (
    <a
      onClick={() => {
        setCurrent(id)
        setOpen(false)
      }}
      className={`nav-item ${current === id ? "active" : ""}`}
    >
      <Icon size={18} /> <span>{label}</span>
    </a>
  )

  return (
    <>
      {/* Topbar mobile */}
      <div className="topbar-mobile">
        <div className="topbar-inner">
          <div className="logo">
            Acesso<span className="text-yellow-400">OH</span>
          </div>
          <button onClick={() => setOpen(!open)} className="btn btn-secondary">
            <Menu size={16} />
          </button>
        </div>
        {open && (
          <div className="topbar-nav">
            <div className="flex flex-col">
              <Item id="home" icon={Home} label="Home" />
              <Item id="base" icon={Database} label="Base de Dados" />
              <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target" />
              <Item id="preview" icon={LineChart} label="Pré-visualização" />
              <Item id="docs" icon={BookOpen} label="Tutoriais" />
            </div>
          </div>
        )}
      </div>

      {/* Sidebar desktop */}
      <aside className="sidebar">
        <div className="logo">
          Acesso<span className="text-yellow-400">OH</span>
        </div>
        <nav className="nav">
          <Item id="home" icon={Home} label="Home" />
          <Item id="base" icon={Database} label="Base de Dados" />
          <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target" />
          <Item id="preview" icon={LineChart} label="Pré-visualização" />
          <Item id="docs" icon={BookOpen} label="Tutoriais" />
        </nav>
        <div className="version">v0.0.5 • protótipo</div>
      </aside>
    </>
  )
}
