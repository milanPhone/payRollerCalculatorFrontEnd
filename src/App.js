// import logo from './logo.svg';
// import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import Login from './components/ui/Login';
import NavbarComponent from "./components/ui/NavbarComoponent";
import theme from './components/ui/theme';
import WelcomePage from './components/pages/Welcome'
import LoginPage from './components/pages/Login'
import { Route, Routes } from 'react-router-dom';
import AddEmployeePage from './components/pages/AddEmployee';





function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <ThemeProvider theme={theme}>

        <NavbarComponent />
        <Routes >
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/add-employee' element={<AddEmployeePage />} />
          {/* <Route path='/add-salaried-employee' element={<SaleriedEmployeePage/>}/> */}
        </Routes>
        
        
      </ThemeProvider>
      
    </div>
  );
}

export default App;
