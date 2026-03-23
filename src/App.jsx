import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Result from './pages/Result'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assessment/:mode" element={<Assessment />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
