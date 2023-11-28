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
        <td>{data.description}</td>
        <td>{data.language}</td>
        <td>{data.stargazers_count}</td>
        <td>
        <img src={data.owner.avatar_url} alt="Owner profile" className="ownerMiniature" />{data.owner.login}
        </td>
        <td>{data.owner.type}</td>

      
    </tr>
    </tbody>
  );
}

export default RepoRow;
