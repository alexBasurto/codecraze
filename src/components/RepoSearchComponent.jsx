import { useState } from "react";
import { useEffect } from "react";
import RepoForm from "./RepoFormComponent";
import RepoRow from "./RepoRowComponent";
import RepoFile from "./RepoFileComponent";

const RepoSearch = () => {
  const [loaded, setLoaded] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [repoSelected, setRepoSelected] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(null);
  const [currentSearch, setCurrentSearch] = useState([]);
  const [searchOrFile, setSearchOrFile] = useState(true); // true = search, false = file

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
    if (formData.repoName) query +=  `+${formData.repoName}+in:name`; //ok
    if (formData.repoDesc) query +=  `+${formData.repoDesc}+in:description`; //ok
    if (formData.owner) query +=  `+user:${formData.owner}`; //ok
    if (formData.language) query +=  `+language:${formData.language}`; //ok
    if (formData.license) query +=  `+license:${formData.license}`; //ok
    query += `&sort=stars&order=desc&page=${page}&per_page=${perPage}`; //ok
    console.log("After conditions:", query);
    return query;
  };

  const handleFormSubmit = (formData) => {
    setCurrentSearch(formData);
    const query = buildQuery(formData, currentPage);
    setRepoList([]);
    getRepos(query);
  };

  const handleOpenRepoFile = (repo) => {
    console.log("Repo to open:", repo);
    setRepoSelected(repo);
    setSearchOrFile(false);
  }

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
        
      <p className="error">{error}</p>

      {searchOrFile && !repoSelected &&
      <>
      <RepoForm onFormSubmit={handleFormSubmit}/>
      {repoList.length != 0 &&
      <>
      <div className="pagination">
        <button onClick={() => goToPrevious()} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToNext()} disabled={currentPage === totalPages}>Next</button>
      </div>
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
          <RepoRow key={repo.id} data={repo} openRepoFile={handleOpenRepoFile}/>
        ))}
      </table>
      </>
      }
      </>
}
      {repoSelected && !searchOrFile && <RepoFile data={repoSelected}/>}
    </>
  );
}

export default RepoSearch;