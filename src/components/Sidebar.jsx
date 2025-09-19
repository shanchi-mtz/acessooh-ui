import { 
  Home, 
  Database, 
  SlidersHorizontal, 
  LineChart, 
  BookOpen, 
  Map, 
  Layers, 
  Filter, 
  Menu, 
  X 
} from "lucide-react"
import { useState } from "react"

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

  const Label = ({ text }) => (
    <div className="nav-label">
      {text}
    </div>
  )

  return (
    <>
      {/* Topbar mobile */}
      <div className="topbar-mobile">
        <div className="topbar-inner">
          <div className="logo">
            Acesso<span className="text-yellow-400">OH</span>
          </div>
          <button onClick={() => setOpen(true)} className="btn btn-secondary">
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <>
          <div className="mobile-overlay" onClick={() => setOpen(false)} />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <div className="logo">
                Acesso<span className="text-yellow-400">OH</span>
              </div>
              <button onClick={() => setOpen(false)} className="btn btn-secondary">
                <X size={18} />
              </button>
            </div>
            <nav className="nav p-4 space-y-2">
              <Label text="TGI" />
              <Item id="home" icon={Home} label="Home" />
              <Item id="base" icon={Database} label="Base de Dados" />
              <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target" />
              <Item id="preview" icon={LineChart} label="Pré-visualização" />
              <Item id="docs" icon={BookOpen} label="Tutoriais" />

              <Label text="Geofusion" />
              <Item id="mapoteca" icon={Map} label="Mapoteca" />
              <Item id="criar-camada" icon={Layers} label="Criar Camada" />
              <Item id="filtros-geo" icon={Filter} label="Filtros Geográficos" />
            </nav>
          </div>
        </>
      )}

      {/* Sidebar desktop */}
      <aside className="sidebar">
        <div className="logo">
          Acesso<span className="text-yellow-400">OH</span>
        </div>
        <nav className="nav">
          <Label text="TGI" />
          <Item id="home" icon={Home} label="Home" />
          <Item id="base" icon={Database} label="Base de Dados" />
          <Item id="filtros" icon={SlidersHorizontal} label="Filtros & Target" />
          <Item id="preview" icon={LineChart} label="Pré-visualização" />
          <Item id="docs" icon={BookOpen} label="Tutoriais" />

          <Label text="Geofusion" />
          <Item id="mapoteca" icon={Map} label="Mapoteca" />
          <Item id="criar-camada" icon={Layers} label="Criar Camada" />
          <Item id="filtros-geo" icon={Filter} label="Filtros Geográficos" />
        </nav>
        <div className="version">v0.0.5 • protótipo</div>
      </aside>
    </>
  )
}
