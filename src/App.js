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
import AddSalePage from './components/pages/AddSalePage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUserActions } from './store/slices/currentUserSlice';
import store from './store/store';
import { Alert, Snackbar } from '@mui/material';
import { alertHandlerActions } from './store/slices/alert-handler-slice';
import DisplaySalesPage from './components/pages/DisplaySalesPage';





function App() {
  const alertData = useSelector((state)=>{return state.alertHandlerSlice})
  const reduxDispatch = useDispatch();
  const handleClose = ()=>{
    reduxDispatch(alertHandlerActions.closeAlert());
  }
  useEffect(()=>{
    if(localStorage.getItem('currentUser')){
      reduxDispatch(currentUserActions.setCurrentUser({currentUser: JSON.parse(localStorage.getItem('currentUser'))}))
    }
  })

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
        <Snackbar anchorOrigin={{vertical:'top',horizontal:'right'}} open={alertData.alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={alertData.severety} >
                    {alertData.message}
                </Alert>
        </Snackbar>
        <Routes >
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/add-employee' element={<AddEmployeePage />} />
          <Route path='/add-sale' element={<AddSalePage />} />
          <Route path='/display-sales' element={<DisplaySalesPage />} />
          {/* <Route path='/add-salaried-employee' element={<SaleriedEmployeePage/>}/> */}
        </Routes>
        
        
      </ThemeProvider>
      
    </div>
  );
}

export default App;
