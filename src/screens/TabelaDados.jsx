import { useState } from "react";
import FiltrosModal from "./FiltrosModal.jsx"; // 🔥 importa o modal bonito

export default function TabelaDados({ onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    ibge: { ativo: true },
    municipio: { ativo: true },
    estado: { ativo: true },
    populacao: { ativo: true },
    pib: { ativo: true },
    genero: { ativo: false, masculino: false, feminino: false },
    renda: {
      ativo: false,
      "A++": { de: "", ate: "", ativo: false },
      "A+": { de: "", ate: "", ativo: false },
      B: { de: "", ate: "", ativo: false },
      C: { de: "", ate: "", ativo: false },
      D: { de: "", ate: "", ativo: false },
      E: { de: "", ate: "", ativo: false },
    },
  });

  const dados = [
    {
      ibge: "355030",
      municipio: "São Paulo",
      estado: "SP",
      populacao: "12M",
      pib: "R$ 800B",
      genero: "Masculino: 48% | Feminino: 52%",
      renda: "A++ (30%) / B (45%) / C (25%)",
    },
    {
      ibge: "330455",
      municipio: "Rio de Janeiro",
      estado: "RJ",
      populacao: "6.7M",
      pib: "R$ 400B",
      genero: "Masculino: 47% | Feminino: 53%",
      renda: "A++ (25%) / B (40%) / C (35%)",
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Tabela de Dados</h2>

      {/* Botão Ajustar Filtros */}
      <button onClick={() => setShowModal(true)} className="btn btn-primary mb-4">
        Ajustar Filtros
      </button>

      {/* Modal de Filtros */}
      {showModal && (
        <FiltrosModal
          filtrosAtivos={filtrosAtivos}
          setFiltrosAtivos={setFiltrosAtivos}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Tabela com Scroll */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead className="bg-gray-900 text-yellow-400 uppercase text-sm">
            <tr>
              {Object.keys(filtrosAtivos)
                .filter((f) => filtrosAtivos[f].ativo)
                .map((f) => (
                  <th
                    key={f}
                    className="px-4 py-3 border border-gray-600 text-left"
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {dados.map((linha, i) => (
              <tr
                key={i}
                className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
              >
                {Object.keys(filtrosAtivos)
                  .filter((f) => filtrosAtivos[f].ativo)
                  .map((f) => (
                    <td
                      key={f}
                      className="px-4 py-3 border border-gray-600 whitespace-nowrap"
                    >
                      {linha[f]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="btn btn-secondary">
          Voltar
        </button>
        <button className="btn btn-primary">Download CSV</button>
      </div>
    </div>
  );
}
