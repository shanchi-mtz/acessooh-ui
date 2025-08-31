import { useState } from "react";
import Footer from "../components/Footer";

export default function SelectDatabase({ onContinue, onBack }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Target Group Index Brasil (Português) – Pessoas");

  // Agora cada base tem mais dados
  const bases = [
    {
      name: "Target Group Index Brasil (Português) – Pessoas",
      year: 2025,
      fonte: "Kantar Ibope",
      idioma: "Português",
      sample: "32.500 entrevistas",
    },
    {
      name: "Target Group Index Brasil (Português) – Domicílios",
      year: 2024,
      fonte: "Kantar Ibope",
      idioma: "Português",
      sample: "12.000 entrevistas",
    },
    {
      name: "Target Group Index Brasil (English) – Persons",
      year: 2025,
      fonte: "Kantar Ibope",
      idioma: "English",
      sample: "18.700 interviews",
    },
    {
      name: "Target Group Index Brasil (English) – Household",
      year: 2023,
      fonte: "Kantar Ibope",
      idioma: "English",
      sample: "8.400 interviews",
    },
  ];

  const filtered = bases.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
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

        {/* Campo de busca */}
        <div className="flex items-center gap-3">
          <input
            className="input flex-1"
            placeholder="Buscar por base de dados"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-primary">Buscar</button>
        </div>

        {/* Lista de bases */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filtered.map((base) => (
            <button
              key={base.name}
              onClick={() => setSelected(base.name)}
              className={`card text-left ${
                selected === base.name ? "card-selected" : "hover:border-yellow-400"
              }`}
            >
              <div className="font-medium">{base.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Atualizada: {base.year} · {base.fonte}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Idioma: {base.idioma}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Amostra: {base.sample}
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
