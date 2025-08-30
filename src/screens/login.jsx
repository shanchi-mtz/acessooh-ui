// screens/Login.jsx
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo com imagem */}
      <div className="hidden lg:block w-3/5 relative overflow-hidden">
        <img
          src="https://metricaz.com/wp-content/uploads/2025/08/ads-homem.webp"
          alt="Anúncios de rua"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
      </div>

      {/* Lado direito com form */}


<div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-10 bg-gray-900">
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-3xl font-bold mb-6 text-yellow-400"
  >
    AcessoOH
  </motion.h1>

  <div className="w-full max-w-md p-6 space-y-4 rounded-lg shadow-lg bg-gray-800">
    <input className="input w-full" placeholder="Usuário / Email" />
    <input type="password" className="input w-full" placeholder="Senha" />
    <button onClick={onLogin} className="btn btn-primary w-full">
      Entrar
    </button>
    <div className="flex justify-between text-sm text-gray-300">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox accent-yellow-500" />
        <span>Lembrar-me</span>
      </label>
      <a href="#" className="hover:underline text-yellow-400">
        Esqueci minha senha
      </a>
    </div>
  </div>
</div>



    </div>
  );
}
