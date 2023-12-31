import { useEffect, useState } from "react";
import RepoRow from "./RepoRowComponent";
import RepoFile from "./RepoFileComponent";

const MyFavs = () => {

  const [myFavs, setMyFavs] = useState([]);
  const [repoSelected, setRepoSelected] = useState(null);
  const [searchOrFile, setSearchOrFile] = useState(true); // true = search, false = file

  let clName = "repo-results";

  useEffect(() => {
    getMyFavs();
  }
  , []);

  //recupera los datos del local storage
  const getMyFavs = () => {
    const data = localStorage.getItem('codeCrazeFavs');
    if (data) {
      setMyFavs(JSON.parse(data));
    }
  }

  const handleOpenRepoFile = (repo) => {
    setRepoSelected(repo);
    setSearchOrFile(false);
  }

  return (
    <>
      {searchOrFile && !repoSelected &&
      <>
      <h2>My Favs</h2>
      <table className={clName}>
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
        {myFavs.map((repo) => (
          <RepoRow key={repo.id} data={repo} openRepoFile={handleOpenRepoFile}/>
        ))}
      </table>
    </>
}
{repoSelected && !searchOrFile && <RepoFile data={repoSelected}/>}
</>


  );
}

export default MyFavs;