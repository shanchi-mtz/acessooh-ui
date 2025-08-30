import { motion } from "framer-motion";

export default function Onboarding({ onContinue }) {
  return (
    <div className="w-full flex flex-col p-6 lg:p-10 space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Bem-vindo de volta!
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div
          onClick={onContinue}
          className="card p-6 hover:bg-gray-800 cursor-pointer text-center"
        >
          <div className="text-yellow-400 text-lg font-semibold">Novo Projeto</div>
        </div>
        <div className="card p-6 hover:bg-gray-800 cursor-pointer text-center">
          <div className="text-yellow-400 text-lg font-semibold">Abrir Histórico</div>
        </div>
        <div className="card p-6 hover:bg-gray-800 cursor-pointer text-center">
          <div className="text-yellow-400 text-lg font-semibold">Ajuda & Tutoriais</div>
        </div>
      </div>

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
