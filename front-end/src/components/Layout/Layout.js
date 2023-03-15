import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <div className="page">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
