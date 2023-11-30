import { useState } from "react";

const RepoRow = ({ data , openRepoFile}) => {
  const [loaded, setLoaded] = useState(false);
  let className = "repo-card";
  
  const handleClick = () => {
    openRepoFile(data);
  };

  return (
    <tbody>
    <tr className={className + (loaded ? "" : " hidden")} onClick={handleClick}>
        <td>{data.name.toUpperCase()}</td>
        <td className="description">{(data.description.length > 60) ? (data.description.substr(0, 60) + "...") : data.description}</td>
        <td>{data.language}</td>
        <td>{data.stargazers_count.toLocaleString('es-ES')}</td>
        <td className="owner">
        <img src={data.owner.avatar_url} alt="Owner profile" className="ownerMiniature" /><p>{data.owner.login}</p>
        </td>
        <td>{data.owner.type}</td>

      
    </tr>
    </tbody>
  );
}

export default RepoRow;
