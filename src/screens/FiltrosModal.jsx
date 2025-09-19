import { useState } from "react";

export default function FiltrosModal({ filtrosAtivos, setFiltrosAtivos, onClose }) {
  const [tempFiltros, setTempFiltros] = useState(filtrosAtivos);

  const handleChange = (key, value) => {
    setTempFiltros((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-[600px] max-h-[80vh] flex flex-col shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Selecionar Filtros</h2>

        {/* Área com scroll */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scroll space-y-6">
          {/* Lista de filtros principais */}
          <div className="grid grid-cols-2 gap-y-3">
            {["Ibge", "Municipio", "Estado", "Populacao", "Pib", "Genero", "Renda"].map((filtro) => (
              <label
                key={filtro}
                className="flex items-center gap-2 text-gray-200 cursor-pointer hover:text-yellow-400 transition"
              >
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={tempFiltros[filtro.toLowerCase()]?.ativo || false}
                  onChange={(e) =>
                    handleChange(filtro.toLowerCase(), {
                      ...tempFiltros[filtro.toLowerCase()],
                      ativo: e.target.checked,
                    })
                  }
                />
                <span className="font-medium">
                  {filtro.charAt(0).toUpperCase() + filtro.slice(1).toLowerCase()}
                </span>
              </label>
            ))}
          </div>

          {/* Filtros específicos de Gênero */}
          {tempFiltros.genero?.ativo && (
            <div className="space-y-2 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-yellow-400">População por Gênero</h3>
              <div className="flex flex-col gap-2 pl-4">
                {["Masculino", "Feminino"].map((g) => (
                  <label key={g} className="flex items-center gap-2 text-gray-300">
                    <input
                      type="checkbox"
                      className="accent-yellow-500"
                      checked={tempFiltros.genero?.[g.toLowerCase()] || false}
                      onChange={(e) =>
                        handleChange("genero", {
                          ...tempFiltros.genero,
                          [g.toLowerCase()]: e.target.checked,
                          ativo: true,
                        })
                      }
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Filtros específicos de Renda */}
          {tempFiltros.renda?.ativo && (
            <div className="space-y-4 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-yellow-400">Faixa de Renda</h3>
              <div className="space-y-3">
                {["A++", "A+", "B", "C", "D", "E"].map((classe) => (
                  <div
                    key={classe}
                    className="flex items-center gap-3 bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition"
                  >
                    <input
                      type="checkbox"
                      className="accent-yellow-500"
                      checked={tempFiltros.renda?.[classe]?.ativo || false}
                      onChange={(e) =>
                        handleChange("renda", {
                          ...tempFiltros.renda,
                          [classe]: {
                            ...tempFiltros.renda?.[classe],
                            ativo: e.target.checked,
                          },
                          ativo: true,
                        })
                      }
                    />
                    <span className="w-12 font-bold text-gray-200">{classe}</span>
                    <input
                      type="number"
                      placeholder="De"
                      className="input w-20 text-center"
                      value={tempFiltros.renda?.[classe]?.de || ""}
                      onChange={(e) =>
                        handleChange("renda", {
                          ...tempFiltros.renda,
                          [classe]: {
                            ...tempFiltros.renda?.[classe],
                            de: e.target.value,
                            ativo: true,
                          },
                        })
                      }
                    />
                    <span className="text-gray-400">até</span>
                    <input
                      type="number"
                      placeholder="Até"
                      className="input w-20 text-center"
                      value={tempFiltros.renda?.[classe]?.ate || ""}
                      onChange={(e) =>
                        handleChange("renda", {
                          ...tempFiltros.renda,
                          [classe]: {
                            ...tempFiltros.renda?.[classe],
                            ate: e.target.value,
                            ativo: true,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-700 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setFiltrosAtivos(tempFiltros);
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Scroll bonito */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
