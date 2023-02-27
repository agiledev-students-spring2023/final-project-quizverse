import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './Header.js'
import Home from './Home'

const App = props => {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Header/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <Routes>
            {/* a route for the home page */}
            <Route path="/home" element={<Home/>} />
      ``</Routes>
      </main>
      </Router>
    </div>
  );
}

export default App;
