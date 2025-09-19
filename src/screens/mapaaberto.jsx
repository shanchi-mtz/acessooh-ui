import { Layers, Upload } from "lucide-react"

export default function MapaAberto({ onCreateLayer }) {
  return (
    <div className="w-full flex flex-col p-6 lg:p-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MRV Metricaz</h1>
        <div className="flex gap-3">
          <button onClick={onCreateLayer} className="btn btn-primary flex items-center gap-2">
            <Layers size={18} /> Criar Camada
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <Upload size={18} /> Importar Dados
          </button>
        </div>
      </div>

      {/* Aqui vai o mapa interativo */}
      <div className="card flex items-center justify-center h-[500px]">
        <span className="text-gray-500">🗺️ Mapa do Brasil (vazio)</span>
      </div>
    </div>
  )
}
