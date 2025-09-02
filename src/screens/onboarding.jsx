import { motion } from "framer-motion";
import MapaBrasil from "../components/MapaBrasil"; // novo componente

export default function Onboarding({ onContinue }) {
  return (
    <div className="w-full flex flex-col p-6 lg:p-10 space-y-8">
      {/* Título animado */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Bem-vindo de volta!
      </motion.h2>

      {/* Seção com base de dados + mapa */}
      <div className="card flex flex-col md:flex-row items-center justify-between gap-6 p-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Última base utilizada:</h3>
          <p className="text-gray-400 mb-3">Base Brasil Pro 2023</p>
          <button className="btn btn-primary">Entrar</button>
        </div>

        {/* Mapa do Brasil */}
        <div className="flex-1 max-w-sm">
          <MapaBrasil />
        </div>
      </div>

      {/* Atalhos principais */}
      <div className="grid md:grid-cols-3 gap-6">
        <div onClick={onContinue} className="card p-6 hover:bg-gray-800 cursor-pointer text-center">
          <div className="text-black-400 text-lg font-semibold">Novo Projeto</div>
        </div>
        <div className="card p-6 hover:bg-yellow-800 cursor-pointer text-center">
          <div className="text-yellow-400 text-lg font-semibold">Abrir Histórico</div>
        </div>
        <div className="card p-6 hover:bg-gray-800 cursor-pointer text-center">
          <div className="text-yellow-400 text-lg font-semibold">Ajuda & Tutoriais</div>
        </div>
      </div>

      {/* Projetos recentes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Projetos Recentes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <p className="font-semibold">Trabalhadores SP</p>
            <span className="text-sm text-gray-400">
              Último acesso em 21/08/2025
            </span>
          </div>
          <div className="card p-4">
            <p className="font-semibold">Lanchonetes Interior SP</p>
            <span className="text-sm text-gray-400">
              Último acesso em 18/08/2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
