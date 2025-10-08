import { useState } from "react";

export default function Mapoteca({ onOpenMap, onCreateNewMap }) {
  const [showModal, setShowModal] = useState(false);
  const [novoMapa, setNovoMapa] = useState({ nome: "", descricao: "" });

  // Mock de mapas existentes
  const [mapas, setMapas] = useState([
    { nome: "MRV Metricaz", descricao: "Planejamento inicial MRV", criado: "18/09/2025" },
    { nome: "Petz São Paulo", descricao: "Campanha regional SP", criado: "12/09/2025" },
    { nome: "Vivo Fortaleza", descricao: "Estudo Nordeste", criado: "05/09/2025" },
  ]);

  const handleCreate = () => {
    if (!novoMapa.nome.trim()) return; // impede mapa sem nome
    const mapaCriado = {
      ...novoMapa,
      criado: new Date().toLocaleDateString("pt-BR"),
    };
    setMapas([...mapas, mapaCriado]);
    setShowModal(false);
    setNovoMapa({ nome: "", descricao: "" });
    onCreateNewMap(mapaCriado); // 🔥 já abre direto no fluxo
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meus Mapas</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          + Criar Novo Mapa
        </button>
      </div>

      {/* Lista de mapas */}
      <div className="grid md:grid-cols-3 gap-4">
        {mapas.map((mapa, i) => (
          <div key={i} className="card p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{mapa.nome}</h3>
              <p className="text-gray-400">{mapa.descricao || "Sem descrição"}</p>
              <p className="text-sm text-gray-500">Criado em {mapa.criado}</p>
            </div>
            <button
              onClick={() => onOpenMap(mapa)} // 🔥 abrir mapa existente
              className="text-yellow-400 font-semibold mt-3 self-end"
            >
              Abrir
            </button>
          </div>
        ))}
      </div>

      {/* Modal Criar Mapa */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[400px] space-y-4">
            <h2 className="text-xl font-bold">Criar Novo Mapa</h2>
            <input
              type="text"
              placeholder="Nome do mapa"
              value={novoMapa.nome}
              onChange={(e) => setNovoMapa({ ...novoMapa, nome: e.target.value })}
              className="input w-full"
            />
            <textarea
              placeholder="Descrição (opcional)"
              value={novoMapa.descricao}
              onChange={(e) => setNovoMapa({ ...novoMapa, descricao: e.target.value })}
              className="input w-full"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">
                Cancelar
              </button>
              <button onClick={handleCreate} className="btn btn-primary">
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
