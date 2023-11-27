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
    setRepoList([]);
    getRepos();
  }, [currentPage]);

  const getRepos = async () => {
    try {
      const data = await fetch(`https://api.github.com/search/repositories?q=stars:%3E2000&sort=stars&order=desc&page=${currentPage}&per_page=${perPage}`);
      const results = await data.json();
      console.log(results);
      setTotalPages(Math.ceil(results.total_count / perPage)); // Calcular el número total de páginas

      setRepoList(results.items);
    } catch (e) {
      setError("Algo salió mal...");
      console.error(e);
    }
  }  

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

  const handleClick = () => {
    // Puedes agregar lógica adicional aquí si es necesario
    console.log("Click en el repo:", data.name);
  };

  return (
    <>
        <h2>Repo Search Engine</h2>
      <p className="error">{error}</p>
      <RepoForm />
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