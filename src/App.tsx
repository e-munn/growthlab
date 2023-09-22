import './App.css'
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Dropdown } from './dropdown'
import { Network } from './network'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { Header } from './header'

import theme from './theme'

function App() {
  const location = useLocation()
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes location={location} key={location.pathname}>
          <Route path={'/'} element={<Header />}>
            <Route index element={<Dropdown />} />
            <Route path={'/network'} element={<Network />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
