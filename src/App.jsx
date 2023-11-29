import { useState } from 'react';

import Welcome from './components/WelcomeComponent';
import RepoSearch from './components/RepoSearchComponent';
import MyFavs from './components/MyFavsComponent';
import LanguageStats from './components/LanguageStatsComponent';
import About from './components/AboutComponent';
import Footer from './components/FooterComponent';

import './App.css';
import './assets/bttn.min.css'

function App() {
const [webPosition, setWebPosition] = useState('welcome');
const [className, setClassName] = useState('bttn-unite bttn-md bttn-primary');

const handleButtonClick = (position) => {
  if (position === 'repoSearch' && webPosition === 'repoSearch') {
    setWebPosition(null);
    setTimeout(() => setWebPosition(position), 0);
  } else if (position === 'myFavs' && webPosition === 'myFavs') {
    setWebPosition(null);
    setTimeout(() => setWebPosition(position), 0);
  } else {
    setWebPosition(position);
  }
}

  return (
    <>
    <header>
      <div className="header-title">
        <img src="/assets/codecrazeIcon.png" alt="Logo de CodeCraze" />
        <h1>CodeCraze</h1>
      </div>
      <nav>
        <ul>
          <li><button className={className} onClick={() => handleButtonClick('welcome')}>WELCOME</button></li>
          <li><button className={className} onClick={() => handleButtonClick('repoSearch')}>REPO SEARCH ENGINE</button></li>
          <li><button className={className} onClick={() => handleButtonClick('myFavs')}>MY FAVS</button></li>
          <li><button className={className} onClick={() => handleButtonClick('language')}>LANGUAGES STATISTICS</button></li>
          <li><button className={className} onClick={() => handleButtonClick('about')}>ABOUT</button></li>
        </ul>
      </nav>
    </header>
    <main>
      {webPosition === 'welcome' && <Welcome />}
      {webPosition === 'repoSearch' && <RepoSearch />}
      {webPosition === 'myFavs' && <MyFavs />}
      {webPosition === 'language' && <LanguageStats />}
      {webPosition === 'about' && <About />}
    </main>
    <Footer />
    </>
  );
}

export default App;
