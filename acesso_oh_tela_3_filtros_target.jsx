import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Filter, Save, Star, Users, SlidersHorizontal } from "lucide-react";

export default function FiltersTarget() {
  const [sexo, setSexo] = useState("Ambos");
  const [idadeMin, setIdadeMin] = useState(20);
  const [idadeMax, setIdadeMax] = useState(44);
  const [classes, setClasses] = useState(["A", "B1", "B2"]);
  const [presetName, setPresetName] = useState("");
  const [generated, setGenerated] = useState(false);

  const classOptions = ["A", "B1", "B2", "C1", "C2", "DE"];
  const presets = [
    { label: "12–17", min: 12, max: 17 },
    { label: "18–24", min: 18, max: 24 },
    { label: "20–44", min: 20, max: 44 },
    { label: "25–54", min: 25, max: 54 },
    { label: "55+", min: 55, max: 80 },
  ];

  const toggleClass = (c) => {
    setClasses((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const applyPreset = (p) => {
    setIdadeMin(p.min);
    setIdadeMax(p.max);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur">
        <motion.h1 initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="text-xl font-bold">
          Acesso<span className="text-yellow-400">OOH</span>
        </motion.h1>
        <div className="text-sm text-gray-400">Novo Projeto · Etapa 2 de 4 — <span className="text-white font-medium">Filtros & Target</span></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-3">
          {[
            {label: "Base de Dados", done: true},
            {label: "Filtros & Target", done: true},
            {label: "Pré-visualização", done: false},
            {label: "Salvar & Continuar", done: false},
          ].map((step, i) => (
            <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-3 border ${step.done ? "border-yellow-400 bg-yellow-400/10" : "border-gray-800 bg-gray-800/50"}`}>
              <span className={`text-sm ${step.done ? "text-yellow-300" : "text-gray-300"}`}>{i+1}. {step.label}</span>
              {step.done ? <Star size={16} className="text-yellow-400"/> : <ChevronRight size={16} className="text-gray-500"/>}
            </div>
          ))}

          <Card className="bg-gray-800 border-0 mt-6">
            <CardContent className="p-4 text-sm text-gray-300">
              <p className="mb-2">Dica rápida</p>
              <p>Use <span className="text-yellow-300 font-medium">presets</span> para ganhar velocidade e garantir consistência entre projetos.</p>
            </CardContent>
          </Card>
        </aside>

        {/* Main */}
        <section className="col-span-12 lg:col-span-9 space-y-6">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-yellow-400" />
            <h2 className="text-2xl font-bold">Monte o seu Target</h2>
          </div>
          <p className="text-sm text-gray-400 -mt-2">Defina sexo, faixa etária e classes (NSE). Você poderá salvar como preset.</p>

          {/* Blocos de filtros */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sexo */}
            <Card className="bg-gray-800 border-0">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-yellow-400"/>
                  <h3 className="font-semibold">Sexo</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Ambos", "Feminino", "Masculino"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSexo(s)}
                      className={`px-4 py-2 rounded-full border text-sm transition ${sexo === s ? "bg-yellow-400 text-black border-yellow-400" : "bg-gray-700 border-gray-600 hover:bg-gray-600"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Idade */}
            <Card className="bg-gray-800 border-0">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-yellow-400"/>
                  <h3 className="font-semibold">Faixa etária</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">de</span>
                    <Input type="number" value={idadeMin} min={10} max={idadeMax} onChange={(e)=>setIdadeMin(parseInt(e.target.value||"0"))} className="w-20 bg-gray-700 border-0"/>
                    <span className="text-sm text-gray-400">a</span>
                    <Input type="number" value={idadeMax} min={idadeMin} max={99} onChange={(e)=>setIdadeMax(parseInt(e.target.value||"0"))} className="w-20 bg-gray-700 border-0"/>
                    <span className="text-sm text-gray-400">anos</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {presets.map((p) => (
                    <button key={p.label} onClick={()=>applyPreset(p)} className="px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-xs border border-gray-600">
                      {p.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes */}
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold">Classes (NSE)</h3>
              <div className="flex gap-2 flex-wrap">
                {classOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleClass(c)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${classes.includes(c) ? "bg-yellow-400 text-black border-yellow-400" : "bg-gray-700 border-gray-600 hover:bg-gray-600"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salvar Preset */}
          <Card className="bg-gray-800 border-0">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Save size={18} className="text-yellow-400"/>
                <h3 className="font-semibold">Salvar Preset</h3>
              </div>
              <div className="flex gap-3">
                <Input value={presetName} onChange={(e)=>setPresetName(e.target.value)} placeholder="Nome do preset" className="bg-gray-700 border-0"/>
                <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500">Salvar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Barra inferior */}
          <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur pt-4">
            <div className="flex items-center justify-between border-t border-gray-800 pt-4">
              <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">
                <ChevronLeft className="mr-2" size={16}/> Voltar
              </Button>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Target atual:</span>
                <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700">
                  {sexo}, {idadeMin}-{idadeMax} anos, Classes {classes.join(", ")}
                </span>
              </div>
              <Button onClick={()=>setGenerated(true)} className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
                Gerar Relatório <ChevronRight className="ml-2" size={16}/>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
