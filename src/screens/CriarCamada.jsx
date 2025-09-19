import { useState } from "react"

export default function CriarCamada({ onContinue, onBack }) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("")
  const [busca, setBusca] = useState("")
  const [selecionados, setSelecionados] = useState([])

  // Mock simples de municípios
  const todosMunicipios = ["São Paulo", "São José dos Campos", "São Carlos", "Rio de Janeiro", "Fortaleza", "Salvador", "Belo Horizonte"]

  const resultadosBusca = busca
    ? todosMunicipios.filter(m => m.toLowerCase().includes(busca.toLowerCase()))
    : []

  const toggleMunicipio = (mun) => {
    if (selecionados.includes(mun)) {
      setSelecionados(selecionados.filter(item => item !== mun))
    } else {
      setSelecionados([...selecionados, mun])
    }
  }

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <h2 className="text-2xl font-bold">Criar Camada</h2>

      {/* Seleção de Regiões */}
      <div className="card p-4 space-y-3">
        <h3 className="font-semibold mb-2">Escolha o tipo de região:</h3>
        <select
          value={regiaoSelecionada}
          onChange={(e) => setRegiaoSelecionada(e.target.value)}
          className="input"
        >
          <option value="">Selecione...</option>
          <option value="area">Área Km²</option>
          <option value="ibge">Código IBGE</option>
          <option value="estado">Estado</option>
          <option value="hierarquia">Hierarquia dos Municípios</option>
          <option value="meso">Mesorregião</option>
          <option value="micro">Microrregião</option>
          <option value="municipios">Municípios</option>
        </select>
      </div>

      {/* Busca de Municípios */}
      {regiaoSelecionada === "municipios" && (
        <div className="card p-4 space-y-3">
          <h3 className="font-semibold">Buscar Municípios</h3>
          <input
            type="text"
            placeholder="Digite o nome do município..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input w-full"
          />

          {busca && (
            <div className="bg-gray-800 rounded-md mt-2 p-2 max-h-40 overflow-y-auto">
              {resultadosBusca.map((mun) => (
                <div
                  key={mun}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-700 ${
                    selecionados.includes(mun) ? "bg-yellow-700" : ""
                  }`}
                  onClick={() => toggleMunicipio(mun)}
                >
                  {mun}
                </div>
              ))}
            </div>
          )}

          {/* Selecionados */}
          {selecionados.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selecionados.map((mun) => (
                <span key={mun} className="px-3 py-1 bg-yellow-600 text-black rounded-full text-sm">
                  {mun}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn btn-secondary">Voltar</button>
        <button
          onClick={() => onContinue(selecionados)}
          disabled={regiaoSelecionada !== "municipios" || selecionados.length === 0}
          className="btn btn-primary"
        >
          Filtrar
        </button>
      </div>
    </div>
  )
}
