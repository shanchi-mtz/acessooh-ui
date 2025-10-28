// src/screens/TGIBuilder.jsx
import { useState, useEffect } from "react";
import {
  Columns3,
  Rows3,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
} from "lucide-react";

/* ===================== DICIONÁRIO (mock) ===================== */
const CATEGORIES = [
  { id: "demo", name: "Demográficos/Eventos", color: "bg-emerald-500" },
  { id: "midia", name: "Consumo de Mídia", color: "bg-sky-500" },
  { id: "bens", name: "Consumo de Bens & Serviços", color: "bg-amber-500" },
  { id: "lazer", name: "Lazer & Interesses", color: "bg-violet-500" },
  { id: "opinioes", name: "Opiniões & Atitudes", color: "bg-rose-500" },
];

const VARS_BY_CAT = {
  demo: ["Sexo", "Faixa etária", "Classe social (NSE)", "Estado civil", "Escolaridade"],
  midia: ["TV aberta", "Rádio", "Mídia Exterior", "Streaming", "Redes sociais"],
  bens: ["Supermercado premium", "Delivery semanal", "Compra online mensal", "Bebidas não alcoólicas"],
  lazer: ["Pratica esportes", "Cinema 2x/mês", "Viagens no último ano"],
  opinioes: ["Fã de promoções", "Alta renda disponível", "Leal a marcas"],
};

/* ===================== HELPERS NÚMEROS FAKES ===================== */
const hash = (s) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
};
const metricFor = (label, min, max) => {
  const n = hash(label || "");
  return Math.round((min + (max - min) * n) * 10) / 10;
};

/* ===================== MODAL (step-by-step) ===================== */
function StepModal({ open, onClose, mode = "colunas", onFinish, onDraftChange }) {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(null);
  const [variable, setVariable] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setQuery("");
      setCat(null);
      setVariable(null);
    }
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    onDraftChange?.(null);
    onClose?.();
  };

  const goBack = () => {
    if (step === 2) onDraftChange?.(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const goNext = () => setStep((s) => Math.min(3, s + 1));

  const handleFinish = () => {
    if (!cat || !variable) return;
    onFinish?.({ type: mode, category: cat, variable });
    onDraftChange?.(null);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative w-full sm:max-w-3xl bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {mode === "colunas" ? "Construtor de Colunas" : "Construtor de Linhas"}
            </p>
            <h3 className="text-lg font-semibold">Etapa {step} de 3</h3>
          </div>
          <button onClick={handleClose} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>

        {/* progress */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 text-xs">
            {["Categoria", "Variável", "Confirmação"].map((label, i) => {
              const active = step === i + 1;
              const done = step > i + 1;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={[
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      done
                        ? "bg-green-500 text-white"
                        : active
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500",
                    ].join(" ")}
                  >
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={active ? "font-medium" : "text-gray-500"}>{label}</span>
                  {i < 2 && <div className="w-8 h-[2px] bg-gray-200 dark:bg-gray-700 mx-1" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* steps */}
        <div className="px-6 py-4 space-y-4">
          {step === 1 && (
            <>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 size-4 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar categoria…"
                    className="w-full pl-8 pr-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-yellow-500/30"
                  />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">Meus Targets</span>
                  <span className="px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
                    Dicionário
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">Conjunto de Targets</span>
                </div>
              </div>

              <div className="space-y-2 max-h-[42vh] overflow-auto pr-1">
                {CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c)}
                    className={[
                      "w-full flex items-center gap-3 px-3 py-3 rounded-md border text-left",
                      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                      cat?.id === c.id ? "ring-2 ring-yellow-500/40" : "",
                    ].join(" ")}
                  >
                    <span className={`w-2 h-5 rounded ${c.color}`} />
                    <div className="flex-1">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Toque para avançar</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Categoria selecionada: <span className="font-medium text-gray-100">{cat?.name}</span>
              </p>
              <div className="space-y-2 max-h-[42vh] overflow-auto pr-1">
                {(VARS_BY_CAT[cat?.id] || []).map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setVariable(v);
                      onDraftChange?.({
                        type: mode,
                        item: { id: "draft", catId: cat?.id, catName: cat?.name, variable: v },
                      });
                    }}
                    className={[
                      "w-full flex items-center justify-between px-3 py-3 rounded-md border",
                      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                      variable === v ? "ring-2 ring-yellow-500/40" : "",
                    ].join(" ")}
                  >
                    <span>{v}</span>
                    <Plus className="text-gray-400" />
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">Você está adicionando em:</p>
                <p className="text-base font-semibold">{mode === "colunas" ? "COLUNAS" : "LINHAS"}</p>
                <div className="mt-2 text-sm">
                  <p>
                    <span className="text-gray-500 dark:text-gray-400">Categoria:</span> {cat?.name}
                  </p>
                  <p>
                    <span className="text-gray-500 dark:text-gray-400">Variável:</span> {variable}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dica: você poderá editar/remover depois no painel do relatório.
              </p>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900/60">
          <button
            onClick={step === 1 ? handleClose : goBack}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
          >
            <ChevronLeft size={16} /> {step === 1 ? "Cancelar" : "Voltar"}
          </button>
          <div className="flex items-center gap-2">
            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && !cat) return;
                  if (step === 2 && !variable) return;
                  goNext();
                }}
                className={[
                  "px-4 py-2 rounded-md font-medium",
                  (step === 1 && !cat) || (step === 2 && !variable)
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-gray-900 hover:bg-yellow-400",
                ].join(" ")}
              >
                Avançar
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-md font-medium bg-yellow-500 text-gray-900 hover:bg-yellow-400 flex items-center gap-2"
              >
                <Check size={16} /> Adicionar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== PRÉVIA (agora com colunas dinâmicas + limites) ===================== */
function ReportPreview({ columns, rows, draft }) {
  // include draft inline
  const dynamicCols = draft?.type === "colunas" && draft.item ? [...columns, { ...draft.item, _draft: true }] : columns;
  const headerCols = [
    { id: "__elem", label: "Elementos", type: "metric" },
    { id: "__total", label: "TOTAL", type: "metric" },
    { id: "__resp", label: "Respondente", type: "metric" },
    ...dynamicCols.map((c) => ({ id: c.id, label: c.variable, type: c._draft ? "draft" : "user" })),
  ];

  // primeira coluna (rótulo da linha) MAIS ESTREITA: 18rem
  const gridTemplate = `18rem repeat(${headerCols.length}, 12rem)`;
  const totalBlock = { amostra000: 24500, vert: 100, horz: 100, afinidade: 100, total: 90200, resp: 43600 };

  const metricsForRow = (label) => ({
    amostra000: metricFor(label, 1800, 3100),
    total: metricFor(label + "t", 8000, 11000),
    resp: metricFor(label + "r", 2100, 5200),
    vert: metricFor(label + "v", 8.5, 12.5),
    horz: 100,
    afinidade: metricFor(label + "a", 95, 105),
  });

  const allRows = draft?.type === "linhas" && draft.item ? [...rows, { ...draft.item, _draft: true }] : rows;

  return (
    <div className="mt-6">
      {/* container com limites: scroll X e Y */}
      <div
        className="w-full overflow-x-auto overflow-y-auto pb-2 rounded-xl"
        style={{
          scrollbarWidth: "thin",
          maxHeight: "58vh", // limite vertical para não “descer a página”
        }}
      >
        <div className="min-w-full grid gap-3 pr-2" style={{ gridTemplateColumns: gridTemplate }}>
          {/* Cabeçalho “Filtro” */}
          <div className="rounded-lg bg-yellow-500 text-gray-900 p-4">
            <p className="font-semibold">Filtro:</p>
            <p className="text-xs opacity-80 mt-1">—</p>
          </div>

          {/* Cabeçalhos das colunas */}
          {headerCols.map((h) => (
            <div
              key={h.id}
              className={[
                "rounded-lg p-4",
                h.type === "draft"
                  ? "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-800"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
              ].join(" ")}
            >
              <p className="text-sm font-medium truncate">{h.label}</p>
            </div>
          ))}

          {/* TOTAL */}
          <div className="rounded-lg bg-gray-300 dark:bg-gray-600 p-4">
            <p className="font-semibold">TOTAL</p>
          </div>

          {/* TOTAL - métricas fixas */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500">Amostra (000)</p>
            <p className="font-semibold">{totalBlock.amostra000.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-gray-500 mt-1">Vert% {totalBlock.vert}%</p>
            <p className="text-xs text-gray-500">Horz% {totalBlock.horz}%</p>
            <p className="text-xs text-gray-500">Afinidade {totalBlock.afinidade}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-semibold">{totalBlock.total.toLocaleString("pt-BR")}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-semibold">{totalBlock.resp.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-gray-500 mt-1">100%</p>
            <p className="text-xs text-gray-500">48,4%</p>
            <p className="text-xs text-gray-500">100</p>
          </div>

          {/* TOTAL - colunas dinâmicas */}
          {dynamicCols.map((c) => {
            const v = metricFor("TOTAL::" + c.variable, 5, 20);
            const klass =
              c._draft
                ? "border-dashed border-yellow-400 dark:border-yellow-700"
                : "border-gray-200 dark:border-gray-700";
            return (
              <div
                key={`__total_${c.id}`}
                className={`rounded-lg bg-white dark:bg-gray-900 p-4 border ${klass}`}
                title={c.variable}
              >
                <p className="font-semibold">{v.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{c.variable}</p>
              </div>
            );
          })}

          {/* Linhas */}
          {allRows.map((r) => {
            const m = metricsForRow(r.variable);
            const rowBox = (
              <div
                className={`rounded-lg p-4 border ${
                  r._draft ? "border-dashed border-yellow-400 dark:border-yellow-700" : "border-gray-300 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-900/60`}
                key={`row_${r.id}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {r.variable}
                      {r._draft && " (prévia)"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.catName}</p>
                  </div>
                  <span className="text-yellow-500">•••</span>
                </div>
              </div>
            );

            const fixedCells = (
              <>
                <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500">Amostra (000)</p>
                  <p className="font-semibold">{m.amostra000.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-gray-500 mt-1">Vert% {m.vert}%</p>
                  <p className="text-xs text-gray-500">Horz% {m.horz}%</p>
                  <p className="text-xs text-gray-500">Afinidade {Math.round(m.afinidade)}</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">{Math.round(m.total).toLocaleString("pt-BR")}</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">{Math.round(m.resp).toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-gray-500 mt-1">{((m.resp / 4300) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">{m.vert.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">{Math.round(m.afinidade)}</p>
                </div>
              </>
            );

            const dynCells = dynamicCols.map((c) => {
              const val = metricFor(r.variable + "::" + c.variable, 0, 100);
              const klass =
                c._draft
                  ? "border-dashed border-yellow-400 dark:border-yellow-700"
                  : "border-gray-200 dark:border-gray-700";
              return (
                <div
                  key={`cell_${r.id}_${c.id}`}
                  className={`rounded-lg bg-white dark:bg-gray-900 p-4 border ${klass}`}
                  title={`${r.variable} × ${c.variable}`}
                >
                  <p className="font-semibold">{val.toFixed(1)}%</p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">{c.variable}</p>
                </div>
              );
            });

            return (
              <>
                {rowBox}
                {fixedCells}
                {dynCells}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===================== PÁGINA ===================== */
export default function TGIBuilder() {
  const [openCols, setOpenCols] = useState(false);
  const [openRows, setOpenRows] = useState(false);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [draft, setDraft] = useState(null); // { type, item }

  // overlay de preparo
  const [preparing, setPreparing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFinish = ({ type, category, variable }) => {
    const item = {
      id: crypto.randomUUID(),
      catId: category.id,
      catName: category.name,
      variable,
    };
    if (type === "colunas") setColumns((s) => [...s, item]);
    else setRows((s) => [...s, item]);
    setDraft(null);
  };

  const startPrepare = () => {
    if (preparing) return;
    setPreparing(true);
    setProgress(0);

    // duração entre 10 e 15s
    const duration = Math.floor(10000 + Math.random() * 5000);
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else {
        setTimeout(() => setPreparing(false), 400); // pequeno respiro ao final
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <div className="content">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-semibold mb-4">Relatório — Linhas & Colunas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLUNAS */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 surface p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Columns3 className="text-yellow-500" />
                <h2 className="text-lg font-semibold">Colunas</h2>
              </div>
              <button onClick={() => setOpenCols(true)} className="btn btn-primary">
                <Plus size={16} /> Construir coluna
              </button>
            </div>

            {columns.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma coluna adicionada ainda.</p>
            ) : (
              <div className="space-y-2">
                {columns.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-5 rounded ${CATEGORIES.find((x) => x.id === c.catId)?.color || "bg-gray-400"}`} />
                      <div>
                        <p className="text-sm font-medium">{c.variable}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{c.catName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setColumns((s) => s.filter((x) => x.id !== c.id))}
                      className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LINHAS */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 surface p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Rows3 className="text-yellow-500" />
                <h2 className="text-lg font-semibold">Linhas</h2>
              </div>
              <button onClick={() => setOpenRows(true)} className="btn btn-primary">
                <Plus size={16} /> Construir linha
              </button>
            </div>

            {rows.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma linha adicionada ainda.</p>
            ) : (
              <div className="space-y-2">
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-5 rounded ${CATEGORIES.find((x) => x.id === r.catId)?.color || "bg-gray-400"}`} />
                      <div>
                        <p className="text-sm font-medium">{r.variable}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{r.catName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setRows((s) => s.filter((x) => x.id !== r.id))}
                      className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AÇÕES */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
          <button className="btn btn-secondary">Opções de Exibição</button>
          <button className="btn btn-secondary">Ordenar</button>
          <button onClick={startPrepare} className="btn btn-primary">Preparar Arquivo</button>
          <button className="btn btn-primary">Gerar Relatório</button>
        </div>

        {/* PRÉVIA */}
        <ReportPreview columns={columns} rows={rows} draft={draft} />
      </div>

      {/* MODAIS */}
      <StepModal
        open={openCols}
        onClose={() => {
          setOpenCols(false);
          setDraft(null);
        }}
        mode="colunas"
        onFinish={handleFinish}
        onDraftChange={setDraft}
      />

      <StepModal
        open={openRows}
        onClose={() => {
          setOpenRows(false);
          setDraft(null);
        }}
        mode="linhas"
        onFinish={handleFinish}
        onDraftChange={setDraft}
      />

      {/* OVERLAY DE PREPARO */}
{preparing && (
  <div className="fixed inset-0 z-[60]">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
    <div className="relative h-full w-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg surface border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Preparando arquivo…</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Estamos organizando os dados para o TGI. Aguarde alguns segundos.
        </p>

        {/* Barra de progresso blindada */}
        <div className="relative w-full h-3 mt-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
          {/* FILL absoluto com gradient (não depende de classes de cor) */}
          <div
            className="absolute inset-y-0 left-0 will-change-[width]"
            style={{
              width: `${Math.max(0, progress)}%`,
              background: "linear-gradient(90deg,#F59E0B,#FBBF24)",
              transition: "width 150ms linear",
              transform: "translateZ(0)", // suaviza em alguns browsers
            }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">{Math.round(progress)}%</p>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
