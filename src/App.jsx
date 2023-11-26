import { useState, useEffect } from 'react'
import Repo from './components/RepoComponent'
import './App.css'

function App() {
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState('https://api.github.com/search/repositories?q=stars:%3E0&sort=stars&order=desc&per_page=100');
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);

  useEffect(() => {
    setRepoList([]);
    getRepos();
  }, [currentUrl]);

  const getRepos = async () => {
    try {
      const data = await fetch(currentUrl);
      const results = await data.json();
      console.log(results);
      setNextUrl(results.next);
      setPreviousUrl(results.previous);
      setRepoList(results.items);
    } catch (e) {
      setError("Algo salió mal...");
      console.error(e);
    }
  }

  const goToNext = () => {
    setCurrentUrl(nextUrl);
  }
  const goToPrevious = () => {
    setCurrentUrl(previousUrl);
  }

  return (
    <>
      <h1>CODECRAZE</h1>
      <p className="error">{error}</p>
      <section className='repos-container'>
        {repoList.map((repo) => (
          <Repo key={repo.id} data={repo} />
        ))}
      </section>
    </>
  );
}

export default App;
