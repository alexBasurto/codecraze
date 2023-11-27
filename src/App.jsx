import { useState, useEffect } from 'react'
import ResultsComponent from './components/ResultsComponent'
import LanguageStats from './components/LanguageStatsComponent';
import About from './components/AboutComponent';
import './App.css'

function App() {

  return (
    <>
    <header>
      <h1>CODECRAZE</h1>
      <nav>
        <ul>
          <li><button>REPO SEARCH ENGINE</button></li>
          <li><button>LANGUAGES STATISTICS</button></li>
          <li><button>ABOUT</button></li>
        </ul>
      </nav>
    </header>
    <main>
      <ResultsComponent/>
      <LanguageStats/>
      <About/>
    </main>
    </>
  );
}

export default App;
