import React from 'react'
import './App.css'
import Header from './Header'
import PatientHeader from './PatientHeader'
import PatientMedList from "./PatientMedList"

const App = () =>
  <div className="App">
    <Header />
    <PatientHeader />
    <PatientMedList />
  </div>

export default App;
