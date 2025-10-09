import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import LoginOnboarding from "./screens/login.jsx";
import SelectDatabase from "./screens/SelectDatabase.jsx";
import FiltersTarget from "./screens/FiltersTarget.jsx";
import Preview from "./screens/Preview.jsx";
import Header from "./components/Header.jsx";
import Onboarding from "./screens/onboarding.jsx";
import Mapoteca from "./screens/mapoteca.jsx";
import TabelaDados from "./screens/TabelaDados.jsx";
import MapaMunicipios from "./screens/MapaMunicipios.jsx";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);
  const [mapaAtivo, setMapaAtivo] = useState(null); // guarda info do mapa aberto/criado

  // ✅ Guarda: se tentar ir para o editor sem mapa, volta para a Mapoteca
  useEffect(() => {
    if (screen === "criar-camada" && !mapaAtivo) {
      setScreen("mapoteca");
    }
  }, [screen, mapaAtivo]);

  if (!loggedIn) {
    return (
      <LoginOnboarding
        loggedIn={loggedIn}
        onLogin={() => setLoggedIn(true)}
        onContinue={() => setScreen("base")}
      />
    );
  }

  return (
    <div className="layout bg-gray-100 dark:bg-gray-950 transition-colors min-h-screen">
      <Sidebar current={screen} setCurrent={setScreen} />
      <main className="content text-gray-900 dark:text-gray-100">
        <Header />

        {/* 🔥 TGI */}
        {screen === "home" && (
          <Onboarding onContinue={() => setScreen("base")} />
        )}
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

        {/* 🔥 Geofusion */}
        {screen === "mapoteca" && (
          <Mapoteca
            onOpenMap={(mapa) => {
              setMapaAtivo(mapa);
              setScreen("criar-camada");
            }}
            onCreateNewMap={(novoMapa) => {
              setMapaAtivo(novoMapa);
              setScreen("criar-camada");
            }}
          />
        )}

        {/* Editor de camadas (só renderiza se houver mapaAtivo) */}
        {screen === "criar-camada" && mapaAtivo && (
          <MapaMunicipios
            nomeMapa={mapaAtivo?.nome}
            onBack={() => {
              setMapaAtivo(null);          // limpa o mapa ativo
              setScreen("mapoteca");       // volta para escolher mapa
            }}
            onContinue={(camadas) => {
              // camadas = array vindo do editor; consolidar todos os municípios
              const todosMunicipios = Array.from(
                new Set(
                  (camadas || [])
                    .flatMap((c) => c?.selecionados || [])
                    .filter(Boolean)
                )
              );
              setMunicipiosSelecionados(todosMunicipios);
              setScreen("tabela-dados");
            }}
          />
        )}

        {/* Tabela de dados final */}
        {screen === "tabela-dados" && (
          <TabelaDados
            municipios={municipiosSelecionados}
            onBack={() => setScreen("criar-camada")}
          />
        )}
      </main>
    </div>
  );
}
