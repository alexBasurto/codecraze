import { useState } from "react";

const RepoFile = ({ data }) => {
    const [loaded, setLoaded] = useState(false);
    let className = "repo-file";
    
    const handleClick = () => {
        // Lógica de añadir a favoritos en localStorage
        
        
    }

    return (
        <>
        <h2>Repo File</h2>
        <article className="className">
            <h3>{data.name}</h3>
            <h4>Repository Info</h4>
            <p><a href={data.html_url}>GitHub repo page</a></p>
            <p>{data.description}</p>
            <p>{data.created_at}</p>
            <p>{data.updated_at}</p>
            <p>{data.stargazers_count}</p>
            <p>{data.forks_count}</p>
            <p>{data.license.name}</p>
            <p>{data.language}</p>

            <h4>Owner Info</h4>
            <img src={data.owner.avatar_url} alt="Imagen de perfil" className="avatar"/>
            <p>{data.owner.login}</p>
            <p>{data.owner.type}</p>
            <p><a href="{data.owner.html_url}">GitHub owner's page</a></p>

            <button onClick={handleClick}>Add to favorites</button>
        </article>
        </>
    );
}

export default RepoFile;