// src/components/Header.jsx
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="font-bold text-xl text-gray-900 dark:text-gray-100">
        AcessoOH
      </h1>
      <ThemeToggle />
    </header>
  );
}
