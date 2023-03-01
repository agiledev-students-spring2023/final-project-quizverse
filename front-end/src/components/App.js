import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Layout from './Layout/Layout'

const App = props => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Layout />} >
          <Route path="home" element = {<Home />} />
          {/* ADD YOUR ROUTES HERE */}
          <Route index element={<Home />} />
        </ Route>
      </Routes>
    </>
  );
}

export default App
