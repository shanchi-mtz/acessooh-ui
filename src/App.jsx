import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Login from "./screens/Login.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import SelectDatabase from "./screens/SelectDatabase.jsx";
import FiltersTarget from "./screens/FiltersTarget.jsx";
import Preview from "./screens/Preview.jsx";

export default function App() {
  const [screen, setScreen] = useState("onboarding"); 
  const [loggedIn, setLoggedIn] = useState(false);

  // LOGIN (sem sidebar/header)
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  // APLICATIVO (com sidebar + header)
  return (
    <div className="layout bg-gray-100 dark:bg-gray-950 transition-colors min-h-screen">
      <Sidebar current={screen} setCurrent={setScreen} />

      <main className="content text-gray-900 dark:text-gray-100">
        <Header />

        {screen === "onboarding" && (
          <Onboarding onContinue={() => setScreen("base")} />
        )}
        {screen === "base" && (
          <SelectDatabase
            onContinue={() => setScreen("filtros")}
            onBack={() => setScreen("onboarding")}
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
