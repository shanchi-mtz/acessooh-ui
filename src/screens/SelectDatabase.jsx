import { useState } from "react";
import Footer from "../components/Footer";

export default function SelectDatabase({ onContinue, onBack }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    "Target Group Index Brasil (Português) – Pessoas"
  );

  const bases = [
    "Target Group Index Brasil (Português) – Pessoas",
    "Target Group Index Brasil (Português) – Domicílios",
    "Target Group Index Brasil (English) – Persons",
    "Target Group Index Brasil (English) – Household",
  ];

  const filtered = bases.filter((b) =>
    b.toLowerCase().includes(query.toLowerCase())
  );

  return (
<>
  {/* Header interno */}
  <div className="content header surface border-b border-gray-200 dark:border-gray-700">
    <div className="header-inner">
      <h1 className="text-xl font-bold">
        Novo Projeto ·{" "}
        <span className="text-yellow-400">Etapa 1 de 4</span> — Selecionar Base
      </h1>
    </div>
  </div>

      {/* Conteúdo principal */}
  <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 pb-32">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Base de dados</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Selecione uma base para começar seu projeto.
            </p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Preferir a base mais recente
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            className="input flex-1"
            placeholder="Buscar por base de dados"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-primary">Buscar</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filtered.map((base) => (
            <button
              key={base}
              onClick={() => setSelected(base)}
              className={`card text-left ${
                selected === base ? "card-selected" : "hover:border-yellow-400"
              }`}
            >
              <div className="font-medium">{base}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Atualizada: 2025 · Fonte Kantar
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer fixo unificado */}
<Footer
    left={<button onClick={onBack} className="btn-secondary">Voltar</button>}
    center={
      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <span>Selecionado:</span>
        <span className="chip">{selected}</span>
      </div>
    }
    right={<button onClick={onContinue} className="btn-primary">Continuar</button>}
  />
</>
  );
}
