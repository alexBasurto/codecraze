import { useState } from 'react';

import Welcome from './components/WelcomeComponent';
import RepoSearch from './components/RepoSearchComponent';
import LanguageStats from './components/LanguageStatsComponent';
import About from './components/AboutComponent';

import './App.css';

function App() {
const [webPosition, setWebPosition] = useState('welcome');

const handleButtonClick = (position) => {
  if (position === 'repoSearch' && webPosition === 'repoSearch') {
    setWebPosition(null);
    setTimeout(() => setWebPosition(position), 0);
  } else {
    setWebPosition(position);
  }
}

  return (
    <>
    <header>
      <h1>CODECRAZE</h1>
      <nav>
        <ul>
          <li><button onClick={() => handleButtonClick('welcome')}>WELCOME</button></li>
          <li><button onClick={() => handleButtonClick('repoSearch')}>REPO SEARCH ENGINE</button></li>
          <li><button onClick={() => handleButtonClick('language')}>LANGUAGES STATISTICS</button></li>
          <li><button onClick={() => handleButtonClick('about')}>ABOUT</button></li>
        </ul>
      </nav>
    </header>
    <main>
      {webPosition === 'welcome' && <Welcome />}
      {webPosition === 'repoSearch' && <RepoSearch />}
      {webPosition === 'language' && <LanguageStats />}
      {webPosition === 'about' && <About />}
    </main>
    </>
  );
}

export default App;
