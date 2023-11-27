import { useState, useEffect } from 'react';

import Welcome from './components/WelcomeComponent';
import RepoSearch from './components/RepoSearchComponent';
import LanguageStats from './components/LanguageStatsComponent';
import About from './components/AboutComponent';

import './App.css';

function App() {
const [webPosition, setWebPosition] = useState(0)


  return (
    <>
    <header>
      <h1>CODECRAZE</h1>
      <nav>
        <ul>
          <li><button>WELCOME</button></li>
          <li><button>REPO SEARCH ENGINE</button></li>
          <li><button>LANGUAGES STATISTICS</button></li>
          <li><button>ABOUT</button></li>
        </ul>
      </nav>
    </header>
    <main>
      <Welcome/>
      <RepoSearch/>
      <LanguageStats/>
      <About/>
    </main>
    </>
  );
}

export default App;
