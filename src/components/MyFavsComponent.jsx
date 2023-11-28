import { useEffect, useState } from "react";
import RepoRow from "./RepoRowComponent";

const MyFavs = () => {

  const [myFavs, setMyFavs] = useState([]);

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


  return (
    <>
      <h2>My Favs</h2>
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
        {myFavs.map((repo) => (
          <RepoRow key={repo.id} data={repo}/>
        ))}
      </table>
    </>
  );
}

export default MyFavs;