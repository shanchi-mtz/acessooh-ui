import { useState } from 'react'
import { motion } from 'framer-motion'
export default function LoginOnboarding({ onContinue }){
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="min-h-[calc(100vh-56px)] flex">
      {!loggedIn ? (
        <div className="flex w-full">
          <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80')"}} />
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
            <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-3xl font-bold mb-6 text-yellow-400">AcessoOH</motion.h1>
            <div className="card w-full max-w-md p-6 space-y-4">
              <input className="input w-full" placeholder="Usuário / Email" />
              <input type="password" className="input w-full" placeholder="Senha" />
              <button onClick={()=>setLoggedIn(true)} className="btn btn-primary w-full">Entrar</button>
              <div className="flex justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-yellow-400" />
                  <span>Lembrar-me</span>
                </label>
                <a href="#" className="hover:underline">Esqueci minha senha</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col p-6 lg:p-10 space-y-8">
          <motion.h2 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-2xl font-bold">Bem-vindo de volta!</motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div onClick={onContinue} className="card p-6 hover:bg-gray-800 cursor-pointer text-center">
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
              <div className="card p-4"><p className="font-semibold">Trabalhadores SP</p><span className="text-sm text-gray-400">Último acesso em 21/08/2025</span></div>
              <div className="card p-4"><p className="font-semibold">Lanchonetes Interior SP</p><span className="text-sm text-gray-400">Último acesso em 18/08/2025</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
