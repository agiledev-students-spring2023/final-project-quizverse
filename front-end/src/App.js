import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Layout from './components/Layout/Layout'
import DailyQuiz from './components/DailyQuiz/DailyQuiz'
import LoginPage from './components/Landing/Login';

const App = props => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Layout />} >
          <Route path="home" element = {<Home />} />
          {/* ADD YOUR ROUTES HERE */}
          <Route index element={<Landing />} />
          <Route path="daily-quiz" element={<DailyQuiz />}/>
          <Route path="login" element={<LoginPage />} />
        </ Route>
      </Routes>
    </>
  );
}

export default App
