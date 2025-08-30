import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import LoginOnboarding from './screens/LoginOnboarding.jsx'
import SelectDatabase from './screens/SelectDatabase.jsx'
import FiltersTarget from './screens/FiltersTarget.jsx'

export default function App(){
  const [screen, setScreen] = useState('login')
  return (
    <div className="layout">
      <Sidebar current={screen} setCurrent={setScreen} />
      <main className="content">
        {screen === 'login' && <LoginOnboarding onContinue={()=>setScreen('base')} />}
        {screen === 'base' && <SelectDatabase onContinue={()=>setScreen('filtros')} onBack={()=>setScreen('login')} />}
        {screen === 'filtros' && <FiltersTarget onBack={()=>setScreen('base')} />}

        {/* Footer de navegação entre telas (protótipo) */}
        <footer className="w-full sticky bottom-0 bg-gray-950/95 backdrop-blur border-t border-gray-900 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
            <button className={`btn btn-secondary ${screen==='login' ? 'border-yellow-400 text-yellow-300' : ''}`} onClick={()=>setScreen('login')}>Tela 1</button>
            <button className={`btn btn-secondary ${screen==='base' ? 'border-yellow-400 text-yellow-300' : ''}`} onClick={()=>setScreen('base')}>Tela 2</button>
            <button className={`btn btn-secondary ${screen==='filtros' ? 'border-yellow-400 text-yellow-300' : ''}`} onClick={()=>setScreen('filtros')}>Tela 3</button>
          </div>
        </footer>
      </main>
    </div>
  )
}
