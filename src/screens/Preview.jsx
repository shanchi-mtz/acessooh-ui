import { useState } from "react";
import * as XLSX from "xlsx";
import Footer from "../components/Footer.jsx";
import SimplePie from "../components/charts/SimplePie.jsx";
import SimpleBar from "../components/charts/SimpleBar.jsx";
import { copySvgNodeAsPNG } from "../utils/exportImage.js";

function GenderChip({ label = "Feminino", color = "#f472b6", icon = "female" }) {
  return (
    <div className="gender-chip">
      <svg viewBox="0 0 24 24" fill={color}>
        {icon === "female" ? (
          <path d="M12 2a6 6 0 1 0 0 12v2H9a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-2a6 6 0 0 0-3-11.98Z" />
        ) : (
          <path d="M16 2a6 6 0 1 0-4.243 10.243L9.172 14.83a1 1 0 1 0 1.414 1.414l2.586-2.586A6 6 0 0 0 16 2Z" />
        )}
      </svg>
      <span>{label}</span>
    </div>
  );
}

export default function Preview({ onBack }) {
  // Paletas
  const palettes = {
    amarelo: ["#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207"],
    colorido: [
      "#facc15",
      "#60a5fa",
      "#34d399",
      "#f87171",
      "#a78bfa",
      "#22d3ee",
    ],
    neutro: ["#93c5fd", "#a7f3d0", "#fcd34d", "#fecaca", "#e9d5ff"],
  };
  const [paletteKey, setPaletteKey] = useState("colorido");
  const currentPalette = palettes[paletteKey];

  // Dados fictícios
  const N = 12834,
    pen = 0.27,
    afin = 134,
    reach = 0.62;

  const tableAges = [
    { faixa: "18–24", outdoor: 0.32, abrigos: 0.28, elev: 0.4 },
    { faixa: "25–34", outdoor: 0.38, abrigos: 0.26, elev: 0.36 },
    { faixa: "35–44", outdoor: 0.41, abrigos: 0.3, elev: 0.29 },
    { faixa: "45–54", outdoor: 0.36, abrigos: 0.33, elev: 0.31 },
  ];

  const crossTable = [
    { faixa: "18–24", A: 12, B: 24, C: 36, DE: 28 },
    { faixa: "25–34", A: 18, B: 30, C: 32, DE: 20 },
    { faixa: "35–44", A: 22, B: 28, C: 30, DE: 20 },
    { faixa: "45–54", A: 20, B: 25, C: 35, DE: 20 },
  ];

  const pieData = [
    { name: "Outdoor", value: 42 },
    { name: "Abrigos", value: 26 },
    { name: "Elevadores", value: 32 },
  ];

  const barData = [
    { region: "SP", valor: 520 },
    { region: "RJ", valor: 410 },
    { region: "MG", valor: 280 },
    { region: "PR", valor: 230 },
  ];

  function exportCSV() {
    const header = ["Faixa etária", "Outdoor", "Abrigos", "Elevadores"];
    const rows = tableAges.map((r) => [
      r.faixa,
      (r.outdoor * 100).toFixed(0) + "%",
      (r.abrigos * 100).toFixed(0) + "%",
      (r.elev * 100).toFixed(0) + "%",
    ]);
    const csv = [header, ...rows].map((r) => r.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preview.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(tableAges.map((r) => ({
      "Faixa Etária": r.faixa,
      Outdoor: (r.outdoor * 100).toFixed(0) + "%",
      Abrigos: (r.abrigos * 100).toFixed(0) + "%",
      Elevadores: (r.elev * 100).toFixed(0) + "%",
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Faixa etária x Formato");
    XLSX.writeFile(wb, "preview.xlsx");
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl font-bold">Pré-visualização</h2>
          <div className="flex items-center gap-2">
            <GenderChip label="Feminino 52%" color="#f472b6" icon="female" />
            <GenderChip label="Masculino 48%" color="#60a5fa" icon="male" />
          </div>
        </div>

        {/* Fonte */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Fonte: TGI 2024.2 • Dados fictícios
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="text-gray-400 text-xs">Base (N)</div>
            <div className="text-2xl font-bold">{N.toLocaleString("pt-BR")}</div>
          </div>
          <div className="card p-4">
            <div className="text-gray-400 text-xs">Penetração</div>
            <div className="text-2xl font-bold">{(pen * 100).toFixed(1)}%</div>
          </div>
          <div className="card p-4">
            <div className="text-gray-400 text-xs">Índice Afinidade</div>
            <div className="text-2xl font-bold">{afin}</div>
          </div>
          <div className="card p-4">
            <div className="text-gray-400 text-xs">Alcance estimado</div>
            <div className="text-2xl font-bold">{(reach * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Paleta */}
        <div className="card p-4">
          <div className="text-sm text-gray-400 mb-2">Paleta para gráficos</div>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.keys(palettes).map((key) => (
              <button
                key={key}
                onClick={() => setPaletteKey(key)}
                className={`palette-btn ${paletteKey === key ? "active" : ""}`}
              >
                <span className="capitalize">{key}</span>
                <span className="inline-flex items-center gap-1 ml-2">
                  {palettes[key].map((c, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ background: c }}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mini tabela */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Distribuição por faixa etária × formato</h3>
            <div className="text-xs text-gray-400">valores em %</div>
          </div>
          <table className="w-full text-sm table-preview">
            <thead>
              <tr>
                <th>Faixa</th>
                <th>Outdoor</th>
                <th>Abrigos</th>
                <th>Elevadores</th>
              </tr>
            </thead>
            <tbody>
              {tableAges.map((r) => (
                <tr key={r.faixa}>
                  <td>{r.faixa}</td>
                  <td>{(r.outdoor * 100).toFixed(0)}%</td>
                  <td>{(r.abrigos * 100).toFixed(0)}%</td>
                  <td>{(r.elev * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabela cruzada */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Faixa etária × Classe Social</h3>
          <table className="w-full text-sm table-preview">
            <thead>
              <tr>
                <th>Faixa</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>DE</th>
              </tr>
            </thead>
            <tbody>
              {crossTable.map((r) => (
                <tr key={r.faixa}>
                  <td>{r.faixa}</td>
                  <td>{r.A}%</td>
                  <td>{r.B}%</td>
                  <td>{r.C}%</td>
                  <td>{r.DE}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4">
            <div className="text-sm text-gray-400 mb-2">Participação por formato</div>
            <SimplePie data={pieData} colors={currentPalette} />
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-400 mb-2">Intensidade por região</div>
            <SimpleBar data={barData} colors={currentPalette} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        left={<button onClick={onBack} className="btn btn-secondary">Voltar</button>}
        center={<span className="chip">Preview (fictício)</span>}
        right={
          <div className="flex gap-2">
            <button onClick={exportCSV} className="btn btn-secondary">Exportar CSV</button>
            <button onClick={exportExcel} className="btn btn-primary">Exportar Excel</button>
          </div>
        }
      />
    </>
  );
}
