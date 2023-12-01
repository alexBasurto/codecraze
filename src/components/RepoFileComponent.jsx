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
              {data.homepage && <p><a href={data.homepage}>Homepage</a></p>}
              <p className="indent">Description:</p>
              <p>{data.description}</p>
              <p className="indent">Created at:</p>
              <p>{data.created_at.slice(0, 10)}</p>
              <p className="indent">Last update:</p>
              <p>{data.updated_at.slice(0, 10)}</p>
              <p>{data.stargazers_count.toLocaleString('es-ES')} stars</p>
              <p>{data.forks_count.toLocaleString('es-ES')} forks</p>
              {data.license && <><p className="indent">License:</p><p>{data.license.name}</p></>}
              {data.language && <><p className="indent">Language:</p><p>{data.language}</p></>}
            </div>
            <div className="repo-file-owner">
              <h4>Owner Info</h4>
              <img src={data.owner.avatar_url} alt="Imagen de perfil" className="avatar"/>
              <h4>{data.owner.login}</h4>
              <p className="bold">User or Organization:</p>
              <p>{data.owner.type}</p>
              <p><a href={data.owner.html_url} target="_blank">GitHub owner's page</a></p>
              
              
            </div>
            <div className="repo-file-chart">
              
            </div>
            <div className="repo-file-favs">
              {favorite && <img src="/assets/fav.png" alt="Remove favorite" className="favorite" onClick={handleToggleFavorite}/>}
              {!favorite &&  <img src="/assets/nofav.png" alt="Add to favorites" className="favorite" onClick={handleToggleFavorite}/>}
              {data.owner.type === "User" && <>
                <h4>Contributions</h4>
                <img src={`https://ghchart.rshah.org/${data.owner.login}`} alt="GitHub chart" className="contributions-chart"/>
                <h4>Most used langauges</h4>
                <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${data.owner.login}&layout=compact&langs_count=10&hide_border=true&hide_title=true&hide=html,css`} alt="GitHub chart" className="used-languages-chart"/>
              </>}
            </div>
        </article>
        </>
    );
}

export default RepoFile;