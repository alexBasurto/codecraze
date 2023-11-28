import { useEffect, useState } from "react";

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
      <ul>
        {myFavs.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.full_name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MyFavs;