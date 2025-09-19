import { useState } from "react"

export default function ConfigCamada({ municipios, onContinue, onBack }) {
  const [tematizacao, setTematizacao] = useState(true)
  const [cor, setCor] = useState("#facc15")
  const [transparencia, setTransparencia] = useState(50)

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <h2 className="text-2xl font-bold">Configuração da Camada</h2>
      <p className="text-gray-400">Municípios selecionados: {municipios.join(", ")}</p>

      <div className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Tematização</span>
          <input
            type="checkbox"
            checked={tematizacao}
            onChange={() => setTematizacao(!tematizacao)}
          />
        </div>

        <div>
          <label className="block mb-1">Cor de preenchimento</label>
          <input type="color" value={cor} onChange={(e) => setCor(e.target.value)} />
        </div>

        <div>
          <label className="block mb-1">Transparência: {transparencia}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={transparencia}
            onChange={(e) => setTransparencia(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn btn-secondary">Voltar</button>
        <button onClick={() => onContinue()} className="btn btn-primary">
          Visualizar em Tabela
        </button>
      </div>
    </div>
  )
}
