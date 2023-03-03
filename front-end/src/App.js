import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Layout from './components/Layout/Layout'
import DailyQuiz from './components/DailyQuiz/DailyQuiz'
import LoginPage from './components/Landing/Login';
import SignUpPage from './components/Landing/SignUp';
import Items from './components/Items/Items'

const App = props => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Layout />} >
          {/* ADD YOUR ROUTES HERE */}
          <Route index element={<Landing />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/daily-quiz" element={<DailyQuiz />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/items" element={<Items />} />
        </ Route>
      </Routes>
    </>
  );
}

export default App
