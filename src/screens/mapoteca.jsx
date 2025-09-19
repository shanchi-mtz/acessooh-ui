import { useState } from "react"
import { Plus, Map } from "lucide-react"

export default function Mapoteca() {
  const [openModal, setOpenModal] = useState(false)
  const [maps, setMaps] = useState([
    { id: 1, name: "MRV Metricaz", desc: "Planejamento inicial MRV", date: "18/09/2025" },
    { id: 2, name: "Petz São Paulo", desc: "Campanha regional SP", date: "12/09/2025" },
    { id: 3, name: "Vivo Fortaleza", desc: "Estudo Nordeste", date: "05/09/2025" },
  ])

  const [newMap, setNewMap] = useState({ name: "", desc: "" })

  const handleCreateMap = () => {
    if (!newMap.name) return
    setMaps([
      ...maps,
      { id: maps.length + 1, name: newMap.name, desc: newMap.desc, date: new Date().toLocaleDateString() },
    ])
    setNewMap({ name: "", desc: "" })
    setOpenModal(false)
  }

  return (
    <div className="w-full flex flex-col p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meus Mapas</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Criar Novo Mapa
        </button>
      </div>

      {/* Grid de mapas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <div
            key={map.id}
            className="card p-6 flex flex-col hover:bg-gray-800 transition cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-3">
              <Map className="text-yellow-400" size={20} />
              <h2 className="font-semibold text-lg">{map.name}</h2>
            </div>
            <p className="text-sm text-gray-400 flex-1">{map.desc}</p>
            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>Criado em {map.date}</span>
              <button className="text-yellow-400 hover:underline text-sm">Abrir</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal criar mapa */}
      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpenModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4">Criar Novo Mapa</h2>
              <input
                type="text"
                placeholder="Nome do mapa"
                className="input w-full mb-3"
                value={newMap.name}
                onChange={(e) => setNewMap({ ...newMap, name: e.target.value })}
              />
              <textarea
                placeholder="Descrição (opcional)"
                className="input w-full mb-4"
                value={newMap.desc}
                onChange={(e) => setNewMap({ ...newMap, desc: e.target.value })}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateMap}
                  className="btn btn-primary"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
