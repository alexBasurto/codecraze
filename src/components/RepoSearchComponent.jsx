import { useState } from "react";
import { useEffect } from "react";
import RepoForm from "./RepoFormComponent";
import RepoRow from "./RepoRowComponent";

const RepoSearch = () => {
  const [loaded, setLoaded] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(null);
  const [currentSearch, setCurrentSearch] = useState([]);

  let className = "repo-results";
  
  useEffect(() => {
  }, [currentPage]);

  const getRepos = async (query) => {
    try {
      const data = await fetch(query);
      const results = await data.json();
      setTotalPages(Math.ceil(results.total_count / perPage)); // Calcular el número total de páginas
      setRepoList(results.items);
    } catch (e) {
      setError("Algo salió mal...");
      console.error(e);
    }
  }  

  const buildQuery = (formData, page) => {
    let query = 'https://api.github.com/search/repositories';
    query += `?q=stars:%3E2000`;
    if (formData.repoName) query +=  `+in:name%20${formData.repoName}`; //ok
    if (formData.repoDesc) query +=  `+in:description%20${formData.repoDesc}`; //ok
    if (formData.owner) query +=  `+user:${formData.owner}`;
    if (formData.language) query +=  `+language:${formData.language}`; //ok
    if (formData.type) query +=  `&type=${formData.type}`;
    if (formData.license) query +=  `+license.name:${formData.license}`;
    query += `&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
    console.log("After conditions:", query);
    return query;
  };

  const handleFormSubmit = (formData) => {
    setCurrentSearch(formData);
    const query = buildQuery(formData, currentPage);
    setRepoList([]);
    getRepos(query);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      const query = buildQuery(currentSearch, currentPage + 1);
      setCurrentPage(currentPage => currentPage + 1);
      setRepoList([]);
      getRepos(query);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      const query = buildQuery(currentSearch, currentPage - 1);
      setCurrentPage(currentPage => currentPage - 1);
      setRepoList([]);
      getRepos(query);
    }
  };

  return (
    <>
        <h2>Repo Search Engine</h2>
      <p className="error">{error}</p>
      <RepoForm onFormSubmit={handleFormSubmit}/>
      <table className='repos-table'>
        <thead>
          <tr>
          <th>REPO NAME</th>
          <th>DESCRIPTION</th>
          <th>MAIN LANGUAGE</th>
          <th>STARS</th>
          <th>AUTHOR/OWNER</th>
          <th>TYPE</th>
          </tr>
        </thead>
        {repoList.map((repo) => (
          <RepoRow key={repo.id} data={repo} />
        ))}
      </table>
      <div className="pagination">
        <button onClick={() => goToPrevious()} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToNext()} disabled={currentPage === totalPages}>Next</button>
      </div>
    </>
  );
}

export default RepoSearch;