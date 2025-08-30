import { motion } from 'framer-motion'

export default function LoginOnboarding({ loggedIn, onLogin, onContinue }){
  return (
    <div className="min-h-screen flex">
      {!loggedIn ? (
        <div className="relative flex w-full">
          <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1529336953121-a9bf3f5678b3?auto=format&fit=crop&w=1400&q=80" className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"/>
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
            <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-3xl font-bold mb-6 text-yellow-400">AcessoOH</motion.h1>
            <div className="card w-full max-w-md p-6 space-y-4 backdrop-blur">
              <input className="input w-full" placeholder="Usuário / Email"/>
              <input type="password" className="input w-full" placeholder="Senha"/>
              <button onClick={onLogin} className="btn btn-primary w-full">Entrar</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col p-6 lg:p-10 space-y-8">
          <motion.h2 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-2xl font-bold">Bem-vindo de volta!</motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div onClick={onContinue} className="card p-6 hover:bg-gray-800 cursor-pointer text-center"><div className="text-yellow-400 text-lg font-semibold">Novo Projeto</div></div>
          </div>
        </div>
      )}
    </div>
  )
}
