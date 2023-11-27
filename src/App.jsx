import { useState, useEffect } from 'react'
import ResultsComponent from './components/ResultsComponent'
import RepoRow from './components/RepoRowComponent'
import RepoForm from './components/RepoFormComponent'
import './App.css'

function App() {

  return (
    <>
      <h1>CODECRAZE</h1>
      <ResultsComponent/>
    </>
  );
}

export default App;
