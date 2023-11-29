import { useState } from "react";
import { useEffect } from "react";

import RepoForm from "./RepoFormComponent";
import RepoRow from "./RepoRowComponent";
import RepoFile from "./RepoFileComponent";

import {getReposFromAPI} from "./utils/apiGitHub.js";

const RepoSearch = () => {
  const [loading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [repoSelected, setRepoSelected] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(null);
  const [sortBy, setSortBy] = useState("stars");
  const [orderBy, setOrderBy] = useState("desc");
  const [currentSearch, setCurrentSearch] = useState([]);
  const [searchOrFile, setSearchOrFile] = useState(true); // true = search, false = file

  let className = "repo-results";
  
  useEffect(() => {
  }, [currentPage]);

  const handleFormSubmit = (formData) => {
    setLoading(true);
    setCurrentSearch(formData);
    const queryParams = {
      name: formData.repoName,
      description: formData.repoDesc,
      owner: formData.owner,
      language: formData.language,
      license: formData.license,
      limit: "stars:>2000",
      sort: sortBy,
      order: orderBy,
      page: currentPage,
      per_page: perPage,
    }
    setRepoList([]);
    getReposFromAPI(formData, queryParams).then((data) => {
      if (data.items) {
        setRepoList(data.items);
        setTotalPages(Math.ceil(data.total_count / perPage));
      } else {
        setError(data.message);
      }
      setLoading(false);
    });
  };

  const handleOpenRepoFile = (repo) => {
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
      {loading && <p>Loading...</p>}
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