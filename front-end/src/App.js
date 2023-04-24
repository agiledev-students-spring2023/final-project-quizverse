import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Layout from './components/Layout/Layout';
import DailyQuiz from './components/DailyQuiz/DailyQuiz';
import LoginPage from './components/Login/Login';
import SignUpPage from './components/SignUp/SignUp';
import Shop from './components/Shop/Shop';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Items from './components/Items/Items';
import Terms from './components/Terms/Terms';
import Privacy from './components/Privacy/Privacy';
import CreateSet from './components/CreateSet/CreateSet';
import FlashcardSets from './components/FlashcardSets/FlashcardSets';
import Settings from './components/Settings/Settings';
import StudyStats from './components/StudyStats/StudyStats';
import ViewSet from './components/ViewSet/ViewSet';
import EditSet from './components/EditSet/EditSet';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00076f'
    },
    secondary: {
      main: '#9f45b0'
    },
    info: {
      main: '#e54ed0'
    }
  }
});
const App = (props) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ADD YOUR ROUTES HERE */}
            <Route index element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/daily-quiz" element={<DailyQuiz />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/create-set" element={<CreateSet />} />
            <Route path="/flashcards" element={<FlashcardSets />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/view/:username/:id" element={<ViewSet />} />
            <Route path="/edit/:id" element={<EditSet />} />
            <Route path="/study-stats" element={<StudyStats />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
