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

  let className = "repo-results";
  
  useEffect(() => {
  }, [currentPage]);

  const getRepos = async (query) => {
    try {
      const data = await fetch(query);
      const results = await data.json();
      console.log(results);
      setTotalPages(Math.ceil(results.total_count / perPage)); // Calcular el número total de páginas
      setRepoList(results.items);
    } catch (e) {
      setError("Algo salió mal...");
      console.error(e);
    }
  }  

  const buildQuery = (formData) => {
    let query = 'https://api.github.com/search/repositories';
    query += `?q=stars:%3E2000`;
    console.log("Before conditions:", query);
    if (formData.repoName) query +=  `+name:${formData.repoName}`;
    if (formData.repoDesc) query +=  `+description:${formData.repoDesc}`;
    if (formData.owner) query +=  `+owner.login:${formData.owner}`;
    if (formData.language) query +=  `+language:${formData.language}`;
    if (formData.type) query +=  `+owner.type:${formData.type}`;
    if (formData.license) query +=  `+license.name:${formData.license}`;
    query += `&sort=stars&order=desc&page=${currentPage}&per_page=${perPage}`;
    return query;
  };

  const handleFormSubmit = (formData) => {
    const query = buildQuery(formData);
    setRepoList([]);
    getRepos(query);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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