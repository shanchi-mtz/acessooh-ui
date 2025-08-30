import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, ChevronRight, ChevronLeft, Database, Star } from "lucide-react";

// Tela 2 – Fluxo de criação de projeto: Selecionar Base de Dados
// Mantém o mesmo look&feel dark + amarelo da Tela 1

export default function SelectDatabase() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Target Group Index Brasil (Português) – Pessoas");

  const bases = [
    "Target Group Index Brasil (Português) – Pessoas",
    "Target Group Index Brasil (Português) – Domicílios",
    "Target Group Index Brasil (English) – Persons",
    "Target Group Index Brasil (English) – Household",
    "Target Group Index Brasil – Português",
    "Target Group Index Brasil – English"
  ];

  const filtered = bases.filter(b => b.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur">
        <motion.h1 initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="text-xl font-bold">
          Acesso<span className="text-yellow-400">OOH</span>
        </motion.h1>
        <div className="text-sm text-gray-400">Novo Projeto · Etapa 1 de 4 — <span className="text-white font-medium">Selecionar Base</span></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar do assistente de etapas */}
        <aside className="col-span-12 lg:col-span-3 space-y-3">
          {[
            {label: "Base de Dados", done: true},
            {label: "Filtros & Target", done: false},
            {label: "Pré-visualização", done: false},
            {label: "Salvar & Continuar", done: false},
          ].map((step, i) => (
            <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-3 border ${step.done ? "border-yellow-400 bg-yellow-400/10" : "border-gray-800 bg-gray-800/50"}`}>
              <span className={`text-sm ${step.done ? "text-yellow-300" : "text-gray-300"}`}>{i+1}. {step.label}</span>
              {step.done ? <Star size={16} className="text-yellow-400"/> : <ChevronRight size={16} className="text-gray-500"/>}
            </div>
          ))}

          <Card className="bg-gray-800 border-0 mt-6">
            <CardContent className="p-4">
              <p className="text-sm text-gray-400 mb-2">Dica rápida</p>
              <p className="text-sm">Prefira sempre a base <span className="text-yellow-300 font-medium">mais recente</span>. Você pode alterar isso depois em "Configurações do Projeto".</p>
            </CardContent>
          </Card>
        </aside>

        {/* Área principal */}
        <section className="col-span-12 lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Base de dados</h2>
              <p className="text-gray-400 text-sm">Selecione uma base para começar seu projeto.</p>
            </div>
          </div>

          {/* Busca */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por base de dados"
                className="pl-10 bg-gray-800 border-0 placeholder-gray-500 text-white"
              />
            </div>
            <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500">Buscar</Button>
          </div>

          {/* Lista de bases */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((base) => (
              <button
                key={base}
                onClick={() => setSelected(base)}
                className={`text-left rounded-xl p-4 border transition group ${selected === base ? "border-yellow-400 bg-yellow-400/10" : "border-gray-800 bg-gray-800/50 hover:bg-gray-800"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${selected === base ? "bg-yellow-400" : "bg-gray-700"}`}>
                    <Database size={16} className={`${selected === base ? "text-black" : "text-gray-300"}`} />
                  </div>
                  <div>
                    <p className="font-medium">{base}</p>
                    <p className="text-xs text-gray-400">Atualizada: 2025 · Fonte Kantar</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Barra inferior fixa com ações */}
          <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur pt-4">
            <div className="flex items-center justify-between border-t border-gray-800 pt-4">
              <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">
                <ChevronLeft className="mr-2" size={16}/> Voltar
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Selecionado:</span>
                <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700">{selected}</span>
              </div>
              <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
                Continuar <ChevronRight className="ml-2" size={16}/>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
