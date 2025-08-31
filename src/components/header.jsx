import { Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fecha dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur surface border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Esquerda vazia (sem logo duplicada) */}
        <div></div>

        {/* Direita */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Toggle dark/light */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-secondary"
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Usuário */}
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <User size={18} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold">Usuário Logado</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  usuario@email.com
                </p>
              </div>
              <div className="p-2">
                <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <Settings size={16} /> Configurações
                </a>
                <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <LogOut size={16} /> Sair
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
