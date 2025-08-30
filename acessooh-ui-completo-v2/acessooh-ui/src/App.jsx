import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import LoginOnboarding from './screens/LoginOnboarding.jsx'
import SelectDatabase from './screens/SelectDatabase.jsx'
import FiltersTarget from './screens/FiltersTarget.jsx'

export default function App(){
  const [screen, setScreen] = useState('home') // home após login, base, filtros...
  const [loggedIn, setLoggedIn] = useState(false)

  // LOGIN (sem sidebar)
  if (!loggedIn) {
    return (
      <LoginOnboarding
        loggedIn={loggedIn}
        onLogin={() => setLoggedIn(true)}
        onContinue={() => setScreen('base')}
      />
    )
  }

  // APLICATIVO (com sidebar)
  return (
    <div className="layout">
      <Sidebar current={screen} setCurrent={setScreen} />
      <main className="content">
        {screen === 'home'   && <LoginOnboarding loggedIn={true} onContinue={()=>setScreen('base')} />}
        {screen === 'base'   && <SelectDatabase onContinue={()=>setScreen('filtros')} onBack={()=>setScreen('home')} />}
        {screen === 'filtros'&& <FiltersTarget onBack={()=>setScreen('base')} />}
      </main>
    </div>
  )
}
