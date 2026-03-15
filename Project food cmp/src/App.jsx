import { useState } from 'react'
import './index.css'
import Navbar from './components/navbar'
import Dashboard from './components/Dashboard'
import DetailsPane from './components/detailspane'

function App() {
  const[page, setPage] = useState('home')
  const[details, setDetails] = useState({})
  const[showDetails, setShowDetails] = useState(false)
  return (
    <div className="bg-white-400 flex flex-row items-center justify-between w-full h-screen overflow-none hide-scrollbar">
      <Navbar page={page} setPage={setPage} />
      <Dashboard page={page} setDetails={setDetails} setShowDetails={setShowDetails}/>
      {showDetails && <DetailsPane details={details} setShowDetails={setShowDetails}/>}
    </div>
  )
}

export default App

