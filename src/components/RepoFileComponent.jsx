import { useState } from "react";

const RepoFile = ({ data }) => {
    const [loaded, setLoaded] = useState(false);
    const [favorite, setFavorite] = useState(false);
    let className = "repo-file";


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
        <article className="className">
            <h3>{data.name}</h3>
            <h4>Repository Info</h4>
            <p><a href={data.html_url}>GitHub repo page</a></p>
            <p>{data.description}</p>
            <p>Created at:</p>
            <p>{data.created_at.slice(0, 10)}</p>
            <p>Last update:</p>
            <p>{data.updated_at.slice(0, 10)}</p>
            <p>{data.stargazers_count}</p>
            <p>{data.forks_count}</p>
            {data.license && <p>{data.license.name}</p>}
            <p>{data.language}</p>

            <h4>Owner Info</h4>
            <img src={data.owner.avatar_url} alt="Imagen de perfil" className="avatar"/>
            <p>{data.owner.login}</p>
            <p>{data.owner.type}</p>
            <p><a href="{data.owner.html_url}">GitHub owner's page</a></p>

            {favorite && <img src="/assets/nofav.png" alt="Remove favorite" className="favorite" onClick={handleToggleFavorite}/>}
            {!favorite &&  <img src="/assets/nofav.png" alt="Add to favorites" className="favorite" onClick={handleToggleFavorite}/>}
        </article>
        </>
    );
}

export default RepoFile;