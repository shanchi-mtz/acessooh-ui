import { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock de coordenadas simplificadas
const municipiosCoords = {
  "São Paulo": [
    [
      [-23.7, -46.9],
      [-23.7, -46.3],
      [-23.3, -46.3],
      [-23.3, -46.9],
    ],
  ],
  "Rio de Janeiro": [
    [
      [-22.9, -43.4],
      [-22.9, -43.1],
      [-22.7, -43.1],
      [-22.7, -43.4],
    ],
  ],
  Salvador: [
    [
      [-13.0, -38.6],
      [-13.0, -38.3],
      [-12.8, -38.3],
      [-12.8, -38.6],
    ],
  ],
};

export default function CriarCamada({ onBack, onContinue }) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("");
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState([]);

  // Configuração da camada
  const [fillColor, setFillColor] = useState("#FFD700");
  const [borderColor, setBorderColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.5);

  // Mock simples de municípios
  const todosMunicipios = [
    "São Paulo",
    "Rio de Janeiro",
    "Salvador",
    "Belo Horizonte",
  ];

  const resultadosBusca = busca
    ? todosMunicipios.filter((m) =>
        m.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

const toggleMunicipio = (mun) => {
  if (selecionados.includes(mun)) {
    setSelecionados(selecionados.filter(item => item !== mun));
  } else {
    setSelecionados([...selecionados, mun]);
  }
  setBusca(""); // limpa a busca
};

  return (
    <div className="flex h-[calc(100vh-4rem)]"> 
      {/* Painel lateral esquerdo */}
      <div className="w-1/3 p-6 space-y-6 overflow-y-auto bg-gray-900">
        <h2 className="text-2xl font-bold">Criar Camada</h2>

        {/* Seleção de Regiões */}
        <div className="card p-4 space-y-3">
          <h3 className="font-semibold mb-2">Escolha o tipo de região:</h3>
          <select
            value={regiaoSelecionada}
            onChange={(e) => setRegiaoSelecionada(e.target.value)}
            className="input w-full"
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
                  <span
                    key={mun}
                    className="px-3 py-1 bg-yellow-600 text-black rounded-full text-sm"
                  >
                    {mun}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Configuração da Camada */}
        <div className="card p-4 space-y-4">
          <h3 className="font-semibold">Configuração da Camada</h3>

          <label className="flex items-center gap-2">
            <span>Cor de preenchimento:</span>
            <input
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            <span>Cor da borda:</span>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </label>

          <label className="block">
            <span>Transparência: {Math.round(opacity * 100)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        {/* Botões */}
        <div className="flex justify-between">
          <button onClick={onBack} className="btn btn-secondary">
            Voltar
          </button>
          <button
            onClick={() => onContinue(selecionados)}
            disabled={regiaoSelecionada !== "municipios" || selecionados.length === 0}
            className="btn btn-primary"
          >
            Filtrar
          </button>
        </div>
      </div>

      {/* Mapa (lado direito, full height) */}
      <div className="w-2/3 h-full">
        <MapContainer
          center={[-15.8, -47.9]} // Brasil
          zoom={4}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {selecionados.map(
            (mun) =>
              municipiosCoords[mun] && (
                <Polygon
                  key={mun}
                  positions={municipiosCoords[mun]}
                  pathOptions={{
                    fillColor,
                    fillOpacity: opacity,
                    color: borderColor,
                    weight: 2,
                  }}
                />
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
