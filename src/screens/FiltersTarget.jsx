import { useState } from "react";
import Footer from "../components/Footer.jsx";

export default function FiltersTarget({ onBack, onContinue }) {
  const [sexo, setSexo] = useState("Ambos");
  const [idadeMin, setIdadeMin] = useState(20);
  const [idadeMax, setIdadeMax] = useState(44);
  const [classes, setClasses] = useState(["A", "B1", "B2"]);
  const [midias, setMidias] = useState([]);
  const [comps, setComps] = useState([]);
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState("");

  const idadePresets = [
    { label: "12–17", min: 12, max: 17 },
    { label: "18–24", min: 18, max: 24 },
    { label: "20–44", min: 20, max: 44 },
    { label: "25–54", min: 25, max: 54 },
    { label: "55+", min: 55, max: 80 },
  ];

  const classOptions = ["A", "B1", "B2", "C1", "C2", "DE"];
  const midiaOptions = ["TV Aberta", "Rádio", "Mídia Exterior", "Streaming"];
  const compOptions = [
    "Compra online mensalmente",
    "Pratica esportes",
    "Fã de promoções",
    "Alta renda disponível",
  ];

  const toggle = (arr, setArr, item) =>
    setArr((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  const savePreset = () => {
    if (presetName.trim()) {
      setPresets([...presets, { name: presetName, sexo, idadeMin, idadeMax, classes, midias, comps }]);
      setPresetName("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)]">
      {/* Header */}
      <div className="content header">
        <div className="header-inner">
          <h1 className="text-xl font-bold">
            Novo Projeto · <span className="text-yellow-400">Etapa 2 de 4</span> — Filtros & Target
          </h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 pb-32">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sexo */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold">Sexo</h3>
            <div className="flex gap-2 flex-wrap">
              {["Ambos", "Feminino", "Masculino"].map((s) => (
                <button key={s} onClick={() => setSexo(s)} className={`btn-filter ${sexo === s ? "active" : ""}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa Etária */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold">Faixa etária</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">de</span>
              <input
                type="number"
                className="input w-20"
                value={idadeMin}
                min={10}
                max={idadeMax}
                onChange={(e) => setIdadeMin(parseInt(e.target.value || "0"))}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">a</span>
              <input
                type="number"
                className="input w-20"
                value={idadeMax}
                min={idadeMin}
                max={99}
                onChange={(e) => setIdadeMax(parseInt(e.target.value || "0"))}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">anos</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {idadePresets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setIdadeMin(p.min);
                    setIdadeMax(p.max);
                  }}
                  className="btn-preset"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold">Classes (NSE)</h3>
          <div className="flex gap-2 flex-wrap">
            {classOptions.map((c) => (
              <button key={c} onClick={() => toggle(classes, setClasses, c)} className={`btn-filter ${classes.includes(c) ? "active" : ""}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Mídias Consumidas */}
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold">Mídias Consumidas</h3>
          <div className="flex gap-2 flex-wrap">
            {midiaOptions.map((m) => (
              <button key={m} onClick={() => toggle(midias, setMidias, m)} className={`btn-filter ${midias.includes(m) ? "active" : ""}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Comportamentais */}
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold">Comportamentais</h3>
          <div className="flex gap-2 flex-wrap">
            {compOptions.map((c) => (
              <button key={c} onClick={() => toggle(comps, setComps, c)} className={`btn-filter ${comps.includes(c) ? "active" : ""}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Salvar Target */}
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold">Salvar Target</h3>
          <div className="flex gap-3">
            <input
              type="text"
              className="input flex-1"
              placeholder="Nome do Target (ex: Jovens Classe B)"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
            <button onClick={savePreset} className="btn-primary">Salvar</button>
          </div>
          {presets.length > 0 && (
            <div className="space-y-2 mt-2">
              {presets.map((p, i) => (
                <div key={i} className="chip">
                  {p.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer
        left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>}
        center={
          <span className="chip text-sm">
            {sexo}, {idadeMin}-{idadeMax} anos, Classes {classes.join(", ")} | {midias.join(", ")} | {comps.join(", ")}
          </span>
        }
        right={<button onClick={onContinue} className="btn btn-primary">Gerar Relatório</button>}
      />
    </div>
  );
}
