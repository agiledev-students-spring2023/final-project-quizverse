import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Layout from './components/Layout/Layout'

const App = props => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Layout />} >
          <Route path="home" element = {<Home />} />
          {/* ADD YOUR ROUTES HERE */}
          <Route index element={<Landing />} />
        </ Route>
      </Routes>
    </>
  );
}

export default App
