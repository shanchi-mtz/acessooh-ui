import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { User, Lock, FolderPlus, History, HelpCircle } from "lucide-react";

export default function LoginOnboarding() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {!loggedIn ? (
        // Login Screen
        <div className="flex w-full">
          {/* Left side with background image */}
          <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80')"}}></div>

          {/* Right side form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-3xl font-bold mb-6 text-yellow-400"
            >
              AcessoOH
            </motion.h1>

            <Card className="w-full max-w-md bg-gray-800 border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2 bg-gray-700 rounded p-2">
                  <User className="text-gray-400" size={20} />
                  <Input placeholder="Usuário / Email" className="bg-transparent border-0 text-white placeholder-gray-400" />
                </div>

                <div className="flex items-center space-x-2 bg-gray-700 rounded p-2">
                  <Lock className="text-gray-400" size={20} />
                  <Input type="password" placeholder="Senha" className="bg-transparent border-0 text-white placeholder-gray-400" />
                </div>

                <Button onClick={() => setLoggedIn(true)} className="w-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
                  Entrar
                </Button>
                <div className="flex justify-between text-sm text-gray-400">
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" className="accent-yellow-400" />
                    <span>Lembrar-me</span>
                  </label>
                  <a href="#" className="hover:underline">Esqueci minha senha</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Onboarding Dashboard
        <div className="w-full flex flex-col p-10 space-y-8">
          <motion.h2 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="text-2xl font-bold">
            Bem-vindo de volta, Márcio!
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                <FolderPlus className="text-yellow-400" size={36} />
                <p className="text-lg font-semibold">Novo Projeto</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                <History className="text-yellow-400" size={36} />
                <p className="text-lg font-semibold">Abrir Histórico</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                <HelpCircle className="text-yellow-400" size={36} />
                <p className="text-lg font-semibold">Ajuda & Tutoriais</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Projetos Recentes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-800 hover:bg-gray-700 transition">
                <CardContent className="p-4">
                  <p className="font-semibold">Trabalhadores SP</p>
                  <span className="text-sm text-gray-400">Último acesso em 21/08/2025</span>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 hover:bg-gray-700 transition">
                <CardContent className="p-4">
                  <p className="font-semibold">Lanchonetes Interior SP</p>
                  <span className="text-sm text-gray-400">Último acesso em 18/08/2025</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
