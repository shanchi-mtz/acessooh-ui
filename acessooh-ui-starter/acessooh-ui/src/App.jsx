import { useState } from 'react'
import LoginOnboarding from './screens/LoginOnboarding.jsx'
import SelectDatabase from './screens/SelectDatabase.jsx'
import FiltersTarget from './screens/FiltersTarget.jsx'

export default function App(){
  const [screen, setScreen] = useState('login')
  return (
    <div>
      <div className="fixed top-3 right-3 z-50 flex gap-2">
        <button className="btn btn-secondary" onClick={()=>setScreen('login')}>Tela 1</button>
        <button className="btn btn-secondary" onClick={()=>setScreen('base')}>Tela 2</button>
        <button className="btn btn-secondary" onClick={()=>setScreen('filtros')}>Tela 3</button>
      </div>
      {screen === 'login' && <LoginOnboarding onContinue={()=>setScreen('base')} />}
      {screen === 'base' && <SelectDatabase onContinue={()=>setScreen('filtros')} onBack={()=>setScreen('login')} />}
      {screen === 'filtros' && <FiltersTarget onBack={()=>setScreen('base')} />}
    </div>
  )
}
