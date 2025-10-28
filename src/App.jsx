import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import LoginOnboarding from "./screens/login.jsx";
import SelectDatabase from "./screens/SelectDatabase.jsx";
// import FiltersTarget from "./screens/FiltersTarget.jsx"; // ⛔ desativado neste fluxo
// import Preview from "./screens/Preview.jsx";              // ⛔ se quiser, reativa depois
import Header from "./components/header.jsx";
import Onboarding from "./screens/onboarding.jsx";
import Mapoteca from "./screens/mapoteca.jsx";
import TabelaDados from "./screens/TabelaDados.jsx";
import MapaMunicipios from "./screens/MapaMunicipios.jsx";
import TGIBuilder from "./screens/TGIBuilder.jsx"; // ✅ tela nova

export default function App() {
  const [screen, setScreen] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);
  const [mapaAtivo, setMapaAtivo] = useState(null);

  // impede abrir editor sem mapa
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

        {/* 🏠 Home / Onboarding */}
        {screen === "home" && <Onboarding onContinue={() => setScreen("base")} />}

        {/* 🧭 Seleção da Base → agora vai direto para o TGIBuilder */}
        {screen === "base" && (
          <SelectDatabase
            onContinue={() => setScreen("tgi-builder")} // ⬅️ aqui é a mudança
            onBack={() => setScreen("home")}
          />
        )}

        {/* 🧱 NOVA ETAPA: Construtor TGI (Linhas & Colunas) */}
        {screen === "tgi-builder" && <TGIBuilder />}

        {/* 📍 Geofusion */}
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

        {/* ✏️ Editor de Camadas (só com mapa ativo) */}
        {screen === "criar-camada" && mapaAtivo && (
          <MapaMunicipios
            nomeMapa={mapaAtivo?.nome}
            onBack={() => {
              setMapaAtivo(null);
              setScreen("mapoteca");
            }}
            onContinue={(camadas) => {
              const todosMunicipios = Array.from(
                new Set((camadas || []).flatMap((c) => c?.selecionados || []).filter(Boolean))
              );
              setMunicipiosSelecionados(todosMunicipios);
              setScreen("tabela-dados");
            }}
          />
        )}

        {/* 📄 Tabela de dados final */}
        {screen === "tabela-dados" && (
          <TabelaDados
            municipios={municipiosSelecionados}
            onBack={() => setScreen("criar-camada")}
          />
        )}

        {/*
          🔌 Telas abaixo ficam comentadas no novo fluxo:
          {screen === "filtros" && (
            <FiltersTarget
              onBack={() => setScreen("base")}
              onContinue={() => setScreen("preview")}
            />
          )}
          {screen === "preview" && <Preview onBack={() => setScreen("filtros")} />}
        */}
      </main>
    </div>
  );
}
