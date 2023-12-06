import { useContext } from 'react'

import DarkModeContext from './hooks/useDarkMode'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Router } from './router/router'

function App() {

  const { themeName } = useContext(DarkModeContext)

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme={themeName}
      />
      <Router />
    </BrowserRouter>
  )
}

export default App
