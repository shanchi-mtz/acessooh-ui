import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import LoginOnboarding from "./screens/Login.jsx";
import SelectDatabase from "./screens/SelectDatabase.jsx";
import FiltersTarget from "./screens/FiltersTarget.jsx";
import Preview from "./screens/Preview.jsx";
import Header from "./components/Header.jsx";
import Onboarding from "./screens/Onboarding.jsx"; // ✅ Importa aqui

export default function App() {
  const [screen, setScreen] = useState("home"); 
  const [loggedIn, setLoggedIn] = useState(false);

  // LOGIN (sem sidebar)
  if (!loggedIn) {
    return (
      <LoginOnboarding
        loggedIn={loggedIn}
        onLogin={() => setLoggedIn(true)}
        onContinue={() => setScreen("base")}
      />
    );
  }

  // APLICATIVO (com sidebar + header)
  return (
    <div className="layout bg-gray-100 dark:bg-gray-950 transition-colors min-h-screen">
      <Sidebar current={screen} setCurrent={setScreen} />

      <main className="content text-gray-900 dark:text-gray-100">
        <Header />

        {/* 🔥 Quando screen for "home", mostra o Onboarding */}
        {screen === "home" && <Onboarding onContinue={() => setScreen("base")} />}

        {screen === "base" && (
          <SelectDatabase
            onContinue={() => setScreen("filtros")}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "filtros" && (
          <FiltersTarget
            onBack={() => setScreen("base")}
            onContinue={() => setScreen("preview")}
          />
        )}
        {screen === "preview" && (
          <Preview onBack={() => setScreen("filtros")} />
        )}
      </main>
    </div>
  );
}
