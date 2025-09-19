import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import LoginOnboarding from "./screens/Login.jsx";
import SelectDatabase from "./screens/SelectDatabase.jsx";
import FiltersTarget from "./screens/FiltersTarget.jsx";
import Preview from "./screens/Preview.jsx";
import Header from "./components/Header.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import Mapoteca from "./screens/Mapoteca.jsx";
import MapaAberto from "./screens/MapaAberto.jsx";
import CriarCamada from "./screens/CriarCamada.jsx";
import ConfigCamada from "./screens/ConfigCamada.jsx";
import TabelaDados from "./screens/TabelaDados.jsx";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);

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
        {screen === "preview" && <Preview onBack={() => setScreen("filtros")} />}

        {/* 🔥 Geofusion */}
        {screen === "mapoteca" && <Mapoteca onOpenMap={() => setScreen("mapa")} />}
        {screen === "mapa" && <MapaAberto onCreateLayer={() => setScreen("criar-camada")} />}

        {/* 👉 Criação de camada */}
        {screen === "criar-camada" && (
          <CriarCamada
            onBack={() => setScreen("mapa")}
            onContinue={(municipios) => {
              console.log("Municípios escolhidos:", municipios);
              setMunicipiosSelecionados(municipios); // salva no estado
              setScreen("config-camada"); // vai pra próxima tela
            }}
          />
        )}

        {/* 👉 Configuração da camada */}
        {screen === "config-camada" && (
          <ConfigCamada
            municipios={municipiosSelecionados}
            onBack={() => setScreen("criar-camada")}
            onContinue={() => setScreen("tabela-dados")} // agora leva pra tabela
            onFinish={() => setScreen("mapa")}
          />
        )}

        {/* 👉 Tabela de dados */}
        {screen === "tabela-dados" && (
          <TabelaDados
            municipios={municipiosSelecionados}
            onBack={() => setScreen("config-camada")}
          />
        )}
      </main>
    </div>
  );
}
