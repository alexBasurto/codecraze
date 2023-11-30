import { useEffect, useState } from "react";

const RepoFile = ({ data }) => {
    const [loaded, setLoaded] = useState(false);
    const [favorite, setFavorite] = useState(false);
    let className = "repo-file";

    useEffect(() => {
        const isRepoInFavorites = JSON.parse(localStorage.getItem("codeCrazeFavs")) || [];
        const isFavorite = isRepoInFavorites.some((favorite) => favorite.id === data.id);
        setFavorite(isFavorite);
        setLoaded(true);
      }
    , [data.id]);

    const handleToggleFavorite = () => {
        setFavorite(!favorite);

        if (!favorite) {
          const favorites = JSON.parse(localStorage.getItem("codeCrazeFavs")) || [];
          favorites.push(data);
          localStorage.setItem("codeCrazeFavs", JSON.stringify(favorites));
        } else {
          const favorites = JSON.parse(localStorage.getItem("codeCrazeFavs")) || [];
          const updatedFavorites = favorites.filter((favorite) => favorite.id !== data.id);
          localStorage.setItem("codeCrazeFavs", JSON.stringify(updatedFavorites));
        }
      };

    return (
        <>
        <h2>Repo File</h2>
        <article className={className}>
            <h3>{data.name.toUpperCase()}</h3>
            <div className="repo-file-info">
              <h4>Repository Info</h4>
              <p><a href={data.html_url} target="_blank">GitHub repo page</a></p>
              <p>Description:</p>
              <p>{data.description}</p>
              <p>Created at:</p>
              <p>{data.created_at.slice(0, 10)}</p>
              <p>Last update:</p>
              <p>{data.updated_at.slice(0, 10)}</p>
              <p>{data.stargazers_count.toLocaleString('es-ES')} stars</p>
              <p>{data.forks_count.toLocaleString('es-ES')} forks</p>
              {data.license && <><p>License:</p><p>{data.license.name}</p></>}
              {data.language && <><p>Language:</p><p>{data.language}</p></>}
            </div>
            <div className="repo-file-owner">
              <h4>Owner Info</h4>
              <img src={data.owner.avatar_url} alt="Imagen de perfil" className="avatar"/>
              <p>{data.owner.login}</p>
              <p>User or Organization:</p>
              <p>{data.owner.type}</p>
              <p><a href={data.owner.html_url} target="_blank">GitHub owner's page</a></p>
            </div>
            <div className="repo-file-favs">
              {favorite && <img src="/assets/fav.png" alt="Remove favorite" className="favorite" onClick={handleToggleFavorite}/>}
              {!favorite &&  <img src="/assets/nofav.png" alt="Add to favorites" className="favorite" onClick={handleToggleFavorite}/>}
            </div>
        </article>
        </>
    );
}

export default RepoFile;