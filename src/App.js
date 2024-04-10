import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Attendance from './components/Attendance';
import Advance from './components/Advance';
import Employee1 from './components/Employee1';
import Salary from './components/Salary';
import Leave from './components/Leave';

const Appcontext = createContext();

function App() {
  const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
  const [employeelistData, setemployeelistData] = useState([]);
  const getAllEmployee = async () => {
    try {
      const result = await axios.get(`${url}GetAllEmployee`);
      setemployeelistData(result.data.data);
    } catch (error) {
      alert('Error fetching employee data');
    }
  };
 
  return (
    <>
      <Appcontext.Provider value={{ employeelistData, getAllEmployee }}>
        <BrowserRouter>
          <div classNameName="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">TeamSync</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                    <li className="nav-item">
                      <Link className='nav-link' to="/employee">Employee</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to="/advance">Advance</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to="/attendance">Attendance</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to="/salary">Salary</Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to="/leave">Leave</Link>
                    </li>
                    

                  </ul>

                </div>
              </div>
            </nav>

            <Routes>
              <Route path="employee" element={<Employee1></Employee1>}></Route>
              <Route path="/advance" element={<Advance></Advance>}></Route>
              <Route path='/attendance' element={<Attendance></Attendance>}></Route>
               <Route path='/salary' element={<Salary></Salary>}></Route>
               <Route path='/leave' element={<Leave></Leave>}></Route>
               
              {/* <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>  */}
            </Routes>
          </div>
        </BrowserRouter>
      </Appcontext.Provider>

    </>

  );
}

export default App;
export { Appcontext }