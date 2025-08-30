import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import LoginOnboarding from './screens/LoginOnboarding.jsx'
import SelectDatabase from './screens/SelectDatabase.jsx'
import FiltersTarget from './screens/FiltersTarget.jsx'
import Preview from './screens/Preview.jsx'

export default function App(){
  const [screen,setScreen]=useState('home')
  const [loggedIn,setLoggedIn]=useState(false)
  if(!loggedIn){
    return <LoginOnboarding loggedIn={false} onLogin={()=>setLoggedIn(true)} onContinue={()=>setScreen('base')}/>
  }
  return(
    <div className="layout">
      <Sidebar current={screen} setCurrent={setScreen}/>
      <main className="content">
        {screen==='home'   && <LoginOnboarding loggedIn={true} onContinue={()=>setScreen('base')}/>}
        {screen==='base'   && <SelectDatabase onContinue={()=>setScreen('filtros')} onBack={()=>setScreen('home')}/>}
        {screen==='filtros'&& <FiltersTarget onBack={()=>setScreen('base')} onContinue={()=>setScreen('preview')}/>}
        {screen==='preview'&& <Preview onBack={()=>setScreen('filtros')}/>}
      </main>
    </div>
  )
}
